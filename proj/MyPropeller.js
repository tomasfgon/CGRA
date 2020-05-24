class MyPropeller extends CGFobject{

    constructor(scene){
        super(scene);
        
        
        this.sphere = new MySphere(this.scene,16,8);
        this.cylinder = new MyCylinder(this.scene,4);
        this.rotation_angle = 0;

        this.prop = new CGFappearance(this.scene);
        this.prop.setAmbient(0.447, 0.537, 0.854, 1);
        this.prop.setDiffuse(0.447, 0.537, 0.854, 1);
		this.prop.setSpecular(0.447, 0.537, 0.854, 1);
        this.prop.setShininess(120);

    }

    display(vel){

        this.prop.apply();
        
        this.vel = vel;
        this.rotation_angle += this.vel/(4*Math.PI);

        this.scene.pushMatrix();
        
        
        this.scene.rotate(this.rotation_angle,0,0,1);
        
        this.scene.pushMatrix();

        this.scene.translate(0,0,1/8);
        this.scene.scale(1/4,1/4,1/16);
        this.sphere.display();

        this.scene.popMatrix();
        
        this.scene.pushMatrix();

        this.scene.translate(0,0,1/16);
        this.scene.scale(1/4,1/4,1/12);
        this.sphere.display();

        this.scene.popMatrix();
    
        this.scene.pushMatrix();

        this.scene.translate(0,0,1/8);
        this.scene.scale(1/8,1,1/32);
        this.cylinder.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0,0,1/8);
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.scale(1/8,1,1/32);
        this.cylinder.display();

        this.scene.popMatrix();

        
        this.scene.popMatrix();
    }
}