class Programming extends Game {
  constructor() {
    let level = [];

    super({ level: level, userCreatedLevel: false });


    this._timeoutDelay = null;

    this._program = new ProgrammingProgram({});
    console.log( "this._program.intReg.length: " +this._program.intReg.length );
    console.log( "this._program.intReg[i]: " +this._program.intReg[0] );
    this._gui = new ProgrammingGui( this._program );

    this._setLevel({ level: 1, difficulty: 0 });
  }

  _setLevel({ level = 0, difficulty = 0 }) {

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
    
    super.close();
  }


  _timeoutDelayFunction() {

    clearTimeout(this._timeoutDelay);
    this._timeoutDelay = null;

  }

  update() {

    super.update();

   
  }


}