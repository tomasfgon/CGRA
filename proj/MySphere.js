class MySphere extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks, coords) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;

    this.initBuffers();

    if (coords != undefined) {
      this.updateTexCoords(coords);
    }

    this.earthMaterial = new CGFappearance(this.scene);
    this.earthMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.earthMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.earthMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.earthMaterial.setShininess(10.0);
    this.earthMaterial.loadTexture('images/earth.jpg');
    this.earthMaterial.setTextureWrap('REPEAT', 'REPEAT');


  }




  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;

    var longTex = 0;
    var longInc = 1 / this.longDivs;
    var latTex = 0;
    var latInc = 1 / this.latDivs;


    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;

      longTex = 0;

      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var x = Math.cos(theta) * sinPhi;
        var y = cosPhi;
        var z = Math.sin(-theta) * sinPhi;
        this.vertices.push(x, y, z);

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)

          this.indices.push(current + 1, current, next);
          this.indices.push(current + 1, next, next + 1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);
        theta += thetaInc;

        //this.texCoords.push(0.5 + Math.atan2(x,z)/(2*Math.PI),0.5-Math.asin(y)/Math.PI);

        this.texCoords.push(longTex, latTex);

        longTex += longInc;
      }
      phi += phiInc;

      latTex += latInc;
    }



    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();



  }
  updateTexCoords(coords) {
    this.texCoords = [...coords];
    this.updateTexCoordsGLBuffers();
  }
}
