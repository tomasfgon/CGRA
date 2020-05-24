/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {

	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {


		this.quad = new MyQuad(this.scene);

		this.back = new CGFappearance(this.scene);
		this.back.setAmbient(1,1,1,1);
		this.back.setDiffuse(0.0, 0.0, 0.0, 1);
		this.back.setSpecular(0.0, 0.0, 0.0, 1);
		this.back.setShininess(120.0);
		this.back.loadTexture('images/split_cubemap/hill/back.png');
		this.back.setTextureWrap("REPEAT", "REPEAT");


		this.front = new CGFappearance(this.scene);
		this.front.setAmbient(1,1,1,1);
		this.front.setDiffuse(0.0, 0.0, 0.0, 1);
		this.front.setSpecular(0.0, 0.0, 0.0, 1);
		this.front.setShininess(120.0);
		this.front.loadTexture('images/split_cubemap/hill/front.png');
		this.front.setTextureWrap("REPEAT", "REPEAT");

		this.left = new CGFappearance(this.scene);
		this.left.setAmbient(1,1,1,1);
		this.left.setDiffuse(0.0, 0.0, 0.0, 1);
		this.left.setSpecular(0.0, 0.0, 0.0, 1);
		this.left.setShininess(120.0);
		this.left.loadTexture('images/split_cubemap/hill/left.png');
		this.left.setTextureWrap("REPEAT", "REPEAT");

		this.right = new CGFappearance(this.scene);
		this.right.setAmbient(1,1,1,1);
		this.right.setDiffuse(0.0, 0.0, 0.0, 1);
		this.right.setSpecular(0.0, 0.0, 0.0, 1);
		this.right.setShininess(120.0);
		this.right.loadTexture('images/split_cubemap/hill/right.png');
		this.right.setTextureWrap("REPEAT", "REPEAT");

		this.bottom = new CGFappearance(this.scene);
		this.bottom.setAmbient(1,1,1,1);
		this.bottom.setDiffuse(0.0, 0.0, 0.0, 1);
		this.bottom.setSpecular(0.0, 0.0, 0.0, 1);
		this.bottom.setShininess(120.0);
		this.bottom.loadTexture('images/split_cubemap/hill/bottom.png');
		this.bottom.setTextureWrap("REPEAT", "REPEAT");

		this.top = new CGFappearance(this.scene);
		this.top.setAmbient(1,1,1,1);
		this.top.setDiffuse(0.0, 0.0, 0.0, 1);
		this.top.setSpecular(0.0, 0.0, 0.0, 1);
		this.top.setShininess(120.0);
		this.top.loadTexture('images/split_cubemap/hill/top.png');
		this.top.setTextureWrap("REPEAT", "REPEAT");


	}

	enableNormalViz(){
		this.quad.enableNormalViz();
	}

	disableNormalViz(){
		this.quad.disableNormalViz();

	}

	display(){



		//Back 1/6
		this.back.apply();
		//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.scene.rotate(Math.PI,0,1,0);
		this.quad.display();
		this.scene.popMatrix();

		//Right 2/6
		this.right.apply();
		//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(0.5,0,0);
		this.scene.rotate(3*Math.PI/2,0,1,0);
		this.quad.display();
		this.scene.popMatrix();

		//Left 3/6
		this.left.apply();
		//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(-0.5,0,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.quad.display();
		this.scene.popMatrix();

		//Front 4/6
		this.front.apply();
		//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(0,0,-0.5);
		this.quad.display();
		this.scene.popMatrix();


		//Bottom 5/6
		this.bottom.apply();
		//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

		this.scene.pushMatrix(); //BOTTOM
		this.scene.translate(0,-0.5,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.quad.display();
		this.scene.popMatrix();


		//Top 6/6
		this.top.apply();
		//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

		this.scene.pushMatrix(); //TOP
		this.scene.translate(0,0.5,0);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.quad.display();
		this.scene.popMatrix();

	}

	updateTexture(){
		if(this.scene.activeTexture==0){
			this.left.loadTexture('images/split_cubemap/hill/left.png');
			this.right.loadTexture('images/split_cubemap/hill/right.png');
			this.back.loadTexture('images/split_cubemap/hill/back.png');
			this.front.loadTexture('images/split_cubemap/hill/front.png');
			this.top.loadTexture('images/split_cubemap/hill/top.png');
			this.bottom.loadTexture('images/split_cubemap/hill/bottom.png');
		}
		else if(this.scene.activeTexture==1){
			this.left.loadTexture('images/split_cubemap/mountain/left.png');
			this.right.loadTexture('images/split_cubemap/mountain/right.png');
			this.back.loadTexture('images/split_cubemap/mountain/back.png');
			this.front.loadTexture('images/split_cubemap/mountain/front.png');
			this.top.loadTexture('images/split_cubemap/mountain/top.png');
			this.bottom.loadTexture('images/split_cubemap/mountain/bottom.png');
		}
	}
	

	updateBuffers(complexity){
		this.initBuffers();
		this.initNormalVizBuffers();
	}
}

