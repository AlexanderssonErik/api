let world = {
    _blockBase: null,
    _block: [],
    _incomingBlocks: [],
    _meshBase: null,
    _meshBlock2x2: [],
    _meshBlock2x4: [],
    _batteryIndicator: null,
    _voltBars: 0,
    _hideBlock: false,
    _forceUpdateBlocks: false,
    _compass: { enabled: false, x: 0, y: 0, z: 0, zeroX: 0, zeroZ: 0, zeroAngle: [0, 0, 0, 0], sensAngle: [0, 0, 0, 0], realAngle: [cameraAlpha.front, cameraAlpha.right, cameraAlpha.back, cameraAlpha.left] },

    init: function (baseMesh) {
        this._blockBase = new BlockBase();
        this._meshBase = new MeshBase(baseMesh, this._blockBase);
        this._batteryIndicator = new GuiBattery();
        this._batteryIndicator.setVisible(0, 0, guiOptions.right, guiOptions.center);

    },
    get meshBase() {
        return this._meshBase;
    },

    hideBase: function () {
        this._meshBase.hide();
    },
    showBase: function () {
        this._meshBase.show();
    },

    hideBlock: function () {
        this._hideBlock = true;
        
        this._meshBlock2x2.forEach( item => item.dispose());
        this._meshBlock2x2 = [];
        this._meshBlock2x4.forEach( item => item.dispose());
        this._meshBlock2x4 = [];
     

    },
    showBlock: function () {    
        this._hideBlock = false;
        this._forceUpdateBlocks = true;
        

    },

    get blockHidden(){
        return this._hideBlock;
    },



    setBattery: function (volt) {

        volt = Math.floor((volt - 3.2) * 3);
        if (volt < 0) {
            volt = 0;
        } else if (volt > 9) {
            volt = 9;
        }

        if (this._voltBars != volt) {
            this._voltBars = volt;
            this._batteryIndicator.numberOfBars = volt;
        }

    },

    get compass() {
        return this._compass;
    },


    compassOn: function () {
        new CompassCalibration();

    },
    compassOff: function () {
        world.compass.enabled = false;

    },

    addBlock: function (x, y, z, rotation, twobytwo, plasticColor) {


        if (twobytwo) {
            this._incomingBlocks.push(new Block2x2({ x: x, y: y, z: z, r: rotation }));
        } else {
            this._incomingBlocks.push(new Block2x4({ x: x, y: y, z: z, r: rotation }));
        }


    },

    get block() {
        return this._block;
    },

    endAddBlock: function () {

        let count2x2 = 0;
        let count2x4 = 0;

        let update = false;

        if(this._forceUpdateBlocks){
            update = true;
            this._forceUpdateBlocks = false;
        }else if (this._incomingBlocks.length != this._block.length) {
            update = true;
        } else {
            for (let i = 0; i < this._incomingBlocks.length; i++) {
                if (!this._incomingBlocks[i].equal({ block: this._block[i], careColor: false })) {   
                    update = true;
                    break;
                }
            }

        }

        if (update) {


            Block.copyColor({ to: this._incomingBlocks, from: this._block });

            if (!this._hideBlock) {
                this._incomingBlocks.forEach(function (item, index) {
                    if (item instanceof Block2x2) {
                        if (this._meshBlock2x2.length > count2x2) {
                            this._meshBlock2x2[count2x2].block = item;
                        } else {
                            this._meshBlock2x2.push(new Mesh2x2(item));
                        }
                        count2x2++;
                    } else if (item instanceof Block2x4) {
                        if (this._meshBlock2x4.length > count2x4) {
                            this._meshBlock2x4[count2x4].block = item;
                        } else {
                            this._meshBlock2x4.push(new Mesh2x4(item));
                        }
                        count2x4++;
                    }

                }.bind(this));
            }


            while (this._meshBlock2x2.length > count2x2) {
                this._meshBlock2x2[this._meshBlock2x2.length - 1].dispose();
                this._meshBlock2x2.pop();
            }

            while (this._meshBlock2x4.length > count2x4) {
                this._meshBlock2x4[this._meshBlock2x4.length - 1].dispose();
                this._meshBlock2x4.pop();
            }
            this._block = this._incomingBlocks;
        }

        this._incomingBlocks = [];
        this.updateAfterBlePackage();


    },

    updateAfterBlePackage: function () {
        this._meshBlock2x2.forEach(item => item.updateColor());
        this._meshBlock2x4.forEach(item => item.updateColor());
        this._meshBase.updateColor();
        Block.startBlinkTimer();

        Game.update();

        if (this.compass.enabled) {
            camera.setAlpha(this._angleXZ());
        }


    },

    get maxHeight() {
        let max = 0;

        this._block.forEach(function (item) {
            if (item.y > max) {
                max = item.y;
            }
        });

        return max;

    },


    get base() {
        return this._blockBase;
    },


    get blockString() {

        let str = "[";
        world.block.forEach(function (item) {
            if (item instanceof Block2x2) {
                str += "new Block2x2({ x : ";
            } else {
                str += "new Block2x4({ x : ";
            }
            str += item.x;
            str += ", y : " + item.y;
            str += ", z : " + item.z;
            str += ", r : " + item.r;
            str += ", color : [" + item.color + "]";
            str += "}),";
        });
        str += "]";

        return str;


    },

    printBlock: function () {
        let str = " level[level.length-1].difficulty[level[level.length-1].difficulty.length-1].stage.push(";
        str += world.blockString;
        str += ");";
        console.log(str);
    },


    _angleXZ: function () {

        let x = this.compass.x - this.compass.zeroX;
        let z = this.compass.z - this.compass.zeroZ;
        let angle = 0;

        if (x >= 0 && z >= 0) {
            angle = Math.atan(z / x);
        } else if (x < 0 && z >= 0) {
            angle = Math.PI / 2 - Math.atan(x / z);
        } else if (x < 0 && z < 0) {
            angle = -Math.PI / 2 - Math.atan(x / z);
        } else if (x >= 0 && z < 0) {
            angle = Math.atan(z / x);
        }


        for (let i = 0; i < 4; i++) {

            if (Math.abs(this.compass.zeroAngle[i] - this.compass.zeroAngle[(i + 1) % 4]) < Math.PI &&
                (angle <= this.compass.zeroAngle[i] && angle >= this.compass.zeroAngle[(i + 1) % 4])) {
                return this.compass.realAngle[i] - (angle - this.compass.zeroAngle[i]) / this.compass.sensAngle[i];
            }

        }

        for (let i = 0; i < 4; i++) {
            if (Math.abs(this.compass.zeroAngle[i] - this.compass.zeroAngle[(i + 1) % 4]) > Math.PI) {
                if (angle <= this.compass.zeroAngle[i]) {
                    return this.compass.realAngle[i] - (angle - this.compass.zeroAngle[i]) / this.compass.sensAngle[i];
                } else {
                    return this.compass.realAngle[i] + (-angle + this.compass.zeroAngle[i] + 2 * Math.PI) / this.compass.sensAngle[i];
                }
            }
        }
        return 0;

    },


};