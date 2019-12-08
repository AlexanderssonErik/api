class MasterMind extends Game {
  constructor() {
    let level = [];

    super({ level: level, userCreatedLevel: false });

    this._masterMindCurrentLevel = 1;
    this._score = 0
    this._levelScoreProgression = [0, 3, 8, 14, 21, 28, 99];
    this._columnHeight = 2;

    this._codeToFind = null;

    this._playfield = [new Block2x2({ x: 4, y: 0, z: 7, r: 0, color: [meshColor.blue, 0] }), new Block2x2({ x: 4, y: 0, z: 1, color: [meshColor.blue, 0] })];
    this._meshPlayfield = [];

    this._timeoutDelay = null;
    this._playfield.forEach(item => this._meshPlayfield.push(new MeshPad(item)));
    this._setLevel({ level: 1, difficulty: 0 });

  }

  _setLevel({ level = 0, difficulty = 0 }) {

    super._setLevel({ level: level, difficulty: difficulty });
    this._codeToFind = null;

    switch (level) {
      case 1:
        this._columnHeight = 2;
        break;
      case 2:
        this._columnHeight = 3;
        break;
      case 3:
        this._columnHeight = 4;
        break;
      case 4:
        this._columnHeight = 5;
        break;
      default:
        this._columnHeight = 6;

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

    this._masterMindCurrentLevel = 1;
    this._score = 0

  }

  _timeoutDelayFunction() {

    clearTimeout(this._timeoutDelay);
    this._timeoutDelay = null;
    this._score++;
    if (this._score >= this._levelScoreProgression[this._masterMindCurrentLevel]) {
      sound.win();
      this._masterMindCurrentLevel++;
      this._setLevel({ level: this._masterMindCurrentLevel, difficulty: 0 });
    } else {
      this._codeToFind = null
    }
  }

  update() {

    super.update();

    if (this._codeToFind == null) {
      this._codeToFind = [];
      for (let i = 0; i < this._columnHeight; i++) {
        this._codeToFind.push(Math.floor(Math.random() * 5));   
      }
    }

    let worldPixels = BlockPixel.convertBlock(world.block);

    this._playfield.forEach(function (item) {

      let code = [];
      let blockPixel = BlockPixel.convertBlock(item);
      let playFieldBlocks = [];

      let set = BlockPixel.calcSet({ left: worldPixels, right: blockPixel, careColor: false });

      while (set.intersectionLeft.length != 0) {

        if (set.intersectionLeft[0].y >= this._columnHeight || set.intersectionLeft.length == 1 || set.intersectionLeft.length == 3 || set.intersectionLeft[0].block instanceof Block2x4 || set.intersectionLeft.some(itemFind => itemFind.block != set.intersectionLeft[0].block)) {
          BlockPixel.setBlockColor({ block: set.intersectionLeft[0], color: meshColor.red, blink: true, colorComplete: true });
          return;
        }

        let minXField = 99;
        let minZField = 99;
        let valXPlay = 0;
        let valZPlay = 0;

        blockPixel.forEach(function (itemVal) {
          if (itemVal.x < minXField) {
            minXField = itemVal.x;
          }
          if (itemVal.z < minZField) {
            minZField = itemVal.z;
          }
        });
        set.intersectionLeft.forEach(function (itemVal) {
          valXPlay += itemVal.x - minXField;
          valZPlay += itemVal.z - minZField;
        });

        if (valXPlay == 0 && valZPlay == 1) {
          code.push(0);
        } else if (valXPlay == 1 && valZPlay == 0) {
          code.push(1);
        } else if (valXPlay == 1 && valZPlay == 2) {
          code.push(2);
        } else if (valXPlay == 2 && valZPlay == 1) {
          code.push(3);
        } else if (valXPlay == 2 && valZPlay == 2) {
          code.push(4);
        }


        playFieldBlocks.push(set.intersectionLeft[0].block);
        if (set.intersectionLeft[0].y == this._columnHeight - 1) {
          let green = 0;
          let yellow = 0;

          this._codeToFind.forEach(function (itemCodeFind, index) {
            if (itemCodeFind == code[index]) {
              green++
            } else if (code.some(itemCode => itemCode == itemCodeFind)) {
              yellow++;
            }
          });

          if (green == this._columnHeight) {
            if (this._timeoutDelay == null) {
              this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 1500);
              sound.correct(1);
            }

          }

          playFieldBlocks.forEach(function (itemBlock) {
            if (green > 0) {
              itemBlock.color = meshColor.green;
              green--;
            } else if (yellow > 0) {
              itemBlock.color = meshColor.yellow;
              yellow--;
            } else {
              itemBlock.color = meshColor.red;
            }
          });
          return
        }

        blockPixel = Block.copy([set.intersectionLeft[0].block]);
        blockPixel[0].y++;
        blockPixel = BlockPixel.convertBlock(blockPixel);

        set = BlockPixel.calcSet({ left: worldPixels, right: blockPixel, careColor: false });
      }
    }.bind(this));
  }
}