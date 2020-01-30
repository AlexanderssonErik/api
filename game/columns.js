class Columns extends Game {
  constructor() {
    let level = [];

    super({ level: level, userCreatedLevel: false, displayLevel: true, scoreIsLocal: true  });

    this._enumColumnsState = {
      setColor: 0,
      checkThree: 1,
      colorDown: 2,
    }
    this._columnsState = 0;


    this._secretCount = 3;
    this._secretCountIndex = 0;
    this._colorCount = 3;
    this._displayColors = [];
    this._displayColorsIndex = 0;
    this._currentColor = 0;
    this._timeoutDelay = null;


    this._columnsCurrentLevel = 1;
    this._scoreColumns = 0
    this._levelScoreProgression = [0, 30, 80, 140, 210, 280, 990];


    this._speedColorSelect = 3;
    this._speedColorSelectIndex = 0;

    this._playFieldBlocks = [];
    this._forRemovalBlocks = [];


    this._playfield = [new BlockPillar({ x: 7, y: 0, z: 7, color: [meshColor.blue] }), new BlockPillar({ x: 7, y: 0, z: 5, color: [meshColor.blue] }), new BlockPillar({ x: 7, y: 0, z: 3, color: [meshColor.blue] }), new BlockPillar({ x: 5, y: 0, z: 7, color: [meshColor.blue] }), new BlockPillar({ x: 5, y: 0, z: 5, color: [meshColor.blue] }), new BlockPillar({ x: 3, y: 0, z: 7, color: [meshColor.blue] }),];
    this._meshPlayfield = [];

    this._playfield.forEach(item => this._meshPlayfield.push(new MeshPad(item)));

    this._setLevel({ level: 1, difficulty: 0 });


  }

  _setLevel({ level = 0, difficulty = 0 }) {

    super._setLevel({ level: level, difficulty: difficulty });

    this._playFieldBlocks = [];
    this._columnsState = this._enumColumnsState.setColor;
    this._currentColor = 0;


    switch (level) {
      case 1:
        this._colorCount = 4;

        this._speedColorSelect = 4;
        this._secretCount = 4;

        break;
      case 2:
        this._colorCount = 5;
        this._speedColorSelect = 3;
        this._secretCount = 3;

        break;
      case 3:
        this._colorCount = 6;
        this._speedColorSelect = 2;
        this._secretCount = 3;

        break;
      case 4:
        this._colorCount = 7;
        this._speedColorSelect = 1;
        this._secretCount = 3;


        break;
      default:
        this._colorCount = 7;
        this._speedColorSelect = 1;
        this._secretCount = 3;

        break;

    }
    //remove select timing
    this._speedColorSelect =1;

    this.update();

  }

  close() {

    this.saveScore();
    this._meshPlayfield.forEach(item => item.dispose());
    this._meshPlayfield = [];
    super.close();
  }

  reset() {
    super.reset();
    Block.setColor({ block: world.block, color: 0, blink: false });
    this._playFieldBlocks = [];
    this._columnsCurrentLevel = 1;
    this._scoreColumns = 0
    this._secretCountIndex = 0;

  }


  _timeoutDelayFunction() {

    clearTimeout(this._timeoutDelay);
    this._speedColorSelectIndex--;
    if (this._speedColorSelectIndex == 0) {
      this._timeoutDelay = null;
    } else {
      this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 100);
    }

  }

  _threeInARow(x, y, z, blocks, forRemoval) {

    blocks.forEach(function (item) {
      let previous;
      let next;

      previous = blocks.find(itemFind => itemFind.color[0] == item.color[0] && itemFind.y == item.y - y && itemFind.z == item.z - z && itemFind.x == item.x - x);
      next = blocks.find(itemFind => itemFind.color[0] == item.color[0] && itemFind.y == item.y + y && itemFind.z == item.z + z && itemFind.x == item.x + x);

      if (previous !== undefined && next !== undefined) {
        forRemoval.push(previous);
        forRemoval.push(item);
        forRemoval.push(next);
      }


    });

  }

  update() {

    super.update();

    let currentColorSelectorBlocks = [];

    let currentPlayFieldBlocks = []

    let setForRemovalBlocks = Block.calcSet({ left: world.block, right: this._forRemovalBlocks, careColor: false, careRotation: false });
    this._forRemovalBlocks = setForRemovalBlocks.intersectionLeft;

    let setCurrentPlayFieldBlocks = BlockPillar.calcSet({ left: world.block, right: this._playfield, careColor: false, careRotation: false });
    setCurrentPlayFieldBlocks = Block.calcSet({ left: setCurrentPlayFieldBlocks.intersectionLeft, right: this._forRemovalBlocks, careColor: false, careRotation: false });

    currentPlayFieldBlocks = setCurrentPlayFieldBlocks.diffLeft;

    let setFalselyRemovedBlocks = Block.calcSet({ left: currentPlayFieldBlocks, right: this._playFieldBlocks, careColor: false, careRotation: false });
    if (setFalselyRemovedBlocks.diffRight.length > 0) {
      this.show({ block: setFalselyRemovedBlocks.diffRight, careColor: false });
      return;
    } else {
      this.show({ block: [], careColor: false });
    }

    Block.copyColor({ to: currentPlayFieldBlocks, from: this._playFieldBlocks, careRotation: false });

    switch (this._columnsState) {

      case this._enumColumnsState.setColor:
        if (this._timeoutDelay == null) {

          while (this._displayColors.length < 3) {
            let randColor = Math.floor(1 + Math.random() * this._colorCount);
            if (this._displayColors.find(item => item == randColor) === undefined) {
              this._displayColors.push(randColor);
            }
          }

          //remove pick by timing placement function
          this._displayColors[1]= this._displayColors[0];
          this._displayColors[2]= this._displayColors[0];

          if (currentPlayFieldBlocks.some(function (item) {
            if (!item.color.some(itemFind => itemFind != 0)) {
              item.color = this._displayColors[this._displayColorsIndex];
              this._displayColors = [];
              this._columnsState = this._enumColumnsState.checkThree;
              this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 100);
              this._speedColorSelectIndex = this._speedColorSelect;

              this._secretCountIndex++;
              this._secretCountIndex %= this._secretCount;

              return true;
            }
          }.bind(this))) {

            break;
          }

          this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 100);
          this._speedColorSelectIndex = this._speedColorSelect;

          this._displayColorsIndex++;
          this._displayColorsIndex %= 3;

          if (this._secretCountIndex == this._secretCount - 1) {
            world.base.ledFront = meshColor.red;
            world.base.ledLeft = meshColor.magenta;
            world.base.ledRight = meshColor.cyan;
            world.base.ledBack = meshColor.green;
          } else {
            world.base.ledFront = this._displayColors[this._displayColorsIndex];
            world.base.ledLeft = this._displayColors[this._displayColorsIndex];
            world.base.ledRight = this._displayColors[this._displayColorsIndex];
            world.base.ledBack = this._displayColors[this._displayColorsIndex];
          }

        }

        break;

      case this._enumColumnsState.checkThree:
        if (this._timeoutDelay == null) {

          let forRemoval = [];
          let currentPlayFieldBlocksPixels = BlockPixel.convertBlock(currentPlayFieldBlocks);

          this._threeInARow(2, 0, 0, currentPlayFieldBlocksPixels, forRemoval);
          this._threeInARow(0, 1, 0, currentPlayFieldBlocksPixels, forRemoval);
          this._threeInARow(0, 0, 2, currentPlayFieldBlocksPixels, forRemoval);
          this._threeInARow(0, 1, 2, currentPlayFieldBlocksPixels, forRemoval);
          this._threeInARow(0, -1, 2, currentPlayFieldBlocksPixels, forRemoval);
          this._threeInARow(2, 0, 2, currentPlayFieldBlocksPixels, forRemoval);
          this._threeInARow(-2, 0, 2, currentPlayFieldBlocksPixels, forRemoval);
          this._threeInARow(2, 1, 0, currentPlayFieldBlocksPixels, forRemoval);
          this._threeInARow(-2, 1, 0, currentPlayFieldBlocksPixels, forRemoval);
          this._threeInARow(2, 1, 2, currentPlayFieldBlocksPixels, forRemoval);
          this._threeInARow(2, -1, 2, currentPlayFieldBlocksPixels, forRemoval);
          this._threeInARow(-2, 1, 2, currentPlayFieldBlocksPixels, forRemoval);
          this._threeInARow(-2, -1, 2, currentPlayFieldBlocksPixels, forRemoval);

          this._scoreColumns += forRemoval.length;
          this.score = this._scoreColumns;

          BlockPixel.setBlockColor({ block: forRemoval, color: 0, blink: false, colorComplete: false });

          if (forRemoval.length > 0) {

            forRemoval.forEach(function (item) {
              if (!item.block.color.some(itemFind => itemFind != 0)) {
                if (!(this._forRemovalBlocks.some(itemFind => itemFind == item.block))) {
                  this._forRemovalBlocks.push(item.block);
                }
              }

            }.bind(this));

            if (this._scoreColumns >= this._levelScoreProgression[this._columnsCurrentLevel]) {
              sound.win();
              this._columnsCurrentLevel++;
              this._setLevel({ level: this._columnsCurrentLevel, difficulty: 0 });
              return;
            } else {
              sound.correct((this._scoreColumns - this._levelScoreProgression[this._columnsCurrentLevel - 1]) / (this._levelScoreProgression[this._columnsCurrentLevel] - this._levelScoreProgression[this._columnsCurrentLevel - 1]));

            }
          }

          this._columnsState = this._enumColumnsState.colorDown;
          this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 100);
          this._speedColorSelectIndex = this._speedColorSelect;
        }

        break;

      case this._enumColumnsState.colorDown:

        if (this._timeoutDelay == null) {

          let blockDropped = false;
          let curretBlocksPixels = BlockPixel.convertBlock(currentPlayFieldBlocks);
          this._playfield.forEach(function (item) {

            let set = BlockPillar.calcSet({ left: curretBlocksPixels, right: item, careColor: false, careRotation: false });
            if (set.intersectionLeft.length > 1) {

              let bottomBlock = [set.intersectionLeft[0]];
              set.intersectionLeft.forEach(function (itemPillar) {
                if (itemPillar.y < bottomBlock[0].y) {
                  bottomBlock = [itemPillar];
                } else if (itemPillar.y == bottomBlock[0].y) {
                  bottomBlock.push(itemPillar);
                }
              });

              while (true) {
                let topBlock = null;
                set.intersectionLeft.forEach(function (itemPillar) {

                  if (itemPillar.y > bottomBlock[0].y) {
                    if (topBlock == null) {
                      topBlock = [itemPillar];
                    } else if (itemPillar.y < topBlock[0].y) {
                      topBlock = [itemPillar];
                    } else if (itemPillar.y == topBlock[0].y) {
                      topBlock.push(itemPillar);
                    }
                  }

                });
                if (topBlock == null) {
                  return;
                }

                if (bottomBlock[0].color[0] == 0) {
                  if (topBlock[0].color[0] != 0) {
                    blockDropped = true;
                  }
                  BlockPixel.setBlockColor({ block: bottomBlock, color: topBlock[0].color[0], blink: false, colorComplete: false });
                  BlockPixel.setBlockColor({ block: topBlock, color: 0, blink: false, colorComplete: false });
                }
                bottomBlock = topBlock;
              }
            }
          });
          if (blockDropped) {
            this._columnsState = this._enumColumnsState.checkThree;
          } else {
            this._columnsState = this._enumColumnsState.setColor;
          }
          this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 100);
          this._speedColorSelectIndex = this._speedColorSelect;
        }

        break;
    }
    this._playFieldBlocks = [];
    currentPlayFieldBlocks.forEach(function (item) {
      if (item.color.some(itemFind => itemFind != 0)) {
        this._playFieldBlocks.push(item);
      }
    }.bind(this));

    return;

  }

}