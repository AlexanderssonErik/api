

class comBool {
  constructor({regNo = null, left = null, leftType = null, operator = null, right = null, rightType = null}) {
    this._regNo = regNo;
    this._left = left;
    this._leftType = leftType;
    this._operator = operator;
    this._right = right;
    this._rightType = rightType;   
  }
  run(){

  }
  get regNo() {
    return this._regNo
  }
  get left(){
    return this._left;
  }
  get leftType(){
    return this._leftType;
  }
  get operator(){
    return this._operator;
  }
  get right(){
    return this._right;
  }
  get rightType(){
    return this._rightType;
  }
}

class comIf {
  constructor({left = null,  operator = null, right = null, rightType = null}) { 
    this._left = left;   
    this._operator = operator;
    this._right = right;
    this._rightType = rightType;   
  }
  run(){

  }
  get regNo() {
    return this._regNo
  }
  get left(){
    return this._left;
  }
  get leftType(){
    return this._leftType;
  }
  get operator(){
    return this._operator;
  }
  get right(){
    return this._right;
  }
  get rightType(){
    return this._rightType;
  }
}


class comInt {
  constructor({regNo = null, left = null, leftType = null, operator = null, right = null, rightType = null}) {
    this._regNo = regNo;
    this._left = left;
    this._leftType = leftType;
    this._operator = operator;
    this._right = right;
    this._rightType = rightType;   
  }
  run(){
    switch(this._leftType){
      case ProgrammingProgram.opType.number:
          ProgrammingProgram.intReg[this._regNo] =  this._left;
        return true;
      break

      case ProgrammingProgram.opType.int:
          let leftVal = ProgrammingProgram.intReg[this._left];
          let rightVal =0;
          switch(this._rightType){
            case ProgrammingProgram.opType.number:
                rightVal = this._right
            break;
            case ProgrammingProgram.opType.int:
                rightVal = ProgrammingProgram.intReg[this._right];
            break;
            default:
              return false;
            break;
          }

          if(leftVal == null || rightVal == null){
            return false;
          }

          switch(this._operator){
            case ProgrammingProgram.opType.plus:
                ProgrammingProgram.intReg[this._regNo] =  leftVal + rightVal;
            break;
            case ProgrammingProgram.opType.minus:
                ProgrammingProgram.intReg[this._regNo] =  leftVal - rightVal;
            break;
            default:
              return false;
            break;
          }



          return true;
        break

      default:

        return false;
      break;

    }


  }
  get regNo() {
    return this._regNo
  }
  get left(){
    return this._left;
  }
  get leftType(){
    return this._leftType;
  }
  get operator(){
    return this._operator;
  }
  get right(){
    return this._right;
  }
  get rightType(){
    return this._rightType;
  }
}

class comShape {
  constructor({regNo = null, left = null, leftType = null, operator = null, operatorType = null, right = null, rightType = null}) {
    this._regNo = regNo;
    this._left = left;
    this._leftType = leftType;
    this._operator = operator;
    this._operatorType = operatorType;
    this._right = right;
    this._rightType = rightType;   
  }
  run(){

  }
  get regNo() {
    return this._regNo
  }
  get left(){
    return this._left;
  }
  get leftType(){
    return this._leftType;
  }
  get operator(){
    return this._operator;
  }
  get operatorType(){
    return this._operatorType;
  }
  get right(){
    return this._right;
  }
  get rightType(){
    return this._rightType;
  }
}

class comGame {
  constructor({ left = null, leftType = null}) {   
    this._left = left;
    this._leftType = leftType;   
  }
  run(){

  }
  get left(){
    return this._left;
  }
  get leftType(){
    return this._leftType;
  }
}

class comWorld {
  constructor({ left = null, leftType = null}) {   
    this._left = left;
    this._leftType = leftType;  
  }
  run(){

  }
  get left(){
    return this._left;
  }
  get leftType(){
    return this._leftType;
  }
}

class comJump {
  constructor({ left = null, leftType = null}) {   
    this._left = left;
    this._leftType = leftType;
  }
  run(){
    switch( this._leftType){
      case  ProgrammingProgram.opType.label:
          ProgrammingProgram.activeLine =  ProgrammingProgram.labelReg[this._left ];
          ProgrammingProgram.activeProcedure = ProgrammingProgram.labelRegProcedure[this._left ];

          return true;

      break;
      case  ProgrammingProgram.opType.procedure:
        console.log("this._left: " + this._left);
          ProgrammingProgram.activeLine = -1;
          ProgrammingProgram.activeProcedure = this._left;
          return true;
          break;
      default:
        return false;
      break;
    }

  }
  get left(){
    return this._left;
  }
  get leftType(){
    return this._leftType;
  }
}

class comLabel {
  constructor({ left = null}) {
       this._left = left;
  }
  run(){
    return false;
  }

  get left(){
    return this._left;
  }
}


class comCall {
  constructor({ left = null, leftType = null}) {   
    this._left = left;
    this._leftType = leftType;
  }
  run(){

  }

  get left(){
    return this._left;
  }
  get leftType(){
    return this._leftType;
  }
}


class comReturn {
  constructor({ left = null}) {
    this._left = left;
  }
  run(){

  }
  get left(){
    return this._left;
  }
}


class comSleep {
  constructor({ left = null, leftType = null, operator = null, operatorType = null}) {
    this._left = left;
    this._leftType = leftType;
    this._operator = operator;
    this._operatorType = operatorType;
   
  }
  run(){

  }
  get left(){
    return this._left;
  }
  get leftType(){
    return this._leftType;
  }
  get operator(){
    return this._operator;
  }
  get operatorType(){
    return this._operatorType;
  }
}

class comAvatard {
  constructor({regNo = null, left = null, leftType = null, operator = null, operatorType = null, right = null, rightType = null}) {
    this._regNo = regNo;
    this._left = left;
    this._leftType = leftType;
    this._operator = operator;
    this._operatorType = operatorType;
    this._right = right;
    this._rightType = rightType;
   
  }
  run(){

  }

  get regNo() {
    return this._regNo
  }

  get left(){
    return this._left;
  }
  get leftType(){
    return this._leftType;
  }

  get operator(){
    return this._operator;
  }
  get operatorType(){
    return this._operatorType;
  }
  get right(){
    return this._right;
  }

  get rightType(){
    return this._rightType;
  }

}









class ProgrammingProgram  {

  static init(){
    ProgrammingProgram.opType = {
      val: 0,
      bool: 1,
      int: 2,
      shape: 3,
      avatard: 4,
      equal: 5,
      notEqual : 6,
      greater : 7,
      smaller: 8,
      block: 9,
      can: 10,
      forward: 11,
      up: 12,
      down: 13,
      number: 14,
      plus: 15,
      minus: 16,
      world: 17,
      equalPos: 18,
      notEqualPos: 19,
      notEqualRot: 20,
      black: 21,
      red: 22,
      green: 23,
      blue: 24,
      equalCol: 25,
      notEqualCol: 26,
      uni: 27,
      left: 28,
      right: 29,
      jump: 30,
      call: 31,
      return: 32,
      procedure: 33,
      label: 34

    }

   
    ProgrammingProgram.intReg = [];

    ProgrammingProgram.boolReg = [];
    ProgrammingProgram.shapeReg = [];
    ProgrammingProgram.avatardReg = [];
    ProgrammingProgram.labelReg = [];
    ProgrammingProgram.labelRegProcedure = [];

  }


  constructor({procedure = [], intReg = [], boolReg = [], shapeReg = [], avatardReg = []}) {
   
 
    this._procedure = procedure;

    for(let i = 0; i < 100; i++){
      if(this._procedure[i] == null){
        this._procedure[i] = {line: []};
      }
    }

    ProgrammingProgram.intReg = intReg;

    ProgrammingProgram.boolReg = boolReg; 
    ProgrammingProgram.shapeReg = shapeReg;
    ProgrammingProgram.avatardReg = avatardReg;
    ProgrammingProgram.labelReg = [];
    ProgrammingProgram.labelRegProcedure = [];
    ProgrammingProgram.activeProcedure = 0;
     ProgrammingProgram.activeLine = -1;
    

    this._intReg = intReg;

    this._boolReg = boolReg; 
    this._shapeReg = shapeReg;
    this._avatardReg = avatardReg;
  //  this._labelReg = [];
 //   this._labelRegProcedure = [];

  //  this._activeProcedure = 0;
   // this._activeLine = -1;

    this._firstStep = true;

    //this._prodecure[prodecure].line[line].column[column]

 
  }

  reset(){
    this._firstStep = true;

   // this._activeLine = -1;
    //this._activeProcedure = 0;

    ProgrammingProgram.activeProcedure = 0;
    ProgrammingProgram.activeLine = -1;

  
    ProgrammingProgram.intReg = this._intReg;

    ProgrammingProgram.boolReg = this._boolReg; 
    ProgrammingProgram.shapeReg = this._shapeReg;
    ProgrammingProgram.avatardReg = this._avatardReg;
   // ProgrammingProgram.labelReg = [];
 
  }

  buildLabelReg(){

    ProgrammingProgram.labelReg = [];
    ProgrammingProgram.labelRegProcedure  = [];

    this._procedure.forEach(function(p, pi){
      //console.log("p.length: " + p.length);
      p.line.forEach(function (l, li){
        if(l instanceof comLabel && l.left != null){
          ProgrammingProgram.labelReg[l.left] = li;
          ProgrammingProgram.labelRegProcedure[l.left]  = pi;
        }

      }.bind(this));
    }.bind(this)); 

  }
  
  step(){

    if(this._firstStep){
      this.buildLabelReg();

      this._intReg = ProgrammingProgram.intReg.slice(0);
      this._boolReg = ProgrammingProgram.boolReg.slice(0);
      this._shapeReg =  ProgrammingProgram.shapeReg.slice(0);
      this._avatardReg = ProgrammingProgram.avatardReg.slice(0);

      this._firstStep = false;

    }

    if(this._procedure[ProgrammingProgram.activeProcedure].line.length > ProgrammingProgram.activeLine  ){
      ProgrammingProgram.activeLine ++;
    }

    while((this._procedure[ProgrammingProgram.activeProcedure].line.length >  ProgrammingProgram.activeLine  && this._procedure[ProgrammingProgram.activeProcedure].line[ProgrammingProgram.activeLine] == null) || (this._procedure[ProgrammingProgram.activeProcedure].line[ProgrammingProgram.activeLine] != null && this._procedure[ProgrammingProgram.activeProcedure].line[ProgrammingProgram.activeLine].run() == false  )){
      ProgrammingProgram.activeLine++;
    }
      
    

  }

  get activeProcedure(){
    return ProgrammingProgram.activeProcedure;
    //return this._activeProcedure
  }

  get activeLine(){
    return ProgrammingProgram.activeLine;
    //return this._activeLine
  }

  get opType (){
   // return this._opType;
    return ProgrammingProgram.opType;
  }

  get boolReg () {
    return ProgrammingProgram.boolReg;
    //return this._boolReg;
  }

  get intReg () {
    return ProgrammingProgram.intReg;
   // return this._intReg;
  }

  get shapeReg () {
    return ProgrammingProgram.shapeReg;
  //  return this._shapeReg;
  }

  get avatardReg () {
    return ProgrammingProgram.avatardReg;
    //return this._avatardReg;
  }

  get labelReg () {
    return ProgrammingProgram.labelReg;
   // return this._labelReg;
  }


/*
  setCommand({prodecure = null, line = null, column = null, command = null}){
    this._procedure[prodecure].line[line].column[column] = command;


  }*/

 
}

