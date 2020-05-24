/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject{

    constructor(scene){
        super(scene);
        this.initBuffers();
    }
    initBuffers(){
        this.vertices = [
            0,0,Math.sqrt(0.75),
            0.5,0,-1*Math.sqrt(0.75),
            -0.5,0,-1*Math.sqrt(0.75)
            
        ];
        this.indices = [
            0,1,2,
            0,2,1
        ];
        
        this.normals=[
            0,0,1,
            0,0,1,
            0,0,1,

            0,0,-1,
            0,0,-1,
            0,0,-1
        ];
        this.texCoords=[
            0, 0,
            0, 1,
            1, 1,
            1, 0,

            0, 0,
            0, 1,
            1, 1,
            1, 0,
        ];
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
    }
}