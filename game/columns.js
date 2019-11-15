class Columns extends Game {
  constructor() {
    let level = [];

    super({ level: level, userCreatedLevel: false });

    this._enumColumnsState = {
      displayColor: 0,
      setColor: 1,
      checkThree: 2,
      colorDown: 3,
    }
    this._columnsState = 0;

    this._colorCount = 3;
    this._displayColors = [];
    this._displayColorsIndex = 0;
    this._currentColor = 0;
    this._timeoutDelay = null;


    this._columnsCurrentLevel = 1;
    this._score = 0
    this._levelScoreProgression = [0, 30, 80, 140, 210, 280, 990];


    this._speedColorSelect = 3;
    this._speedColorSelectIndex = 0;

    this._colorSelector = new BlockPillar({ x: 1, y: 0, z: 1, color: [meshColor.blue] });
    this._colorSelectorBlock = new Block2x2({ x: 1, y: 0, z: 1, r: 0, color: [0, 0] });
    this._playFieldBlocks = [];


    this._playfield = [new BlockPillar({ x: 7, y: 0, z: 7, color: [meshColor.blue] }), new BlockPillar({ x: 7, y: 0, z: 5, color: [meshColor.blue] }), new BlockPillar({ x: 7, y: 0, z: 3, color: [meshColor.blue] }), new BlockPillar({ x: 5, y: 0, z: 7, color: [meshColor.blue] }), new BlockPillar({ x: 5, y: 0, z: 5, color: [meshColor.blue] }), new BlockPillar({ x: 3, y: 0, z: 7, color: [meshColor.blue] }),];
    this._meshPlayfield = [];

    this._playfield.forEach(item => this._meshPlayfield.push(new MeshPad(item)));

    this._setLevel({ level: 1, difficulty: 0 });


  }

  _setLevel({ level = 0, difficulty = 0 }) {

    super._setLevel({ level: level, difficulty: difficulty });

     colorWheel.colorComplete();

    this._playFieldBlocks = [];
    this._columnsState = this._enumColumnsState.displayColor;
    this._currentColor = 0;


    switch (level) {
      case 1:
        this._colorCount = 4;

        this._speedColorSelect = 4;
        break;
      case 2:
        this._colorCount = 4;
        this._speedColorSelect = 3;


        break;
      case 3:
        this._colorCount = 5;
        this._speedColorSelect = 2;


        break;
      case 4:
        this._colorCount = 5;
        this._speedColorSelect = 1;


        break;
      default:
        this._colorCount = 6;
        this._speedColorSelect = 1;

        break;

    }

    this.update();

  }

  close() {

    this._meshPlayfield.forEach(item => item.dispose());
    this._meshPlayfield = [];
    super.close();
  }

  reset() {
    super.reset();
    Block.setColor({ block: world.block, color: 0, blink: false });
    this._playFieldBlocks = [];
    this._columnsCurrentLevel = 0;
    this._score = 0

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

    let setWorldColorSelector = BlockPillar.calcSet({ left: BlockPixel.convertBlock(world.block), right: this._colorSelector, careColor: false, careRotation: false });

    setWorldColorSelector.intersectionLeft.forEach(function (item) {

      if (currentColorSelectorBlocks.find(findItem => item.block == findItem) === undefined) {
        currentColorSelectorBlocks.push(item.block);
      }

    });

    if (currentColorSelectorBlocks.length == 0) {
      this.show({ block: [this._colorSelectorBlock], careColor: false });
      return;
    } else {
      this.show([]);
    }



    setWorldColorSelector = Block.calcSet({ left: world.block, right: currentColorSelectorBlocks, careColor: false, careRotation: false });

    let setCurrentPlayFieldBlocks = BlockPillar.calcSet({ left: world.block, right: this._playfield, careColor: false, careRotation: false });
    currentPlayFieldBlocks = setCurrentPlayFieldBlocks.intersectionLeft;


    let setFalselyRemovedBlocks = Block.calcSet({ left: currentPlayFieldBlocks, right: this._playFieldBlocks, careColor: false, careRotation: false });
    if (setFalselyRemovedBlocks.diffRight.length > 0) {
      this.show({ block: setFalselyRemovedBlocks.diffRight, careColor: false });
      return;
    }

    Block.copyColor({ to: currentPlayFieldBlocks, from: this._playFieldBlocks, careRotation: false });


    switch (this._columnsState) {

      case this._enumColumnsState.displayColor:
        if (this._timeoutDelay == null) {

          while (this._displayColors.length < 3) {
            let randColor = Math.floor(1 + Math.random() * this._colorCount);
            if (this._displayColors.find(item => item == randColor) === undefined) {
              this._displayColors.push(randColor);
            }
          }


          if (currentColorSelectorBlocks.length > 1) {

            currentColorSelectorBlocks.forEach(item => item.color = this._displayColors[this._displayColorsIndex])

            this._currentColor = this._displayColors[this._displayColorsIndex];
            this._columnsState = this._enumColumnsState.setColor;
            this._displayColors = [];
            break; 
          }

          this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 100);
          this._speedColorSelectIndex = this._speedColorSelect;

          this._displayColorsIndex++;
          this._displayColorsIndex %= 3;

          currentColorSelectorBlocks.forEach(item => item.color = this._displayColors[this._displayColorsIndex])

        }
        break;
      case this._enumColumnsState.setColor:

        this._displayColors = [];

        currentPlayFieldBlocks.some(function (item) {
          if (!item.color.some( itemFind => itemFind != 0) ) {
            item.color = this._currentColor;
            this._columnsState = this._enumColumnsState.checkThree;
            this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 100);
            this._speedColorSelectIndex = this._speedColorSelect;
            return true;
          }
        }.bind(this))

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

          this._score += forRemoval.length;

          BlockPixel.setBlockColor({ block: forRemoval, color: 0, blink: false, colorComplete: false });

          if (this._score >= this._levelScoreProgression[this._columnsCurrentLevel]) {         
            sound.win();
            this._columnsCurrentLevel++;
            this._setLevel({ level: this._columnsCurrentLevel, difficulty: 0 });
            return;
          } else if(forRemoval.length > 0) {            
            sound.correct((this._score - this._levelScoreProgression[this._columnsCurrentLevel - 1]) / (this._levelScoreProgression[this._columnsCurrentLevel] - this._levelScoreProgression[this._columnsCurrentLevel - 1]));
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
              }else if (itemPillar.y == bottomBlock[0].y){
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
                  }else if (itemPillar.y == topBlock[0].y) {
                    topBlock.push( itemPillar);
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
          this._columnsState = this._enumColumnsState.displayColor;
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