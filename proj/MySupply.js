class MySupply extends CGFobject {

    SupplyStates = {
        INACTIVE: 0,
        FALLING: 1,
        LANDED: 2,
        OPEN: 3
    };

    constructor(scene, coords) {
        super(scene);

        if (coords != undefined)
            this.updateTexCoords(coords);
        
        this.initMaterials();
        
        this.quad = new MyQuad(this.scene);
        this.state = this.SupplyStates.INACTIVE;
        this.x, this.y, this.z = 0;
        this.initialHeight = 0;
        this.open_angle = 0;
        //this.light = 10.0;
        
    }

    initMaterials() {
        this.Material = new CGFappearance(this.scene);
        this.Material.setAmbient(0.5, 0.6, 0.6, 1.0);
        this.Material.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.Material.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.Material.setShininess(10.0);
        
        this.texture = new CGFtexture(this.scene, 'images/box.jpg');
    }

    update(t) {
        var deltaT = t - this.scene.lastTime;
        if (this.state == 1) {
            this.y = this.y - (deltaT/1000)*(this.initialHeight/3);
            this.land();
        }
        if(this.state == 2){
            this.open_angle += 2*Math.PI/180;
            //this.light += 20;
            if(this.open_angle >= Math.PI/2){
                this.state = this.SupplyStates.OPEN;
                
            }
        }
    }
    drop(x, y, z) {
        this.x = x;
        this.y = this.initialHeight = y;
        this.z = z;
        this.state = this.SupplyStates.FALLING;
    }
    land() {
        if (this.y <= 0.5) {
            this.state = this.SupplyStates.LANDED;
        }
    }
    reset(){
        this.state = this.SupplyStates.INACTIVE;
        this.open_angle = 0;
    }

    display() {

        if (this.state == 0) {
            //display nothing
        }

        if (this.state == 1) {
            this.scene.pushMatrix();
            
            this.scene.translate(this.x,this.y,this.z);

            this.scene.pushMatrix();
            //bottom
            this.Material.setTexture(this.texture);
            
            this.Material.apply();
            

            this.scene.pushMatrix();
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
            this.scene.popMatrix();

            //side

            
            this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.rotate(3 * Math.PI / 2, 0, 1, 0);
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
            this.scene.popMatrix();

            //top

            
            this.scene.pushMatrix();
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
            this.scene.popMatrix();
            
            this.scene.popMatrix();

            
            
            this.scene.popMatrix();

            
        }
        if(this.state == 2){
            this.scene.pushMatrix();

            this.scene.translate(this.x,0.2,this.z);
            
            //this.Material.apply();
           // this.Material.setShininess(this.light);
            this.Material.apply();

            this.scene.pushMatrix();
            
            this.scene.translate(0,0,-0.5);
            this.scene.rotate(-this.open_angle,1,0,0);

            this.scene.translate(0,0.5,0);
            
            
            this.quad.display();
            this.scene.popMatrix();
            
            
            this.scene.pushMatrix();
            
            
            this.scene.translate(0,0,0.5);
            this.scene.rotate(this.open_angle,1,0,0);
            this.scene.translate(0,0.5,0);

            
            this.quad.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
            
            this.scene.translate(-0.5,0,0);
            this.scene.rotate(this.open_angle,0,0,1);
            this.scene.translate(0,0.5,0);
            this.scene.rotate(-Math.PI/2,0,1,0);
            this.quad.display();
            
            this.scene.popMatrix();
            
            
            this.scene.pushMatrix();
            
            this.scene.translate(0.5,0,0);
            this.scene.rotate(-this.open_angle,0,0,1);
            this.scene.translate(0,0.5,0);
            this.scene.rotate(-Math.PI/2,0,1,0);
            this.quad.display();
            
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI/2,1,0,0);
            this.quad.display();
            
            this.scene.popMatrix();
            
            this.scene.popMatrix();
            
        }
        if(this.state == 3){
            this.scene.pushMatrix();
            
            this.scene.translate(this.x,0.2,this.z);
            this.Material.apply();

            this.scene.pushMatrix();
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            
            this.scene.translate(-1,0,0);
            this.scene.rotate(-Math.PI / 2, 1,0 , 0);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(1,0,0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.quad.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
            this.scene.translate(0,0,-1);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.quad.display();
            this.scene.popMatrix(); 

            this.scene.pushMatrix();
            this.scene.translate(0,0,1);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.quad.display();
            this.scene.popMatrix(); 

            this.scene.popMatrix();
        }
    }
}


