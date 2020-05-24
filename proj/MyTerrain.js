class MyTerrain extends CGFobject{
    constructor(scene,x,y, height){
        super(scene);

        this.x = x;
        this.y = y;
        this.height = height;

        this.surface = new MyPlane(this.scene,20);
        
        this.textureTerrain = new CGFtexture(this.scene, "images/terrain.jpg");
        this.textureTerrainMap = new CGFtexture(this.scene, "images/heightmap.jpg");
        
        this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.appearance.setShininess(120);


        this.appearance.setTexture(this.textureTerrain);
        
        this.shader = new CGFshader(this.scene.gl,"shaders/terrain.vert","shaders/terrain.frag");
        this.shader.setUniformsValues({ uSamplerWater: 1 });
        this.shader.setUniformsValues({ uSamplerWaterMap: 2 });

    }
    display(){

        this.scene.setActiveShader(this.shader);
        
        this.appearance.apply();
        
        this.textureTerrain.bind(1);
        this.textureTerrainMap.bind(2);
        
        this.scene.pushMatrix();
        
        this.scene.scale(this.x,this.height,this.y);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.surface.display();
        
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }



}