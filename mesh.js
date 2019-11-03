
let meshColor = {
    black: 0,
    red: 1,
    green: 2,
    yellow: 3,
    blue: 4,
    magenta: 5,
    cyan: 6,
    white: 7
}

class Mesh {

    static init(scene) {
        Mesh._staticPitch = 1.19;

        let contrast = 0.45;
        Mesh._staticColor = [];
        Mesh._staticColor[0] = new BABYLON.Color3(contrast, contrast, contrast); //NA
        Mesh._staticColor[1] = new BABYLON.Color3(contrast, 0, 0); //RED
        Mesh._staticColor[2] = new BABYLON.Color3(0, contrast, 0); //GREEN 
        Mesh._staticColor[3] = new BABYLON.Color3(contrast, contrast, 0); //YELLOW
        Mesh._staticColor[4] = new BABYLON.Color3(0, 0, 0.3);//BLUE
        Mesh._staticColor[5] = new BABYLON.Color3(contrast, 0, contrast); //MAGENTA
        Mesh._staticColor[6] = new BABYLON.Color3(0, contrast, contrast);//CYAN
        Mesh._staticColor[7] = new BABYLON.Color3(0.6, 0.6, 0.6); //WHITE

        let emissiveColor = 0.3;

        Mesh._staticMaterial = [];
        Mesh._staticMaterial[0] = new BABYLON.StandardMaterial("", scene); // NA
        Mesh._staticMaterial[0].diffuseColor = new BABYLON.Color3(1, 1, 1);
        Mesh._staticMaterial[0].emissiveColor = new BABYLON.Color3(0.12, 0.12, 0.12);

        Mesh._staticMaterial[1] = new BABYLON.StandardMaterial("", scene);      //RED
        Mesh._staticMaterial[1].diffuseColor = new BABYLON.Color3(1, 0, 0);
        Mesh._staticMaterial[1].emissiveColor = new BABYLON.Color3(emissiveColor, 0, 0);

        Mesh._staticMaterial[2] = new BABYLON.StandardMaterial("", scene); //GREEN 
        Mesh._staticMaterial[2].diffuseColor = new BABYLON.Color3(0, 1, 0);
        Mesh._staticMaterial[2].emissiveColor = new BABYLON.Color3(0, emissiveColor, 0);

        Mesh._staticMaterial[3] = new BABYLON.StandardMaterial("", scene); //YELLOW
        Mesh._staticMaterial[3].diffuseColor = new BABYLON.Color3(1, 1, 0);
        Mesh._staticMaterial[3].emissiveColor = new BABYLON.Color3(emissiveColor, emissiveColor, 0);

        Mesh._staticMaterial[4] = new BABYLON.StandardMaterial("", scene); //BLUE
        Mesh._staticMaterial[4].diffuseColor = new BABYLON.Color3(0, 0, 1);
        Mesh._staticMaterial[4].emissiveColor = new BABYLON.Color3(0, 0, emissiveColor);

        Mesh._staticMaterial[5] = new BABYLON.StandardMaterial("", scene); //MAGENTA
        Mesh._staticMaterial[5].diffuseColor = new BABYLON.Color3(1, 0, 1);
        Mesh._staticMaterial[5].emissiveColor = new BABYLON.Color3(emissiveColor, 0, emissiveColor);

        Mesh._staticMaterial[6] = new BABYLON.StandardMaterial("", scene); //CYAN
        Mesh._staticMaterial[6].diffuseColor = new BABYLON.Color3(0, 1, 1);
        Mesh._staticMaterial[6].emissiveColor = new BABYLON.Color3(0, emissiveColor, emissiveColor);

        Mesh._staticMaterial[7] = new BABYLON.StandardMaterial("", scene); //WHITE
        Mesh._staticMaterial[7].diffuseColor = new BABYLON.Color3(1, 1, 1);
        Mesh._staticMaterial[7].emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);


    }
    constructor({ mesh = [], line = [] }, block) {

        this._mesh = mesh;
        this._line = line;
        this._mesh.forEach(item => item.material = Mesh._staticMaterial[0]);
        this._line.forEach(item => item.color = Mesh._staticColor[0]);
        if (block != null) {
            this._block = block;
            this._updatePos();
        }
    }

    hide() {
        this._mesh.forEach(item => item.setEnabled(false));
        this._line.forEach(item => item.setEnabled(false));
    }

    show() {
        this._mesh.forEach(item => item.setEnabled(true));
        this._line.forEach(item => item.setEnabled(true));
    }

    dispose() {
        this._mesh.forEach(item => item.dispose());
        this._line.forEach(item => item.dispose());
        this._mesh = [];
        this._line = [];

    }

    set block(block) {
        this._block = block;
        this._updatePos();
    }
    _updatePos() {

        this._mesh.forEach(function (item) {
            item.position.x = this._block.x;
            item.position.y = this._block.y * Mesh._staticPitch;
            item.position.z = this._block.z;
            item.rotation.y = Math.PI * this._block.r / 2;
        }.bind(this));

        this._line.forEach(function (item) {
            item.position.x = this._block.x;
            item.position.y = this._block.y * Mesh._staticPitch;
            item.position.z = this._block.z;
            item.rotation.y = Math.PI * this._block.r / 2;
        }.bind(this));

        this._updateColor();
    }

    _updateColor() {

        this._mesh.forEach(function (item, index) {
            item.material = Mesh._staticMaterial[this._block.color[index]];

        }.bind(this));

        this._line.forEach(function (item, index) {
            item.color = Mesh._staticColor[this._block.color[index]];

        }.bind(this));

    }




    colorWheel({ index = 0, color = 0, section = 0, colorComplete = false }) {

        if (colorComplete) {
            this._mesh.forEach(item => item.material = Mesh._staticMaterial[color]);
            this._line.forEach(item => item.color = Mesh._staticColor[color]);
            this._block.color = color;

        } else {

            if (index % 2 == 0) {
                index += section;
            } else {
                index -= section;
            }

            this._mesh[index].material = Mesh._staticMaterial[color];
            this._line[index].color = Mesh._staticColor[color];

            switch (index) {
                case 0:
                    this._block.ledA = color;
                    break;
                case 1:
                    this._block.ledB = color;
                    break;
                case 2:
                    this._block.ledC = color;
                    break;
                case 3:
                    this._block.ledD = color;
                    break;
            }
        }

    }

}




class MeshBase extends Mesh {

    static init() {
        MeshBase._staticMaterial = [];
        Mesh._staticMaterial.forEach((item, index) => MeshBase._staticMaterial[index] = item);
        MeshBase._staticMaterial[0] = new BABYLON.StandardMaterial("", scene); //LED NA
        MeshBase._staticMaterial[0].diffuseColor = new BABYLON.Color3(1, 1, 1);
        MeshBase._staticMaterial[0].emissiveColor = new BABYLON.Color3(0, 0, 0);

    }
    constructor({ mesh = [], line = [], ledUpRightCW = [], ledSideRightCW = [], rgbNipple = [], rgbNippleLine = [] }, blockBase) {
        super({ mesh: mesh, line: line }, null);

        this._ledUpRightCW = ledUpRightCW;
        this._ledSideRightCW = ledSideRightCW;
        this._rgbNipple = rgbNipple;
        this._rgbNippleLine = rgbNippleLine;

        this._blockBase = blockBase;


        this._ledUpRightCW.forEach(item => item.material = MeshBase._staticMaterial[0]); //remove? 
        this._ledSideRightCW.forEach(item => item.material = MeshBase._staticMaterial[0]);  //remove?     

        this._ledUpRightCW.forEach((item, index) => item.name = function ({ color = 0 }) { this.colorWheel({ index: index, color: color }); }.bind(this));
        this._ledSideRightCW.forEach((item, index) => item.name = function ({ color = 0 }) { this.colorWheel({ index: index, color: color }); }.bind(this));


    }

    colorWheel({ index = 0, color = 0 }) {

        this._ledUpRightCW[index].material = MeshBase._staticMaterial[color];
        this._ledSideRightCW[index].material = MeshBase._staticMaterial[color];


        switch (index) {
            case 0:
                this._blockBase.ledRight = color;
                break;
            case 1:
                this._blockBase.ledFront = color;
                break;
            case 2:
                this._blockBase.ledLeft = color;
                break;
            case 3:
                this._blockBase.ledBack = color;
                break;
        }


    }

    updateColor() {
        this._ledUpRightCW[0].material = MeshBase._staticMaterial[this._blockBase.ledRight];
        this._ledSideRightCW[0].material = MeshBase._staticMaterial[this._blockBase.ledRight];
        this._ledUpRightCW[1].material = MeshBase._staticMaterial[this._blockBase.ledFront];
        this._ledSideRightCW[1].material = MeshBase._staticMaterial[this._blockBase.ledFront];
        this._ledUpRightCW[2].material = MeshBase._staticMaterial[this._blockBase.ledLeft];
        this._ledSideRightCW[2].material = MeshBase._staticMaterial[this._blockBase.ledLeft];
        this._ledUpRightCW[3].material = MeshBase._staticMaterial[this._blockBase.ledBack];
        this._ledSideRightCW[3].material = MeshBase._staticMaterial[this._blockBase.ledBack];

    }
    showRgbNipple() {
        this._rgbNipple[0].material = Mesh._staticMaterial[meshColor.red];
        this._rgbNippleLine[0] = Mesh._staticColor[meshColor.red];

        this._rgbNipple[1].material = Mesh._staticMaterial[meshColor.yellow];
        this._rgbNippleLine[1] = Mesh._staticColor[meshColor.yellow];

        this._rgbNipple[2].material = Mesh._staticMaterial[meshColor.yellow];
        this._rgbNippleLine[2] = Mesh._staticColor[meshColor.yellow];

        this._rgbNipple[3].material = Mesh._staticMaterial[meshColor.cyan];
        this._rgbNippleLine[3] = Mesh._staticColor[meshColor.cyan];

        this._rgbNipple[4].material = Mesh._staticMaterial[meshColor.blue];
        this._rgbNippleLine[4] = Mesh._staticColor[meshColor.blue];

        this._rgbNipple[5].material = Mesh._staticMaterial[meshColor.green];
        this._rgbNippleLine[5] = Mesh._staticColor[meshColor.green];

        this._rgbNipple[6].material = Mesh._staticMaterial[meshColor.magenta];
        this._rgbNippleLine[6] = Mesh._staticColor[meshColor.magenta];

        this._rgbNipple[7].material = Mesh._staticMaterial[meshColor.white];
        this._rgbNippleLine[7] = Mesh._staticColor[meshColor.white];

    }
    hideRgbNipple() {

        this._rgbNipple.forEach(item => item.material = Mesh._staticMaterial[meshColor.black])
        this._rgbNippleLine.forEach(item => item.material = Mesh._staticColor[meshColor.black])
        this._rgbNipple[7].material = Mesh._staticMaterial[meshColor.black];
        this._rgbNippleLine[7] = Mesh._staticColor[meshColor.black];


    }


}


class MeshPixel extends Mesh {
    static init({ mesh = [], line = [] }) {
        MeshPixel._staticMesh = mesh
        MeshPixel._staticLine = line
    }
    constructor(block) {
        super({ mesh: MeshPixel._staticMesh.map(item => item.clone()), line: MeshPixel._staticLine.map(item => item.clone()) }, block);
    }
}



class MeshStar extends Mesh {
    static init({ mesh = [], particle = null }) {
        MeshStar._staticMesh = mesh

        MeshStar._staticMaterial = [];
        MeshStar._staticMaterial[0] = new BABYLON.StandardMaterial("", scene);
        MeshStar._staticMaterial[0].diffuseColor = new BABYLON.Color3(1, 1, 1);
        MeshStar._staticMaterial[0].emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.3);

        MeshStar._staticMaterial[1] = new BABYLON.StandardMaterial("", scene);
        MeshStar._staticMaterial[1].diffuseColor = new BABYLON.Color3(1, 1, 0.5);
        MeshStar._staticMaterial[1].emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.2);

        MeshStar._staticParticle = particle;


    }
    constructor({ height = 0, three = false }) {

        if (three) {
            super({ mesh: [MeshStar._staticMesh[0].clone(), MeshStar._staticMesh[0].clone(), MeshStar._staticMesh[0].clone()] });
            this._mesh[1].position.z = 6.5;
            this._mesh[2].position.z = 2.5;
        } else {
            super({ mesh: [MeshStar._staticMesh[0].clone()] });

        }
        this._mesh.forEach(item => item.material = MeshStar._staticMaterial[0]);
        this._mesh.forEach(item => item.position.y = height * Mesh._staticPitch);

        this._mesh.forEach(item => item.position.x = 4.5);

        this._mesh[0].position.z = 4.5;


        MeshStar._staticParticle.emitter = this._mesh[0];
        MeshStar._staticParticle.start();

        let frameRate = 10;
        let animateYR = new BABYLON.Animation("", "rotation.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        let animateScale = new BABYLON.Animation("", "scaling", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        let animateScale2 = new BABYLON.Animation("", "scaling", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);


        animateYR.setKeys([{ frame: 0, value: 0 }, { frame: frameRate, value: Math.PI }, { frame: frameRate * 2, value: Math.PI * 2 }]);
        animateScale.setKeys([{ frame: 0, value: new BABYLON.Vector3(1, 1, 1) }, { frame: frameRate, value: new BABYLON.Vector3(1.5, 1.5, 1.5) }, { frame: frameRate * 2, value: new BABYLON.Vector3(1, 1, 1) }]);
        if (three) {
            animateScale2.setKeys([{ frame: 0, value: new BABYLON.Vector3(1, 1, 1) }, { frame: frameRate, value: new BABYLON.Vector3(0.6, 0.6, 0.6) }, { frame: frameRate * 2, value: new BABYLON.Vector3(0, 0, 0) }]);
        }


        scene.beginDirectAnimation(this._mesh[0], [animateYR], 0, 2 * frameRate, true);
        scene.beginDirectAnimation(this._mesh[0], [animateScale], 0, 2 * frameRate, true);
        if (three) {
            scene.beginDirectAnimation(this._mesh[1], [animateYR], 0, 2 * frameRate, true);
            scene.beginDirectAnimation(this._mesh[2], [animateYR], 0, 2 * frameRate, true);
            scene.beginDirectAnimation(this._mesh[1], [animateScale2], 0, 2 * frameRate, false);
            scene.beginDirectAnimation(this._mesh[2], [animateScale2], 0, 2 * frameRate, false, 1, function () { this._mesh[0].material = MeshStar._staticMaterial[1]; }.bind(this));
        }

    }

    dispose() {
        MeshStar._staticParticle.stop();
        MeshStar._staticParticle.emitter = null;
        super.dispose();

    }
}



class Mesh2x2 extends Mesh {
    static init({ mesh = [], line = [] }) {
        Mesh2x2._staticMesh = mesh
        Mesh2x2._staticLine = line
    }
    constructor(block) {
        super({ mesh: Mesh2x2._staticMesh.map(item => item.clone()), line: Mesh2x2._staticLine.map(item => item.clone()) }, block);
        this._mesh.forEach((item, index) => item.name = function ({ color = 0, section = 0, colorComplete = false }) { this.colorWheel({ index: index, color: color, section: section, colorComplete: colorComplete }); }.bind(this));
    }

    updateColor() {

        this._mesh[0].material = Mesh._staticMaterial[this._block.ledA];
        this._mesh[1].material = Mesh._staticMaterial[this._block.ledB];

        this._line[0].color = Mesh._staticColor[this._block.ledA];
        this._line[1].color = Mesh._staticColor[this._block.ledB];



    }



}

class Mesh2x4 extends Mesh {
    static init({ mesh = [], line = [] }) {
        Mesh2x4._staticMesh = mesh
        Mesh2x4._staticLine = line
    }
    constructor(block) {
        super({ mesh: Mesh2x4._staticMesh.map(item => item.clone()), line: Mesh2x4._staticLine.map(item => item.clone()) }, block);
        this._mesh.forEach((item, index) => item.name = function ({ color = 0, section = 0, colorComplete = false }) { this.colorWheel({ index: index, color: color, section: section, colorComplete: colorComplete }); }.bind(this));

    }

    updateColor() {

        this._mesh[0].material = Mesh._staticMaterial[this._block.ledA];
        this._mesh[1].material = Mesh._staticMaterial[this._block.ledB];
        this._mesh[2].material = Mesh._staticMaterial[this._block.ledC];
        this._mesh[3].material = Mesh._staticMaterial[this._block.ledD];

        this._line[0].color = Mesh._staticColor[this._block.ledA];
        this._line[1].color = Mesh._staticColor[this._block.ledB];
        this._line[2].color = Mesh._staticColor[this._block.ledC];
        this._line[3].color = Mesh._staticColor[this._block.ledD];

    }
}



class Mesh2x2Trans extends Mesh {
    static init({ mesh = [] }) {

        Mesh2x2Trans._staticMesh = mesh;

        let emissiveColor = 0.2;
        let alphaSetting = 0.9;

        Mesh2x2Trans._staticMaterial = [];
        Mesh2x2Trans._staticMaterial[0] = new BABYLON.StandardMaterial("", scene); // NA
        Mesh2x2Trans._staticMaterial[0].diffuseColor = new BABYLON.Color3(0.95, 1, 0.98);
        Mesh2x2Trans._staticMaterial[0].emissiveColor = new BABYLON.Color3(0.18, 0.2, 0.19);
        Mesh2x2Trans._staticMaterial[0].alpha = alphaSetting;

        Mesh2x2Trans._staticMaterial[1] = new BABYLON.StandardMaterial("", scene);      //RED
        Mesh2x2Trans._staticMaterial[1].diffuseColor = new BABYLON.Color3(1, 0, 0);
        Mesh2x2Trans._staticMaterial[1].emissiveColor = new BABYLON.Color3(emissiveColor, 0, 0);
        Mesh2x2Trans._staticMaterial[1].alpha = alphaSetting;

        Mesh2x2Trans._staticMaterial[2] = new BABYLON.StandardMaterial("", scene); //GREEN 
        Mesh2x2Trans._staticMaterial[2].diffuseColor = new BABYLON.Color3(0, 1, 0);
        Mesh2x2Trans._staticMaterial[2].emissiveColor = new BABYLON.Color3(0, emissiveColor, 0);
        Mesh2x2Trans._staticMaterial[2].alpha = alphaSetting;

        Mesh2x2Trans._staticMaterial[3] = new BABYLON.StandardMaterial("", scene); //YELLOW
        Mesh2x2Trans._staticMaterial[3].diffuseColor = new BABYLON.Color3(1, 1, 0);
        Mesh2x2Trans._staticMaterial[3].emissiveColor = new BABYLON.Color3(emissiveColor, emissiveColor, 0);
        Mesh2x2Trans._staticMaterial[3].alpha = alphaSetting;

        Mesh2x2Trans._staticMaterial[4] = new BABYLON.StandardMaterial("", scene); //BLUE
        Mesh2x2Trans._staticMaterial[4].diffuseColor = new BABYLON.Color3(0, 0, 1);
        Mesh2x2Trans._staticMaterial[4].emissiveColor = new BABYLON.Color3(0, 0, emissiveColor);
        Mesh2x2Trans._staticMaterial[4].alpha = alphaSetting;

        Mesh2x2Trans._staticMaterial[5] = new BABYLON.StandardMaterial("", scene); //MAGENTA
        Mesh2x2Trans._staticMaterial[5].diffuseColor = new BABYLON.Color3(1, 0, 1);
        Mesh2x2Trans._staticMaterial[5].emissiveColor = new BABYLON.Color3(emissiveColor, 0, emissiveColor);
        Mesh2x2Trans._staticMaterial[5].alpha = alphaSetting;

        Mesh2x2Trans._staticMaterial[6] = new BABYLON.StandardMaterial("", scene); //CYAN
        Mesh2x2Trans._staticMaterial[6].diffuseColor = new BABYLON.Color3(0, 1, 1);
        Mesh2x2Trans._staticMaterial[6].emissiveColor = new BABYLON.Color3(0, emissiveColor, emissiveColor);
        Mesh2x2Trans._staticMaterial[6].alpha = alphaSetting;

        Mesh2x2Trans._staticMaterial[7] = new BABYLON.StandardMaterial("", scene); //WHITE
        Mesh2x2Trans._staticMaterial[7].diffuseColor = new BABYLON.Color3(1, 1, 1);
        Mesh2x2Trans._staticMaterial[7].emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        Mesh2x2Trans._staticMaterial[7].alpha = alphaSetting;
    }
    constructor(block) {
        super({ mesh: Mesh2x2Trans._staticMesh.map(item => item.clone()) }, block);

        this._updateColor();
    }
    _updatePos() {
        super._updatePos();
        this._mesh[0].alphaIndex = this._block.y;

    }

    _updateColor() {

        this._mesh[0].material = Mesh2x2Trans._staticMaterial[this._block.color[0]];  //remove?
    }


}

class Mesh2x4Trans extends Mesh {
    static init({ mesh = [] }) {
        Mesh2x4Trans._staticMesh = mesh;
    }
    constructor(block) {
        super({ mesh: Mesh2x4Trans._staticMesh.map(item => item.clone()) }, block);
        this._updateColor();
    }

    _updatePos() {
        super._updatePos();
        this._mesh[0].alphaIndex = this._block.y;
    }


    _updateColor() {
        this._mesh[0].material = Mesh2x2Trans._staticMaterial[this._block.color[0]]; //remove?

    }



}

class MeshShadow extends Mesh {
    static init() {

        let emissiveColor = 0.8;
        let alphaSetting = 0.4;

        MeshShadow._staticMaterial = [];
        MeshShadow._staticMaterial[0] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[0].diffuseColor = new BABYLON.Color3(1, 1, 1);
        MeshShadow._staticMaterial[0].emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        MeshShadow._staticMaterial[1] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[1].diffuseColor = new BABYLON.Color3(1, 0, 0);
        MeshShadow._staticMaterial[1].emissiveColor = new BABYLON.Color3(emissiveColor, 0, 0);
        MeshShadow._staticMaterial[2] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[2].diffuseColor = new BABYLON.Color3(0, 1, 0);
        MeshShadow._staticMaterial[2].emissiveColor = new BABYLON.Color3(0, emissiveColor, 0);
        MeshShadow._staticMaterial[3] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[3].diffuseColor = new BABYLON.Color3(1, 1, 0);
        MeshShadow._staticMaterial[3].emissiveColor = new BABYLON.Color3(emissiveColor, emissiveColor, 0);
        MeshShadow._staticMaterial[4] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[4].diffuseColor = new BABYLON.Color3(0, 0, 1);
        MeshShadow._staticMaterial[4].emissiveColor = new BABYLON.Color3(0, 0, emissiveColor);
        MeshShadow._staticMaterial[5] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[5].diffuseColor = new BABYLON.Color3(1, 0, 1);
        MeshShadow._staticMaterial[5].emissiveColor = new BABYLON.Color3(emissiveColor, 0, emissiveColor);
        MeshShadow._staticMaterial[6] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[6].diffuseColor = new BABYLON.Color3(0, 1, 1);
        MeshShadow._staticMaterial[6].emissiveColor = new BABYLON.Color3(0, emissiveColor, emissiveColor);
        MeshShadow._staticMaterial[7] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[7].diffuseColor = new BABYLON.Color3(1, 1, 1);
        MeshShadow._staticMaterial[7].emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        MeshShadow._staticMaterial[8] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[8].diffuseColor = new BABYLON.Color3(1, 1, 1);
        MeshShadow._staticMaterial[8].emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        MeshShadow._staticMaterial[8].alpha = alphaSetting;
        MeshShadow._staticMaterial[9] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[9].diffuseColor = new BABYLON.Color3(1, 0, 0);
        MeshShadow._staticMaterial[9].emissiveColor = new BABYLON.Color3(emissiveColor, 0, 0);
        MeshShadow._staticMaterial[9].alpha = alphaSetting;
        MeshShadow._staticMaterial[10] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[10].diffuseColor = new BABYLON.Color3(0, 1, 0);
        MeshShadow._staticMaterial[10].emissiveColor = new BABYLON.Color3(0, emissiveColor, 0);
        MeshShadow._staticMaterial[10].alpha = alphaSetting;
        MeshShadow._staticMaterial[11] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[11].diffuseColor = new BABYLON.Color3(1, 1, 0);
        MeshShadow._staticMaterial[11].emissiveColor = new BABYLON.Color3(emissiveColor, emissiveColor, 0);
        MeshShadow._staticMaterial[11].alpha = alphaSetting;
        MeshShadow._staticMaterial[12] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[12].diffuseColor = new BABYLON.Color3(0, 0, 1);
        MeshShadow._staticMaterial[12].emissiveColor = new BABYLON.Color3(0, 0, emissiveColor);
        MeshShadow._staticMaterial[12].alpha = alphaSetting;
        MeshShadow._staticMaterial[13] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[13].diffuseColor = new BABYLON.Color3(1, 0, 1);
        MeshShadow._staticMaterial[13].emissiveColor = new BABYLON.Color3(emissiveColor, 0, emissiveColor);
        MeshShadow._staticMaterial[13].alpha = alphaSetting;
        MeshShadow._staticMaterial[14] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[14].diffuseColor = new BABYLON.Color3(0, 1, 1);
        MeshShadow._staticMaterial[14].emissiveColor = new BABYLON.Color3(0, emissiveColor, emissiveColor);
        MeshShadow._staticMaterial[14].alpha = alphaSetting;
        MeshShadow._staticMaterial[15] = new BABYLON.StandardMaterial("", scene);
        MeshShadow._staticMaterial[15].diffuseColor = new BABYLON.Color3(1, 1, 1);
        MeshShadow._staticMaterial[15].emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        MeshShadow._staticMaterial[15].alpha = alphaSetting;

    }
    _updateColor() {
        this._mesh[0].material = MeshShadow._staticMaterial[this._block.color[0]]; //remove?

    }


}

class MeshShadowRight extends MeshShadow {
    static init({ mesh = [] }) {
        MeshShadowRight._staticMesh = mesh;
    }
    constructor(block) {
        super({ mesh: MeshShadowRight._staticMesh.map(item => item.clone()) }, block);
        this._updateColor();
    }
    _updatePos() {
        this._mesh.forEach(function (item) {
            item.position.y = this._block.y * Mesh._staticPitch;
            item.position.x = this._block.x;
        }.bind(this));

        this._updateColor();
    }
}

class MeshShadowFront extends MeshShadow {
    static init({ mesh = [] }) {
        MeshShadowFront._staticMesh = mesh;
    }
    constructor(block) {
        super({ mesh: MeshShadowFront._staticMesh.map(item => item.clone()) }, block);
        this._updateColor();
    }
    _updatePos() {
        this._mesh.forEach(function (item) {
            item.position.y = this._block.y * Mesh._staticPitch;;
            item.position.z = this._block.z;
        }.bind(this));

        this._updateColor();
    }
}

class MeshShadowLeft extends MeshShadow {
    static init({ mesh = [] }) {
        MeshShadowLeft._staticMesh = mesh;
    }
    constructor(block) {
        super({ mesh: MeshShadowLeft._staticMesh.map(item => item.clone()) }, block);
        this._updateColor();
    }

    _updatePos() {
        this._mesh.forEach(function (item) {
            item.position.y = this._block.y * Mesh._staticPitch;;
            item.position.x = this._block.x;
        }.bind(this));

        this._updateColor();
    }

}

class MeshShadowBack extends MeshShadow {

    static init({ mesh = [] }) {
        MeshShadowBack._staticMesh = mesh;


    }
    constructor(block) {

        super({ mesh: MeshShadowBack._staticMesh.map(item => item.clone()) }, block);
        this._updateColor();

    }

    _updatePos() {
        this._mesh.forEach(function (item) {
            item.position.y = this._block.y * Mesh._staticPitch;
            item.position.z = this._block.z;
        }.bind(this));

        this._updateColor();
    }



}

class MeshShadowBottom extends MeshShadow {

    static init({ mesh = [] }) {
        MeshShadowBottom._staticMesh = mesh;

        MeshShadowBottom._staticMaterial = [];
        MeshShadowBottom._staticMaterial[0] = new BABYLON.StandardMaterial("", scene); // NA
        MeshShadowBottom._staticMaterial[0].diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9);
        MeshShadowBottom._staticMaterial[0].emissiveColor = new BABYLON.Color3(0, 0, 0);

        MeshShadowBottom._staticMaterial[8] = new BABYLON.StandardMaterial("", scene); // NA        
        MeshShadow._staticMaterial[8].diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9);
        MeshShadow._staticMaterial[8].emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        MeshShadow._staticMaterial[8].alpha = 0.7;

    }
    constructor(block) {
        super({ mesh: MeshShadowBottom._staticMesh.map(item => item.clone()) }, block);
        this._updateColor();
    }

    _updateColor() {

        if (this._block.color[0] == 0) {
            this._mesh[0].material = MeshShadowBottom._staticMaterial[0];
        } else {
            super._updateColor()
        }
    }

    _updatePos() {
        this._mesh.forEach(function (item) {
            item.position.x = this._block.x;
            item.position.z = this._block.z;
        }.bind(this));

        this._updateColor();
    }
}


class MeshNumber extends Mesh {

    static init({ mesh = [] }) {
        MeshNumber._staticMesh = mesh;

        MeshNumber._staticOperator = {
            x: 100,
            less: 101,
            greater: 102,
            equal: 103,
            plus: 104,
            minus: 105
        }
    }

    constructor(block, number) {

        let mesh = [];

        if (number - Math.floor(number) > 0) {
            if (number - Math.floor(number) <= 0.25) {
                mesh.push(MeshNumber._staticMesh[11].clone());
            } else if (number - Math.floor(number) <= 0.5) {
                mesh.push(MeshNumber._staticMesh[12].clone());
            } else {
                mesh.push(MeshNumber._staticMesh[13].clone());
            }
        }
        if (number > 10 && number < 100) {
            mesh.push(MeshNumber._staticMesh[10].clone());
        }

        if (number > 99) {
            mesh.push(MeshNumber._staticMesh[number - 86].clone());
        } else {
            mesh.push(MeshNumber._staticMesh[Math.floor(number % 10)].clone());
        }
        super({ mesh: mesh }, block);
    }
}


class MeshNumberPillar extends Mesh {

    static init({ mesh = [] }) {
        MeshNumberPillar._staticMesh = mesh;

        MeshNumberPillar._staticMaterial = [];
        MeshNumberPillar._staticMaterial[0] = new BABYLON.StandardMaterial("", scene); // NA
        MeshNumberPillar._staticMaterial[0].diffuseColor = new BABYLON.Color3(0.95, 1, 0.98);
        MeshNumberPillar._staticMaterial[0].emissiveColor = new BABYLON.Color3(0.18, 0.2, 0.19);
        MeshNumberPillar._staticMaterial[0].alpha = 0.5;

    }

    constructor(block) {
        super({ mesh: MeshNumberPillar._staticMesh.map(item => item.clone()) }, block);

    }

    _updateColor() {
        if (this._block.color[0] == 0) {
            this._mesh[0].material = MeshNumberPillar._staticMaterial[this._block.color[0]];
        } else {
            super._updateColor();
        }

    }
}


class MeshPad extends Mesh {

    static init({ mesh = [] }) {
        MeshPad._staticMesh = mesh;

        let emissiveColor = 0.3
        let alphaSetting = 0.5

        MeshPad._staticMaterial = [];
        MeshPad._staticMaterial[0] = new BABYLON.StandardMaterial("", scene); // NA
        MeshPad._staticMaterial[0].diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9);
        MeshPad._staticMaterial[0].emissiveColor = new BABYLON.Color3(0, 0, 0);
        MeshPad._staticMaterial[0].alpha = alphaSetting;

        MeshPad._staticMaterial[1] = new BABYLON.StandardMaterial("", scene); // NA
        MeshPad._staticMaterial[1].diffuseColor = new BABYLON.Color3(0.9, 0, 0);
        MeshPad._staticMaterial[1].emissiveColor = new BABYLON.Color3(emissiveColor, 0, 0);
        MeshPad._staticMaterial[1].alpha = alphaSetting;


        MeshPad._staticMaterial[2] = new BABYLON.StandardMaterial("", scene); // NA
        MeshPad._staticMaterial[2].diffuseColor = new BABYLON.Color3(0, 0.9, 0);
        MeshPad._staticMaterial[2].emissiveColor = new BABYLON.Color3(0, emissiveColor, 0);
        MeshPad._staticMaterial[2].alpha = alphaSetting;

        MeshPad._staticMaterial[3] = new BABYLON.StandardMaterial("", scene);
        MeshPad._staticMaterial[3].diffuseColor = new BABYLON.Color3(0.9, 0.9, 0);
        MeshPad._staticMaterial[3].emissiveColor = new BABYLON.Color3(emissiveColor, emissiveColor, 0);
        MeshPad._staticMaterial[3].alpha = alphaSetting;

        MeshPad._staticMaterial[4] = new BABYLON.StandardMaterial("", scene); // NA
        MeshPad._staticMaterial[4].diffuseColor = new BABYLON.Color3(0, 0, 0.9);
        MeshPad._staticMaterial[4].emissiveColor = new BABYLON.Color3(0, 0, emissiveColor);
        MeshPad._staticMaterial[4].alpha = alphaSetting;


        MeshPad._staticMaterial[5] = new BABYLON.StandardMaterial("", scene);
        MeshPad._staticMaterial[5].diffuseColor = new BABYLON.Color3(0.9, 0, 0.9);
        MeshPad._staticMaterial[5].emissiveColor = new BABYLON.Color3(emissiveColor, 0, emissiveColor);
        MeshPad._staticMaterial[5].alpha = alphaSetting;

        MeshPad._staticMaterial[6] = new BABYLON.StandardMaterial("", scene);
        MeshPad._staticMaterial[6].diffuseColor = new BABYLON.Color3(0, 0.9, 0.9);
        MeshPad._staticMaterial[6].emissiveColor = new BABYLON.Color3(0, emissiveColor, emissiveColor);
        MeshPad._staticMaterial[6].alpha = alphaSetting;

        MeshPad._staticMaterial[7] = new BABYLON.StandardMaterial("", scene);
        MeshPad._staticMaterial[7].diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9);
        MeshPad._staticMaterial[7].emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        MeshPad._staticMaterial[7].alpha = alphaSetting;
    }

    constructor(block) {
        super({ mesh: MeshPad._staticMesh.map(item => item.clone()) }, block);
    }

    _updateColor() {
        this._mesh[0].material = MeshPad._staticMaterial[this._block.color[0]];
    }



}
