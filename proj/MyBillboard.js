class MyBillBoard extends CGFobject{
    constructor(scene,coords){
        super(scene);

        if (coords != undefined)
        this.updateTexCoords(coords);
        this.quad = new MyQuad(this.scene);
        
        this.initMaterials();

        

        this.shader = new CGFshader(this.scene.gl,'shaders/billboard.vert', 'shaders/billboard.frag');
        this.shader.setUniformsValues({supplies: 0});

    }
    initMaterials() {
        this.Material = new CGFappearance(this.scene);
        this.Material.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.Material.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.Material.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.Material.setShininess(10.0);
       
        this.texture = new CGFtexture(this.scene, 'images/billboard_texture.jpg');
        this.post = new CGFtexture(this.scene, 'images/post.jpg');
        
    
    }

    
    update(a){
        this.shader.setUniformsValues({supplies: a});
    }

    reset(){
        this.shader.setUniformsValues({supplies:0});
    }


    display(){
        
        this.scene.pushMatrix();
        
        this.Material.setTexture(this.texture);
        this.Material.setTextureWrap('REPEAT', 'REPEAT');
        
        //placa
        this.scene.pushMatrix();
        this.Material.apply();
        this.scene.translate(0,1.5,0);
        this.scene.scale(2,1,1);
        this.quad.display();
        this.scene.popMatrix();
        
        this.Material.setTexture(this.post);
        
        //poste 1
        this.scene.pushMatrix();
        this.Material.apply();
        this.scene.translate(0.95,0.5,0);
        this.scene.scale(0.1,1,1);
        this.quad.display();
        this.scene.popMatrix();

        //poste 2
       this.scene.pushMatrix();
        this.scene.translate(-0.95,0.5,0);
        this.scene.scale(0.1,1,1);
        this.quad.display();
        this.scene.popMatrix();
        
        //gradiente
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.scene.translate(0,1.2,0.05);
        this.scene.scale(1.5,0.2,1);
        this.quad.display();
        this.scene.popMatrix();
        

        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

}