class MyFlag extends CGFobject{
    constructor(scene){
        super(scene);
    
        this.flag = new MyPlane2sided(this.scene,20);
        
        

        this.flag_texture = new CGFtexture(this.scene,"images/board.jpg");

        this.flag_shader = new CGFshader(this.scene.gl,"shaders/flag.vert","shaders/flag.frag");
        this.flag_shader.setUniformsValues({ uSampler: 1 });
        
        this.flag_shader.setUniformsValues({phase: 0});
      

        this.phase = 0;

        this.time = 0;

        this.Material = new CGFappearance(this.scene);
		this.Material.setAmbient(0.3, 0.3, 0.3, 1);
		this.Material.setDiffuse(0.7, 0.7, 0.7, 1);
		this.Material.setSpecular(0.0, 0.0, 0.0, 1);
        this.Material.setShininess(120);
        
    
    }
    update(t,vel){
        
        

        var deltaT = t - this.scene.lastTime;

        var deltax = vel*deltaT;

        this.phase += deltax;
        
        this.flag_shader.setUniformsValues({phase: this.phase});
        
       

    }


    display(){

        this.scene.setActiveShader(this.flag_shader);
        
        this.flag_texture.bind(1);


        this.scene.pushMatrix();
        
        this.Material.setTexture(this.flag_texture);
        this.Material.apply();
        
        this.scene.translate(0,0,-2);
        this.scene.rotate(Math.PI/2,0,1,0);

        this.scene.scale(1,0.75,1);
        
        this.scene.pushMatrix();
        this.flag.display();
        this.scene.popMatrix();
       
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}