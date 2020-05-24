class MyEngine extends CGFobject{

    constructor(scene,vel){
        super(scene);
        
        this.cilindro = new MyCylinder(this.scene,9);
        this.circle = new MySphere(this.scene,16,8);
        this.propeller = new MyPropeller(this.scene);
        
        this.gondola_text = new CGFappearance(this.scene);
        this.gondola_text.setAmbient(1, 1, 1, 1);
		this.gondola_text.setDiffuse(1, 1, 1, 1);
		this.gondola_text.setSpecular(1, 1, 1, 1);
        this.gondola_text.setShininess(120);
    }
    
    display(vel){

        this.vel = vel

        

        this.scene.pushMatrix();
        
        this.scene.translate(0,0,-1/32-1/128);
        this.scene.scale(1/16,1/16,1/16);
        this.propeller.display(this.vel);

        this.scene.popMatrix();
        
        this.gondola_text.apply();

        this.scene.pushMatrix();
    
        this.scene.scale(1/3,1/4,1/4);

        this.scene.pushMatrix();

        this.scene.scale(1/8,1/8,1/2);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.cilindro.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.scale(0.12,0.12,0.12);
        this.circle.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0,0,1/2);
        this.scene.scale(0.12,0.12,0.12);
        this.circle.display();

        this.scene.popMatrix();
        
        
        this.scene.popMatrix();

        
    }
}