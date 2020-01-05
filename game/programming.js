class Programming extends Game {
  constructor() {
    let level = [];

    level.push({ difficulty: [], image: null });

    level.push({ difficulty: [], image: "./icon/level/lvl1Diy.svg" });
    level[level.length - 1].difficulty.push({ stage: [], image: "./icon/level/lvl1Diy.svg" });
    level[level.length - 1].difficulty.push({ stage: [], image: "./icon/level/lvl1DiyCreate.svg" });

    level.push({ difficulty: [], image: "./icon/level/lvl2Diy.svg" });
    level[level.length - 1].difficulty.push({ stage: [], image: "./icon/level/lvl2Diy.svg" });
    level[level.length - 1].difficulty.push({ stage: [], image: "./icon/level/lvl2DiyCreate.svg" });

    level.push({ difficulty: [], image: "./icon/level/lvl3Diy.svg" });
    level[level.length - 1].difficulty.push({ stage: [], image: "./icon/level/lvl3Diy.svg" });
    level[level.length - 1].difficulty.push({ stage: [], image: "./icon/level/lvl3DiyCreate.svg" });

    level.push({ difficulty: [], image: "./icon/settings/worldPrint.svg" });

    super({ level: level, userCreatedLevel: false });

    this._timeoutDelay = null;
    //-----
    /*
        let program = {"procedure":[{"line":["new comCall ({ left :0, leftType :34 }) ",null,null,"new comJump ({ left :1, leftType :34 }) "]}],"intReg":[],"boolReg":[],"shapeReg":[],"shapeRegConfigPos":[],"shapeRegConfigCol":[],"avatardReg":[]}
        program = ProgrammingProgram.processLoadObject(program);
        this._program = new ProgrammingProgram({ game: this, procedure: program.procedure, intReg: program.intReg, boolReg: program.boolReg, shapeReg: program.shapeReg, shapeRegConfigPos: program.shapeRegConfigPos, shapeRegConfigCol: program.shapeRegConfigCol, avatardReg: program.avatardReg });
    
    */
    //---------
    this._program = new ProgrammingProgram({ game: this });
    //-----------

    this._gui = new ProgrammingGui({ game: this, program: this._program });
    this._setLevel({ level: 0, difficulty: 0 });
  }


  _callBackLoadProgram({ level = 0, program = null }) {

    this._gui.close();
    this._program.close();

    if (program != null) {
      program = ProgrammingProgram.processLoadObject(program);
      this._program = new ProgrammingProgram({ game: this, procedure: program.procedure, intReg: program.intReg, boolReg: program.boolReg, shapeReg: program.shapeReg, shapeRegConfigPos: program.shapeRegConfigPos, shapeRegConfigCol: program.shapeRegConfigCol, avatardReg: program.avatardReg });
    } else {
      this._program = new ProgrammingProgram({ game: this });
    }

    this._gui = new ProgrammingGui({ game: this, program: this._program });
    this._setLevel({ level: 0, difficulty: 0 });

  }


  _createSaveObject() {

    let program = { procedure: [], intReg: [], boolReg: [], shapeReg: [], shapeRegConfigPos: [], shapeRegConfigCol: [], avatardReg: [] };
    let lastProc = 99;
    while (lastProc >= 0 && this._program.procedure[lastProc].line.length == 0) {
      lastProc--;
    }
    lastProc++;

    for (let ii = 0; ii < lastProc; ii++) {

      if (this._program.procedure[ii].line.length == 0) {
        program.procedure[ii] = null;
      } else {
        program.procedure[ii] = { line: [] };
        for (let i = 0; i < this._program.procedure[ii].line.length; i++) {
          if (this._program.procedure[ii].line[i] == null) {
            program.procedure[ii].line[i] = null;
          } else {
            program.procedure[ii].line[i] = this._program.procedure[ii].line[i].printConstructor();
          }
        }
      }
    }

    for (let i = 0; i < this._program.intReg.length; i++) {
      if (this._program.intReg[i] == null) {
        program.intReg[i] = null;
      } else {
        program.intReg[i] = this._program.intReg[i];
      }
    }

    for (let i = 0; i < this._program.boolReg.length; i++) {
      if (this._program.boolReg[i] == null) {
        program.boolReg[i] = null;
      } else {
        program.boolReg[i] = this._program.boolReg[i];
      }
    }

    for (let i = 0; i < this._program.shapeReg.length; i++) {
      if (this._program.shapeReg[i] == null) {
        program.shapeReg[i] = null;
        program.shapeRegConfigPos[i] = null;
        program.shapeRegConfigCol[i] = null;
      } else {
        program.shapeReg[i] = Block.string(this._program.shapeReg[i]);
        program.shapeRegConfigPos[i] = this._program.shapeRegConfigPos[i];
        program.shapeRegConfigCol[i] = this._program.shapeRegConfigCol[i];
      }

    }

    for (let i = 0; i < this._program.avatardReg.length; i++) {
      if (this._program.avatardReg[i] == null) {
        program.avatardReg[i] = null;
      } else {
        program.avatardReg[i] = Block.string(this._program.avatardReg[i]);
      }

    }

    return program;

  }


  _setLevel({ level = 0, difficulty = 0 }) {

    if (level == 4) {
      console.log(JSON.stringify(this._createSaveObject()));
      let str = "levelTarget = ["
      ProgrammingProgram.avatardBlock.forEach(function (item) {
        str += "{ x: " + item.x + ", y: " + item.y + ", z: " + item.z + "}, ";
      });
      str += "];";
      console.log(str);
    } else if (level > 0) {
      if (difficulty == 0) {
        database.loadProgram({ name: this.constructor.name, level: level, callBackFunction: function (param) { this._callBackLoadProgram(param) }.bind(this) });
      } else if (difficulty == 1) {
        this._gui._reset();
        database.saveProgram({ name: this.constructor.name, level: level, program: this._createSaveObject() });
      }
    }
    super._setLevel({ level: level, difficulty: difficulty });
    this.update();
  }

  reset() {
    this._reset();
    super.reset();
  }

  _reset() {

  }

  close() {
    this._gui.close();
    this._program.close();
    super.close();
  }


  _timeoutDelayFunction() {

    clearTimeout(this._timeoutDelay);
    this._timeoutDelay = null;

  }

  update() {

    super.update();
    this._gui.update();

  }


}