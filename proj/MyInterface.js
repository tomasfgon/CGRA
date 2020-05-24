/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        this.gui.add(this.scene, 'selectedObject', this.scene.objectList).name('Base Object');
        
        this.gui.add(this.scene, 'speedfactor',0.1,3).name('Speed Factor');
        
        this.gui.add(this.scene, 'scalefactor', 0.5, 3).name('Scale Factor');
        
        this.initKeys();

        this.gui.add(this.scene, 'activeTexture', this.scene.textureList).name('Active Texture').onChange(this.scene.selectedTexture.bind(this.scene));


        return true;
    }
    initKeys(){
        this.scene.gui = this;

        this.processKeyboard=function(){}

        this.activeKeys={};
    }
    processKeyDown(event) {
        this.activeKeys[event.code]=true;
    }
    processKeyUp(event) {
        this.activeKeys[event.code]=false;
        }
    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

}
