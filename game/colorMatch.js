class ColorMatch extends Game {
  constructor(master = null) {
    let level = [];

    super({ level: level, userCreatedLevel: false, displayLevel: true, scoreIsLocal: true, master: master });

    this._colorMatchLevel = [
      [new Block2x2({ x: 7, y: 0, z: 5, r: 1, color: [0, 0] }), new Block2x2({ x: 7, y: 1, z: 5, r: 1, color: [0, 0] }),],
      [new Block2x2({ x: 7, y: 0, z: 5, r: 1, color: [0, 0] }), new Block2x2({ x: 7, y: 1, z: 5, r: 1, color: [0, 0] }), new Block2x2({ x: 8, y: 2, z: 4, r: 3, color: [0, 0] }),],
      [new Block2x2({ x: 7, y: 0, z: 8, r: 1, color: [0, 0] }), new Block2x2({ x: 7, y: 0, z: 6, r: 1, color: [0, 0] }), new Block2x2({ x: 8, y: 0, z: 3, r: 3, color: [0, 0] }),],
      [new Block2x2({ x: 7, y: 0, z: 8, r: 1, color: [0, 0] }), new Block2x2({ x: 7, y: 0, z: 6, r: 1, color: [0, 0] }), new Block2x2({ x: 8, y: 0, z: 3, r: 3, color: [0, 0] }), new Block2x2({ x: 7, y: 0, z: 1, r: 0, color: [0, 0] }),],
      [new Block2x4({ x: 9, y: 0, z: 3, r: 3, color: [0, 0, 0, 0] }), new Block2x2({ x: 6, y: 0, z: 5, r: 0, color: [0, 0] }), new Block2x2({ x: 7, y: 0, z: 4, r: 2, color: [0, 0] }),],
      [new Block2x4({ x: 9, y: 0, z: 3, r: 3, color: [0, 0, 0, 0] }), new Block2x2({ x: 6, y: 0, z: 5, r: 0, color: [0, 0] }), new Block2x2({ x: 7, y: 0, z: 4, r: 2, color: [0, 0] }), new Block2x4({ x: 7, y: 1, z: 3, r: 3, color: [0, 0, 0, 0] }),],
      [new Block2x4({ x: 9, y: 0, z: 3, r: 3, color: [0, 0, 0, 0] }), new Block2x2({ x: 6, y: 0, z: 5, r: 0, color: [0, 0] }), new Block2x2({ x: 7, y: 0, z: 4, r: 2, color: [0, 0] }), new Block2x2({ x: 8, y: 1, z: 5, r: 0, color: [0, 0] }), new Block2x4({ x: 7, y: 1, z: 3, r: 3, color: [0, 0, 0, 0] }),],
      [new Block2x4({ x: 9, y: 0, z: 3, r: 3, color: [0, 0, 0, 0] }), new Block2x2({ x: 6, y: 0, z: 5, r: 0, color: [0, 0] }), new Block2x2({ x: 7, y: 0, z: 4, r: 2, color: [0, 0] }), new Block2x2({ x: 8, y: 1, z: 4, r: 1, color: [0, 0] }), new Block2x2({ x: 8, y: 1, z: 5, r: 0, color: [0, 0] }), new Block2x4({ x: 7, y: 1, z: 3, r: 3, color: [0, 0, 0, 0] }),],
      [new Block2x4({ x: 9, y: 0, z: 3, r: 3, color: [0, 0, 0, 0] }), new Block2x2({ x: 6, y: 0, z: 5, r: 0, color: [0, 0] }), new Block2x2({ x: 7, y: 0, z: 4, r: 2, color: [0, 0] }), new Block2x2({ x: 8, y: 1, z: 4, r: 1, color: [0, 0] }), new Block2x2({ x: 8, y: 1, z: 5, r: 0, color: [0, 0] }), new Block2x4({ x: 7, y: 1, z: 3, r: 3, color: [0, 0, 0, 0] }), new Block2x4({ x: 8, y: 2, z: 6, r: 1, color: [0, 0, 0, 0] }),],
      [new Block2x4({ x: 9, y: 0, z: 3, r: 3, color: [0, 0, 0, 0] }), new Block2x2({ x: 6, y: 0, z: 5, r: 0, color: [0, 0] }), new Block2x2({ x: 7, y: 0, z: 4, r: 2, color: [0, 0] }), new Block2x2({ x: 8, y: 1, z: 4, r: 1, color: [0, 0] }), new Block2x2({ x: 8, y: 1, z: 5, r: 0, color: [0, 0] }), new Block2x4({ x: 7, y: 1, z: 3, r: 3, color: [0, 0, 0, 0] }), new Block2x4({ x: 8, y: 2, z: 6, r: 1, color: [0, 0, 0, 0] }), new Block2x2({ x: 6, y: 2, z: 6, r: 1, color: [0, 0] }),],
      [new Block2x4({ x: 9, y: 0, z: 3, r: 3, color: [0, 0, 0, 0] }), new Block2x2({ x: 6, y: 0, z: 5, r: 0, color: [0, 0] }), new Block2x2({ x: 7, y: 0, z: 4, r: 2, color: [0, 0] }), new Block2x2({ x: 8, y: 1, z: 4, r: 1, color: [0, 0] }), new Block2x2({ x: 8, y: 1, z: 5, r: 0, color: [0, 0] }), new Block2x4({ x: 7, y: 1, z: 3, r: 3, color: [0, 0, 0, 0] }), new Block2x4({ x: 8, y: 2, z: 6, r: 1, color: [0, 0, 0, 0] }), new Block2x2({ x: 7, y: 2, z: 4, r: 2, color: [0, 0] }), new Block2x2({ x: 6, y: 2, z: 6, r: 1, color: [0, 0] }),]
    ];

    this._colorMatchCurrentLevel = 0;
    this._winCount = 0;

    this._activeDisplayBlocks = this._colorMatchLevel[this._colorMatchCurrentLevel];

    this._colorMatchState = 0;
    this._shownColorCount = 0;

    this._timeoutDelay = null;

    this._enumColorMatchState = {
      build: 0,
      delayShowColor: 1,
      showColor: 2,
      reproduce: 3,
      win: 4,
      fail: 5,
    }

    this._redPad = {
      block: new BlockPillar({ x: 0, y: 0, z: 0, color: [meshColor.red] }),
      mesh: null,
    };

    this._greenPad = {
      block: new BlockPillar({ x: 0, y: 0, z: 4, color: [meshColor.green] }),
      mesh: null,
    };

    this._bluePad = {
      block: new BlockPillar({ x: 0, y: 0, z: 8, color: [meshColor.blue] }),
      mesh: null,
    };

    this._paintBrush = meshColor.black;
    this._placedBlocks = [];


    this._setLevel({ level: 1, difficulty: 0 });
  }

  _setLevel({ level = 0, difficulty = 0 }) {
    super._setLevel({ level: level, difficulty: difficulty });
    this._colorMatchState = this._enumColorMatchState.build;

    this.update();
  }

  reset() {
    super.reset();
    if (this._redPad.mesh != null) {
      this._redPad.mesh.dispose();
      this._greenPad.mesh.dispose();
      this._bluePad.mesh.dispose();
      this._redPad.mesh = null;
    }

  }

  _timeoutDelayFunction() {
    clearTimeout(this._timeoutDelay);
    this._timeoutDelay = null;
  }

  update() {

    super.update();


    let set = Block.calcSet({ left: world.block, right: this._activeDisplayBlocks, careColor: false, careRotation: false });
    this.show({ block: set.diffRight, careColor: false });

    let setWorldAndDisplayBlocks;

    switch (this._colorMatchState) {
      case this._enumColorMatchState.build:
        Block.setColor({ block: set.intersectionLeft, color: meshColor.black });

        if (set.diffRight.length == 0) {
          this._colorMatchState = this._enumColorMatchState.delayShowColor;
          this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 1500);
        }else{
          world.base.ledFront = meshColor.black;
          world.base.ledLeft = meshColor.magenta;
          world.base.ledRight = meshColor.cyan;
          world.base.ledBack = meshColor.black;
        }

        break;
      case this._enumColorMatchState.delayShowColor:
        world.base.ledFront = meshColor.black;
        world.base.ledLeft = meshColor.black;
        world.base.ledRight = meshColor.black;
        world.base.ledBack = meshColor.black;

        if (set.diffRight.length != 0) {
          this._colorMatchState = this._enumColorMatchState.build;
          clearTimeout(this._timeoutDelay);
          this._timeoutDelay = null;
          return;
        }

        if (this._timeoutDelay == null) {


          this._shownColorCount = 0;
          this._paintBrush = 0;
          this._colorMatchState = this._enumColorMatchState.showColor;
        }
        break;

      case this._enumColorMatchState.showColor:
        world.base.ledFront = meshColor.black;
        world.base.ledLeft = meshColor.black;
        world.base.ledRight = meshColor.black;
        world.base.ledBack = meshColor.black;

        if (this._timeoutDelay == null) {

          if (this._shownColorCount == this._activeDisplayBlocks.length) {
            this._colorMatchState = this._enumColorMatchState.reproduce;
            this._shownColorCount++;
            this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 6000 + 2500 * this._activeDisplayBlocks.length);

          } else {
            this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 800);
            this._shownColorCount++;
            let randColor = Math.floor(Math.random() * 3);

            switch (randColor) {
              case 0:
                this._activeDisplayBlocks[this._shownColorCount - 1].color = meshColor.red;
                break;
              case 1:
                this._activeDisplayBlocks[this._shownColorCount - 1].color = meshColor.green;
                break;
              case 2:
                this._activeDisplayBlocks[this._shownColorCount - 1].color = meshColor.blue;
                break;

            }
          }
        }

        let setBlockToColor = Block.calcSet({ left: world.block, right: this._activeDisplayBlocks, careColor: false, careRotation: false });
        Block.setColor({ block: setBlockToColor.intersectionLeft, color: meshColor.black });

        if (this._shownColorCount <= this._activeDisplayBlocks.length) {
          setBlockToColor = Block.calcSet({ left: world.block, right: this._activeDisplayBlocks[this._shownColorCount - 1], careColor: false, careRotation: false });
          Block.setColor({ block: setBlockToColor.intersectionLeft, color: this._activeDisplayBlocks[this._shownColorCount - 1].color[0] });
        }

        break;
      case this._enumColorMatchState.reproduce:

        world.base.ledFront = meshColor.green;
        world.base.ledLeft = meshColor.blue;
        world.base.ledRight = meshColor.red;
        world.base.ledBack = meshColor.black;

        if (this._redPad.mesh == null) {
          this._redPad.mesh = new MeshPad(this._redPad.block);
          this._greenPad.mesh = new MeshPad(this._greenPad.block);
          this._bluePad.mesh = new MeshPad(this._bluePad.block);

        }

        let worldPixel = BlockPixel.convertBlock(world.block);
        let setColorPilar = BlockPillar.calcSet({ left: worldPixel, right: this._redPad.block });
        if (setColorPilar.intersectionLeft.length != 0) {
          this._paintBrush = meshColor.red;
        }
        setColorPilar = BlockPillar.calcSet({ left: worldPixel, right: this._greenPad.block });
        if (setColorPilar.intersectionLeft.length != 0) {
          this._paintBrush = meshColor.green;
        }
        setColorPilar = BlockPillar.calcSet({ left: worldPixel, right: this._bluePad.block });
        if (setColorPilar.intersectionLeft.length != 0) {
          this._paintBrush = meshColor.blue;
        }

        setWorldAndDisplayBlocks = Block.calcSet({ left: world.block, right: this._activeDisplayBlocks, careColor: false, careRotation: false });
        let paintBlocks = Block.calcSet({ left: setWorldAndDisplayBlocks.diffLeft, right: this._placedBlocks, careColor: false, careRotation: false });

        Block.setColor({ block: paintBlocks.diffLeft, color: this._paintBrush });
        this._placedBlocks = world.block;

        let playPixels = BlockPixel.convertBlock(setWorldAndDisplayBlocks.diffLeft);
        let activeDisplayPixels = BlockPixel.convertBlock(this._activeDisplayBlocks);

        let setPlayPixelAndDisplayBlocks = BlockPixel.calcSetNoCarePosition({ left: playPixels, right: activeDisplayPixels, careColor: true, careRotation: true })

        if (setPlayPixelAndDisplayBlocks.diffLeft.length == 0 && setPlayPixelAndDisplayBlocks.diffRight.length == 0) {
          this._colorMatchState = this._enumColorMatchState.win;
        } else if (this._timeoutDelay == null) {
          this._colorMatchState = this._enumColorMatchState.fail;
        }

        if (this._colorMatchCurrentLevel == 0 && this._winCount == 0) {
          let showCorrect = Block.transform({ block: this._activeDisplayBlocks, x: -4 });
          this.show({ block: showCorrect, careColor: true });
        }
        break;

      case this._enumColorMatchState.win:

        Block.copyColor({ to: world.block, from: this._activeDisplayBlocks, careRotation: false })

        setWorldAndDisplayBlocks = Block.calcSet({ left: world.block, right: this._activeDisplayBlocks, careColor: false, careRotation: false });
        Block.setColor({ block: setWorldAndDisplayBlocks.diffLeft, color: meshColor.green, blink: true });

        if(Game._master != null){
          this.win({filterWin: false})
          return;
        }

        world.base.ledFront = meshColor.black;
        world.base.ledLeft = meshColor.black;
        world.base.ledRight = meshColor.black;
        world.base.ledBack = meshColor.black;

        if (this._redPad.mesh != null) {
  
          this.score = this.score + Math.floor(Math.pow(1.5, (this._colorMatchCurrentLevel + 1)) );

          sound.win();

          this._redPad.mesh.dispose();
          this._greenPad.mesh.dispose();
          this._bluePad.mesh.dispose();
          this._redPad.mesh = null;
        }

        if (setWorldAndDisplayBlocks.diffLeft.length == 0) {
          clearTimeout(this._timeoutDelay);
          this._colorMatchState = this._enumColorMatchState.build;
          this._winCount++;
          if (this._winCount > 1) {
            this._winCount = 0;
           
            this._colorMatchCurrentLevel++;
            
            this._setLevel({ level: this._colorMatchCurrentLevel+1, difficulty: 0 }); 
            if (this._colorMatchLevel.length > this._colorMatchCurrentLevel) {
              this._activeDisplayBlocks = this._colorMatchLevel[this._colorMatchCurrentLevel];
            }
          }
        }
        break;

      case this._enumColorMatchState.fail:
        Block.copyColor({ to: world.block, from: this._activeDisplayBlocks, careRotation: false })

        setWorldAndDisplayBlocks = Block.calcSet({ left: world.block, right: this._activeDisplayBlocks, careColor: false, careRotation: false });
        Block.setColor({ block: setWorldAndDisplayBlocks.diffLeft, color: meshColor.red, blink: true });
        
        if(Game._master != null){
          this.masterFail();    
          return;
        }

        world.base.ledFront = meshColor.black;
        world.base.ledLeft = meshColor.black;
        world.base.ledRight = meshColor.black;
        world.base.ledBack = meshColor.black;

        if (this._redPad.mesh != null) {
    

          this.saveScore();
          sound.fail();
          this._redPad.mesh.dispose();
          this._greenPad.mesh.dispose();
          this._bluePad.mesh.dispose();
          this._redPad.mesh = null;
          this._winCount = 0;
          this.score = 0;
        }

        if (setWorldAndDisplayBlocks.diffLeft.length == 0) {
          this._colorMatchState = this._enumColorMatchState.build;
        }
        break;
    }
  }
}