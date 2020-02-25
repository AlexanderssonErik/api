class BlockTris extends Game {
    constructor(master = null) {
        let level = [];

        super({ level: level, userCreatedLevel: false, displayLevel: true, scoreIsLocal: true, master: master });

        this._enumBlockTrisState = {
            check: 0,
            checkReverse: 1,
            clear: 2,
            drop: 3,
            fail: 4,
        }
        this._failTimer = null;



        this._blockTrisState = 0;
        this._reverseCheckNext = 0;

        this._blockTrisCurrentLevel = 1;
        this._scoreBlockTris = 0
        this._levelScoreProgression = [0, 2, 8, 14, 21, 28, 99];

        this._columnHeight = 2;
        this._shadowCount = 1;
        this._dropSpeed = 3000;
        this._dropSpeedStop = 300;
        this._color = 0;

        this._timeoutDelay = null;

        this._patternShadow = [];
        this._patternMesh = [];
        this._patternHeight = [];

        this._patternStartY = 8;

        this._possibleShadowBlocks = [new Block2x4({ x: 2, y: 0, z: 5, r: 1, color: [0, 0, 0, 0] }), new Block2x4({ x: 5, y: 0, z: 2, r: 3, color: [0, 0, 0, 0] }),
        new Block2x4({ x: 1, y: 0, z: 5, r: 1, color: [0, 0, 0, 0] }), new Block2x4({ x: 4, y: 0, z: 2, r: 3, color: [0, 0, 0, 0] }),
        new Block2x4({ x: 2, y: 0, z: 4, r: 1, color: [0, 0, 0, 0] }), new Block2x4({ x: 5, y: 0, z: 1, r: 3, color: [0, 0, 0, 0] }),
        new Block2x4({ x: 1, y: 0, z: 4, r: 1, color: [0, 0, 0, 0] }), new Block2x4({ x: 4, y: 0, z: 1, r: 3, color: [0, 0, 0, 0] }),
        new Block2x4({ x: 5, y: 0, z: 5, r: 2, color: [0, 0, 0, 0] }), new Block2x4({ x: 2, y: 0, z: 2, r: 0, color: [0, 0, 0, 0] }),
        new Block2x4({ x: 5, y: 0, z: 4, r: 2, color: [0, 0, 0, 0] }), new Block2x4({ x: 2, y: 0, z: 1, r: 0, color: [0, 0, 0, 0] }),
        new Block2x4({ x: 4, y: 0, z: 5, r: 2, color: [0, 0, 0, 0] }), new Block2x4({ x: 1, y: 0, z: 2, r: 0, color: [0, 0, 0, 0] }),
        new Block2x4({ x: 4, y: 0, z: 4, r: 2, color: [0, 0, 0, 0] }), new Block2x4({ x: 1, y: 0, z: 1, r: 0, color: [0, 0, 0, 0] }),
        new Block2x2({ x: 3, y: 0, z: 4, r: 3, color: [0, 0] }), new Block2x2({ x: 5, y: 0, z: 4, r: 3, color: [0, 0] }), new Block2x2({ x: 3, y: 0, z: 3, r: 2, color: [0, 0] }), new Block2x2({ x: 5, y: 0, z: 3, r: 2, color: [0, 0] }),
        new Block2x2({ x: 2, y: 0, z: 4, r: 3, color: [0, 0] }), new Block2x2({ x: 4, y: 0, z: 4, r: 3, color: [0, 0] }), new Block2x2({ x: 2, y: 0, z: 3, r: 2, color: [0, 0] }), new Block2x2({ x: 4, y: 0, z: 3, r: 2, color: [0, 0] }),
        new Block2x2({ x: 3, y: 0, z: 3, r: 3, color: [0, 0] }), new Block2x2({ x: 5, y: 0, z: 3, r: 3, color: [0, 0] }), new Block2x2({ x: 3, y: 0, z: 2, r: 2, color: [0, 0] }), new Block2x2({ x: 5, y: 0, z: 2, r: 2, color: [0, 0] }),
        new Block2x2({ x: 2, y: 0, z: 3, r: 3, color: [0, 0] }), new Block2x2({ x: 4, y: 0, z: 3, r: 3, color: [0, 0] }), new Block2x2({ x: 2, y: 0, z: 2, r: 2, color: [0, 0] }), new Block2x2({ x: 4, y: 0, z: 2, r: 2, color: [0, 0] })];


        this._tutorialBlocks = [new Block2x4({ x: 2, y: 1, z: 5, r: 1, color: [0, 0, 0, 0] }), new Block2x4({ x: 1, y: 0, z: 5, r: 1, color: [0, 0, 0, 0] })];

        this._possibleShadow = [];

        this._markers = [];

        for (let x = 1; x < 6; x++) {
            for (let z = 1; z < 6; z++) {
                this._markers.push(new MeshShadowTopDrop(new BlockShadowBottom({ x: x, z: z }), 0, 12));
            }
        }

        this._possibleShadowBlocks.forEach(function (item) {
            let shadow = BlockShadow.convert({ block: [item] });

            this._possibleShadow.push(shadow.bottom);
        }.bind(this));


        camera.fovView();

        this._dropQuickCount = 0;
        this._dropButton = new GuiButtonImg("./icon/games/blockTris/drop.svg", function () { this._quickDrop() }.bind(this)); //this.reset.bind(this));
        this._dropButton.setVisible(0, 0, guiOptions.center, guiOptions.bottom);

        this._timeoutDelay = null;
        this._setLevel({ level: 1, difficulty: 0 });

    }

    _setLevel({ level = 0, difficulty = 0 }) {

        super._setLevel({ level: level, difficulty: difficulty });

        this._dropCount = 0;

        this._patternMesh.forEach(item => item.forEach(itemDispose => itemDispose.dispose()));

        this._patternShadow = [];
        this._patternMesh = [];

        switch (level) {
            case 1:
                this._patternShadow[0] = this._possibleShadow[0];
                this._patternShadow[1] = this._possibleShadow[2];

                this._patternHeight[0] = this._patternStartY;
                this._patternHeight[1] = this._patternStartY + 1;
                this._columnHeight = 2;
                this._shadowCount = 1;
                break;
            case 2:
                this._columnHeight = 3;
                this._shadowCount = 1;
                break;
            case 3:
                this._columnHeight = 4;
                this._shadowCount = 1;
                break;
            case 4:
                this._columnHeight = 5;
                this._shadowCount = 1;
                break;
            default:
                this._columnHeight = 5;
                this._shadowCount = 2;
                break;
        }
        this.update();
    }

    close() {

        this._dropButton.setNotVisible();
        camera.fovViewOff();
        camera.reset();
        clearTimeout(this._timeoutDelay);
        clearTimeout(this._failTimer);
        super.close();
    }

    _failTimerFunction() {


        if (world.block.length == 0) {
            this._failTimer = null;

            this._setLevel({ level: 1, difficulty: 0 });
            this._blockTrisCurrentLevel = 1;
            this._blockTrisState = 0;
            this._scoreBlockTris = 0;
            this.score = 0;

        } else {
            this._failTimer = setTimeout(this._failTimerFunction.bind(this), 500);

        }

    }



    reset() {
        super.reset();

        this._patternMesh.forEach(item => item.forEach(itemDispose => itemDispose.dispose()));
        this._markers.forEach(item => item.dispose());

        this._patternShadow = [];
        this._patternMesh = [];

        this._blockTrisCurrentLevel = 1;
        this._scoreBlockTris = 0;
        clearTimeout(this._failTimer);
        this.score = 0;
    }

    _timeoutDelayFunction() {

        clearTimeout(this._timeoutDelay);
        this._timeoutDelay = null;

        this.update();

    }

    _quickDrop() {
        this._dropQuickCount++;
    }

    update() {

        super.update();


        if (this._blockTrisCurrentLevel == 1 && this._scoreBlockTris == 0) {
            let set = Block.calcSet({ left: world.block, right: this._tutorialBlocks, careColor: false, careRotation: false });
            this.show({ block: set.diffRight, careColor: false });
        } else {
            this.show({});
        }

        while (this._patternShadow.length < this._columnHeight) {
            let plane = this._patternShadow.length;
            this._patternShadow[plane] = [];
            let randShadowCount = 0;
            let tries = 0;
            while (randShadowCount < this._shadowCount) {

                let randShadow = this._possibleShadow[Math.floor(Math.random() * this._possibleShadow.length)];
                let set = BlockShadow.calcSet({ left: randShadow, right: this._patternShadow[plane], careColor: false, careGap: false });
                if (set.intersectionLeft.length == 0) {
                    let setTwoConnected
                    if (plane != 0) {
                        setTwoConnected = BlockShadow.calcSet({ left: randShadow, right: this._patternShadow[plane - 1], careColor: false, careGap: false });
                    }
                    if (plane == 0 || setTwoConnected.intersectionLeft.length > 1) {
                        this._patternShadow[plane] = this._patternShadow[plane].concat(randShadow);
                        randShadowCount++;
                    }
                }
                tries++;
                if (tries == 10) {
                    this._patternShadow[plane] = [];
                    randShadowCount = 0;
                    tries = 0;
                }
            }
            if (plane == 0) {
                this._patternHeight[0] = this._patternStartY;
            } else {
                if (this._patternHeight[plane - 1] < this._patternStartY) {
                    this._patternHeight[plane] = this._patternStartY;
                } else {
                    this._patternHeight[plane] = this._patternHeight[plane - 1] + 1;
                }
            }
        }

        if (this._timeoutDelay == null) {
            switch (this._blockTrisState) {

                case this._enumBlockTrisState.check:
                    if (this._patternHeight[0] == 0) {
                        if (Game._master != null) {
                            this.masterFail();
                            return;
                        }
                        this.saveScore();
                        sound.fail();
                        this._patternMesh.forEach(item => item.forEach(itemDipose => itemDipose.dispose()));
                        this._patternMesh = [];
                        this._blockTrisState = this._enumBlockTrisState.fail;
                        this._failTimer = setTimeout(this._failTimerFunction.bind(this), 500);

                        break;
                    } else {
                        let planeBlocks = [];
                        world.block.forEach(function (item) {
                            if (item.y == this._patternHeight[0] - 1) {
                                planeBlocks.push(item);
                            }

                        }.bind(this));
                        let set = BlockShadow.calcSet({ left: BlockShadow.convert({ block: planeBlocks }).bottom, right: this._patternShadow[0], careColor: false, careGap: false });

                        if (set.diffLeft.length == 0 && set.diffRight.length == 0) {
                            planeBlocks.forEach(item => item.color = meshColor.green);
                            sound.correct(1);
                            this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 500);
                            this._blockTrisState = this._enumBlockTrisState.checkReverse; //!!!!!!
                            this._reverseCheckNext = this._patternHeight[0] - 2;

                            this._patternMesh[0].forEach(item => item.dispose());
                            this._patternShadow.shift();
                            this._patternHeight.shift();
                            this._patternMesh.shift();
                            this._scoreBlockTris++;
                            this.score = this._scoreBlockTris;
                            if (this._reverseCheckNext < 0) {
                                this._blockTrisState = this._enumBlockTrisState.check;
                            }
                            break;
                        }
                    }

                    this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 500);
                    this._blockTrisState = this._enumBlockTrisState.clear;
                    break;

                case this._enumBlockTrisState.checkReverse:
                    let planeBlocksNext = [];
                    world.block.forEach(function (item) {
                        if (item.y == this._reverseCheckNext) {
                            planeBlocksNext.push(item);
                        }

                    }.bind(this));
                    let setNext = BlockShadow.calcSet({ left: BlockShadow.convert({ block: planeBlocksNext }).bottom, right: this._patternShadow[0], careColor: false, careGap: false });
                    if (setNext.diffLeft.length == 0 && setNext.diffRight.length == 0) {

                        planeBlocksNext.forEach(item => item.color = meshColor.green);
                        sound.correct(1);
                        this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 500);
                        this._reverseCheckNext--;

                        this._patternMesh[0].forEach(item => item.dispose());
                        this._patternShadow.shift();
                        this._patternHeight.shift();
                        this._patternMesh.shift();
                        this._scoreBlockTris++;
                        this.score = this._scoreBlockTris;

                        if (this._reverseCheckNext < 0) {
                            this._blockTrisState = this._enumBlockTrisState.check;
                        } else {
                            this._blockTrisState = this._enumBlockTrisState.checkReverse;
                        }
                        break;
                    } else {
                        this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 500);
                        this._blockTrisState = this._enumBlockTrisState.check;
                    }
                    break;

                case this._enumBlockTrisState.clear:
                    Block.setColor({ block: world.block, color: meshColor.black })
                    this._blockTrisState = this._enumBlockTrisState.drop;
                    this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 500);

                    if (this._scoreBlockTris >= this._levelScoreProgression[this._blockTrisCurrentLevel]) {
                        if (Game._master != null) {
                            this._patternMesh.forEach(item => item.forEach(itemDipose => itemDipose.dispose()));
                            this._patternMesh = [];
                            this.win({ filterWin: false })
                            this._blockTrisState = this._enumBlockTrisState.fail;

                            return;
                        }
                        sound.win();
                        this._blockTrisCurrentLevel++;
                        this._setLevel({ level: this._blockTrisCurrentLevel, difficulty: 0 });
                    }
                    break;

                case this._enumBlockTrisState.drop:

                    this._patternHeight.forEach(function (y, i) {
                        if (y == this._patternStartY) {
                            let layer = this._patternMesh.length;
                            this._patternMesh[layer] = [];
                            this._patternShadow[i].forEach(function (item) {
                                this._patternMesh[layer].push(new MeshShadowTopDrop(item, this._patternStartY * Mesh._staticPitch, this._color + 6));
                            }.bind(this));


                            for (let x = 1; x < 6; x++) {
                                for (let z = 1; z < 6; z++) {
                                    if (!(this._patternShadow[i].some(item => item.x == x && item.z == z))) {
                                       // this._patternMesh[layer].push(new MeshShadowTopDrop(new BlockShadowBottom({ x: x, z: z }), this._patternStartY * Mesh._staticPitch, this._color + 6));
                                       this._patternMesh[layer].push(new MeshShadowTopDrop(new BlockShadowBottom({ x: x, z: z }), this._patternStartY * Mesh._staticPitch, this._color ));
                                    }
                                }
                            }

                            /*if (!(this._patternShadow[i].some(item => item.x == 1 && item.z == 1))) {
                                this._patternMesh[layer].push(new MeshShadowTopDrop(new BlockShadowBottom({ x: 1, z: 1 }), this._patternStartY * Mesh._staticPitch, this._color + 6));
                            }
                            if (!(this._patternShadow[i].some(item => item.x == 1 && item.z == 5))) {
                                this._patternMesh[layer].push(new MeshShadowTopDrop(new BlockShadowBottom({ x: 1, z: 5 }), this._patternStartY * Mesh._staticPitch, this._color + 6));
                            }
                            if (!(this._patternShadow[i].some(item => item.x == 5 && item.z == 1))) {
                                this._patternMesh[layer].push(new MeshShadowTopDrop(new BlockShadowBottom({ x: 5, z: 1 }), this._patternStartY * Mesh._staticPitch, this._color + 6));
                            }
                            if (!(this._patternShadow[i].some(item => item.x == 5 && item.z == 5))) {
                                this._patternMesh[layer].push(new MeshShadowTopDrop(new BlockShadowBottom({ x: 5, z: 5 }), this._patternStartY * Mesh._staticPitch, this._color + 6));
                            }*/

                            this._color++;
                            this._color %= 6;
                        }
                        this._patternHeight[i] = y - 1;

                    }.bind(this));

                    if (this._dropQuickCount > 0) {
                        this._dropQuickCount--;
                       // this._patternMesh.forEach(item => item.forEach(itemDrop => itemDrop.drop(600)));
                       this._patternMesh.forEach(item => item.forEach(itemDrop => itemDrop.prepDrop(200)));
                       this._patternMesh.forEach(item => item.forEach(itemDrop => itemDrop.drop()));
                        this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 300);
                    } else {
                       // this._patternMesh.forEach(item => item.forEach(itemDrop => itemDrop.drop(this._dropSpeed - this._dropSpeedStop)));
                       this._patternMesh.forEach(item => item.forEach(itemDrop => itemDrop.prepDrop(this._dropSpeed - this._dropSpeedStop)));
                       this._patternMesh.forEach(item => item.forEach(itemDrop => itemDrop.drop()));
                      
                       this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), this._dropSpeed);
                    }

                    this._blockTrisState = this._enumBlockTrisState.check;
                    break;

                case this._enumBlockTrisState.fail:



                    break;
            }


        }

    }
}