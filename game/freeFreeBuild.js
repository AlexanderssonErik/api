class FreeFreeBuild extends Game {
  constructor() {
    let level = [];

    level.push({ difficulty: [], image: null });

    level.push({ difficulty: [], image: "./icon/level/lvl1Diy.svg" });
    level[level.length - 1].difficulty.push({ stage: [], image: "./icon/level/lvl1ShapeLoad.svg" });
    level[level.length - 1].difficulty.push({ stage: [], image: "./icon/level/lvl1DiyCreate.svg" });

    level.push({ difficulty: [], image: "./icon/level/lvl2Diy.svg" });
    level[level.length - 1].difficulty.push({ stage: [], image: "./icon/level/lvl2ShapeLoad.svg" });
    level[level.length - 1].difficulty.push({ stage: [], image: "./icon/level/lvl2DiyCreate.svg" });

    level.push({ difficulty: [], image: "./icon/level/lvl3Diy.svg" });
    level[level.length - 1].difficulty.push({ stage: [], image: "./icon/level/lvl3ShapeLoad.svg" });
    level[level.length - 1].difficulty.push({ stage: [], image: "./icon/level/lvl3DiyCreate.svg" });

    level.push({ difficulty: [], image: "./icon/level/share.svg" });

    super({ level: level });

    this._freeFreeBuildMeshBlock2x2 = [];
    this._freeFreeBuildMeshBlock2x4 = [];

    this._freeDebounce = 0;

    this._paintbrush = meshColor.black;

    this._rgbBlock = [];

    this._rgbBlock.push(new Block2x2({ x: 1, y: 0, z: 1, r: 2, color: [1, 1] }));
    this._rgbBlock.push(new Block2x2({ x: 0, y: 0, z: 1, r: 1, color: [4, 4] }));
    this._rgbBlock.push(new Block2x2({ x: 0, y: 0, z: 0, r: 0, color: [2, 2] }));
    this._rgbBlock.push(new Block2x2({ x: 1, y: 0, z: 0, r: 3, color: [3, 3] }));
    this._rgbBlock.push(new Block2x2({ x: 1, y: 0, z: 9, r: 2, color: [3, 3] }));
    this._rgbBlock.push(new Block2x2({ x: 0, y: 0, z: 9, r: 1, color: [5, 5] }));
    this._rgbBlock.push(new Block2x2({ x: 0, y: 0, z: 8, r: 0, color: [7, 7] }));
    this._rgbBlock.push(new Block2x2({ x: 1, y: 0, z: 8, r: 3, color: [6, 6] }));

    this._lockBlock = [new Block2x2({ x: 0, y: 0, z: 4, r: 0, color: [1, 1] })];

    this._paintBrush = meshColor.black;
    this._paintedBlocks = [];

    this._pixels = [];

    this._shownWorldBlocks = [];

    world.hideBase();
    world.hideBlock();
    camera.free();
    colorWheel.colorSection();

    this._baseBlock = new BlockPixel({ x: 0, y: 0, z: 0, color: [0] });
    this._lockedChanged = false;
    this._locked = false;

    this._lastBlocks = [];
    this._lastSculptBlocks = [];

    this._baseMesh = new MeshBaseTrans(this._baseBlock);

    this._setLevel({ level: 0, difficulty: 0 });

    this._leftRightButton = new GuiButtonSlider("./icon/games/freeFreeBuild/leftRight.svg", null, this._leftRight.bind(this), null, true); //this.reset.bind(this));
    this._leftRightButton.setVisible(0, 0, guiOptions.center, guiOptions.bottom);

    this._upDownButton = new GuiButtonSlider("./icon/games/freeFreeBuild/upDown.svg", null, this._upDown.bind(this), null, false); //this.reset.bind(this));
    this._upDownButton.setVisible(0, 0, guiOptions.right, guiOptions.center);

    this._inOutButton = new GuiButtonSlider("./icon/games/freeFreeBuild/inOut.svg", null, this._inOut.bind(this), null, false); //this.reset.bind(this));
    this._inOutButton.setVisible(0, 0, guiOptions.left, guiOptions.center);


  }

  _leftRight(dir) {

    if (camera.lookingFront) {
      this._baseMesh.moveZ(-dir);
    } else if (camera.lookingBack) {
      this._baseMesh.moveZ(dir);
    } else if (camera.lookingLeft) {
      this._baseMesh.moveX(-dir);
    } else {
      this._baseMesh.moveX(dir);
    }


  }

  _upDown(dir) {
    this._baseMesh.moveY(-dir);
  }

  _inOut(dir) {
    if (camera.lookingFront) {
      this._baseMesh.moveX(-dir);
    } else if (camera.lookingBack) {
      this._baseMesh.moveX(dir);
    } else if (camera.lookingLeft) {
      this._baseMesh.moveZ(dir);
    } else {
      this._baseMesh.moveZ(-dir);
    }


  }

  _setLevel({ level = 0, difficulty = 0 }) {

    if (level == 4) {

      database.saveFreeShape({ shape: this._createSaveObject() });
      return;

    } else if (level > 0) {
      if (difficulty == 0) {
        database.loadProgram({ name: this.constructor.name, level: level, callBackFunction: function (param) { this._callBackLoad(param) }.bind(this) });
        return;
      } else if (difficulty == 1) {
        database.saveProgram({ name: this.constructor.name, level: level, program: this._createSaveObject() });
        return;
      }
    }
    super._setLevel({ level: level, difficulty: difficulty });
    this._paintedBlocks = world.block;
    this.update();

  }

  _callBackLoad({ level = 0, program = null }) {

    if (program != null) {
      camera.freeLoadSaved();
      this._pixels = eval(program.pixels);
      this._lockedChanged = true;
    } else {
      this._pixels = [];
      this._lockedChanged = true;
    }
    this.update();

  }

  _createSaveObject() {
    let shape = { pixels: "" };
    shape.pixels = Block.string(this._pixels);
    return shape;

  }
  update() {

    super.update();
    let set;
    let setPlayfield = Block.calcSet({ left: world.block, right: this._rgbBlock, careColor: false });

    if (setPlayfield.intersectionLeft.length > 0) {
      this._paintBrush = setPlayfield.intersectionRight[0].ledA;
    } else {
      this._paintBrush = meshColor.black;
    }

    Block.setColor({ block: setPlayfield.intersectionLeft, color: this._paintBrush });
    set = Block.calcSet({ left: setPlayfield.diffLeft, right: this._paintedBlocks.concat(this._lockBlock), careColor: false, careRotation: false });

    Block.setColor({ block: set.diffLeft, color: this._paintBrush });
    this._paintedBlocks = world.block;


    let shownWorldBlocks = Block.copy(this._shownWorldBlocks);

    shownWorldBlocks.forEach(function (item) {
      item.x -= this._baseBlock.x;
      item.y -= this._baseBlock.y;
      item.z -= this._baseBlock.z;
    }.bind(this));


    let sculptBlocks = Block.calcSet({ left: setPlayfield.diffLeft, right: this._lockBlock, careColor: false, careRotation: false });

    Block.copyColor({ to: sculptBlocks.diffLeft, from: shownWorldBlocks });

    sculptBlocks = Block.copy(sculptBlocks.diffLeft);

    sculptBlocks.forEach(function (item) {
      item.x += this._baseBlock.x;
      item.y += this._baseBlock.y;
      item.z += this._baseBlock.z;
    }.bind(this));


    this._showWorldBlock(sculptBlocks);


    let setlocked = Block.calcSet({ left: world.block, right: this._lockBlock, careColor: false, careRotation: false });
    if (setlocked.intersectionLeft.length > 0) {
      setlocked.intersectionLeft[0].color = meshColor.red;

      if (!this._locked) {
        this._lockedChanged = true;
      }
      this._locked = true;
    } else {
      if (this._locked) {
        this._lockedChanged = true;
      }
      this._locked = false;

    }

    let updateSet = Block.calcSet({ left: world.block, right: this._lastBlocks, careColor: false });

    if ((updateSet.diffLeft.length != 0 || updateSet.diffRight.length != 0) && this._freeDebounce < 2) {
      this._lastBlocks = world.block;

      this._freeDebounce++;
    } else {
      this._freeDebounce = 0;

      updateSet = Block.calcSet({ left: sculptBlocks, right: this._lastSculptBlocks, careColor: true });
      if (updateSet.diffLeft.length != 0 || updateSet.diffRight.length != 0 || this._lockedChanged) {

        this._lockedChanged = false;
        this._lastSculptBlocks = Block.copy(sculptBlocks);

        let worldPixel = BlockPixel.convertBlock(sculptBlocks);
        set = Block.calcSet({ left: worldPixel, right: this._pixels, careColor: false });


        if (!this._locked) {
          this._pixels = set.diffLeft.concat(set.intersectionLeft, set.diffRight);

        }

        for (let i = 0; i < this._pixels.length; i++) {
          if (this._pixels[i].color[0] == meshColor.black) {

            this._pixels.splice(i, 1);
            i--;
          }
        }
        set = Block.calcSet({ left: worldPixel, right: this._pixels, careColor: false });
        this.show({ block: set.diffRight, careColor: true });
      }
    }


  }

  _showWorldBlock(block) {
    let count2x2 = 0;
    let count2x4 = 0;

    block.forEach(function (item, index) {
      if (item instanceof Block2x2) {
        if (this._freeFreeBuildMeshBlock2x2.length > count2x2) {
          this._freeFreeBuildMeshBlock2x2[count2x2].block = item;
        } else {
          this._freeFreeBuildMeshBlock2x2.push(new Mesh2x2(item));
        }
        count2x2++;
      } else if (item instanceof Block2x4) {
        if (this._freeFreeBuildMeshBlock2x4.length > count2x4) {
          this._freeFreeBuildMeshBlock2x4[count2x4].block = item;
        } else {
          this._freeFreeBuildMeshBlock2x4.push(new Mesh2x4(item));

        }
        count2x4++;
      }

    }.bind(this));

    while (this._freeFreeBuildMeshBlock2x2.length > count2x2) {
      this._freeFreeBuildMeshBlock2x2[this._freeFreeBuildMeshBlock2x2.length - 1].dispose();
      this._freeFreeBuildMeshBlock2x2.pop();
    }

    while (this._freeFreeBuildMeshBlock2x4.length > count2x4) {
      this._freeFreeBuildMeshBlock2x4[this._freeFreeBuildMeshBlock2x4.length - 1].dispose();
      this._freeFreeBuildMeshBlock2x4.pop();
    }

    this._shownWorldBlocks = block;


    /*this._freeFreeBuildMeshBlock2x2.forEach(item => item.updateColor());
    this._freeFreeBuildMeshBlock2x4.forEach(item => item.updateColor());*/
  }

  close() {
    world.showBase();
    world.showBlock();

    this._freeFreeBuildMeshBlock2x2.forEach(item => item.dispose());
    this._freeFreeBuildMeshBlock2x4.forEach(item => item.dispose());
    this._baseMesh.dispose();
    camera.noFree();
    camera.reset();
    camera.zoomToStartPos();
    super.close();

    this._leftRightButton.setNotVisible();
    this._upDownButton.setNotVisible();
    this._inOutButton.setNotVisible();

  }

  reset() {
    super.reset();
    colorWheel.disenable();
    this._paintBrush = meshColor.black;

    world.meshBase.hideRgbNipple();
  }
}