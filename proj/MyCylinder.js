class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var faceWidth = 1 / this.slices;

        for(var i = 0; i <= this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var seno=Math.sin(ang);
            
            var cosseno=Math.cos(ang);
            
            
            
            this.vertices.push(cosseno, 0, seno);
            this.vertices.push(cosseno, 1, seno);

            // triangle normal computed by cross product of two edges
            var normal= [
                cosseno,
                0,
                seno
            ];

            
            

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            
            if( i < this.slices){

                this.indices.push(2*i,(2*i+1),(2*i+3));
                this.indices.push(2*i,(2*i+3),(2*i+2));
                
            }
            
            this.indices.push(2*i,2*i+2,12);

            this.indices.push(2*i+1,13,2*i+3);

            ang+=alphaAng;

        }
        
        this.vertices.push(0,0,0);
        this.vertices.push(0,1,0);

        //this.indices.push(0,2,16);
        //this.indices.push(17,3,1);
        


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    
}