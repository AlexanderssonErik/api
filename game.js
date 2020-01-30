
class Game {


    static init() {
        this._active = null;
        this._levelMenu = null;
        this._master = null;
    }


    static update() {



            if (this._active != null) {
                if (Game._master != null && (this._active.state == this._active.enumState.win || this._active.state == this._active.enumState.fail)){
                    return;
                }

                this._active.update();
            }
        
    }

    static close() {
        if (this._active != null) {
            this._active.close();
            this._active = null;
        }

    }

    static clearForCenterButton() {
        if (this._active != null) {
            this._active.clearForCenterButton();
        }
    }


    constructor({ level = null, levelMenu = true, userCreatedLevel = false, displayLevel = false, displayStage = false, scoreIsTime = false, scoreIsLocal = false, scoreTimeTick = 5000, master = null }) {


        if (Game._master != null && Game._master != master) {
            Game._master.close();
        }
        Game._master = master;

        if (Game._active != null) {
            Game._active.close();
        }

        //level display
        this._displayLevel = displayLevel;
        this._displayStage = displayStage;
        if (this._displayLevel) {
            this._levelDisplay = new GuiTextLevel("Lv: 1.1-1");
            this._levelDisplay.setVisible(0, 0, guiOptions.center, guiOptions.top);

        }


        this._levelIndex = 0;
        this._difficultyIndex = 0;
        this._stageIndex = 0;
        this._level = level;
        this._levelMenu = [];
        this.activeStage = null;
        this.previousActiveStage = null;


        this._meshBlock2x2 = [];
        this._meshBlock2x4 = [];
        this._meshPixel = [];

        this._meshShadowRight = [];
        this._meshShadowFront = [];
        this._meshShadowLeft = [];
        this._meshShadowBack = [];
        this._meshShadowBottom = [];

        //Progression
        this._wrong = 0;
        this._correct = 0;
        this._filterFailSoundCount = 0;
        this._filterWinSoundCount = 0;
        this._star = null;
        this._currentNoOfWins = 0;
        this._noOfWinsTillNextDifficulty = 3;
        this._filterWinCount = 0;
        this._timeOutNextWhenBlocksRemoved = null;

        //score
        if (Game._master == null) {
            this._scoreIsTime = scoreIsTime;
            this._scoreIsLocal = scoreIsLocal;
            this._scoreTimer = null;
            this._scoreTimeTick = scoreTimeTick;
        } else {
            this._scoreIsTime = false;
            this._scoreIsLocal = false;
        }

        if (this._scoreIsTime || this._scoreIsLocal) {
            this._scoreHighDisplay = [];
            this._scoreHighDisplay[0] = new GuiTextLevel("No1: 0");
            this._scoreHighDisplay[1] = new GuiTextLevel("No2: 0");
            this._scoreHighDisplay[2] = new GuiTextLevel("No3: 0");
            this._scoreHighDisplay[0].setVisible(0.5, 0, guiOptions.center, guiOptions.top);
            this._scoreHighDisplay[1].setVisible(0.5, 1, guiOptions.center, guiOptions.top);
            this._scoreHighDisplay[2].setVisible(0.5, 2, guiOptions.center, guiOptions.top);

            this._score = 100;
            if (this._scoreIsTime) {
                this._scoreDisplay = new GuiTextLevel("Score: 100");
                this._scoreDisplay.setVisible(0, 2, guiOptions.center, guiOptions.top);
            } else if (this._scoreIsLocal) {
                this._score = 0;
                this._scoreDisplay = new GuiTextLevel("Score: 0");
                this._scoreDisplay.setVisible(0, 2, guiOptions.center, guiOptions.top);
                database.loadScore({ name: this.constructor.name, level: 0, difficulty: 0, stage: 0, callBackFunction: function (param) { this._setHighScore(param) }.bind(this) });

            }




        }


        //buttons
        this._okButton = null;
        this._difficultyUpButton = null;
        this._difficultyDownButton = null;

        this.enumState = {
            start: 0,
            win: 1,
            fail: 2,
            busyCreatingShape: 3,
            max: 3,
        }
        this.state = 0;

        Game._active = this;
        if (Game._master == null && levelMenu) {
            this._buildLevelMenu(this._level, userCreatedLevel);
        }
        if (Game._master == null) {
            database.selectContent({ name: this.constructor.name });
        }

    }


    _buildUserLevel({ level = 0, difficulty = 0 }) {

        this.reset();
        Block.setColor({ block: world.block, color: meshColor.black })
        colorWheel.colorComplete();
        world.showBase();
        world.showBlock();
        this.state = this.enumState.busyCreatingShape;
        this._okButton = new GuiButtonImg("./icon/games/ok.svg", function () { this._saveUserLevel({ level: level, difficulty: difficulty }) }.bind(this)); //this.reset.bind(this));
        this._okButton.setVisible(0, 0, guiOptions.center, guiOptions.bottom);

    }


    _saveUserLevel({ level = 0, difficulty = 0 }) {


        database.saveUserLevel({ name: this.constructor.name, difficulty: difficulty, block: world.blockString });
        if (world.block.length > 0) {
            setTimeout(function () { this._loadUserLevel({ level: level, difficulty: difficulty }); }.bind(this), 500);
            this._okButton.setNotVisible();
            this._okButton = null;
        }

    }

    _loadUserLevel({ level = 0, difficulty = 0 }) {

        database.loadUserLevel({ name: this.constructor.name, difficulty: difficulty, callBackFunction: function (param) { this._callBackLoadUserLevel(param) }.bind(this) });
    }

    _callBackLoadUserLevel({ difficulty = 0, block = null }) {

        this._level[0] = { difficulty: [] };
        this._level[0].difficulty[difficulty] = { stage: [] };
        if (block == null || block.length == 0) {
            this._level[0].difficulty[difficulty].stage[0] = [new Block2x4({ x: 5, y: 0, z: 3, r: 3, color: [0, 0, 0, 0] }), new Block2x2({ x: 5, y: 1, z: 2, r: 3, color: [0, 0] }), new Block2x2({ x: 5, y: 1, z: 6, r: 3, color: [0, 0] }), new Block2x2({ x: 5, y: 2, z: 3, r: 2, color: [0, 0] }), new Block2x2({ x: 5, y: 2, z: 6, r: 3, color: [0, 0] }), new Block2x2({ x: 4, y: 3, z: 3, r: 1, color: [0, 0] }), new Block2x2({ x: 5, y: 3, z: 6, r: 3, color: [0, 0] }), new Block2x4({ x: 4, y: 4, z: 6, r: 1, color: [0, 0, 0, 0] }),];

        } else {
            this._level[0].difficulty[difficulty].stage[0] = eval(block);

        }

        this._setLevel({ level: 0, difficulty: difficulty });
    }

    _buildLevelMenu(level, userCreatedLevel) {

        level.forEach(function (l, iL) {

            if (iL == 0) {
                // this._levelMenu.push(new GuiButtonImg("./icon/level/lvlStart.svg", function () { this._setLevelByMenu({ level: -1, difficulty: 0 }) }.bind(this)));
                this._levelMenu.push(new GuiButtonImg("./icon/level/lvlStart.svg"));

                this._levelMenu[0].setVisible(0, 0, guiOptions.right, guiOptions.top);
                if (userCreatedLevel) {
                    let userLevelButton = this._levelMenu[0].addChild(new GuiButtonImg("./icon/level/lvl1Diy.svg", function () { this._loadUserLevel({ level: 0, difficulty: 0 }) }.bind(this)), guiOptions.childLeft);
                    userLevelButton.addChild(new GuiButtonImg("./icon/level/lvl1DiyCreate.svg", function () { this._buildUserLevel({ level: 0, difficulty: 0 }) }.bind(this)), guiOptions.childBottom);

                    userLevelButton = this._levelMenu[0].addChild(new GuiButtonImg("./icon/level/lvl2Diy.svg", function () { this._loadUserLevel({ level: 0, difficulty: 1 }) }.bind(this)), guiOptions.childLeft);
                    userLevelButton.addChild(new GuiButtonImg("./icon/level/lvl2DiyCreate.svg", function () { this._buildUserLevel({ level: 0, difficulty: 1 }) }.bind(this)), guiOptions.childBottom);

                    userLevelButton = this._levelMenu[0].addChild(new GuiButtonImg("./icon/level/lvl3Diy.svg", function () { this._loadUserLevel({ level: 0, difficulty: 2 }) }.bind(this)), guiOptions.childLeft);
                    userLevelButton.addChild(new GuiButtonImg("./icon/level/lvl3DiyCreate.svg", function () { this._buildUserLevel({ level: 0, difficulty: 2 }) }.bind(this)), guiOptions.childBottom);
                }

            } else {
                if (l.image != null) {
                    if (l.difficulty[0] == null || l.difficulty[0].image == null) {
                        this._levelMenu.push(this._levelMenu[0].addChild(new GuiButtonImg(l.image, function () { this._setLevelByMenu({ level: iL, difficulty: 0 }) }.bind(this)), guiOptions.childBottom));
                    } else {
                        this._levelMenu.push(this._levelMenu[0].addChild(new GuiButtonImg(l.image), guiOptions.childBottom));
                    }
                } else {
                    this._levelMenu.push(this._levelMenu[0].addChild(new GuiButtonImg("./icon/level/lvl" + iL + ".svg", function () { this._setLevelByMenu({ level: iL, difficulty: 0 }) }.bind(this)), guiOptions.childBottom));
                }
            }

            let levelButton = this._levelMenu[this._levelMenu.length - 1];
            l.difficulty.forEach(function (d, iD) {
                if (d.image != null) {
                    this._levelMenu.push(levelButton.addChild(new GuiButtonImg(d.image, function () { this._setLevelByMenu({ level: iL, difficulty: iD }) }.bind(this)), guiOptions.childLeft));
                }
            }.bind(this));

        }.bind(this));


    }

    _setLevelByMenu({ level = 1, difficulty = 0 }) {
        this._currentNoOfWins = 0;
        this._setLevel({ level: level, difficulty: difficulty });
    }

    saveScore() {
        database.saveScore({ name: this.constructor.name, level: 0, difficulty: 0, stage: 0, score: this._score });

        //neede delay?

        setTimeout(function () { database.loadScore({ name: this.constructor.name, level: 0, difficulty: 0, stage: 0, callBackFunction: function (param) { this._setHighScore(param) }.bind(this) }) }.bind(this), 1000);
        // database.loadScore({ name: this.constructor.name, level: 0, difficulty: 0, stage: 0, callBackFunction: function (param) { this._setHighScore(param) }.bind(this) });

    }

    get score() {
        return this._score;
    }

    set score(score) {
        if(Game._master == null){
        this._score = score;
        this._scoreDisplay.text = "Score: " + this._score;
        }
    }


    _scoreTimerFunction() {
        if (this._score > 0) {
            this._score -= 5;
            this._scoreTimer = setTimeout(this._scoreTimerFunction.bind(this), this._scoreTimeTick);
            this._scoreDisplay.text = "Score: " + this._score;
        } else {
            this._scoreTimer = null;
        }
    }

    _setHighScore({ no1 = null, no2 = null, no3 = null }) {
        if (no1 != null) {
            this._scoreHighDisplay[0].text = "No1: " + no1;
        }
        if (no2 != null) {
            this._scoreHighDisplay[1].text = "No2: " + no2;
        }
        if (no3 != null) {
            this._scoreHighDisplay[2].text = "No3: " + no3;
        }
    }

    _setLevel({ level = 1, difficulty = 0, update = true }) {

        database.setLevel({ name: this.constructor.name, level: level, difficulty: difficulty });

        if (this._level[level] == null || this._level[level].difficulty[difficulty] == null) {
            console.log("no level!!!!")
            if (this._displayLevel) {
                this._levelDisplay.text = "Lv: " + level;
            }

            return;
        }

        this.reset();

        this._levelIndex = level;
        this._difficultyIndex = difficulty;


        let randStage = 0;

        if (this._level[level].difficulty[difficulty].stage == null) {

        } else if (this._level[level].difficulty[difficulty].stage.length > 2) {

            randStage = Math.floor(Math.random() * this._level[level].difficulty[difficulty].stage.length);
            let nextStage = this._level[level].difficulty[difficulty].stage[randStage];

            while (nextStage == this.activeStage || nextStage == this.previousActiveStage) {
                randStage = Math.floor(Math.random() * this._level[level].difficulty[difficulty].stage.length);
                nextStage = this._level[level].difficulty[difficulty].stage[randStage];

            }
            this.previousActiveStage = this.activeStage;
            this.activeStage = nextStage;

        } else {
            this.activeStage = this._level[level].difficulty[difficulty].stage[0];
        }

        this._stageIndex = randStage;

        if (this._displayLevel) {
            if (this._displayStage) {
                this._levelDisplay.text = "Lv: " + (this._levelIndex) + "." + (this._difficultyIndex + 1) + "-" + (randStage + 1);
            } else {
                this._levelDisplay.text = "Lv: " + (this._levelIndex) + "." + (this._difficultyIndex + 1);
            }
        }

        if (this._scoreIsTime) {
            if (level == 0) {
                this._scoreDisplay.text = "";
                this._scoreHighDisplay[0].text = "";
                this._scoreHighDisplay[1].text = "";
                this._scoreHighDisplay[2].text = "";
            } else {
                database.loadScore({ name: this.constructor.name, level: this._levelIndex, difficulty: this._difficultyIndex, stage: this._stageIndex, callBackFunction: function (param) { this._setHighScore(param) }.bind(this) });

                this._score = 100;
                this._scoreDisplay.text = "Score: 100";
                this._scoreTimer = setTimeout(this._scoreTimerFunction.bind(this), this._scoreTimeTick);

                this._scoreHighDisplay[0].text = "No1: 0";
                this._scoreHighDisplay[1].text = "No2: 0";
                this._scoreHighDisplay[2].text = "No3: 0";
            }
        }

        if (update) {
            this.update();
        }

    }



    get difficultyIndex() {

        return this._difficultyIndex;
    }

    reset() {

        world.base.ledFront = meshColor.black;
        world.base.ledLeft = meshColor.magenta;
        world.base.ledRight = meshColor.cyan;
        world.base.ledBack = meshColor.black;

        this.state = this.enumState.start;

        colorWheel.disenable();

        if (this._star != null) {
            this._star.dispose();
            this._star = null;
        }
        if (this._okButton != null) {
            this._okButton.setNotVisible();
            this._okButton = null;
        }

        this.hideDifficultyButton();

        this._wrong = 0;
        this._correct = 0;
        this._filterFailSoundCount = 0;
        this._filterWinSoundCount = 0;
        this._filterWinCount = 0;

        if (this._timeOutNextWhenBlocksRemoved != null) {
            clearTimeout(this._timeOutNextWhenBlocksRemoved);
            this._timeOutNextWhenBlocksRemoved = null;
        }

        if (this._scoreTimer != null) {
            clearTimeout(this._scoreTimer);
            this._scoreTimer = null;

        }


        while (this._meshBlock2x2.length > 0) {
            this._meshBlock2x2[this._meshBlock2x2.length - 1].dispose();
            this._meshBlock2x2.pop();
        }
        while (this._meshBlock2x4.length > 0) {
            this._meshBlock2x4[this._meshBlock2x4.length - 1].dispose();
            this._meshBlock2x4.pop();
        }

        while (this._meshPixel.length > 0) {
            this._meshPixel[this._meshPixel.length - 1].dispose();
            this._meshPixel.pop();
        }

        while (this._meshShadowRight.length > 0) {
            this._meshShadowRight[this._meshShadowRight.length - 1].dispose();
            this._meshShadowRight.pop();
        }
        while (this._meshShadowFront.length > 0) {
            this._meshShadowFront[this._meshShadowFront.length - 1].dispose();
            this._meshShadowFront.pop();
        }
        while (this._meshShadowLeft.length > 0) {
            this._meshShadowLeft[this._meshShadowLeft.length - 1].dispose();
            this._meshShadowLeft.pop();
        }
        while (this._meshShadowBack.length > 0) {
            this._meshShadowBack[this._meshShadowBack.length - 1].dispose();
            this._meshShadowBack.pop();
        }
        while (this._meshShadowBottom.length > 0) {
            this._meshShadowBottom[this._meshShadowBottom.length - 1].dispose();
            this._meshShadowBottom.pop();
        }



    }


    update() {
        // this._update();
    }

    showDifficultyButton() {
        if (Game._master == null) {

            this._difficultyUpButton = new GuiButtonImg("./icon/level/difficultyUp.svg", function () { this._difficultyUp() }.bind(this)); //this.reset.bind(this));
            this._difficultyUpButton.setVisible(2, 0, guiOptions.center, guiOptions.bottom);

            this._difficultyDownButton = new GuiButtonImg("./icon/level/difficultyDown.svg", function () { this._difficultyDown() }.bind(this)); //this.reset.bind(this));
            this._difficultyDownButton.setVisible(-2, 0, guiOptions.center, guiOptions.bottom);
        }
    }


    _difficultyUp() {

        this._currentNoOfWins = 0;
        if (this._level[this._levelIndex].difficulty[this._difficultyIndex + 1] != null) {
            this._difficultyIndex++;
        } else if (this._level[this._levelIndex + 1] != null) {
            this._difficultyIndex = 0;
            this._levelIndex++;
        }
        this._setLevel({ level: this._levelIndex, difficulty: this._difficultyIndex });

    }

    _difficultyDown() {
        this._currentNoOfWins = 0;

        if (this._level[this._levelIndex].difficulty[this._difficultyIndex - 1] != null) {
            this._difficultyIndex--;
        } else if (this._level[this._levelIndex - 1] != null && this._levelIndex != 1) {
            this._levelIndex--;
            this._difficultyIndex = this._level[this._levelIndex].difficulty.length - 1;
            if (this._difficultyIndex < 0) {
                this._difficultyIndex = 0;
            }

        }
        this._setLevel({ level: this._levelIndex, difficulty: this._difficultyIndex });


    }

    hideDifficultyButton() {
        if (this._difficultyUpButton != null) {
            this._difficultyUpButton.setNotVisible();
            this._difficultyUpButton = null;
        }

        if (this._difficultyDownButton != null) {
            this._difficultyDownButton.setNotVisible();
            this._difficultyDownButton = null;
        }

    }

    _timeOutNextWhenBlocksRemovedfunction() {
        if (world.block.length == 0) {
            this._timeOutNextWhenBlocksRemoved = null;
            this._setLevel({ level: this._levelIndex, difficulty: this._difficultyIndex });
        } else {
            this._timeOutNextWhenBlocksRemoved = setTimeout(this._timeOutNextWhenBlocksRemovedfunction.bind(this), 200);
        }
    }

    masterFail(){
        this.state = this.enumState.fail;
        if (Game._master != null) {
            Game._master.fail();
            return;
        }
    }

    win({ nextWhenBlocksRemoved = true, filterWin = true, nextButton = true }) {
        if (this.state == this.enumState.win) {
            return;
        }
        this._filterWinCount++;
        if (filterWin && this._filterWinCount < 3) {
            return;
        }


        this.state = this.enumState.win;


        if (Game._master != null) {
            Game._master.win();
            return;
        }

        sound.win();

        database.win({ name: this.constructor.name, level: this._levelIndex, difficulty: this._difficultyIndex });

        if (this._scoreIsTime) {
            clearTimeout(this._scoreTimer);
            this._scoreTimer = null;
            database.saveScore({ name: this.constructor.name, level: this._levelIndex, difficulty: this._difficultyIndex, stage: this._stageIndex, score: this._score });

        }

        Block.setColor(world.base, meshColor.green);


        this._currentNoOfWins++;
        if (this._levelIndex != 0 && (this._currentNoOfWins >= this._noOfWinsTillNextDifficulty || this._level[this._levelIndex].difficulty[this._difficultyIndex].stage.length < 2)) {
            this._currentNoOfWins = 0;

            if (this._level[this._levelIndex].difficulty[this._difficultyIndex + 1] != null) {
                this._difficultyIndex++;
            } else if (this._level[this._levelIndex + 1] != null) {
                this._difficultyIndex = 0;
                this._levelIndex++;
            }

            this._star = new MeshStar({ height: world.maxHeight + 2.5, three: true });

        } else {
            this._star = new MeshStar({ height: world.maxHeight + 2.5, three: false });
        }

        if (nextButton) {
            this._okButton = new GuiButtonImg("./icon/games/ok.svg", function () { this._setLevel({ level: this._levelIndex, difficulty: this._difficultyIndex }) }.bind(this)); //this.reset.bind(this));
            this._okButton.setVisible(0, 0, guiOptions.center, guiOptions.bottom);
        }

        if (nextWhenBlocksRemoved) {
            this._timeOutNextWhenBlocksRemoved = setTimeout(this._timeOutNextWhenBlocksRemovedfunction.bind(this), 200);
        }




    }

    soundProgression({ correct = 0, wrong = 0, maxCorret = null, filterSound = true }) {

        if (maxCorret = null) {
            maxCorret = this.activeStage.length;
        }

        if (wrong > this._wrong) {
            this._filterFailSoundCount++;

            if (!filterSound || this._filterFailSoundCount > 1) {
                sound.wrong(correct / maxCorret);
                this._filterFailSoundCount = 0;
            } else {
                return;
            }

        } else if (correct > this._correct) {
            this._filterWinSoundCount++;
            if (!filterSound || this._filterWinSoundCount > 1) {
                sound.correct(correct / maxCorret);
                this._filterWinSoundCount = 0;
            } else {
                return;
            }
        }

        this._wrong = wrong;
        this._correct = correct;

    }





    showShadow({ block = [], careColor = true, careGap = true, add = false }) {





        if (!careColor || !careGap) {
            let tmpBlock = Block.copy(block);
            tmpBlock.forEach(function (item, index) {
                item.color = block[index].calcColor({ careColor: careColor, careGap: careGap });

            })
            block = tmpBlock;
        }



        let countRight = 0;
        let countFront = 0;
        let countLeft = 0;
        let countBack = 0;
        let countBottom = 0;

        if (add) {
            countRight = this._meshShadowRight.length;
            countFront = this._meshShadowFront.length;
            countLeft = this._meshShadowLeft.length;
            countBack = this._meshShadowBack.length;
            countBottom = this._meshShadowBottom.length;

        }

        block.forEach(function (item, index) {

            if (item instanceof BlockShadowRight) {
                if (this._meshShadowRight.length > countRight) {
                    this._meshShadowRight[countRight].block = item;
                } else {
                    this._meshShadowRight.push(new MeshShadowRight(item));
                }

                countRight++;
            } else if (item instanceof BlockShadowFront) {
                if (this._meshShadowFront.length > countFront) {
                    this._meshShadowFront[countFront].block = item;
                } else {
                    this._meshShadowFront.push(new MeshShadowFront(item));
                }
                countFront++;
            } else if (item instanceof BlockShadowLeft) {
                if (this._meshShadowLeft.length > countLeft) {
                    this._meshShadowLeft[countLeft].block = item;
                } else {
                    this._meshShadowLeft.push(new MeshShadowLeft(item));
                }
                countLeft++;
            } else if (item instanceof BlockShadowBack) {
                if (this._meshShadowBack.length > countBack) {
                    this._meshShadowBack[countBack].block = item;
                } else {
                    this._meshShadowBack.push(new MeshShadowBack(item));
                }
                countBack++;
            } else if (item instanceof BlockShadowBottom) {
                if (this._meshShadowBottom.length > countBottom) {
                    this._meshShadowBottom[countBottom].block = item;
                } else {
                    this._meshShadowBottom.push(new MeshShadowBottom(item));
                }
                countBottom++;
            }



        }.bind(this));




        while (this._meshShadowRight.length > countRight) {
            this._meshShadowRight[this._meshShadowRight.length - 1].dispose();
            this._meshShadowRight.pop();
        }
        while (this._meshShadowFront.length > countFront) {
            this._meshShadowFront[this._meshShadowFront.length - 1].dispose();
            this._meshShadowFront.pop();
        }
        while (this._meshShadowLeft.length > countLeft) {
            this._meshShadowLeft[this._meshShadowLeft.length - 1].dispose();
            this._meshShadowLeft.pop();
        }
        while (this._meshShadowBack.length > countBack) {
            this._meshShadowBack[this._meshShadowBack.length - 1].dispose();
            this._meshShadowBack.pop();
        }
        while (this._meshShadowBottom.length > countBottom) {
            this._meshShadowBottom[this._meshShadowBottom.length - 1].dispose();
            this._meshShadowBottom.pop();
        }



    }


    show({ block = [], careColor = true }) {

        if (!careColor) {
            block = Block.copy(block);
            Block.setColor({ block: block, color: meshColor.black });
        }


        let count2x2 = 0;
        let count2x4 = 0;
        let countPixel = 0;


        block.forEach(function (item, index) {

            if (item instanceof Block2x2) {
                if (this._meshBlock2x2.length > count2x2) {
                    this._meshBlock2x2[count2x2].block = item;
                } else {
                    this._meshBlock2x2.push(new Mesh2x2Trans(item));
                }

                count2x2++;
            } else if (item instanceof Block2x4) {
                if (this._meshBlock2x4.length > count2x4) {
                    this._meshBlock2x4[count2x4].block = item;
                } else {
                    this._meshBlock2x4.push(new Mesh2x4Trans(item));
                }
                count2x4++;
            } else if (item instanceof BlockPixel) {
                if (this._meshPixel.length > countPixel) {
                    this._meshPixel[countPixel].block = item;
                } else {
                    // this._meshPixel.push(new MeshPixelTrans(item));
                    this._meshPixel.push(new MeshPixel(item));
                }
                countPixel++;
            }



        }.bind(this));



        while (this._meshBlock2x2.length > count2x2) {
            this._meshBlock2x2[this._meshBlock2x2.length - 1].dispose();
            this._meshBlock2x2.pop();
        }

        while (this._meshBlock2x4.length > count2x4) {
            this._meshBlock2x4[this._meshBlock2x4.length - 1].dispose();
            this._meshBlock2x4.pop();
        }

        while (this._meshPixel.length > countPixel) {
            this._meshPixel[this._meshPixel.length - 1].dispose();
            this._meshPixel.pop();
        }


    }

    close() {


        this.reset();
        this._levelMenu.forEach(item => item.setNotVisible());
        this._levelMenu = [];

        if (this._displayLevel) {
            this._levelDisplay.setNotVisible();
        }



        if (this._scoreIsTime || this._scoreIsLocal) {
            this._scoreDisplay.setNotVisible();
            this._scoreHighDisplay.forEach(item => item.setNotVisible());
        }

    }

    clearForCenterButton() {

    }


}