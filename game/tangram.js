class Tangram extends Game {
  constructor(master = null) {

    let level = [];

    level.push({ difficulty: [], image: null });

    tangramLevel.buildLevel(level)
    super({ level: level, userCreatedLevel: true, displayLevel: true, displayStage: true, scoreIsTime: true, master: master  });


    this._showAllSides = false;
    this._careColor = false;
    this._careGap = false;
    this._showNoHints = false;

    this._sidesCorrect = 0;

    this._shadowPixelCorrect = 0;
    this._shadowPixelWrong = 0;
    this._shadowPixelMaxCorrect = 0;

    this._lastWorldBlock = null;

    this._setLevel({ level: 1, difficulty: 0 });

  }

  reset() {
    super.reset();

  }

  _setLevel({ level = 0, difficulty = 0 }) {

    super._setLevel({ level: level, difficulty: difficulty, update: false });

    this._lastWorldBlock = null;


    this._activeStageShadow = BlockShadow.convert({ block: this.activeStage });

    this._shadowPixelMaxCorrect = this._activeStageShadow.left.length + this._activeStageShadow.right.length + this._activeStageShadow.back.length + this._activeStageShadow.front.length + this._activeStageShadow.bottom.length



    switch (level) {
      case 0:
        this._showAllSides = true;
        this._careColor = false;
        this._careGap = false;
        this._showNoHints = false;
        break;
      case 1:
        this._showAllSides = false;
        this._careColor = false;
        this._careGap = false;
        this._showNoHints = false;
        break;
      case 2:
        this._showAllSides = true;
        this._careColor = false;
        this._careGap = false;
        this._showNoHints = false;
        break;
      case 3:
        this._showAllSides = true;
        this._careColor = true;
        this._careGap = false;
        this._showNoHints = false;
        colorWheel.colorComplete();
        break;
      case 4:
        this._showAllSides = true;
        this._careColor = false;
        this._careGap = true;
        this._showNoHints = false;

        break;
      case 5:
        this._showAllSides = true;
        this._careColor = false;
        this._careGap = true;
        this._showNoHints = true;

        break;
    }

    if (level > 0) {
      this.showDifficultyButton();
    }

    this.update();
  }

  updateSide({ worldShadow = [], gameShadow = [] }) {



    let set = BlockShadow.calcSet({ left: worldShadow, right: gameShadow, careColor: this._careColor, careGap: this._careGap });

    if (set.diffRight.length == 0 && set.diffLeft.length == 0) {
      this._sidesCorrect++;
    }



    if (this._showNoHints) {
      this.showShadow({ block: gameShadow, careColor: this._careColor, careGap: this._careGap, add: true });
    } else {
      this._shadowPixelCorrect += set.intersectionLeft.length;

      this.showShadow({ block: set.diffRight, careColor: this._careColor, careGap: this._careGap, add: true });

      if (!this._careColor) {
        BlockShadow.setColor({ block: set.intersectionLeft, color: meshColor.green });
        //  BlockShadow.setBlockColor({ block: set.intersectionLeft, color: meshColor.green })
        this.showShadow({ block: set.intersectionLeft, add: true });
      }

      if (this._careColor || this._careGap) {
        set = BlockShadow.calcSet({ left: worldShadow, right: gameShadow, careColor: false, careGap: false });
        this._shadowPixelWrong += set.diffLeft.length;
        BlockShadow.setColor({ block: set.diffLeft, color: meshColor.red })
        BlockShadow.setBlockColor({ block: set.diffLeft, color: meshColor.red, blink: true })
      } else {
        this._shadowPixelWrong += set.diffLeft.length;
        BlockShadow.setColor({ block: set.diffLeft, color: meshColor.red })
        BlockShadow.setBlockColor({ block: set.diffLeft, color: meshColor.red, blink: true })
        this.showShadow({ block: set.diffLeft, add: true });

      }
    }
  }



  update() {

    super.update();

    if (this.state == this.enumState.busyCreatingShape) {
      return;
    }

    if (this._lastWorldBlock == null) {
      this._lastWorldBlock = Block.copy(world.block);
    } else {
      let set = Block.calcSet({ left: world.block, right: this._lastWorldBlock, careColor: true, careRotation: false });
      if (set.diffLeft.length == 0 && set.diffRight.length == 0) {

        return;
      }
      this._lastWorldBlock = null;
    }

    this._sidesCorrect = 0;
    this._shadowPixelCorrect = 0;
    this._shadowPixelWrong = 0;


    let shadow = BlockShadow.convert({ block: world.block });
    this.showShadow({ block: [], careColor: this._careColor, careGap: this._careGap });
    this.updateSide({ worldShadow: shadow.back, gameShadow: this._activeStageShadow.back });

    if (this._showAllSides) {
      this.updateSide({ worldShadow: shadow.right, gameShadow: this._activeStageShadow.right });
      this.updateSide({ worldShadow: shadow.front, gameShadow: this._activeStageShadow.front });
      this.updateSide({ worldShadow: shadow.left, gameShadow: this._activeStageShadow.left });
      this.updateSide({ worldShadow: shadow.bottom, gameShadow: this._activeStageShadow.bottom });
      this._colorOkBlocksGreen();
      if (this._sidesCorrect == 5) {
        this._lastWorldBlock = null;
        this.win({});
      }
    } else {
      this._colorOkBlocksGreen();
      if (this._sidesCorrect == 1) {

        this._lastWorldBlock = null;
        this.win({});
      }
    }

    this.soundProgression({ correct: this._shadowPixelCorrect, wrong: this._shadowPixelWrong, maxCorret: this._shadowPixelMaxCorrect });
  }


  _colorOkBlocksGreen() {
    if (!this._careColor && !this._showNoHints) {
      world.block.forEach(function (item) {
        if (!item.color.some(find => find == meshColor.red)) {
          item.color = meshColor.green;
        }
      }.bind(this));
    }

  }


}