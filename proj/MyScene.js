/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
        this.appearance = null;
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        this.gl.clearDepth(10000.0);
        this.gl.clearColor(1, 1, 1, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(1000/60); // 60 hz or every 1/60 of a second 

        this.enableTextures(true);

        this.appearance = new CGFappearance(this);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(120);
        
        
        //Initialize scene objects
        this.axis = new CGFaxis(this);

        this.background = new MyUnitCube(this); //skybox
        this.billboard = new MyBillBoard(this);
        this.vehicle = new MyVehicle(this, 0, 0, 0, 10, 0);
        this.terrain = new MyTerrain(this, 50, 50, 8);

        this.box0 = new MySupply(this);
        this.box1 = new MySupply(this);
        this.box2 = new MySupply(this);
        this.box3 = new MySupply(this);
        this.box4 = new MySupply(this);

        

        this.boxes = [this.box0, this.box1, this.box2, this.box3, this.box4];

        this.displayAxis = true;
        
        // Update variables
        this.lastTime = 0;
        this.speedfactor = 1;
        this.scalefactor = 1;
        this.timePassedbetweendrops = 0; //used to avoid "L" spam
        this.nSuppliesDelivered = 0;
        this.activeTexture = 0;


        this.selectedObject = 2; //vehicle default

        this.objects = [new MySphere(this, 16, 8), new MyCylinder(this, 8), this.vehicle];

        this.objectList = {
            'Earth': 0,
            'Cylinder': 1,
            'Vehicle': 2
        }
        this.textureList= {
            'Hill': 0,
            'Mountain': 1
        };


    }
    selectedTexture() {
        this.background.updateTexture();
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    checkKeys() {


        if (this.gui.isKeyPressed("KeyW")) {

            this.vehicle.accelerate(0.5 * this.speedfactor);

        }
        if (this.gui.isKeyPressed("KeyS")) {

            this.vehicle.accelerate(-0.5 * this.speedfactor);

        }
        if (this.gui.isKeyPressed("KeyA")) {
            this.vehicle.turn(Math.PI / 180); //turn 1 radian
            this.vehicle.updatewings(1);

        }
        else if (this.gui.isKeyPressed("KeyD")) {
            this.vehicle.turn(-1 * Math.PI / 180);
            this.vehicle.updatewings(-1);

        }
        else {
            this.vehicle.updatewings(0); //if either A or D are being pressed, wings go slowly back to normal
        }
        if (this.gui.isKeyPressed("KeyP")) {
            this.vehicle.autoPilot();
        }


        if (this.gui.isKeyPressed("KeyR")) {
            this.vehicle.reset();

            this.box0.reset();
            this.box1.reset();
            this.box2.reset();
            this.box3.reset();
            this.box4.reset();

            this.billboard.reset();

            this.nSuppliesDelivered = 0;



        }
        if (this.gui.isKeyPressed("KeyL")) {
            if (this.nSuppliesDelivered < 5 && this.timePassedbetweendrops > 500) { 
                
                this.boxes[this.nSuppliesDelivered].drop(this.vehicle.getXPosition*this.scalefactor, (this.vehicle.getYPosition - 1)*this.scalefactor, this.vehicle.getZPosition*this.scalefactor);
                this.nSuppliesDelivered += 1;
                this.timePassedbetweendrops = 0;
                this.billboard.update(this.nSuppliesDelivered);
            }
        }
        if(this.gui.isKeyPressed("KeyB")){
                 
                //focus the billboard

                this.camera.setTarget(vec3.fromValues(-10.5,3,0));
                this.camera.setPosition(vec3.fromValues(0.1,2,0.1));
                
        }
        if(this.gui.isKeyPressed("KeyC")){
            
            //goes back to default point of view

            this.camera.setTarget(vec3.fromValues(2,10,2));
            this.camera.setPosition(vec3.fromValues(5, 20, 5));
        }
    }

    initCameras() {
        this.camera = new CGFcamera(Math.PI / 3, 0.1, 500, vec3.fromValues(5, 20, 5), vec3.fromValues(0, 10, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.setShininess(10.0);
    }
    
    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        if(this.selectedObject == 2){
            this.checkKeys();
            this.vehicle.update(t);
        }
        
        this.boxes[0].update(t);
        this.boxes[1].update(t);
        this.boxes[2].update(t);
        this.boxes[3].update(t);
        this.boxes[4].update(t);
        
        this.setDefaultAppearance();

        this.timePassedbetweendrops += (t - this.lastTime); 

        this.lastTime = t;

    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        

        this.appearance.apply();
        this.terrain.display();

        this.pushMatrix();

        this.translate(0, 10, 0);
        this.scale(50, 50, 50);
        this.background.display();
        
        this.popMatrix();

        this.pushMatrix();

        this.boxes[0].display();
        this.boxes[1].display();
        this.boxes[2].display();
        this.boxes[3].display();
        this.boxes[4].display();
        this.appearance.apply();

        this.popMatrix();

        this.pushMatrix();
        
        this.translate(-10.5,3,0);
        this.rotate(+Math.PI/2,0,1,0);
        this.billboard.display();
        
        this.popMatrix();

        if (this.selectedObject == 0) {

            this.pushMatrix();

            this.scale(this.scalefactor, this.scalefactor, this.scalefactor);
            this.translate(0,10,0);
            this.objects[0].earthMaterial.apply();
            this.objects[0].display();

            this.popMatrix();
        }
        else if (this.selectedObject == 1) {
            this.pushMatrix();

            this.translate(0,10,0);
            this.scale(this.scalefactor, this.scalefactor, this.scalefactor);
            this.objects[1].display();

            this.popMatrix();
        }
        else if (this.selectedObject == 2){
            this.pushMatrix();
            
            this.scale(this.scalefactor, this.scalefactor, this.scalefactor);
            this.vehicle.display();

            this.popMatrix();
        }

        this.appearance.apply();
        this.setActiveShader(this.defaultShader);
    }
}