class ReadProgram extends Game {
  constructor() {
    let level = [];

    level.push({ difficulty: [], image: null });

    readProgramLevel.buildLevel(level);

    super({ level: level, userCreatedLevel: false });

    this._timeoutDelay = null;

    this._program = new ProgrammingProgram({ game: this });

    this._markers = [];
    this._levelTarget = [];

    this._gui = new ProgrammingGui({ game: this, program: this._program, lock: true });
    this._setLevel({ level: 1, difficulty: 0 });
  }


  _setLevel({ level = 0, difficulty = 0 }) {

    super._setLevel({ level: level, difficulty: difficulty });
    if (level > 0) {
      this.showDifficultyButton();

      this._gui.close();
      this._program.close();
      this._levelTarget = [];

      let program = ProgrammingProgram.processLoadObject(this.activeStage[0]);
      this._program = new ProgrammingProgram({ game: this, procedure: program.procedure, intReg: program.intReg, boolReg: program.boolReg, shapeReg: program.shapeReg, shapeRegConfigPos: program.shapeRegConfigPos, shapeRegConfigCol: program.shapeRegConfigCol, avatardReg: program.avatardReg });

      this._gui = new ProgrammingGui({ game: this, program: this._program, lock: true });
      this._levelTarget = this.activeStage[1];
    }

    this._markers = [];
    this._levelTarget.forEach(function (item) {
      this._markers.push(new MeshShadowTopDrop(new BlockShadowBottom({ x: item.x, z: item.z }), item.y * Mesh._staticPitch , 7));

    }.bind(this));

    this.update();
  }

  reset() {
    this._markers.forEach(item => item.dispose());
    super.reset();
  }

  close() {

    this._gui.close();
    this._program.close();
    super.close();
  }

  update() {

    super.update();
    this._gui.update();

    let win = true;
    ProgrammingProgram.avatardBlock.forEach(function (item) {

      if (win && item != null && this._levelTarget.some(target => item.x == target.x && item.y == target.y && item.z == target.z)) {
        win = true;
      } else {
        win = false;
      }

    }.bind(this));

    if (win && ProgrammingProgram.avatardBlock.length > 0) {
      this.win({});
    }
  }


}