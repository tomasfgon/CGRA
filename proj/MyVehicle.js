/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject{

    constructor(scene,ang,vel,x,y,z){
        super(scene);
        
        this.initTexture();
        
        this.wingsang = 0;
        this.ang = ang;
        this.vel = vel;
        this.x = x;
        this.y = y;
        this.z = z;

        this.autopilot = -1; //not activated
        
        //vehicle components
        this.body = new MySphere(this.scene,16,8);
        this.wings = new MyWings(this.scene);
        this.gondola = new MyGondola(this.scene);
        this.flag = new MyFlag(this.scene);
    
        this.Material = new CGFappearance(this.scene);
		this.Material.setAmbient(0.3, 0.3, 0.3, 1);
		this.Material.setDiffuse(0.7, 0.7, 0.7, 1);
		this.Material.setSpecular(0.0, 0.0, 0.0, 1);
        this.Material.setShininess(120);
        
        

       // this.body_text = new CGFtexture(this.scene,"images/graduation.jpg");

        
    }
    initTexture(){
        
        this.body_text = new CGFappearance(this.scene);
        this.body_text.setAmbient(1, 1, 1, 1);
		this.body_text.setDiffuse(1, 1, 1, 1);
		this.body_text.setSpecular(1, 1, 1, 1);
        this.body_text.loadTexture('images/discord.png');
        
        
        this.wings_text = new CGFappearance(this.scene);
        
        this.wings_text.setShininess(120);
        
    }
    

    update(t){
        

        var deltaT = t - this.scene.lastTime; //time between each update
        if(this.autopilot == -1){
            this.x = this.x + this.vel*(deltaT/1000)*Math.sin(this.ang);
            this.y = this.y;
            this.z = this.z + this.vel*(deltaT/1000)*Math.cos(this.ang);         
            this.flag.update(t,this.vel);
        }
        else{
            //if the vehicle is in autopilot
            this.x = this.centrex - 5*Math.cos(this.ang + (deltaT/1000)*(2/5)*Math.PI); 
            this.z = this.centrez + 5*Math.sin(this.ang + (deltaT/1000)*(2/5)*Math.PI);
            this.ang = this.ang + (deltaT/1000)*(2/5)*Math.PI;
            this.flag.update(t,5);
            this.updatewings(1);
        }

        

    }
    
    updatewings(val){
        
        if(val == 1){
            this.wingsang -= Math.PI/180;
        }
        if(val == -1){
            this.wingsang += Math.PI/180;
        }
        if(val == 0){
            if(this.wingsang >0){
                this.wingsang -= Math.PI/180;
            }
            if(this.wingsang < 0){
                this.wingsang += Math.PI/180;
            }
            
        }
        // Wings only go to a 30 degree angle;
        if(Math.abs(this.wingsang) >= (Math.PI/6)){
            if(this.wingsang > 0){
                this.wingsang = Math.PI/6;
            }
            else{
                this.wingsang = -1* Math.PI/6;
            }
        }
    }
    autoPilot(){
        this.autopilot *= -1;
        this.centrex = 5*Math.cos(this.ang) + this.x;
        this.centrez = -5*Math.sin(this.ang) + this.z;
    }

    turn(val){
        if(this.autopilot == -1){
            this.ang = this.ang + val;
        }
    }

    accelerate(val){
        if(this.autopilot == -1){
            this.vel = this.vel + val;
        }
    }

    reset(){
        this.vel = 0;
        this.ang = 0;
        this.x = 0;
        this.z = 0;
        this.wingsang = 0;
        this.autopilot = -1;
    }
    display(){
        
        //this.Material.setTexture(this.textura);
        //this.Material.apply();
        
        this.scene.pushMatrix();
        
        
        this.scene.translate(this.x,this.y,this.z);
        this.scene.rotate(this.ang,0,1,0);

        //body
        
       
        
        
        
        this.scene.pushMatrix();

        
       this.body_text.apply();

        this.scene.scale(0.5,0.5,1);
        
        this.body.display();
        
        this.scene.popMatrix();
        
        this.scene.pushMatrix();

        this.scene.translate(0,0,-1);

        //"wing 1"

        //this.wings_text.apply();

        this.scene.pushMatrix();
        
        this.scene.rotate(this.wingsang,0,1,0);
        this.wings.display();
        
        this.scene.popMatrix();

        //wing 2

        this.scene.pushMatrix();
        
        this.scene.rotate(Math.PI/2,0,0,1);
        this.wings.display();
        
        this.scene.popMatrix();
    
        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0,-1,0);
        this.gondola.display(this.vel);

        this.scene.popMatrix();
        
        //flag

        this.scene.pushMatrix();
        
        this.flag.display();

        this.scene.popMatrix();
       
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    
    
    }
    get getXPosition(){
        return this.x;
    }
    get getYPosition(){
        return this.y;
    }
    get getZPosition(){
        return this.z;
    }
}