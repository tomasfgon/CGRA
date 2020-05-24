class MyGondola extends CGFobject{

    constructor(scene){
        super(scene);
        
        
        this.support = new MyQuad(this.scene);
        this.cilindro = new MyCylinder(this.scene,9);
        this.circle = new MySphere(this.scene,16,8);
        this.engine = new MyEngine(this.scene);
        
        this.gondola_text = new CGFappearance(this.scene);
        this.gondola_text.setAmbient(1, 1, 1, 1);
		this.gondola_text.setDiffuse(1, 1, 1, 1);
		this.gondola_text.setSpecular(1, 1, 1, 1);
        this.gondola_text.setShininess(120);
        
    }
    display(vel){

        //corpo da gondola
        this.vel = vel;

        
        this.scene.pushMatrix();
        
        this.gondola_text.apply();
        
        this.scene.scale(0.8,0.75,0.8);
        this.scene.translate(0,1/2+1/12, -1/4);
       
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

        //motor da helice 1;
        
        this.scene.pushMatrix();

        this.scene.translate(1/8+1/100,1/4+1/6+1/40,-1/4.5);
        this.scene.scale(1,0.8,0.8);
        this.engine.display(this.vel);
        
        this.scene.popMatrix();
        
        //motor da helice 2;

        this.scene.pushMatrix();
        
        this.scene.translate(-(1/8+1/100),1/4+1/6+1/40,-1/4.5);
        this.scene.scale(1,0.8,0.8);
        this.engine.display(this.vel);
        
        this.scene.popMatrix();
    
        this.scene.pushMatrix(); 
        
        this.scene.translate(0,1,-2);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(1,0.5,1);

        this.scene.pushMatrix();
        
        this.scene.translate(-0.75,0.475,0);
        this.scene.scale(0.5,0.05,1);
        this.support.display();
        
        this.scene.popMatrix();

        this.scene.pushMatrix();
        
        this.scene.translate(-0.75,-0.475,0);
        this.scene.scale(0.5,0.05,1);
        this.support.display();
        
        this.scene.popMatrix();
        
        this.scene.popMatrix();
    }
}