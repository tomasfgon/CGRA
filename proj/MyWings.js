class MyWings extends CGFobject{

    constructor(scene){
        super(scene);
        
        this.square = new MyQuad(this.scene);
        this.triangle = new MyTriangle(this.scene);

        this.wings_text = new CGFappearance(this.scene);
        this.wings_text.setAmbient(0.05, 0.05, 0.05, 1);
		this.wings_text.setDiffuse(0.05, 0.05, 0.05, 1);
		this.wings_text.setSpecular(0.05, 0.05, 0.05, 1);
        this.wings_text.setShininess(120);
    
    }
    display(){
        
        this.wings_text.apply();
        //square 1;

        this.scene.pushMatrix();

        
        this.scene.pushMatrix();

        this.scene.translate(0,1/3,0);
        this.scene.scale(1,1/3,1/4);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.square.display();

        this.scene.popMatrix();

        //square 2;

        this.scene.pushMatrix();

        this.scene.translate(0,-1/3,0);
        this.scene.scale(1,1/3,1/4);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.square.display();

        this.scene.popMatrix();

        //triangle 1

        this.scene.pushMatrix();

        this.scene.translate(0,-1/3+1/12,1/4+1/6);
        this.scene.scale(1,1/3+1/6,1/3);
        this.scene.rotate(-Math.PI/2,0,0,1);
        
        //this.scene.rotate(-Math.PI,0,0,1);
        this.triangle.display();

        this.scene.popMatrix();
        
        //triangle 2

        this.scene.pushMatrix();

        this.scene.translate(0,1/3-1/12,1/4+1/6);
        this.scene.scale(1,1/3+1/6,1/3);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.triangle.display();

        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}