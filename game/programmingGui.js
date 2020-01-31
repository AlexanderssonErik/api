

class ProgrammingGui {
  constructor({ game = null, program = null, lock = false }) {

    this._locked = lock;
    this._rowDisp = 15;

    this._progColor = {
      na: 'rgba(96, 96, 96, 0.8)',

      bool: 'rgba(96, 200, 96, 0.8)',
      boolButton: 'rgba(96, 200, 96, 1)',
      int: 'rgba(96, 96, 200, 0.8)',
      intButton: 'rgba(96, 96, 200, 1)',
      avatard: 'rgba(200, 96, 96, 0.8)',
      avatardButton: 'rgba(200, 96, 96, 1)',
      shape: 'rgba(200, 96, 200, 0.8)',
      shapeButton: 'rgba(200, 96, 200, 1)',
      label: 'rgba(96, 200, 200, 0.8)',
      labelButton: 'rgba(96, 200, 200, 1)',

      procedure: 'rgba(200, 200, 200, 0.8)',
      procedureButton: 'rgba(200, 200, 200, 1)',
      world: 'rgba(0, 200, 0, 0.8)',
      worldButton: 'rgba(0, 200, 0, 1)',


      black: 'rgba(0, 0, 0, 0.8)',
      blackButton: 'rgba(0, 0, 0, 1)',
      red: 'rgba(255, 0, 0, 0.8)',
      redButton: 'rgba(255, 0, 0, 1)',
      green: 'rgba(0, 255, 0, 0.8)',
      greenButton: 'rgba(0, 255, 0, 1)',
      blue: 'rgba(0, 0, 255, 0.8)',
      blueButton: 'rgba(0, 0, 255, 1)',

      game: 'rgba(0, 200, 0, 0.8)',
      gameButton: 'rgba(0, 200, 0, 1)',
      sleep: 'rgba(0, 0, 200, 0.8)',
      sleepButton: 'rgba(0, 0, 200, 1)',

      jump: 'rgba(200, 150, 0, 0.8)',
      jumpButton: 'rgba(200, 150, 0, 1)',
      call: 'rgba(200, 150, 0, 0.8)',
      callButton: 'rgba(200, 150, 0, 1)',
      return: 'rgba(200, 150, 0, 0.8)',
      returnButton: 'rgba(200, 150, 0, 1)',

      if: 'rgba(200, 0, 100, 0.8)',
      ifButton: 'rgba(200, 0, 100, 1)',

      addDelButton: 'rgba(96, 0, 96, 0.8)',


    }

    this._game = game;
    this._program = program;

    this._sleepTick = 0;


    // #######################################################
    //Registers ----------------------------------------------
    // #######################################################

    //BOOL
    this._activeBoolReg = 0;
    this._boolRegIndex = 0;
    this._boolRegMinus = new GuiButtonTxt("-", function () { if (this._boolRegIndex > 0) { this._boolRegIndex-- }; this._updateReg() }.bind(this));
    if(!this._locked){
    this._boolRegSetMenu = [new GuiButtonTxt("true", function () { this._setBoolReg(true) }.bind(this)), new GuiButtonTxt("false", function () { this._setBoolReg(false) }.bind(this))];
    this._boolRegSetMenu.forEach(item => item.color = this._progColor.boolButton)
  }
    this._boolReg = [new GuiButtonTxt("B0", null, null, function () { this._setActveBoolReg(this._boolRegIndex) }.bind(this)), new GuiButtonTxt("B1", null, null, function () { this._setActveBoolReg(this._boolRegIndex + 1) }.bind(this)), new GuiButtonTxt("B2", null, null, function () { this._setActveBoolReg(this._boolRegIndex + 2) }.bind(this))];
    if(!this._locked){
    this._boolReg.forEach(item => this._boolRegSetMenu.forEach(menu => item.addChild(menu, guiOptions.childTop)));
    }
    this._boolRegPlus = new GuiButtonTxt("+", function () { if (this._boolRegIndex < 97) { this._boolRegIndex++ }; this._updateReg() }.bind(this));
    if(!this._locked){
    this._boolRegLine = [new GuiButtonTxt("B0", function () { this._lineBoolReg(this._boolRegIndex) }.bind(this)), new GuiButtonTxt("B1", function () { this._lineBoolReg(this._boolRegIndex + 1) }.bind(this)), new GuiButtonTxt("B2", function () { this._lineBoolReg(this._boolRegIndex + 2) }.bind(this))];
    this._boolRegLine.forEach(item => item.color = this._progColor.boolButton);
    }
    //INT
    this._activeIntReg = 0;
    this._intRegIndex = 0;
    this._intRegMinus = new GuiButtonTxt("-", function () { if (this._intRegIndex > 0) { this._intRegIndex-- }; this._updateReg() }.bind(this));
    if(!this._locked){
    this._intRegSetMenu = [new GuiButtonTxt("0", function () { this._setIntReg(0) }.bind(this)), new GuiButtonTxt("1", function () { this._setIntReg(1) }.bind(this)), new GuiButtonTxt("2", function () { this._setIntReg(2) }.bind(this)), new GuiButtonTxt("3", function () { this._setIntReg(3) }.bind(this)), new GuiButtonTxt("4", function () { this._setIntReg(4) }.bind(this)), new GuiButtonTxt("5", function () { this._setIntReg(5) }.bind(this)), new GuiButtonTxt("6", function () { this._setIntReg(6) }.bind(this)), new GuiButtonTxt("7", function () { this._setIntReg(7) }.bind(this)), new GuiButtonTxt("8", function () { this._setIntReg(8) }.bind(this)), new GuiButtonTxt("9", function () { this._setIntReg(9) }.bind(this))];
    this._intRegSetMenu.forEach(item => item.color = this._progColor.intButton)
    this._intRegSetMenu[0].addChild(this._intRegSetMenu[1], guiOptions.childRight);
    this._intRegSetMenu[0].addChild(this._intRegSetMenu[2], guiOptions.childRight);
    this._intRegSetMenu[0].addChild(this._intRegSetMenu[3], guiOptions.childRight);
    this._intRegSetMenu[0].addChild(this._intRegSetMenu[4], guiOptions.childRight);
    this._intRegSetMenu[5].addChild(this._intRegSetMenu[6], guiOptions.childRight);
    this._intRegSetMenu[5].addChild(this._intRegSetMenu[7], guiOptions.childRight);
    this._intRegSetMenu[5].addChild(this._intRegSetMenu[8], guiOptions.childRight);
    this._intRegSetMenu[5].addChild(this._intRegSetMenu[9], guiOptions.childRight);
    }
    this._intReg = [new GuiButtonTxt("I0", null, null, function () { this._setActveIntReg(this._intRegIndex) }.bind(this)), new GuiButtonTxt("I1", null, null, function () { this._setActveIntReg(this._intRegIndex + 1) }.bind(this)), new GuiButtonTxt("I2", null, null, function () { this._setActveIntReg(this._intRegIndex + 2) }.bind(this))];
    if(!this._locked){
    this._intReg.forEach(item => item.addChild(this._intRegSetMenu[0], guiOptions.childTop));// this._intRegSetMenu.forEach(menu => item.addChild(menu, guiOptions.childTop)));
    this._intReg.forEach(item => item.addChild(this._intRegSetMenu[5], guiOptions.childTop));
    }
    this._intRegPlus = new GuiButtonTxt("+", function () { if (this._intRegIndex < 97) { this._intRegIndex++ }; this._updateReg() }.bind(this));
    if(!this._locked){
    this._intRegLine = [new GuiButtonTxt("I0", function () { this._lineIntReg(this._intRegIndex) }.bind(this)), new GuiButtonTxt("I1", function () { this._lineIntReg(this._intRegIndex + 1) }.bind(this)), new GuiButtonTxt("I2", function () { this._lineIntReg(this._intRegIndex + 2) }.bind(this))];
    this._intRegLine.forEach(item => item.color = this._progColor.intButton);
    }

    //Label
    this._activeLabelReg = 0;
    this._labelRegIndex = 0;
    this._labelRegMinus = new GuiButtonTxt("-", function () { if (this._labelRegIndex > 0) { this._labelRegIndex-- }; this._updateReg() }.bind(this));
    this._labelRegSetMenu = [new GuiButtonTxt("View", function () { this._viewLabelReg() }.bind(this))];
    this._labelRegSetMenu.forEach(item => item.color = this._progColor.labelButton)
    this._labelReg = [new GuiButtonTxt("L0", null, null, function () { this._setActveLabelReg(this._labelRegIndex) }.bind(this)), new GuiButtonTxt("L1", null, null, function () { this._setActveLabelReg(this._labelRegIndex + 1) }.bind(this)), new GuiButtonTxt("L2", null, null, function () { this._setActveLabelReg(this._labelRegIndex + 2) }.bind(this))];
    this._labelReg.forEach(item => this._labelRegSetMenu.forEach(menu => item.addChild(menu, guiOptions.childTop)));
    this._labelRegPlus = new GuiButtonTxt("+", function () { if (this._labelRegIndex < 97) { this._labelRegIndex++ }; this._updateReg() }.bind(this));

    this._labelRegLine = [new GuiButtonTxt("L0", function () { this._lineLabelReg(this._labelRegIndex) }.bind(this)), new GuiButtonTxt("L1", function () { this._lineLabelReg(this._labelRegIndex + 1) }.bind(this)), new GuiButtonTxt("L2", function () { this._lineLabelReg(this._labelRegIndex + 2) }.bind(this))];
    this._labelRegLine.forEach(item => item.color = this._progColor.labelButton);

    //Shape
    this._activeShapeReg = 0;
    this._shapeRegIndex = 0;
    this._shapeRegMinus = new GuiButtonTxt("-", function () { if (this._shapeRegIndex > 0) { this._shapeRegIndex-- }; this._updateReg() }.bind(this));
    
    if(!this._locked){
    this._shapeRegSetMenu = [new GuiButtonTxt("Mod", function () { this._modShapeReg(true) }.bind(this)), new GuiButtonTxt("Set", function () { this._setShapeReg() }.bind(this)), new GuiButtonTxt("Insp", function () { this._inspShapeReg() }.bind(this))];
    }else{
      this._shapeRegSetMenu = [ new GuiButtonTxt("Insp", function () { this._inspShapeReg() }.bind(this))];
   
    }
    
    
    this._shapeRegSetMenu.forEach(item => item.color = this._progColor.shapeButton)
    this._shapeReg = [new GuiButtonTxt("S0", null, null, function () {  this._setActveShapeReg(this._shapeRegIndex) }.bind(this)), new GuiButtonTxt("S1", null, null, function () { this._setActveShapeReg(this._shapeRegIndex + 1) }.bind(this)), new GuiButtonTxt("S2", null, null, function () { this._setActveShapeReg(this._shapeRegIndex + 2) }.bind(this))];
    this._shapeReg.forEach(item => this._shapeRegSetMenu.forEach(menu => item.addChild(menu, guiOptions.childTop)));
    this._shapeRegPlus = new GuiButtonTxt("+", function () { if (this._shapeRegIndex < 97) { this._shapeRegIndex++ }; this._updateReg() }.bind(this));

    if(!this._locked){
    this._shapeRegLine = [new GuiButtonTxt("S0", function () { this._lineShapeReg(this._shapeRegIndex) }.bind(this)), new GuiButtonTxt("S1", function () { this._lineShapeReg(this._shapeRegIndex + 1) }.bind(this)), new GuiButtonTxt("S2", function () { this._lineShapeReg(this._shapeRegIndex + 2) }.bind(this))];
    this._shapeRegLine.forEach(item => item.color = this._progColor.shapeButton);
    }


    this._viewShapeRegActive = false;
    this._inspShapeRegActive = false;

    //set shape
    this._shapeRegPosRot = [new GuiButtonTxt("==Pos", function () { }.bind(this)), new GuiButtonTxt("==Pos", function () { this._setActveShapeRegConfig(this._program.opType.equalPos) }.bind(this)), new GuiButtonTxt("!=Pos", function () { this._setActveShapeRegConfig(this._program.opType.notEqualPos) }.bind(this)), new GuiButtonTxt("!=Rot", function () { this._setActveShapeRegConfig(this._program.opType.notEqualRot) }.bind(this))]
    this._shapeRegPosRot[0].color = this._progColor.shapeButton;
    this._shapeRegPosRot[1].color = this._progColor.shapeButton;
    this._shapeRegPosRot[2].color = this._progColor.shapeButton;
    this._shapeRegPosRot[3].color = this._progColor.shapeButton;
    if(!this._locked){
    this._shapeRegPosRot[0].addChild(this._shapeRegPosRot[1], guiOptions.childBottom);
    this._shapeRegPosRot[0].addChild(this._shapeRegPosRot[2], guiOptions.childBottom);
    this._shapeRegPosRot[0].addChild(this._shapeRegPosRot[3], guiOptions.childBottom);
    }

    this._shapeRegPosRotInsp = new GuiButtonTxt("==Pos");
    this._shapeRegPosRotInsp.color = this._progColor.shapeButton;
    this._shapeRegEqualColorInsp = new GuiButtonTxt("==Col");
    this._shapeRegEqualColorInsp.color = this._progColor.shapeButton;


    this._shapeRegEqualColor = [new GuiButtonTxt("==Col", function () { }.bind(this)), new GuiButtonTxt("==Col", function () { this._setActveShapeRegConfig(this._program.opType.equalCol) }.bind(this)), new GuiButtonTxt("!=Col", function () { this._setActveShapeRegConfig(this._program.opType.notEqualCol) }.bind(this))]
    this._shapeRegEqualColor[0].color = this._progColor.shapeButton;
    this._shapeRegEqualColor[1].color = this._progColor.shapeButton;
    this._shapeRegEqualColor[2].color = this._progColor.shapeButton;
    if(!this._locked){
    this._shapeRegEqualColor[0].addChild(this._shapeRegEqualColor[1], guiOptions.childBottom);
    this._shapeRegEqualColor[0].addChild(this._shapeRegEqualColor[2], guiOptions.childBottom);
    }
    if(!this._locked){
    this._shapeRegReturn = new GuiButtonTxt("Ret", function () { this._setActveShapeRegReturn() }.bind(this))
    this._shapeRegSave = new GuiButtonTxt("Save", function () { this._setActveShapeRegSave() }.bind(this))
    }
    this._shapeRegInspReturn = new GuiButtonTxt("Ret", function () { this._setActveShapeRegInspReturn() }.bind(this))


    //Avatard
    this._activeAvatardReg = 0;
    this._avatardRegIndex = 0;
    this._avatardRegMinus = new GuiButtonTxt("-", function () { if (this._avatardRegIndex > 0) { this._avatardRegIndex-- }; this._updateReg() }.bind(this));
    if(!this._locked){
    this._avatardRegSetMenu = [new GuiButtonTxt("View", function () { this._viewAvatardReg(true) }.bind(this)), new GuiButtonTxt("Set", function () { this._setAvatardReg() }.bind(this))];
    this._avatardRegSetMenu.forEach(item => item.color = this._progColor.avatardButton)
    }
    this._avatardReg = [new GuiButtonTxt("A0", null, null, function () { this._setActveAvatardReg(this._avatardRegIndex) }.bind(this)), new GuiButtonTxt("A1", null, null, function () { this._setActveAvatardReg(this._avatardRegIndex + 1) }.bind(this)), new GuiButtonTxt("A2", null, null, function () { this._setActveAvatardReg(this._avatardRegIndex + 2) }.bind(this))];
    if(!this._locked){
    this._avatardReg.forEach(item => this._avatardRegSetMenu.forEach(menu => item.addChild(menu, guiOptions.childTop)));
    }
    this._avatardRegPlus = new GuiButtonTxt("+", function () { if (this._avatardRegIndex < 97) { this._avatardRegIndex++ }; this._updateReg() }.bind(this));
    if(!this._locked){
    this._avatardRegLine = [new GuiButtonTxt("A0", function () { this._lineAvatardReg(this._avatardRegIndex) }.bind(this)), new GuiButtonTxt("A1", function () { this._lineAvatardReg(this._avatardRegIndex + 1) }.bind(this)), new GuiButtonTxt("A2", function () { this._lineAvatardReg(this._avatardRegIndex + 2) }.bind(this))];
    this._avatardRegLine.forEach(item => item.color = this._progColor.avatardButton);
    }
    if(!this._locked){
    this._avatardRegReturn = new GuiButtonTxt("Ret", function () { this._setActveAvatardRegReturn() }.bind(this))
    this._avatardRegSave = new GuiButtonTxt("Save", function () { this._setActveAvatardRegSave() }.bind(this))
    }
    this._viewAvatardRegActive = false;


    // #######################################################
    //Program ----------------------------------------------
    // #######################################################

    this._programPlay = new GuiButtonTxt("Play", function () { this._play() }.bind(this));
    this._programPlaySlow = new GuiButtonTxt("Slow", function () { this._playSlow() }.bind(this));
    if(!this._locked){
    this._programStep = new GuiButtonTxt("Step", function () { this._step() }.bind(this));
    }
    this._programReset = new GuiButtonTxt("Reset", function () { this._reset() }.bind(this));
    this._programHide = new GuiButtonTxt("Hide", function () { this._hideProgram() }.bind(this));
    this._programHideForPlay = false;
    this._playTimer = null;
    this._stepEnd = false;


    this._activeProcedure = 0;

    this._procedureIndex = 0;
    this._procedureMinus = new GuiButtonTxt("-", function () { if (this._procedureIndex > 0) { this._procedureIndex-- }; this._updateReg() }.bind(this));
    this._procedure = [new GuiButtonTxt("P0", function () { this._setActveProcedure(this._procedureIndex) }.bind(this)), new GuiButtonTxt("P1", function () { this._setActveProcedure(this._procedureIndex + 1) }.bind(this)), new GuiButtonTxt("P2", function () { this._setActveProcedure(this._procedureIndex + 2) }.bind(this))];
    this._procedurePlus = new GuiButtonTxt("+", function () { if (this._procedureIndex < 97) { this._procedureIndex++ }; this._updateReg() }.bind(this));
    this._procedureLine = [new GuiButtonTxt("P0", function () { this._lineProcedure(this._procedureIndex) }.bind(this)), new GuiButtonTxt("P1", function () { this._lineProcedure(this._procedureIndex + 1) }.bind(this)), new GuiButtonTxt("P2", function () { this._lineProcedure(this._procedureIndex + 2) }.bind(this))];
    this._procedureLine.forEach(item => item.color = this._progColor.procedureButton);


    this._activeProgramLine = -1;
    this._activeColumn = 0;
    this._activeLine = 0;
    this._lineIndex = 0;
    this._lineMinus = new GuiButtonTxt("-", function () { if (this._lineIndex > 0) { this._lineIndex -= this._rowDisp }; this._updateLine() }.bind(this));
    this._linePlus = new GuiButtonTxt("+", function () { if (this._lineIndex < 97) { this._lineIndex += this._rowDisp }; this._updateLine() }.bind(this));

    this._lineMenuBISA = [new GuiButtonTxt("B"), new GuiButtonTxt("I"), new GuiButtonTxt("S"), new GuiButtonTxt("A")];
    this._lineMenuBISA[0].color = this._progColor.boolButton;
    this._lineMenuBISA[1].color = this._progColor.intButton;
    this._lineMenuBISA[2].color = this._progColor.shapeButton;
    this._lineMenuBISA[3].color = this._progColor.avatardButton;
    if(!this._locked){
    this._boolRegLine.forEach(item => this._lineMenuBISA[0].addChild(item, guiOptions.childRight));
 
    this._intRegLine.forEach(item => this._lineMenuBISA[1].addChild(item, guiOptions.childRight));
    this._shapeRegLine.forEach(item => this._lineMenuBISA[2].addChild(item, guiOptions.childRight));
    this._avatardRegLine.forEach(item => this._lineMenuBISA[3].addChild(item, guiOptions.childRight));
  }

    this._lineMenuGameSleep = [new GuiButtonTxt("World", function () { this._lineWorld() }.bind(this)), new GuiButtonTxt("Game", function () { this._lineGame() }.bind(this)), new GuiButtonTxt("Sleep", function () { this._lineSleep() }.bind(this))]
    this._lineMenuGameSleep[0].color = this._progColor.worldButton;
    this._lineMenuGameSleep[1].color = this._progColor.gameButton;
    this._lineMenuGameSleep[2].color = this._progColor.sleepButton;

    this._lineMenuGameSleep[0].addChild(this._lineMenuGameSleep[1], guiOptions.childBottom)


    this._lineMenuJumpReturn = [new GuiButtonTxt("Jump", function () { this._lineJump() }.bind(this)), new GuiButtonTxt("Call", function () { this._lineCall() }.bind(this)), new GuiButtonTxt("Ret", function () { this._lineReturn() }.bind(this))]
    this._lineMenuJumpReturn[0].color = this._progColor.jumpButton;
    this._lineMenuJumpReturn[1].color = this._progColor.callButton;
    this._lineMenuJumpReturn[2].color = this._progColor.returnButton;

    this._lineMenuJumpReturn[0].addChild(this._lineMenuJumpReturn[1], guiOptions.childBottom);
    this._lineMenuJumpReturn[0].addChild(this._lineMenuJumpReturn[2], guiOptions.childBottom);


    this._lineMenuJumpReturn2 = [new GuiButtonTxt("Jump", function () { this._lineEqNotEq(this._program.opType.jump) }.bind(this)), new GuiButtonTxt("Call", function () { this._lineEqNotEq(this._program.opType.call) }.bind(this)), new GuiButtonTxt("Ret", function () { this._lineEqNotEq(this._program.opType.return) }.bind(this))]
    this._lineMenuJumpReturn2[0].color = this._progColor.jumpButton;
    this._lineMenuJumpReturn2[1].color = this._progColor.callButton;
    this._lineMenuJumpReturn2[2].color = this._progColor.returnButton;


    this._lineMenuAddDel = [new GuiButtonTxt("Add", function () { this._lineAdd() }.bind(this)), new GuiButtonTxt("", function () { this._lineEmpty(this._program.opType.call) }.bind(this)), new GuiButtonTxt("Del", function () { this._lineDel() }.bind(this))]
    this._lineMenuAddDel[0].color = this._progColor.addDelButton;
    this._lineMenuAddDel[1].color = this._progColor.addDelButton;
    this._lineMenuAddDel[2].color = this._progColor.addDelButton;

    this._lineMenuAddDel[0].addChild(this._lineMenuAddDel[1], guiOptions.childLeft);
    this._lineMenuAddDel[0].addChild(this._lineMenuAddDel[2], guiOptions.childRight);


    this._lineMenuTrueFalse = [new GuiButtonTxt("true", function () { this._lineTrueFalse(true) }.bind(this)), new GuiButtonTxt("false", function () { this._lineTrueFalse(false) }.bind(this))];
    this._lineMenuTrueFalse.forEach(item => item.color = this._progColor.boolButton)


    this._lineMenuIfLabel = [new GuiButtonTxt("If", function () { this._lineIf() }.bind(this)), new GuiButtonTxt("Label", function () { this._lineLabel() }.bind(this))]
    this._lineMenuIfLabel[0].color = this._progColor.ifButton;
    this._lineMenuIfLabel[1].color = this._progColor.labelButton;


    this._line = [];
    for (let row = 0; row < this._rowDisp; row++) {
      this._line[row] = { col: [] }
      for (let col = 0; col < 4; col++) {
        this._line[row].col.push(new GuiButtonTxt("", null, null, function () { this._setActveLine(this._lineIndex + row, col) }.bind(this)));

      }
      this._line[row].col[0].txt = row
      if(!this._locked){
      this._line[row].col[0].addChild(this._lineMenuJumpReturn[0], guiOptions.childRight);
      this._lineMenuIfLabel.forEach(item => this._line[row].col[0].addChild(item, guiOptions.childRight));

      this._line[row].col[0].addChild(this._lineMenuAddDel[0], guiOptions.childTop);
      this._line[row].col[0].addChild(this._lineMenuGameSleep[0], guiOptions.childLeft);
      this._line[row].col[0].addChild(this._lineMenuGameSleep[2], guiOptions.childLeft);
      this._lineMenuBISA.forEach(item => this._line[row].col[0].addChild(item, guiOptions.childBottom));
      }

    }

    this._lineVisible = [];
    for (let row = 0; row < this._rowDisp; row++) {
      this._lineVisible[row] = { col: [] }
      this._lineVisible[row].col[0] = true;
      this._lineVisible[row].col[1] = false;
      this._lineVisible[row].col[2] = false;
      this._lineVisible[row].col[3] = false;
    }


    this._lineMenuEqNotEq = [new GuiButtonTxt("==", function () { this._lineEqNotEq(this._program.opType.equal) }.bind(this)), new GuiButtonTxt("!=", function () { this._lineEqNotEq(this._program.opType.notEqual) }.bind(this))];
    this._lineMenuEqNotEq[0].color = this._progColor.boolButton;
    this._lineMenuEqNotEq[1].color = this._progColor.boolButton;

    this._lineMenuEqSmaller = [];
    this._lineMenuEqSmaller[0] = this._lineMenuEqNotEq[0];
    this._lineMenuEqSmaller[1] = this._lineMenuEqNotEq[1];
    this._lineMenuEqSmaller.push(new GuiButtonTxt(">", function () { this._lineEqNotEq(this._program.opType.greater) }.bind(this)));
    this._lineMenuEqSmaller.push(new GuiButtonTxt("<", function () { this._lineEqNotEq(this._program.opType.smaller) }.bind(this)));
    this._lineMenuEqSmaller[2].color = this._progColor.boolButton;
    this._lineMenuEqSmaller[3].color = this._progColor.boolButton;

    this._lineMenuBlockCan = [new GuiButtonTxt("Block", function () { this._lineEqNotEq(this._program.opType.block) }.bind(this)), new GuiButtonTxt("Can", function () { this._lineEqNotEq(this._program.opType.can) }.bind(this))];
    this._lineMenuBlockCan[0].color = this._progColor.avatardButton;
    this._lineMenuBlockCan[1].color = this._progColor.avatardButton;

    this._lineMenuForwardDown = [new GuiButtonTxt("Forw", function () { this._lineEqNotEq(this._program.opType.forward) }.bind(this)), new GuiButtonTxt("Up", function () { this._lineEqNotEq(this._program.opType.up) }.bind(this)), new GuiButtonTxt("Down", function () { this._lineEqNotEq(this._program.opType.down) }.bind(this))];
    this._lineMenuForwardDown[0].color = this._progColor.avatardButton;
    this._lineMenuForwardDown[1].color = this._progColor.avatardButton;
    this._lineMenuForwardDown[2].color = this._progColor.avatardButton;

    this._lineMenuLeftRight = [new GuiButtonTxt("Right", function () { this._lineEqNotEq(this._program.opType.right) }.bind(this)), new GuiButtonTxt("Left", function () { this._lineEqNotEq(this._program.opType.left) }.bind(this))];
    this._lineMenuLeftRight[0].color = this._progColor.avatardButton;
    this._lineMenuLeftRight[1].color = this._progColor.avatardButton;

    this._lineMenuNumber = [new GuiButtonTxt("0", function () { this._lineNumber(0) }.bind(this)), new GuiButtonTxt("1", function () { this._lineNumber(1) }.bind(this)), new GuiButtonTxt("2", function () { this._lineNumber(2) }.bind(this)), new GuiButtonTxt("3", function () { this._lineNumber(3) }.bind(this)), new GuiButtonTxt("4", function () { this._lineNumber(4) }.bind(this)), new GuiButtonTxt("5", function () { this._lineNumber(5) }.bind(this)), new GuiButtonTxt("6", function () { this._lineNumber(6) }.bind(this)), new GuiButtonTxt("7", function () { this._lineNumber(7) }.bind(this)), new GuiButtonTxt("8", function () { this._lineNumber(8) }.bind(this)), new GuiButtonTxt("9", function () { this._lineNumber(9) }.bind(this))];
    this._lineMenuNumber.forEach(item => item.color = this._progColor.intButton)
    this._lineMenuNumber[0].addChild(this._lineMenuNumber[1], guiOptions.childRight);
    this._lineMenuNumber[0].addChild(this._lineMenuNumber[2], guiOptions.childRight);
    this._lineMenuNumber[0].addChild(this._lineMenuNumber[3], guiOptions.childRight);
    this._lineMenuNumber[0].addChild(this._lineMenuNumber[4], guiOptions.childRight);
    this._lineMenuNumber[5].addChild(this._lineMenuNumber[6], guiOptions.childRight);
    this._lineMenuNumber[5].addChild(this._lineMenuNumber[7], guiOptions.childRight);
    this._lineMenuNumber[5].addChild(this._lineMenuNumber[8], guiOptions.childRight);
    this._lineMenuNumber[5].addChild(this._lineMenuNumber[9], guiOptions.childRight);

    this._lineMenuPlusMinus = [new GuiButtonTxt("+", function () { this._linePlusMinus(this._program.opType.plus) }.bind(this)), new GuiButtonTxt("-", function () { this._linePlusMinus(this._program.opType.minus) }.bind(this))];
    this._lineMenuPlusMinus[0].color = this._progColor.intButton;
    this._lineMenuPlusMinus[1].color = this._progColor.intButton;

    this._lineMenuPlusUni = [];
    this._lineMenuPlusUni[0] = this._lineMenuPlusMinus[0]
    this._lineMenuPlusUni[1] = this._lineMenuPlusMinus[1]
    this._lineMenuPlusUni[2] = new GuiButtonTxt("Uni", function () { this._linePlusMinus(this._program.opType.uni) }.bind(this)),
      this._lineMenuPlusUni[2].color = this._progColor.intButton;

    this._lineMenuWorld = [new GuiButtonTxt("World", function () { this._lineWorld(this._program.opType.world) }.bind(this))]
    this._lineMenuWorld[0].color = this._progColor.worldButton;

    this._lineMenuPosRot = [new GuiButtonTxt("==Pos", function () { this._linePosRot(this._program.opType.equalPos) }.bind(this)), new GuiButtonTxt("!=Pos", function () { this._linePosRot(this._program.opType.notEqualPos) }.bind(this)), new GuiButtonTxt("!=Rot", function () { this._linePosRot(this._program.opType.notEqualRot) }.bind(this))]
    this._lineMenuPosRot[0].color = this._progColor.shapeButton;
    this._lineMenuPosRot[1].color = this._progColor.shapeButton;
    this._lineMenuPosRot[2].color = this._progColor.shapeButton;
    this._lineMenuPosRot[0].addChild(this._lineMenuPosRot[1], guiOptions.childRight);
    this._lineMenuPosRot[0].addChild(this._lineMenuPosRot[2], guiOptions.childRight);

    this._lineMenuEqualColor = [new GuiButtonTxt("==Col", function () { this._lineEqualColor(this._program.opType.equalCol) }.bind(this)), new GuiButtonTxt("!=Col", function () { this._lineEqualColor(this._program.opType.notEqualCol) }.bind(this))]
    this._lineMenuEqualColor[0].color = this._progColor.shapeButton;
    this._lineMenuEqualColor[1].color = this._progColor.shapeButton;

    this._lineMenuColor = [new GuiButtonTxt("Black", function () { this._lineColor(this._program.opType.black) }.bind(this)), new GuiButtonTxt("Red", function () { this._lineColor(this._program.opType.red) }.bind(this)), new GuiButtonTxt("Green", function () { this._lineColor(this._program.opType.green) }.bind(this)), new GuiButtonTxt("Blue", function () { this._lineColor(this._program.opType.blue) }.bind(this))]
    this._lineMenuColor[0].color = this._progColor.blackButton;
    this._lineMenuColor[1].color = this._progColor.redButton;
    this._lineMenuColor[2].color = this._progColor.greenButton;
    this._lineMenuColor[3].color = this._progColor.blueButton;

    this._lineMenuShapeEmpty =  new GuiButtonTxt("Empt", function () { this._lineShapeEmpty(this._program.opType.shapeEmpty) }.bind(this)),
    this._lineMenuShapeEmpty.color = this._progColor.shapeButton; 

    this._show();

    this._updateLine();
    this._updateReg();

  }


  _play() {
    if(this._stepEnd){
      this._reset();
      this._playTimer = setInterval(this._step.bind(this), 50);
    }else if(this._playTimer == null){
      this._playTimer = setInterval(this._step.bind(this), 50);
    }else{
      clearTimeout(this._playTimer);
      this._playTimer = null;
    }
  }

  _playSlow() {
    if(this._stepEnd){
      this._reset();
      this._step();
      this._playTimer = setInterval(this._step.bind(this), 2000);
    }else if(this._playTimer == null){
      this._step();
      this._playTimer = setInterval(this._step.bind(this), 2000);
    }else{
      clearTimeout(this._playTimer);
      this._playTimer = null;
    }
  }
  _step() {

    if (this._program.step()) {
      if (this._activeProgramLine == this._program.activeLine && this._activeProcedure == this._program.activeProcedure) {
        this._sleepTick++;

        if (this._sleepTick == 5) {
          this._line[this._activeProgramLine].col[0].hideBorder();
        } else if (this._sleepTick == 10) {
          this._sleepTick = 0;
          this._line[this._activeProgramLine].col[0].showBorder();
        }

        return;
      }

      this._sleepTick = 0;

      if (this._activeProgramLine > -1) {
        this._line[this._activeProgramLine].col[0].hideBorder();
      }

      this._activeProgramLine = this._program.activeLine % this._rowDisp;

      if (this._activeProgramLine < 0) {
        this._activeProgramLine = 0;
      }

      if (this._lineIndex != this._rowDisp * Math.floor(this._program.activeLine / this._rowDisp)) {
        this._lineIndex = this._rowDisp * Math.floor(this._program.activeLine / this._rowDisp);
        if (this._lineIndex < 0) {
          this._lineIndex = 0;
        }
        this._updateLine();
      }

      if (this._activeProcedure != this._program.activeProcedure) {
        this._activeProcedure = this._program.activeProcedure;
        this._updateLine();
      }

      this._updateReg();
      this._line[this._activeProgramLine].col[0].showBorder();
    }else{
      this._stepEnd = true;
    }

  }

  _reset() {
    if (this._activeProgramLine != -1) {
      this._line[this._activeProgramLine].col[0].hideBorder();
    }
 
    clearTimeout(this._playTimer);
    this._playTimer = null;
    this._stepEnd = false;

    this._program.reset();
    this._sleepTick = 0;

    this._game.show({});
    this._updateReg();

    this._activeProgramLine = -1;

  }

  _lineEmpty() {
    this._program._procedure[this._activeProcedure].line[this._activeLine].length
    this._program._procedure[this._activeProcedure].line[this._activeLine] = null;
    this._updateLine();

  }
  _lineAdd() {
    this._program._procedure[this._activeProcedure].line.splice(this._activeLine, 0, null);
    this._updateLine();

  }
  _lineDel() {
    this._program._procedure[this._activeProcedure].line.splice(this._activeLine, 1);

    this._updateLine();

  }


  _lineLabel() {
    switch (this._activeColumn) {
      case 0:

        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comLabel({});
        break;

    }
    this._updateLine();

  }


  _lineTrueFalse(trueFalse) {

    switch (this._activeColumn) {
      case 3:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comBool({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, right: trueFalse, rightType: this._program.opType.trueFalse });
        break;
    }
    this._updateLine();
  }

  _lineIf() {
    switch (this._activeColumn) {
      case 0:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comIf({});
        break;

    }
    this._updateLine();
  }


  _lineJump() {
    switch (this._activeColumn) {
      case 0:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comJump({});
        break;

    }
    this._updateLine();
  }

  _lineCall() {
    switch (this._activeColumn) {
      case 0:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comCall({});
        break;

    }
    this._updateLine();
  }

  _lineReturn() {
    switch (this._activeColumn) {
      case 0:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comReturn({});
        break;
    }
    this._updateLine();
  }

  _lineGame(no) {


    switch (this._activeColumn) {
      case 0:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comGame({});
        break;
    }
    this._updateLine();
  }

  _lineWorld(no) {
    switch (this._activeColumn) {
      case 0:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comWorld({});
        break;

      case 1:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comShape({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: no, leftType: this._program.opType.world });
        break;
    }
    this._updateLine();
  }


  _lineSleep(no) {

    switch (this._activeColumn) {
      case 0:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comSleep({});
        break;
    }
    this._updateLine();
  }


  _lineBoolReg(no) {

    switch (this._activeColumn) {
      case 0:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comBool({ regNo: no });
        break;

      case 1:
        if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comIf) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comIf({ left: no });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comBool) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comBool({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: no, leftType: this._program.opType.bool });
        }
        break;

      case 3:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comBool({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, right: no, rightType: this._program.opType.bool });
        break;
    }
    this._updateLine();
  }

  _lineEqNotEq(op) {

    switch (this._activeColumn) {
      case 1:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comAvatard({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: op, leftType: op });
        break;
      case 2:
        if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comIf) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comIf({ left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, operator: op });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comBool) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comBool({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: op });
        }
        break;
      case 3:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comBool({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, right: op, rightType: op });
        break;

    }
    this._updateLine();
  }

  _linePosRot(op) {
    this._program._procedure[this._activeProcedure].line[this._activeLine] = new comShape({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: op, leftType: op });
    this._updateLine();
  }

  _lineEqualColor(op) {
    this._program._procedure[this._activeProcedure].line[this._activeLine] = new comShape({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: op, operatorType: op });
    this._updateLine();
  }

  _lineShapeEmpty(op) {  
    this._program._procedure[this._activeProcedure].line[this._activeLine] = new comBool({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, right: op, rightType: op });
    this._updateLine();
  }

  _lineColor(op) {

    switch (this._activeColumn) {
      case 1:
        if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comWorld) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comWorld({ left: op, leftType: op });
        }
        else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comAvatard) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comAvatard({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: op, leftType: op });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comShape) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comShape({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: op, leftType: op });
        }
        break;
      case 3:
        if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comBool) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comBool({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, right: op, rightType: op });
        }
        break;
    }
    this._updateLine();
  }


  _linePlusMinus(op) {

    switch (this._activeColumn) {
      case 2:
        if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comShape) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comShape({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: op, operatorType: op });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comInt) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comInt({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: op });
        }
        break;
    }
    this._updateLine();
  }

  _lineNumber(no) {

    switch (this._activeColumn) {
      case 1:
        if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comSleep) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comSleep({ left: no, leftType: this._program.opType.number });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comAvatard) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comAvatard({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: no, leftType: this._program.opType.number });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comShape) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comShape({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: no, leftType: this._program.opType.number });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comInt) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comInt({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: no, leftType: this._program.opType.number });
        }
        break;
      case 2:
        if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comSleep) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comSleep({ left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: no, operatorType: this._program.opType.number });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comAvatard) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comAvatard({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: no, operatorType: this._program.opType.number });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comShape) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comShape({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: no, operatorType: this._program.opType.number });
        }
        break;
      case 3:
        if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comBool) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comBool({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, right: no, rightType: this._program.opType.number });
        }
        else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comAvatard) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comAvatard({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, operatorType: this._program._procedure[this._activeProcedure].line[this._activeLine].operatorType, right: no, rightType: this._program.opType.number });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comShape) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comShape({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, operatorType: this._program._procedure[this._activeProcedure].line[this._activeLine].operatorType, right: no, rightType: this._program.opType.number });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comInt) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comInt({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, right: no, rightType: this._program.opType.number });
        }
        break;
    }
    this._updateLine();
  }

  _lineIntReg(no) {

    switch (this._activeColumn) {
      case 0:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comInt({ regNo: no });
        break;
      case 1:
        if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comInt) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comInt({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: no, leftType: this._program.opType.int });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comBool) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comBool({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: no, leftType: this._program.opType.int });
        }
        break;
      case 3:
        if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comInt) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comInt({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, right: no, rightType: this._program.opType.int });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comBool) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comBool({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, right: no, rightType: this._program.opType.int });
        }
        break;
    }
    this._updateLine();
  }

  _lineLabelReg(no) {

    switch (this._activeColumn) {
      case 1:
        if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comLabel) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comLabel({ left: no });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comCall) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comCall({ left: no, leftType: this._program.opType.label });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comJump) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comJump({ left: no, leftType: this._program.opType.label });
        }
        break;
      case 3:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comIf({ left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, right: no, rightType: this._program.opType.label });
        break;
    }
    this._updateLine();
  }

  _lineShapeReg(no) {

    switch (this._activeColumn) {
      case 0:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comShape({ regNo: no });
        break;
      case 1:
        if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comWorld) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comWorld({ left: no, leftType: this._program.opType.shape });
        }
        else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comGame) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comGame({ left: no, leftType: this._program.opType.shape });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comShape) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comShape({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: no, leftType: this._program.opType.shape });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comBool) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comBool({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: no, leftType: this._program.opType.shape });
        }
        break;
      case 3:
        if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comShape) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comShape({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, operatorType: this._program._procedure[this._activeProcedure].line[this._activeLine].operatorType, right: no, rightType: this._program.opType.shape });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comBool) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comBool({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, right: no, rightType: this._program.opType.shape });
        }
        break;
    }
    this._updateLine();
  }

  _lineAvatardReg(no) {

    switch (this._activeColumn) {
      case 0:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comAvatard({ regNo: no });
        break;
      case 1:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comBool({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: no, leftType: this._program.opType.avatard });
        break;
      case 3:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comBool({ regNo: this._program._procedure[this._activeProcedure].line[this._activeLine].regNo, left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, leftType: this._program._procedure[this._activeProcedure].line[this._activeLine].leftType, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, right: no, rightType: this._program.opType.avatard });
        break;
    }
    this._updateLine();
  }

  _lineProcedure(no) {

    switch (this._activeColumn) {
      case 1:
        if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comCall) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comCall({ left: no, leftType: this._program.opType.procedure });
        } else if (this._program._procedure[this._activeProcedure].line[this._activeLine] instanceof comJump) {
          this._program._procedure[this._activeProcedure].line[this._activeLine] = new comJump({ left: no, leftType: this._program.opType.procedure });
        }
        break;
      case 3:
        this._program._procedure[this._activeProcedure].line[this._activeLine] = new comIf({ left: this._program._procedure[this._activeProcedure].line[this._activeLine].left, operator: this._program._procedure[this._activeProcedure].line[this._activeLine].operator, right: no, rightType: this._program.opType.procedure });
        break;
    }
    this._updateLine();
  }

  _setActveProcedure(no) {
    this._lineIndex = 0;
    this._activeProcedure = no;
    this._updateLine();
    this._updateReg();

  }

  _setActveBoolReg(no) {
    this._activeBoolReg = no;
  }

  _setActveIntReg(no) {
    this._activeIntReg = no;
  }

  _setActveLabelReg(no) {
    this._activeLabelReg = no;
  }

  _setActveShapeReg(no) {
    this._activeShapeReg = no;
  }

  _setActveAvatardReg(no) {
    this._activeAvatardReg = no;
  }



  _setActveShapeRegSave() {

    colorWheel.disenable();

    ProgrammingProgram.shapeReg[this._activeShapeReg] = BlockPixel.convertBlock(world.block);

    this._shapeRegPosRot[0].setNotVisible();
    this._shapeRegEqualColor[0].setNotVisible();
    this._shapeRegReturn.setNotVisible();
    this._shapeRegSave.setNotVisible();

    this._show();
    this._updateLine();

  }


  _setActveAvatardRegSave() {

    colorWheel.disenable();

    ProgrammingProgram.avatardReg[this._activeAvatardReg] = world.block;

    this._avatardRegReturn.setNotVisible();
    this._avatardRegSave.setNotVisible();

    this._show();
    this._updateLine();



  }

  _setActveShapeRegReturn() {

    colorWheel.disenable();

    this._shapeRegPosRot[0].setNotVisible();
    this._shapeRegEqualColor[0].setNotVisible();
    this._shapeRegReturn.setNotVisible();
    this._shapeRegSave.setNotVisible();

    this._show();
    this._updateLine();

    this._viewShapeRegActive = false;
    this._game.show({});

  }

  _setActveShapeRegInspReturn() {

    this._shapeRegPosRotInsp.setNotVisible();
    this._shapeRegEqualColorInsp.setNotVisible();
    this._shapeRegInspReturn.setNotVisible();

    this._show();
    this._updateLine();
    this._inspShapeRegActive = false;

    this._game.show({});

  }




  _setActveAvatardRegReturn() {

    colorWheel.disenable();

    this._avatardRegReturn.setNotVisible();
    this._avatardRegSave.setNotVisible();

    this._show();
    this._updateLine();

    this._viewAvatardRegActive = false;
    this._game.show({});

  }

  _setActveShapeRegConfig(op) {

    switch (op) {
      case this._program.opType.equalPos:
        this._program.shapeRegConfigPos[this._activeShapeReg] = op;
        this._shapeRegPosRot[0].txt = "==Pos";
        break;
      case this._program.opType.notEqualPos:
        this._program.shapeRegConfigPos[this._activeShapeReg] = op;
        this._shapeRegPosRot[0].txt = "!=Pos";
        break;

      case this._program.opType.notEqualRot:
        this._program.shapeRegConfigPos[this._activeShapeReg] = op;
        this._shapeRegPosRot[0].txt = "!=Rot";
        break;

      case this._program.opType.equalCol:
        this._program.shapeRegConfigCol[this._activeShapeReg] = op;
        this._shapeRegEqualColor[0].txt = "==Col";
        break;
      case this._program.opType.notEqualCol:
        this._program.shapeRegConfigCol[this._activeShapeReg] = op;
        this._shapeRegEqualColor[0].txt = "!=Col";
        break;
    }

  }


  _setActveLine(no, col) {
    this._activeLine = no;
    this._activeColumn = col;

  }


  _setBoolReg(val) {
    this._reset();
    this._program.boolReg[this._activeBoolReg] = val;
    this._updateReg();

  }

  _setIntReg(val) {
    this._reset();
    this._program.intReg[this._activeIntReg] = val;
    this._updateReg();

  }

  _viewLabelReg() {

    if (ProgrammingProgram.labelReg[this._activeLabelReg] != null) {
      this._lineIndex = Math.floor(ProgrammingProgram.labelReg[this._activeLabelReg] / this._rowDisp) * this._rowDisp
      this._activeProcedure = ProgrammingProgram.labelRegProcedure[this._activeLabelReg];
      this._updateLine();
      this._updateReg();
    }

  }


  _setShapeReg() {
    this._reset();

    this.hide();

    colorWheel.colorComplete();

    this._setActveShapeRegConfig(this._program.shapeRegConfigPos[this._activeShapeReg]);
    this._setActveShapeRegConfig(this._program.shapeRegConfigCol[this._activeShapeReg]);

    this._shapeRegPosRot[0].setVisible(-1, 1, guiOptions.center, guiOptions.top);
    this._shapeRegEqualColor[0].setVisible(1, 1, guiOptions.center, guiOptions.top);


    this._shapeRegReturn.setVisible(-1, -1, guiOptions.center, guiOptions.bottom);
    this._shapeRegSave.setVisible(1, -1, guiOptions.center, guiOptions.bottom);




  }

  _inspShapeReg() {
    this.hide();

    switch (this._program.shapeRegConfigPos[this._activeShapeReg]) {
      case this._program.opType.equalPos:
        this._shapeRegPosRotInsp.txt = "==Pos";
        break;

      case this._program.opType.notEqualPos:
        this._shapeRegPosRotInsp.txt = "!=Pos";
        break;

      case this._program.opType.notEqualRot:
        this._shapeRegPosRotInsp.txt = "!=Rot";
        break;
    }

    switch (this._program.shapeRegConfigCol[this._activeShapeReg]) {
      case this._program.opType.equalCol:
        this._shapeRegEqualColorInsp.txt = "==Col";
        break;
      case this._program.opType.notEqualCol:
        this._shapeRegEqualColorInsp.txt = "!=Col";
        break;

    }

    this._shapeRegPosRotInsp.setVisible(-1, 1, guiOptions.center, guiOptions.top);
    this._shapeRegEqualColorInsp.setVisible(1, 1, guiOptions.center, guiOptions.top);

    this._shapeRegInspReturn.setVisible(-1, -1, guiOptions.center, guiOptions.bottom);
    this._inspShapeRegActive = true;

    this.update();

  }

  _modShapeReg() {

    this._reset();

    this.hide();

    this._setActveShapeRegConfig(this._program.shapeRegConfigPos[this._activeShapeReg]);
    this._setActveShapeRegConfig(this._program.shapeRegConfigCol[this._activeShapeReg]);

    this._shapeRegPosRot[0].setVisible(-1, 1, guiOptions.center, guiOptions.top);
    this._shapeRegEqualColor[0].setVisible(1, 1, guiOptions.center, guiOptions.top);

    this._shapeRegReturn.setVisible(-1, -1, guiOptions.center, guiOptions.bottom);

    this._viewShapeRegActive = true;
    this.update();

  }

  update() {

    if (this._viewShapeRegActive) {
      let set = Block.calcSet({ left: BlockPixel.convertBlock(world.block), right: ProgrammingProgram.shapeReg[this._activeShapeReg], careColor: false, careRotation: false });

      this._game.show({ block: set.diffRight, careColor: true });

      set.intersectionRight.forEach(function (item) {
        let find = set.intersectionLeft.find(element => element.equal({ block: item, careColor: false }));
        find.setBlockColor({ color: item.color[0], colorComplete: false });
      })

    } else if (this._inspShapeRegActive) {
      this._game.show({ block: ProgrammingProgram.shapeReg[this._activeShapeReg], careColor: true });
    } else if (this._viewAvatardRegActive) {
      let set = Block.calcSet({ left: world.block, right: ProgrammingProgram.avatardReg[this._activeAvatardReg], careColor: false, careRotation: false });

      this._game.show({ block: set.diffRight, careColor: true });
      Block.copyColor({ to: world.block, from: ProgrammingProgram.avatardReg[this._activeAvatardReg], careRotation: false });
    }

  }

  _setAvatardReg() {

    this._reset();

    this.hide();

    colorWheel.colorComplete();

    this._avatardRegReturn.setVisible(-1, -1, guiOptions.center, guiOptions.bottom);
    this._avatardRegSave.setVisible(1, -1, guiOptions.center, guiOptions.bottom);

  }

  _viewAvatardReg() {

    this._reset();

    this.hide();

    this._avatardRegReturn.setVisible(-1, -1, guiOptions.center, guiOptions.bottom);

    this._viewAvatardRegActive = true;
    this.update();

  }

  _show() {

    this._programPlay.setVisible(5, 4, guiOptions.center, guiOptions.center);
    this._programPlaySlow.setVisible(6, 4, guiOptions.center, guiOptions.center);
    if(!this._locked){
    this._programStep.setVisible(7, 4, guiOptions.center, guiOptions.center);
    }
    this._programReset.setVisible(8, 4, guiOptions.center, guiOptions.center);
    this._programHide.setVisible(-9, -3, guiOptions.center, guiOptions.center);

    this._boolRegMinus.setVisible(-8, 3, guiOptions.center, guiOptions.center);
    this._boolRegPlus.setVisible(-4, 3, guiOptions.center, guiOptions.center);
    this._boolReg.forEach(function (item, index) { item.txt = "B" + (index + this._boolRegIndex); item.setVisible(-7 + index, 3, guiOptions.center, guiOptions.center) }.bind(this));

    this._intRegMinus.setVisible(-2, 3, guiOptions.center, guiOptions.center);
    this._intRegPlus.setVisible(2, 3, guiOptions.center, guiOptions.center);
    this._intReg.forEach(function (item, index) { item.txt = "I" + (index + this._intRegIndex); item.setVisible(-1 + index, 3, guiOptions.center, guiOptions.center) }.bind(this));

    this._labelRegMinus.setVisible(4, 3, guiOptions.center, guiOptions.center);
    this._labelRegPlus.setVisible(8, 3, guiOptions.center, guiOptions.center);
    this._labelReg.forEach(function (item, index) { item.txt = "L" + (index + this._labelRegIndex); item.setVisible(5 + index, 3, guiOptions.center, guiOptions.center) }.bind(this));

    this._shapeRegMinus.setVisible(-8, 4, guiOptions.center, guiOptions.center);
    this._shapeRegPlus.setVisible(-4, 4, guiOptions.center, guiOptions.center);
    this._shapeReg.forEach(function (item, index) { item.txt = "S" + (index + this._shapeRegIndex); item.setVisible(-7 + index, 4, guiOptions.center, guiOptions.center) }.bind(this));

    this._avatardRegMinus.setVisible(-2, 4, guiOptions.center, guiOptions.center);
    this._avatardRegPlus.setVisible(2, 4, guiOptions.center, guiOptions.center);
    this._avatardReg.forEach(function (item, index) { item.txt = "A" + (index + this._avatardRegIndex); item.setVisible(-1 + index, 4, guiOptions.center, guiOptions.center) }.bind(this));

    this._procedureMinus.setVisible(9, -3, guiOptions.center, guiOptions.center);
    this._procedurePlus.setVisible(9, 1, guiOptions.center, guiOptions.center);
    this._procedure.forEach(function (item, index) { item.txt = "P" + (index + this._avatardRegIndex); item.setVisible(9, -2 + index, guiOptions.center, guiOptions.center) }.bind(this));

    this._lineMinus.setVisible(-9, 0, guiOptions.center, guiOptions.center);
    this._linePlus.setVisible(-9, 1, guiOptions.center, guiOptions.center);
    this._line.forEach(function (item, index) { item.col[0].setVisible(-7 + Math.floor(index / 5) * 5, -3 + (index % 5), guiOptions.center, guiOptions.center) }.bind(this));

    this._updateReg();
  }

  _lineSetVisible(index, col) {
    for (let i = 0; i <= col; i++) {
      this._line[index].col[i].setVisible(-7 + i + Math.floor((index) / 5) * 5, -3 + (index % 5), guiOptions.center, guiOptions.center);
    }
    for (let i = col + 1; i < 4; i++) {
      this._line[index].col[i].setNotVisible();
    }
  }

  _updateLine() {

    for (let i = this._lineIndex; i < this._lineIndex + this._rowDisp; i++) {
      let l = i - this._lineIndex;
      this._line[l].col[0].hideBorder();

      breakOut:
      if (this._program._procedure[this._activeProcedure].line[i] == null) {

        this._line[l].col[0].color = this._progColor.na;
        this._line[l].col[0].txt = "" + i;
        this._lineSetVisible(l, 0);

      } else if (this._program._procedure[this._activeProcedure].line[i] instanceof comBool) {

        this._line[l].col[0].color = this._progColor.bool;
        this._line[l].col[0].txt = "B" + this._program._procedure[this._activeProcedure].line[i].regNo;
        this._line[l].col[1].removeChildren();
        this._lineMenuBISA.forEach(item => this._line[l].col[1].addChild(item, guiOptions.childBottom))

        //------------------- 1
        if (this._program._procedure[this._activeProcedure].line[i].left == null) {
          this._line[l].col[1].color = this._progColor.na;
          this._line[l].col[1].txt = "";

          this._lineSetVisible(l, 1);
        } else {
          this._line[l].col[2].removeChildren();
          switch (this._program._procedure[this._activeProcedure].line[i].leftType) {
            case this._program.opType.bool:
              this._line[l].col[1].color = this._progColor.bool;
              this._line[l].col[1].txt = "B" + this._program._procedure[this._activeProcedure].line[i].left;
              this._lineMenuEqNotEq.forEach(item => this._line[l].col[2].addChild(item, guiOptions.childBottom))
              break;
            case this._program.opType.int:
              this._line[l].col[1].color = this._progColor.int;
              this._line[l].col[1].txt = "I" + this._program._procedure[this._activeProcedure].line[i].left;
              this._lineMenuEqSmaller.forEach(item => this._line[l].col[2].addChild(item, guiOptions.childBottom))
              break;
            case this._program.opType.shape:
              this._line[l].col[1].color = this._progColor.shape;
              this._line[l].col[1].txt = "S" + this._program._procedure[this._activeProcedure].line[i].left;
              this._lineMenuEqNotEq.forEach(item => this._line[l].col[2].addChild(item, guiOptions.childBottom))
              break;
            case this._program.opType.avatard:
              this._line[l].col[1].color = this._progColor.avatard;
              this._line[l].col[1].txt = "A" + this._program._procedure[this._activeProcedure].line[i].left;
              this._lineMenuBlockCan.forEach(item => this._line[l].col[2].addChild(item, guiOptions.childBottom))
              break;

          }

          //------------------- 2
          if (this._program._procedure[this._activeProcedure].line[i].operator == null) {
            this._line[l].col[2].color = this._progColor.na;
            this._line[l].col[2].txt = "";
            this._lineSetVisible(l, 2);

          } else {
            this._line[l].col[2].color = this._progColor.bool;
            switch (this._program._procedure[this._activeProcedure].line[i].operator) {
              case this._program.opType.equal:
                this._line[l].col[2].txt = "==";
                break;
              case this._program.opType.notEqual:
                this._line[l].col[2].txt = "!=";
                break;
              case this._program.opType.greater:
                this._line[l].col[2].txt = ">";
                break;
              case this._program.opType.smaller:
                this._line[l].col[2].txt = "<";
                break;
              case this._program.opType.block:
                this._line[l].col[2].color = this._progColor.avatard;
                this._line[l].col[2].txt = "Block";
                break;
              case this._program.opType.can:
                this._line[l].col[2].color = this._progColor.avatard;
                this._line[l].col[2].txt = "Can";
                break;
            }

            this._line[l].col[3].removeChildren();
            switch (this._program._procedure[this._activeProcedure].line[i].leftType) {
              case this._program.opType.bool:
                this._line[l].col[3].addChild(this._lineMenuTrueFalse[0], guiOptions.childTop)
                this._line[l].col[3].addChild(this._lineMenuTrueFalse[1], guiOptions.childTop)
                this._line[l].col[3].addChild(this._lineMenuBISA[0], guiOptions.childBottom)
                break;
              case this._program.opType.int:
                this._line[l].col[3].addChild(this._lineMenuNumber[0], guiOptions.childTop)
                this._line[l].col[3].addChild(this._lineMenuNumber[5], guiOptions.childTop)
                this._line[l].col[3].addChild(this._lineMenuBISA[1], guiOptions.childBottom)
                break;
              case this._program.opType.shape:
                this._line[l].col[3].addChild(this._lineMenuShapeEmpty, guiOptions.childTop)
                this._line[l].col[3].addChild(this._lineMenuBISA[2], guiOptions.childBottom)
                break;
              case this._program.opType.avatard:
                if (this._program._procedure[this._activeProcedure].line[i].operator == this._program.opType.block) {
                  this._lineMenuColor.forEach(item => this._line[l].col[3].addChild(item, guiOptions.childBottom))
                } else if (this._program._procedure[this._activeProcedure].line[i].operator == this._program.opType.can) {
                  this._lineMenuForwardDown.forEach(item => this._line[l].col[3].addChild(item, guiOptions.childBottom))
                }
                break;

            }

            this._lineSetVisible(l, 3);
            if (this._program._procedure[this._activeProcedure].line[i].right == null) {
              this._line[l].col[3].color = this._progColor.na;
              this._line[l].col[3].txt = "";

            } else {
              switch (this._program._procedure[this._activeProcedure].line[i].rightType) {
                case this._program.opType.trueFalse:
                  this._line[l].col[3].color = this._progColor.bool;
                  if (this._program._procedure[this._activeProcedure].line[i].right) {
                    this._line[l].col[3].txt = "true";
                  } else {
                    this._line[l].col[3].txt = "false";
                  }
                  break;

                case this._program.opType.bool:
                  this._line[l].col[3].color = this._progColor.bool;
                  this._line[l].col[3].txt = "B" + this._program._procedure[this._activeProcedure].line[i].right;
                  break;
                case this._program.opType.int:
                  this._line[l].col[3].color = this._progColor.int;
                  this._line[l].col[3].txt = "I" + this._program._procedure[this._activeProcedure].line[i].right;
                  break;
                  
                  case this._program.opType.shapeEmpty:
                    this._line[l].col[3].color = this._progColor.shape;
                    this._line[l].col[3].txt = "Empt";
                    break;

                case this._program.opType.shape:
                  this._line[l].col[3].color = this._progColor.shape;
                  this._line[l].col[3].txt = "S" + this._program._procedure[this._activeProcedure].line[i].right;
                  break;
                case this._program.opType.forward:
                  this._line[l].col[3].color = this._progColor.avatard;
                  this._line[l].col[3].txt = "Forw";
                  break;
                case this._program.opType.up:
                  this._line[l].col[3].color = this._progColor.avatard;
                  this._line[l].col[3].txt = "Up";
                  break;
                case this._program.opType.down:
                  this._line[l].col[3].color = this._progColor.avatard;
                  this._line[l].col[3].txt = "Down";
                  break;
                case this._program.opType.black:
                  this._line[l].col[3].color = this._progColor.black;
                  this._line[l].col[3].txt = "Black";
                  break;
                case this._program.opType.red:
                  this._line[l].col[3].color = this._progColor.red;
                  this._line[l].col[3].txt = "Red";
                  break;
                case this._program.opType.green:
                  this._line[l].col[3].color = this._progColor.green;
                  this._line[l].col[3].txt = "Green";
                  break;
                case this._program.opType.blue:
                  this._line[l].col[3].color = this._progColor.blue;
                  this._line[l].col[3].txt = "Blue";
                  break;

                case this._program.opType.number:
                  this._line[l].col[3].color = this._progColor.int;
                  this._line[l].col[3].txt = "" + this._program._procedure[this._activeProcedure].line[i].right;

                  break breakOut;

              }
            }
          }
        }
      } else if (this._program._procedure[this._activeProcedure].line[i] instanceof comInt) {

        this._line[l].col[0].color = this._progColor.int;
        this._line[l].col[0].txt = "I" + this._program._procedure[this._activeProcedure].line[i].regNo;
        this._line[l].col[1].removeChildren();
        this._line[l].col[1].addChild(this._lineMenuBISA[1], guiOptions.childBottom)
        this._line[l].col[1].addChild(this._lineMenuNumber[0], guiOptions.childTop);
        this._line[l].col[1].addChild(this._lineMenuNumber[5], guiOptions.childTop);

        //------------------- 1
        if (this._program._procedure[this._activeProcedure].line[i].left == null) {
          this._line[l].col[1].color = this._progColor.na;
          this._line[l].col[1].txt = "";

          this._lineSetVisible(l, 1);
        } else {

          this._line[l].col[2].removeChildren();
          switch (this._program._procedure[this._activeProcedure].line[i].leftType) {

            case this._program.opType.int:
              this._line[l].col[1].color = this._progColor.int;
              this._line[l].col[1].txt = "I" + this._program._procedure[this._activeProcedure].line[i].left;
              this._lineMenuPlusMinus.forEach(item => this._line[l].col[2].addChild(item, guiOptions.childBottom))

              break;
            case this._program.opType.number:
              this._line[l].col[1].color = this._progColor.int;
              this._line[l].col[1].txt = "" + this._program._procedure[this._activeProcedure].line[i].left;
              this._lineSetVisible(l, 1);
              break breakOut;

          }

          //------------------- 2
          if (this._program._procedure[this._activeProcedure].line[i].operator == null) {
            this._line[l].col[2].color = this._progColor.na;
            this._line[l].col[2].txt = "";
            this._lineSetVisible(l, 2);

          } else {

            this._line[l].col[2].color = this._progColor.int;
            switch (this._program._procedure[this._activeProcedure].line[i].operator) {
              case this._program.opType.plus:
                this._line[l].col[2].txt = "+";
                break;
              case this._program.opType.minus:
                this._line[l].col[2].txt = "-";
                break;
            }

            this._line[l].col[3].removeChildren();
            this._line[l].col[3].addChild(this._lineMenuBISA[1], guiOptions.childBottom)
            this._line[l].col[3].addChild(this._lineMenuNumber[0], guiOptions.childTop);
            this._line[l].col[3].addChild(this._lineMenuNumber[5], guiOptions.childTop);


            this._lineSetVisible(l, 3);
            if (this._program._procedure[this._activeProcedure].line[i].right == null) {
              this._line[l].col[3].color = this._progColor.na;
              this._line[l].col[3].txt = "";
            } else {
              switch (this._program._procedure[this._activeProcedure].line[i].rightType) {
                case this._program.opType.int:
                  this._line[l].col[3].color = this._progColor.int;
                  this._line[l].col[3].txt = "I" + this._program._procedure[this._activeProcedure].line[i].right;
                  break;
                case this._program.opType.number:
                  this._line[l].col[3].color = this._progColor.int;
                  this._line[l].col[3].txt = "" + this._program._procedure[this._activeProcedure].line[i].right;
                  break;
              }
            }
          }
        }
      } else if (this._program._procedure[this._activeProcedure].line[i] instanceof comShape) {

        this._line[l].col[0].color = this._progColor.shape;
        this._line[l].col[0].txt = "S" + this._program._procedure[this._activeProcedure].line[i].regNo;
        this._line[l].col[1].removeChildren();
        this._line[l].col[1].addChild(this._lineMenuBISA[2], guiOptions.childBottom);
        this._line[l].col[1].addChild(this._lineMenuPosRot[0], guiOptions.childBottom);
        this._line[l].col[1].addChild(this._lineMenuNumber[0], guiOptions.childTop);
        this._line[l].col[1].addChild(this._lineMenuNumber[5], guiOptions.childTop);
        this._line[l].col[1].addChild(this._lineMenuWorld[0], guiOptions.childLeft);

        this._lineMenuColor.forEach(item => this._line[l].col[1].addChild(item, guiOptions.childRight))

        //------------------- 1
        if (this._program._procedure[this._activeProcedure].line[i].left == null) {

          this._line[l].col[1].color = this._progColor.na;
          this._line[l].col[1].txt = "";

          this._lineSetVisible(l, 1);
        } else {
          this._line[l].col[2].removeChildren();
          switch (this._program._procedure[this._activeProcedure].line[i].leftType) {

            case this._program.opType.world:
              this._line[l].col[1].color = this._progColor.world;
              this._line[l].col[1].txt = "world"
              this._lineSetVisible(l, 1);
              break breakOut;

            case this._program.opType.black:
              this._line[l].col[1].color = this._progColor.black;
              this._line[l].col[1].txt = "Black"
              this._lineSetVisible(l, 1);
              break breakOut;

            case this._program.opType.red:
              this._line[l].col[1].color = this._progColor.red;
              this._line[l].col[1].txt = "Red"
              this._lineSetVisible(l, 1);
              break breakOut;

            case this._program.opType.green:
              this._line[l].col[1].color = this._progColor.green;
              this._line[l].col[1].txt = "Green"
              this._lineSetVisible(l, 1);
              break breakOut;
            case this._program.opType.blue:
              this._line[l].col[1].color = this._progColor.blue;
              this._line[l].col[1].txt = "Blue"
              this._lineSetVisible(l, 1);
              break breakOut;
            case this._program.opType.equalPos:
              this._line[l].col[1].color = this._progColor.shape;
              this._line[l].col[1].txt = "==Pos";
              this._lineMenuEqualColor.forEach(item => this._line[l].col[2].addChild(item, guiOptions.childBottom));
              break;
            case this._program.opType.notEqualPos:
              this._line[l].col[1].color = this._progColor.shape;
              this._line[l].col[1].txt = "!=Pos";
              this._lineMenuEqualColor.forEach(item => this._line[l].col[2].addChild(item, guiOptions.childBottom));
              break;
            case this._program.opType.notEqualRot:
              this._line[l].col[1].color = this._progColor.shape;
              this._line[l].col[1].txt = "!=Rot";
              this._lineMenuEqualColor.forEach(item => this._line[l].col[2].addChild(item, guiOptions.childBottom))
              break;
            case this._program.opType.shape:
              this._line[l].col[1].color = this._progColor.shape;
              this._line[l].col[1].txt = "S" + this._program._procedure[this._activeProcedure].line[i].left;
              this._lineMenuPlusUni.forEach(item => this._line[l].col[2].addChild(item, guiOptions.childBottom))
              break;
            case this._program.opType.number:
              this._line[l].col[1].color = this._progColor.int;
              this._line[l].col[1].txt = "X:" + this._program._procedure[this._activeProcedure].line[i].left;
              this._line[l].col[2].addChild(this._lineMenuNumber[0], guiOptions.childTop);
              this._line[l].col[2].addChild(this._lineMenuNumber[5], guiOptions.childTop);
              break;
          }

          //------------------- 2
          if (this._program._procedure[this._activeProcedure].line[i].operator == null) {
            this._line[l].col[2].color = this._progColor.na;
            this._line[l].col[2].txt = "";
            this._lineSetVisible(l, 2);

          } else {
            this._line[l].col[3].removeChildren();
            switch (this._program._procedure[this._activeProcedure].line[i].operatorType) {
              case this._program.opType.number:
                this._line[l].col[2].color = this._progColor.int;
                this._line[l].col[2].txt = "Y:" + this._program._procedure[this._activeProcedure].line[i].operator;
                this._line[l].col[3].addChild(this._lineMenuNumber[0], guiOptions.childTop);
                this._line[l].col[3].addChild(this._lineMenuNumber[5], guiOptions.childTop);
                break;
              case this._program.opType.minus:
                this._line[l].col[2].color = this._progColor.int;
                this._line[l].col[2].txt = "-"
                this._line[l].col[3].addChild(this._lineMenuBISA[2], guiOptions.childBottom);
                break;
              case this._program.opType.plus:
                this._line[l].col[2].color = this._progColor.int;
                this._line[l].col[2].txt = "+"
                this._line[l].col[3].addChild(this._lineMenuBISA[2], guiOptions.childBottom);
                break;
              case this._program.opType.uni:
                this._line[l].col[2].color = this._progColor.int;
                this._line[l].col[2].txt = "Uni"
                this._line[l].col[3].addChild(this._lineMenuBISA[2], guiOptions.childBottom);
                break;
              case this._program.opType.equalCol:
                this._line[l].col[2].color = this._progColor.shape;
                this._line[l].col[2].txt = "==Col"
                this._lineSetVisible(l, 2);
                break breakOut;
              case this._program.opType.notEqualCol:
                this._line[l].col[2].color = this._progColor.shape;
                this._line[l].col[2].txt = "!=Col"
                this._lineSetVisible(l, 2);
                break breakOut;
            }

            this._lineSetVisible(l, 3);
            if (this._program._procedure[this._activeProcedure].line[i].right == null) {
              this._line[l].col[3].color = this._progColor.na;
              this._line[l].col[3].txt = "";
            } else {
              switch (this._program._procedure[this._activeProcedure].line[i].rightType) {
                case this._program.opType.number:
                  this._line[l].col[3].color = this._progColor.int;
                  this._line[l].col[3].txt = "Z:" + this._program._procedure[this._activeProcedure].line[i].right;
                  break;
                case this._program.opType.shape:
                  this._line[l].col[3].color = this._progColor.shape;
                  this._line[l].col[3].txt = "S" + this._program._procedure[this._activeProcedure].line[i].right;
                  break;
              }
            }
          }
        }
      } else if (this._program._procedure[this._activeProcedure].line[i] instanceof comAvatard) {
        this._line[l].col[0].color = this._progColor.avatard;
        this._line[l].col[0].txt = "A" + this._program._procedure[this._activeProcedure].line[i].regNo;
        this._line[l].col[1].removeChildren();

        this._line[l].col[1].addChild(this._lineMenuNumber[0], guiOptions.childTop);
        this._line[l].col[1].addChild(this._lineMenuNumber[5], guiOptions.childTop);

        this._lineMenuForwardDown.forEach(item => this._line[l].col[1].addChild(item, guiOptions.childBottom));
        this._lineMenuLeftRight.forEach(item => this._line[l].col[1].addChild(item, guiOptions.childLeft))
        this._lineMenuColor.forEach(item => this._line[l].col[1].addChild(item, guiOptions.childRight));

        //------------------- 1
        if (this._program._procedure[this._activeProcedure].line[i].left == null) {
          this._line[l].col[1].color = this._progColor.na;
          this._line[l].col[1].txt = "";
          this._lineSetVisible(l, 1);
        } else {

          this._line[l].col[2].removeChildren();
          switch (this._program._procedure[this._activeProcedure].line[i].leftType) {
            case this._program.opType.black:
              this._line[l].col[1].color = this._progColor.black;
              this._line[l].col[1].txt = "Black"
              this._lineSetVisible(l, 1);
              break breakOut;
            case this._program.opType.red:
              this._line[l].col[1].color = this._progColor.red;
              this._line[l].col[1].txt = "Red"
              this._lineSetVisible(l, 1);
              break breakOut;
            case this._program.opType.green:
              this._line[l].col[1].color = this._progColor.green;
              this._line[l].col[1].txt = "Green"
              this._lineSetVisible(l, 1);
              break breakOut;
            case this._program.opType.blue:
              this._line[l].col[1].color = this._progColor.blue;
              this._line[l].col[1].txt = "Blue"
              this._lineSetVisible(l, 1);
              break breakOut;
            case this._program.opType.left:
              this._line[l].col[1].color = this._progColor.avatard;
              this._line[l].col[1].txt = "Left"
              this._lineSetVisible(l, 1);
              break breakOut;
            case this._program.opType.right:
              this._line[l].col[1].color = this._progColor.avatard;
              this._line[l].col[1].txt = "Right"
              this._lineSetVisible(l, 1);
              break breakOut;
            case this._program.opType.forward:
              this._line[l].col[1].color = this._progColor.avatard;
              this._line[l].col[1].txt = "Forw"
              this._lineSetVisible(l, 1);
              break breakOut;
            case this._program.opType.up:
              this._line[l].col[1].color = this._progColor.avatard;
              this._line[l].col[1].txt = "Up"
              this._lineSetVisible(l, 1);
              break breakOut;
            case this._program.opType.down:
              this._line[l].col[1].color = this._progColor.avatard;
              this._line[l].col[1].txt = "Down"
              this._lineSetVisible(l, 1);
              break breakOut;
            case this._program.opType.number:
              this._line[l].col[1].color = this._progColor.int;
              this._line[l].col[1].txt = "X:" + this._program._procedure[this._activeProcedure].line[i].left;
              this._line[l].col[2].addChild(this._lineMenuNumber[0], guiOptions.childTop);
              this._line[l].col[2].addChild(this._lineMenuNumber[5], guiOptions.childTop);
              break;
          }

          //------------------- 2
          if (this._program._procedure[this._activeProcedure].line[i].operator == null) {
            this._line[l].col[2].color = this._progColor.na;
            this._line[l].col[2].txt = "";
            this._lineSetVisible(l, 2);

          } else {

            this._line[l].col[3].removeChildren();

            this._line[l].col[2].color = this._progColor.int;
            this._line[l].col[2].txt = "Y:" + this._program._procedure[this._activeProcedure].line[i].operator;
            this._line[l].col[3].addChild(this._lineMenuNumber[0], guiOptions.childTop);
            this._line[l].col[3].addChild(this._lineMenuNumber[5], guiOptions.childTop);

            this._lineSetVisible(l, 3);
            if (this._program._procedure[this._activeProcedure].line[i].right == null) {
              this._line[l].col[3].color = this._progColor.na;
              this._line[l].col[3].txt = "";

            } else {
              this._line[l].col[3].color = this._progColor.int;
              this._line[l].col[3].txt = "Z:" + this._program._procedure[this._activeProcedure].line[i].right;

            }
          }
        }
      } else if (this._program._procedure[this._activeProcedure].line[i] instanceof comGame) {

        this._line[l].col[0].color = this._progColor.game;
        this._line[l].col[0].txt = "Game";
        this._line[l].col[1].removeChildren();
        this._line[l].col[1].addChild(this._lineMenuBISA[2], guiOptions.childBottom);

        //------------------- 1
        if (this._program._procedure[this._activeProcedure].line[i].left == null) {

          this._line[l].col[1].color = this._progColor.na;
          this._line[l].col[1].txt = "";

          this._lineSetVisible(l, 1);
        } else {

          this._line[l].col[2].removeChildren();
          this._lineSetVisible(l, 1);

          switch (this._program._procedure[this._activeProcedure].line[i].leftType) {

            case this._program.opType.shape:
              this._line[l].col[1].color = this._progColor.shape;
              this._line[l].col[1].txt = "S" + this._program._procedure[this._activeProcedure].line[i].left;
              break;
          }
        }
      } else if (this._program._procedure[this._activeProcedure].line[i] instanceof comSleep) {

        this._line[l].col[0].color = this._progColor.sleep;
        this._line[l].col[0].txt = "Sleep"
        this._line[l].col[1].removeChildren();

        this._line[l].col[1].addChild(this._lineMenuNumber[0], guiOptions.childTop);
        this._line[l].col[1].addChild(this._lineMenuNumber[5], guiOptions.childTop);

        //------------------- 1
        if (this._program._procedure[this._activeProcedure].line[i].left == null) {
          this._line[l].col[1].color = this._progColor.na;
          this._line[l].col[1].txt = "";
          this._lineSetVisible(l, 1);
        } else {
          this._line[l].col[2].removeChildren();
          switch (this._program._procedure[this._activeProcedure].line[i].leftType) {
            case this._program.opType.number:
              this._line[l].col[1].color = this._progColor.int;
              this._line[l].col[1].txt = "" + this._program._procedure[this._activeProcedure].line[i].left + " .";
              this._line[l].col[2].addChild(this._lineMenuNumber[0], guiOptions.childTop);
              this._line[l].col[2].addChild(this._lineMenuNumber[5], guiOptions.childTop);
              break;
          }

          //------------------- 2
          if (this._program._procedure[this._activeProcedure].line[i].operator == null) {
            this._line[l].col[2].color = this._progColor.na;
            this._line[l].col[2].txt = "";
            this._lineSetVisible(l, 2);

          } else {
            this._line[l].col[3].removeChildren();
            this._line[l].col[2].color = this._progColor.int;
            this._line[l].col[2].txt = "" + this._program._procedure[this._activeProcedure].line[i].operator;
            this._line[l].col[3].addChild(this._lineMenuNumber[0], guiOptions.childTop);
            this._line[l].col[3].addChild(this._lineMenuNumber[5], guiOptions.childTop);

            this._lineSetVisible(l, 2);
          }
        }
      } else if (this._program._procedure[this._activeProcedure].line[i] instanceof comWorld) {

        this._line[l].col[0].color = this._progColor.world;
        this._line[l].col[0].txt = "World";
        this._line[l].col[1].removeChildren();
        this._line[l].col[1].addChild(this._lineMenuBISA[2], guiOptions.childBottom);

        this._lineMenuColor.forEach(item => this._line[l].col[1].addChild(item, guiOptions.childRight));

        //------------------- 1
        if (this._program._procedure[this._activeProcedure].line[i].left == null) {
          this._line[l].col[1].color = this._progColor.na;
          this._line[l].col[1].txt = "";

          this._lineSetVisible(l, 1);
        } else {
          this._line[l].col[2].removeChildren();
          this._lineSetVisible(l, 1);

          switch (this._program._procedure[this._activeProcedure].line[i].leftType) {
            case this._program.opType.black:
              this._line[l].col[1].color = this._progColor.black;
              this._line[l].col[1].txt = "Black"
              break;
            case this._program.opType.red:
              this._line[l].col[1].color = this._progColor.red;
              this._line[l].col[1].txt = "Red"
              break;
            case this._program.opType.green:
              this._line[l].col[1].color = this._progColor.green;
              this._line[l].col[1].txt = "Green"
              break;
            case this._program.opType.blue:
              this._line[l].col[1].color = this._progColor.blue;
              this._line[l].col[1].txt = "Blue"
              break;
            case this._program.opType.shape:
              this._line[l].col[1].color = this._progColor.shape;
              this._line[l].col[1].txt = "S" + this._program._procedure[this._activeProcedure].line[i].left;
              break;
          }
        }
      } else if (this._program._procedure[this._activeProcedure].line[i] instanceof comJump) {

        this._line[l].col[0].color = this._progColor.jump;
        this._line[l].col[0].txt = "Jump"
        this._line[l].col[1].removeChildren();
        this._labelRegLine.forEach(item => this._line[l].col[1].addChild(item, guiOptions.childRight));
        this._procedureLine.forEach(item => this._line[l].col[1].addChild(item, guiOptions.childBottom));

        this._lineSetVisible(l, 1);
        if (this._program._procedure[this._activeProcedure].line[i].left == null) {

          this._line[l].col[1].color = this._progColor.na;
          this._line[l].col[1].txt = "";

        } else {
          switch (this._program._procedure[this._activeProcedure].line[i].leftType) {

            case this._program.opType.label:
              this._line[l].col[1].color = this._progColor.label;
              this._line[l].col[1].txt = "L" + this._program._procedure[this._activeProcedure].line[i].left;
              break;
            case this._program.opType.procedure:
              this._line[l].col[1].color = this._progColor.procedure;
              this._line[l].col[1].txt = "P" + this._program._procedure[this._activeProcedure].line[i].left;
              break;
          }
        }
      } else if (this._program._procedure[this._activeProcedure].line[i] instanceof comCall) {

        this._line[l].col[0].color = this._progColor.call;
        this._line[l].col[0].txt = "Call"
        this._line[l].col[1].removeChildren();
        this._labelRegLine.forEach(item => this._line[l].col[1].addChild(item, guiOptions.childRight));
        this._procedureLine.forEach(item => this._line[l].col[1].addChild(item, guiOptions.childBottom));

        this._lineSetVisible(l, 1);
        if (this._program._procedure[this._activeProcedure].line[i].left == null) {
          this._line[l].col[1].color = this._progColor.na;
          this._line[l].col[1].txt = "";

        } else {
          switch (this._program._procedure[this._activeProcedure].line[i].leftType) {
            case this._program.opType.label:
              this._line[l].col[1].color = this._progColor.label;
              this._line[l].col[1].txt = "L" + this._program._procedure[this._activeProcedure].line[i].left;
              break;

            case this._program.opType.procedure:
              this._line[l].col[1].color = this._progColor.procedure;
              this._line[l].col[1].txt = "P" + this._program._procedure[this._activeProcedure].line[i].left;
              break;

          }
        }


      } else if (this._program._procedure[this._activeProcedure].line[i] instanceof comReturn) {
        this._line[l].col[0].color = this._progColor.return;
        this._line[l].col[0].txt = "Ret"

        this._lineSetVisible(l, 0);

      } else if (this._program._procedure[this._activeProcedure].line[i] instanceof comIf) {
        this._line[l].col[0].color = this._progColor.if;
        this._line[l].col[0].txt = "If"
        this._line[l].col[1].removeChildren();
        this._line[l].col[1].addChild(this._lineMenuBISA[0], guiOptions.childBottom);

        //------------------- 1
        if (this._program._procedure[this._activeProcedure].line[i].left == null) {
          this._line[l].col[1].color = this._progColor.na;
          this._line[l].col[1].txt = "";

          this._lineSetVisible(l, 1);
        } else {
          this._line[l].col[2].removeChildren();

          this._line[l].col[1].color = this._progColor.bool;
          this._line[l].col[1].txt = "B" + this._program._procedure[this._activeProcedure].line[i].left;

          this._lineMenuJumpReturn2.forEach(item => this._line[l].col[2].addChild(item, guiOptions.childBottom));
          //------------------- 2
          if (this._program._procedure[this._activeProcedure].line[i].operator == null) {
            this._line[l].col[2].color = this._progColor.na;
            this._line[l].col[2].txt = "";
            this._lineSetVisible(l, 2);

          } else {
            this._line[l].col[3].removeChildren();

            switch (this._program._procedure[this._activeProcedure].line[i].operator) {
              case this._program.opType.jump:
                this._line[l].col[2].color = this._progColor.jump;
                this._line[l].col[2].txt = "Jump"
                this._labelRegLine.forEach(item => this._line[l].col[3].addChild(item, guiOptions.childLeft));
                this._procedureLine.forEach(item => this._line[l].col[3].addChild(item, guiOptions.childBottom));
                break;
              case this._program.opType.call:
                this._line[l].col[2].color = this._progColor.call;
                this._line[l].col[2].txt = "Call"
                this._labelRegLine.forEach(item => this._line[l].col[3].addChild(item, guiOptions.childLeft));
                this._procedureLine.forEach(item => this._line[l].col[3].addChild(item, guiOptions.childBottom));
                break;
              case this._program.opType.return:
                this._line[l].col[2].color = this._progColor.return;
                this._line[l].col[2].txt = "Ret"
                this._lineSetVisible(l, 2);
                break breakOut;
            }

            if (this._program._procedure[this._activeProcedure].line[i].right == null) {
              this._line[l].col[3].color = this._progColor.na;
              this._line[l].col[3].txt = "";
              this._lineSetVisible(l, 3);

            } else {
              this._lineSetVisible(l, 3);
              switch (this._program._procedure[this._activeProcedure].line[i].rightType) {
                case this._program.opType.label:
                  this._line[l].col[3].color = this._progColor.label;
                  this._line[l].col[3].txt = "L" + this._program._procedure[this._activeProcedure].line[i].right;
                  break;
                case this._program.opType.procedure:
                  this._line[l].col[3].color = this._progColor.procedure;
                  this._line[l].col[3].txt = "P" + this._program._procedure[this._activeProcedure].line[i].right;
                  break;
              }
            }
          }
        }
      } else if (this._program._procedure[this._activeProcedure].line[i] instanceof comLabel) {

        this._line[l].col[0].color = this._progColor.label;
        this._line[l].col[0].txt = "Label"
        this._line[l].col[1].removeChildren();
        this._labelRegLine.forEach(item => this._line[l].col[1].addChild(item, guiOptions.childRight));

        this._lineSetVisible(l, 1);
        if (this._program._procedure[this._activeProcedure].line[i].left == null) {
          this._line[l].col[1].color = this._progColor.na;
          this._line[l].col[1].txt = "";

        } else {
          this._line[l].col[1].color = this._progColor.label;
          this._line[l].col[1].txt = "L" + this._program._procedure[this._activeProcedure].line[i].left;
          this._program.buildLabelReg();
          this._updateReg();
        }

      } else {
        console.log("else")

      }

      if(this._locked){
      this._line[l].col[1].removeChildren();
          this._line[l].col[2].removeChildren();
          this._line[l].col[3].removeChildren();

      }

    }

  }


  _updateReg() {

    for (let i = this._boolRegIndex; i < this._boolRegIndex + 3; i++) {
      this._boolReg[i - this._boolRegIndex].color = this._progColor.bool;
      if(!this._locked){
      this._boolRegLine[i - this._boolRegIndex].txt = "B" + i;
      }
      if (this._program.boolReg[i] == true) {
        this._boolReg[i - this._boolRegIndex].txt = "B" + i + ":T";
      } else if (this._program.boolReg[i] == false) {
        this._boolReg[i - this._boolRegIndex].txt = "B" + i + ":F";
      } else {
        this._boolReg[i - this._boolRegIndex].color = this._progColor.na;
        this._boolReg[i - this._boolRegIndex].txt = "B" + i;
      }
    }

    for (let i = this._intRegIndex; i < this._intRegIndex + 3; i++) {
      this._intReg[i - this._intRegIndex].color = this._progColor.int;
      if(!this._locked){
      this._intRegLine[i - this._intRegIndex].txt = "I" + i;
      }
      if (this._program.intReg[i] != null) {
        this._intReg[i - this._intRegIndex].txt = "I" + i + ":" + this._program.intReg[i];
      } else {
        this._intReg[i - this._intRegIndex].color = this._progColor.na;
        this._intReg[i - this._intRegIndex].txt = "I" + i;
      }
    }

    for (let i = this._labelRegIndex; i < this._labelRegIndex + 3; i++) {
      this._labelReg[i - this._labelRegIndex].txt = "L" + i;
      if(!this._locked){
      this._labelRegLine[i - this._labelRegIndex].txt = "L" + i;
      }
      if (this._program.labelReg[i] != null) {
        this._labelReg[i - this._labelRegIndex].color = this._progColor.label;
      } else {
        this._labelReg[i - this._labelRegIndex].color = this._progColor.na;
      }
    }

    for (let i = this._shapeRegIndex; i < this._shapeRegIndex + 3; i++) {
      this._shapeReg[i - this._shapeRegIndex].txt = "S" + i;
      if(!this._locked){
      this._shapeRegLine[i - this._shapeRegIndex].txt = "S" + i;
      }
      if (this._program.shapeReg[i] != null) {
        this._shapeReg[i - this._shapeRegIndex].color = this._progColor.shape;
      } else {
        this._shapeReg[i - this._shapeRegIndex].color = this._progColor.na;
      }
    }

    for (let i = this._avatardRegIndex; i < this._avatardRegIndex + 3; i++) {
      this._avatardReg[i - this._avatardRegIndex].txt = "A" + i;
      if(!this._locked){
      this._avatardRegLine[i - this._avatardRegIndex].txt = "A" + i;
      }     
      if (this._program.avatardReg[i] != null) {
        this._avatardReg[i - this._avatardRegIndex].color = this._progColor.avatard;
      } else {       
        this._avatardReg[i - this._avatardRegIndex].color = this._progColor.na;
      }
    }

    for (let i = this._procedureIndex; i < this._procedureIndex + 3; i++) {
      this._procedure[i - this._procedureIndex].txt = "P" + i;
      this._procedureLine[i - this._procedureIndex].txt = "P" + i;

      if (i == this._activeProcedure) {
        this._procedure[i - this._procedureIndex].color = this._progColor.procedure;
      } else {
        this._procedure[i - this._procedureIndex].color = this._progColor.na;
      }
    }


  }


  _hideProgram() {
    if (this._programHideForPlay) {
      this._programHideForPlay = false;
      this._show();
      this._updateLine();
      colorWheel.disenable();

    } else {
      this._programHideForPlay = true;
      colorWheel.colorComplete();
      this.hide();
    }
  }

  hide() {

    if (!this._programHideForPlay) {
      this._programHide.setNotVisible();
    }

    this._programPlay.setNotVisible();
    this._programPlaySlow.setNotVisible();
    if(!this._locked){
    this._programStep.setNotVisible();
    }
    this._programReset.setNotVisible();

    this._boolRegMinus.setNotVisible();
    this._boolRegPlus.setNotVisible();
    this._boolReg.forEach(item => item.setNotVisible());

    this._intRegMinus.setNotVisible();
    this._intRegPlus.setNotVisible();
    this._intReg.forEach(item => item.setNotVisible());

    this._labelRegMinus.setNotVisible();
    this._labelRegPlus.setNotVisible();
    this._labelReg.forEach(item => item.setNotVisible());

    this._shapeRegMinus.setNotVisible();
    this._shapeRegPlus.setNotVisible();
    this._shapeReg.forEach(item => item.setNotVisible());

    this._avatardRegMinus.setNotVisible();
    this._avatardRegPlus.setNotVisible();
    this._avatardReg.forEach(item => item.setNotVisible());

    this._procedureMinus.setNotVisible();
    this._procedurePlus.setNotVisible();
    this._procedure.forEach(item => item.setNotVisible());

    this._lineMinus.setNotVisible();
    this._linePlus.setNotVisible();
    this._line.forEach(item => item.col.forEach(col => col.setNotVisible()));


  }

  close() {
    this._reset();
    this._programHideForPlay = false;
    this.hide();


    colorWheel.disenable();

    this._shapeRegPosRot[0].setNotVisible();
    this._shapeRegEqualColor[0].setNotVisible();

    this._shapeRegInspReturn.setNotVisible();
    if(!this._locked){
    this._shapeRegReturn.setNotVisible();
    this._shapeRegSave.setNotVisible();

    this._avatardRegReturn.setNotVisible();
    this._avatardRegSave.setNotVisible();
    }

    this._shapeRegPosRotInsp.setNotVisible();
    this._shapeRegEqualColorInsp.setNotVisible();
  }

}