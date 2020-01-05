

class comBool {
  constructor({ regNo = null, left = null, leftType = null, operator = null, right = null, rightType = null }) {
    this._regNo = regNo;
    this._left = left;
    this._leftType = leftType;
    this._operator = operator;
    this._right = right;
    this._rightType = rightType;
  }
  printConstructor() {
    return "new comBool ({ regNo :" + this._regNo + ", left :" + this._left + ", leftType :" + this._leftType + ", operator :" + this._operator + ", right :" + this._right + ", rightType :" + this._rightType + " }) ";
  }

  run() {
    let leftVal = null;
    let rightVal = null;
    switch (this._leftType) {
      case ProgrammingProgram.opType.bool:
        leftVal = ProgrammingProgram.boolReg[this._left];
        switch (this._rightType) {
          case ProgrammingProgram.opType.trueFalse:
            rightVal = this._right
            break;
          case ProgrammingProgram.opType.bool:
            rightVal = ProgrammingProgram.boolReg[this._right];
            break;
          default:
            return false;
            break;
        }
        if (leftVal == null || rightVal == null) {
          return false;
        }
        switch (this._operator) {
          case ProgrammingProgram.opType.equal:
            if (leftVal == rightVal) {
              ProgrammingProgram.boolReg[this._regNo] = true;
            } else {
              ProgrammingProgram.boolReg[this._regNo] = false;
            }

            break;
          case ProgrammingProgram.opType.notEqual:
            if (leftVal != rightVal) {
              ProgrammingProgram.boolReg[this._regNo] = true;
            } else {
              ProgrammingProgram.boolReg[this._regNo] = false;
            }
            break;
          default:
            return false;
            break;
        }

        return true;
        break;
      case ProgrammingProgram.opType.int:
        leftVal = ProgrammingProgram.intReg[this._left];
        switch (this._rightType) {
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
        if (leftVal == null || rightVal == null) {
          return false;
        }
        switch (this._operator) {
          case ProgrammingProgram.opType.equal:
            if (leftVal == rightVal) {
              ProgrammingProgram.boolReg[this._regNo] = true;
            } else {
              ProgrammingProgram.boolReg[this._regNo] = false;
            }

            break;
          case ProgrammingProgram.opType.notEqual:
            if (leftVal != rightVal) {
              ProgrammingProgram.boolReg[this._regNo] = true;
            } else {
              ProgrammingProgram.boolReg[this._regNo] = false;
            }
            break;
          default:
            return false;
            break;
        }


        return true;
        break;
      case ProgrammingProgram.opType.shape:

        let leftPixel = ProgrammingProgram.shapeReg[this._left];
        let rightPixel;

        if (leftPixel == null) {
          return false;
        }



        switch (this._rightType) {
          case ProgrammingProgram.opType.shape:
            rightPixel = ProgrammingProgram.shapeReg[this._right];
            break;
          case ProgrammingProgram.opType.shapeEmpty:
            switch (this._operator) {
              case ProgrammingProgram.opType.equal:
                if (leftPixel.length == 0) {
                  ProgrammingProgram.boolReg[this._regNo] = true;
                } else {
                  ProgrammingProgram.boolReg[this._regNo] = false;
                }
                return true;
                break;
              case ProgrammingProgram.opType.notEqual:
                if (leftPixel.length != 0) {
                  ProgrammingProgram.boolReg[this._regNo] = true;
                } else {
                  ProgrammingProgram.boolReg[this._regNo] = false;
                }
                return true;
                break;
              default:
                return false;
                break;
            }

            break;
          default:
            return false;
            break;
        }
        if (rightPixel == null) {
          return false;
        }

        let careColor = true;

        if (ProgrammingProgram.shapeRegConfigCol[this._left] == ProgrammingProgram.opType.notEqualCol || ProgrammingProgram.shapeRegConfigCol[this._right] == ProgrammingProgram.opType.notEqualCol) {
          careColor = false;
        }
        let set;

        if (ProgrammingProgram.shapeRegConfigPos[this._left] == ProgrammingProgram.opType.notEqualRot || ProgrammingProgram.shapeRegConfigPos[this._right] == ProgrammingProgram.opType.notEqualRot) {
          set = BlockPixel.calcSetNoCarePosition({ left: leftPixel, right: rightPixel, careColor: careColor, careRotation: false });
        } else if (ProgrammingProgram.shapeRegConfigPos[this._left] == ProgrammingProgram.opType.notEqualPos || ProgrammingProgram.shapeRegConfigPos[this._right] == ProgrammingProgram.opType.notEqualPos) {
          set = BlockPixel.calcSetNoCarePosition({ left: leftPixel, right: rightPixel, careColor: careColor, careRotation: true });
        } else {
          set = Block.calcSet({ left: leftPixel, right: rightPixel, careColor: careColor, careRotation: false });
        }

        switch (this._operator) {
          case ProgrammingProgram.opType.equal:
            if (set.diffLeft.length == 0 && set.diffRight.length == 0) {
              ProgrammingProgram.boolReg[this._regNo] = true;
            } else {
              ProgrammingProgram.boolReg[this._regNo] = false;
            }
            break;
          case ProgrammingProgram.opType.notEqual:
            if (set.diffLeft.length != 0 || set.diffRight.length != 0) {
              ProgrammingProgram.boolReg[this._regNo] = true;
            } else {
              ProgrammingProgram.boolReg[this._regNo] = false;
            }
            break;
          default:
            return false;
            break;
        }
        return true;
        break;
      case ProgrammingProgram.opType.avatard:
        let avatard = ProgrammingProgram.avatardBlock[this._left];
        if (avatard == null) {
          return false;
        }

        switch (this._operator) {
          case ProgrammingProgram.opType.block:
            let blockUnder = avatard.blockUnder();
            if (blockUnder == null) {
              return false;
            }

            switch (this._right) {
              case ProgrammingProgram.opType.black:
                if (blockUnder.color[0] == meshColor.black) {
                  ProgrammingProgram.boolReg[this._regNo] = true;
                } else {
                  ProgrammingProgram.boolReg[this._regNo] = false;
                }
                break;
              case ProgrammingProgram.opType.red:
                if (blockUnder.color[0] == meshColor.red) {
                  ProgrammingProgram.boolReg[this._regNo] = true;
                } else {
                  ProgrammingProgram.boolReg[this._regNo] = false;
                }
                break;
              case ProgrammingProgram.opType.green:
                if (blockUnder.color[0] == meshColor.green) {
                  ProgrammingProgram.boolReg[this._regNo] = true;
                } else {
                  ProgrammingProgram.boolReg[this._regNo] = false;
                }
                break;
              case ProgrammingProgram.opType.blue:
                if (blockUnder.color[0] == meshColor.blue) {
                  ProgrammingProgram.boolReg[this._regNo] = true;
                } else {
                  ProgrammingProgram.boolReg[this._regNo] = false;
                }
                break;
              default:
                return false;
                break;
            }
            break;
          case ProgrammingProgram.opType.can:

            switch (this._right) {
              case ProgrammingProgram.opType.forward:
                if (avatard.canMoveForward()) {
                  ProgrammingProgram.boolReg[this._regNo] = true;
                } else {
                  ProgrammingProgram.boolReg[this._regNo] = false;
                }
                break;
              case ProgrammingProgram.opType.up:
                if (avatard.canMoveUp()) {
                  ProgrammingProgram.boolReg[this._regNo] = true;
                } else {
                  ProgrammingProgram.boolReg[this._regNo] = false;
                }
                break;
              case ProgrammingProgram.opType.down:
                if (avatard.canMoveDown()) {
                  ProgrammingProgram.boolReg[this._regNo] = true;
                } else {
                  ProgrammingProgram.boolReg[this._regNo] = false;
                }
                break;
              default:
                return false;
                break;
            }

            break;
          default:
            return false;
            break;
        }

        return true;
        break;

      default:

        return false;
        break;
    }

  }
  get regNo() {
    return this._regNo
  }
  get left() {
    return this._left;
  }
  get leftType() {
    return this._leftType;
  }
  get operator() {
    return this._operator;
  }
  get right() {
    return this._right;
  }
  get rightType() {
    return this._rightType;
  }
}

class comIf {
  constructor({ left = null, operator = null, right = null, rightType = null }) {
    this._left = left;
    this._operator = operator;
    this._right = right;
    this._rightType = rightType;
  }
  printConstructor() {
    return "new comIf ({ left :" + this._left + ", operator :" + this._operator + ", right :" + this._right + ", rightType :" + this._rightType + " }) ";
  }

  run() {

    if (this._left == null || ProgrammingProgram.boolReg[this._left] == null) {
      return false;
    }

    if (!ProgrammingProgram.boolReg[this._left]) {
      return true;
    }

    switch (this._operator) {
      case ProgrammingProgram.opType.jump:
        switch (this._rightType) {
          case ProgrammingProgram.opType.label:
            if (ProgrammingProgram.labelReg[this._right] == null) {
              return false;
            }
            ProgrammingProgram.nextLine = ProgrammingProgram.labelReg[this._right];
            ProgrammingProgram.nextProcedure = ProgrammingProgram.labelRegProcedure[this._right];
            break;
          case ProgrammingProgram.opType.procedure:
            ProgrammingProgram.nextLine = -1;
            ProgrammingProgram.nextProcedure = this._right;
            break;
          default:
            return false;
            break;
        }
        break;

      case ProgrammingProgram.opType.call:
        switch (this._rightType) {
          case ProgrammingProgram.opType.label:
            if (ProgrammingProgram.labelReg[this._right] == null) {
              return false;
            }
            ProgrammingProgram.nextLine = ProgrammingProgram.labelReg[this._right];
            ProgrammingProgram.nextProcedure = ProgrammingProgram.labelRegProcedure[this._right];

            ProgrammingProgram.returnProcedure.push(ProgrammingProgram.activeProcedure);
            ProgrammingProgram.returnLine.push(ProgrammingProgram.activeLine);
            break;
          case ProgrammingProgram.opType.procedure:
            ProgrammingProgram.nextLine = -1;
            ProgrammingProgram.nextProcedure = this._right;

            ProgrammingProgram.returnProcedure.push(ProgrammingProgram.activeProcedure);
            ProgrammingProgram.returnLine.push(ProgrammingProgram.activeLine);
            break;
          default:
            return false;
            break;
        }

        break;

      case ProgrammingProgram.opType.return:
        if (ProgrammingProgram.returnLine.length == 0) {
          return false;
        }
        ProgrammingProgram.nextLine = ProgrammingProgram.returnLine.pop();
        ProgrammingProgram.nextProcedure = ProgrammingProgram.returnProcedure.pop();
        break;

      default:
        return false;
        break;

    }

    return true;

  }
  get regNo() {
    return this._regNo
  }
  get left() {
    return this._left;
  }
  get leftType() {
    return this._leftType;
  }
  get operator() {
    return this._operator;
  }
  get right() {
    return this._right;
  }
  get rightType() {
    return this._rightType;
  }
}


class comInt {
  constructor({ regNo = null, left = null, leftType = null, operator = null, right = null, rightType = null }) {
    this._regNo = regNo;
    this._left = left;
    this._leftType = leftType;
    this._operator = operator;
    this._right = right;
    this._rightType = rightType;
  }

  printConstructor() {
    return "new comInt ({ regNo :" + this._regNo + ", left :" + this._left + ", leftType :" + this._leftType + ", operator :" + this._operator + ", right :" + this._right + ", rightType :" + this._rightType + " }) ";
  }
  run() {
    switch (this._leftType) {
      case ProgrammingProgram.opType.number:
        ProgrammingProgram.intReg[this._regNo] = this._left;
        return true;
        break

      case ProgrammingProgram.opType.int:
        let leftVal = ProgrammingProgram.intReg[this._left];
        let rightVal = 0;
        switch (this._rightType) {
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

        if (leftVal == null || rightVal == null) {
          return false;
        }

        switch (this._operator) {
          case ProgrammingProgram.opType.plus:
            ProgrammingProgram.intReg[this._regNo] = leftVal + rightVal;
            break;
          case ProgrammingProgram.opType.minus:
            ProgrammingProgram.intReg[this._regNo] = leftVal - rightVal;
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
  get left() {
    return this._left;
  }
  get leftType() {
    return this._leftType;
  }
  get operator() {
    return this._operator;
  }
  get right() {
    return this._right;
  }
  get rightType() {
    return this._rightType;
  }
}

class comShape {
  constructor({ regNo = null, left = null, leftType = null, operator = null, operatorType = null, right = null, rightType = null }) {
    this._regNo = regNo;
    this._left = left;
    this._leftType = leftType;
    this._operator = operator;
    this._operatorType = operatorType;
    this._right = right;
    this._rightType = rightType;
  }

  printConstructor() {
    return "new comShape ({ regNo :" + this._regNo + ", left :" + this._left + ", leftType :" + this._leftType + ", operator :" + this._operator + ", operatorType :" + this._operatorType + ", right :" + this._right + ", rightType :" + this._rightType + " }) ";
  }
  run() {
    let set;

    switch (this._leftType) {
      case ProgrammingProgram.opType.number:
        if (this._operatorType != ProgrammingProgram.opType.number || this._rightType != ProgrammingProgram.opType.number) {
          return false;
        }
        let pixel = new BlockPixel({ x: this._left, y: this._operator, z: this._right })
        let worldPixel = BlockPixel.convertBlock(world.block);
        set = Block.calcSet({ left: worldPixel, right: pixel, careColor: false, careRotation: false });

        if (set.intersectionLeft.length == 0) {
          ProgrammingProgram.shapeReg[this._regNo] = [];
        } else {
          ProgrammingProgram.shapeReg[this._regNo] = BlockPixel.convertBlock(set.intersectionLeft[0].block);
        }
        break;
      case ProgrammingProgram.opType.world:
        ProgrammingProgram.shapeReg[this._regNo] = BlockPixel.convertBlock(world.block);
        break;

      case ProgrammingProgram.opType.black:
        if (ProgrammingProgram.shapeReg[this._regNo] == null) {
          return false;
        }
        Block.setColor({ block: ProgrammingProgram.shapeReg[this._regNo], color: meshColor.black })
        break;
      case ProgrammingProgram.opType.red:
        if (ProgrammingProgram.shapeReg[this._regNo] == null) {
          return false;
        }
        Block.setColor({ block: ProgrammingProgram.shapeReg[this._regNo], color: meshColor.red })
        break;
      case ProgrammingProgram.opType.green:
        if (ProgrammingProgram.shapeReg[this._regNo] == null) {
          return false;
        }
        Block.setColor({ block: ProgrammingProgram.shapeReg[this._regNo], color: meshColor.green })
        break;
      case ProgrammingProgram.opType.blue:
        if (ProgrammingProgram.shapeReg[this._regNo] == null) {
          return false;
        }
        Block.setColor({ block: ProgrammingProgram.shapeReg[this._regNo], color: meshColor.blue })
        break;

      case ProgrammingProgram.opType.shape:
        if (this._right == null) {
          return false;
        }
        let leftPixel = ProgrammingProgram.shapeReg[this._left];
        let rightPixel = ProgrammingProgram.shapeReg[this._right];
        if (leftPixel == null || rightPixel == null) {
          return false;
        }

        let careColor = true;

        if (ProgrammingProgram.shapeRegConfigCol[this._left] == ProgrammingProgram.opType.notEqualCol || ProgrammingProgram.shapeRegConfigCol[this._right] == ProgrammingProgram.opType.notEqualCol) {
          careColor = false;
        }

        switch (this._operatorType) {
          case ProgrammingProgram.opType.plus:
            set = Block.calcSet({ left: leftPixel, right: rightPixel, careColor: false });
            ProgrammingProgram.shapeReg[this._regNo] = Block.copy(set.diffLeft).concat(Block.copy(set.intersectionLeft), Block.copy(set.diffRight));
            break;
          case ProgrammingProgram.opType.minus:
            set = Block.calcSet({ left: leftPixel, right: rightPixel, careColor: careColor });
            ProgrammingProgram.shapeReg[this._regNo] = Block.copy(set.diffLeft);
            break;
          case ProgrammingProgram.opType.uni:
            set = Block.calcSet({ left: leftPixel, right: rightPixel, careColor: careColor });
            ProgrammingProgram.shapeReg[this._regNo] = Block.copy(set.intersectionLeft);
            break;
          default:
            return false;
            break;
        }
        break;
      default:

        if (this._leftType == ProgrammingProgram.opType.equalPos || this._leftType == ProgrammingProgram.opType.notEqualPos || this._leftType == ProgrammingProgram.opType.notEqualRot) {
          if (this._operatorType == ProgrammingProgram.opTye.equalCol || this._operatorType == ProgrammingProgram.opTye.notEqualCol) {
            ProgrammingProgram.shapeRegConfigPos[this._regNo] = this._leftType;
            ProgrammingProgram.shapeRegConfigCol[this._regNo] = this._operatorType;
          } else {
            return false;
          }
        } else {
          return false;
        }
        break;
    }
    return true;
  }
  get regNo() {
    return this._regNo
  }
  get left() {
    return this._left;
  }
  get leftType() {
    return this._leftType;
  }
  get operator() {
    return this._operator;
  }
  get operatorType() {
    return this._operatorType;
  }
  get right() {
    return this._right;
  }
  get rightType() {
    return this._rightType;
  }
}

class comGame {
  constructor({ left = null, leftType = null }) {
    this._left = left;
    this._leftType = leftType;
  }
  printConstructor() {
    return "new comGame ({ left :" + this._left + ", leftType :" + this._leftType + " }) ";
  }


  run() {
    if (this._left == null || ProgrammingProgram.shapeReg[this._left] == null) {
      return false;
    }

    let careColor = true;
    if (ProgrammingProgram.shapeRegConfigCol[this._left] == ProgrammingProgram.opType.notEqualCol) {
      careColor = false;
    }
    ProgrammingProgram.game.show({ block: ProgrammingProgram.shapeReg[this._left], careColor: careColor });

    return true;
  }
  get left() {
    return this._left;
  }
  get leftType() {
    return this._leftType;
  }
}

class comWorld {
  constructor({ left = null, leftType = null }) {
    this._left = left;
    this._leftType = leftType;
  }
  printConstructor() {
    return "new comWorld ({ left :" + this._left + ", leftType :" + this._leftType + " }) ";
  }


  run() {

    switch (this._leftType) {
      case ProgrammingProgram.opType.black:
        Block.setColor({ block: world.block, color: meshColor.black });
        break;
      case ProgrammingProgram.opType.red:
        Block.setColor({ block: world.block, color: meshColor.red });
        break;
      case ProgrammingProgram.opType.green:
        Block.setColor({ block: world.block, color: meshColor.green });
        break;
      case ProgrammingProgram.opType.blue:
        Block.setColor({ block: world.block, color: meshColor.blue });
        break;
      case ProgrammingProgram.opType.shape:

        if (ProgrammingProgram.shapeReg[this._left] == null) {
          return false;
        }

        let worldPixel = BlockPixel.convertBlock(world.block);

        let set;
        if (ProgrammingProgram.shapeRegConfigPos[this._left] == ProgrammingProgram.opType.notEqualRot) {
          set = BlockPixel.calcSetNoCarePosition({ left: worldPixel, right: ProgrammingProgram.shapeReg[this._left], careColor: false, careRotation: false });
        } else if (ProgrammingProgram.shapeRegConfigPos[this._left] == ProgrammingProgram.opType.notEqualPos) {
          set = BlockPixel.calcSetNoCarePosition({ left: worldPixel, right: ProgrammingProgram.shapeReg[this._left], careColor: false, careRotation: true });
        } else {
          set = Block.calcSet({ left: worldPixel, right: ProgrammingProgram.shapeReg[this._left], careColor: false, careRotation: false });
        }

        if (set.diffRight.length > 0) {
          return false;
        }

        set.intersectionRight.forEach(function (item) {
          let find = set.intersectionLeft.find(element => element.equal({ block: item, careColor: false }));
          find.setBlockColor({ color: item.color[0], colorComplete: false });
        })
        break;
      default:
        return false
        break;
    }
    return true;

  }
  get left() {
    return this._left;
  }
  get leftType() {
    return this._leftType;
  }
}

class comJump {
  constructor({ left = null, leftType = null }) {
    this._left = left;
    this._leftType = leftType;
  }
  printConstructor() {
    return "new comJump ({ left :" + this._left + ", leftType :" + this._leftType + " }) ";
  }

  run() {
    switch (this._leftType) {
      case ProgrammingProgram.opType.label:
        if (ProgrammingProgram.labelReg[this._left] == null) {
          return false;
        }
        ProgrammingProgram.nextLine = ProgrammingProgram.labelReg[this._left];
        ProgrammingProgram.nextProcedure = ProgrammingProgram.labelRegProcedure[this._left];
        break;
      case ProgrammingProgram.opType.procedure:
        ProgrammingProgram.nextLine = -1;
        ProgrammingProgram.nextProcedure = this._left;
        break;
      default:
        return false;
        break;
    }
    return true;
  }
  get left() {
    return this._left;
  }
  get leftType() {
    return this._leftType;
  }
}

class comLabel {
  constructor({ left = null }) {
    this._left = left;
  }
  printConstructor() {
    return "new comLabel ({ left :" + this._left + " }) ";
  }

  run() {
    return false;
  }

  get left() {
    return this._left;
  }
}


class comCall {
  constructor({ left = null, leftType = null }) {
    this._left = left;
    this._leftType = leftType;
  }
  printConstructor() {
    return "new comCall ({ left :" + this._left + ", leftType :" + this._leftType + " }) ";
  }

  run() {

    switch (this._leftType) {
      case ProgrammingProgram.opType.label:
        if (ProgrammingProgram.labelReg[this._left] == null) {
          return false;
        }
        ProgrammingProgram.nextLine = ProgrammingProgram.labelReg[this._left];
        ProgrammingProgram.nextProcedure = ProgrammingProgram.labelRegProcedure[this._left];

        ProgrammingProgram.returnProcedure.push(ProgrammingProgram.activeProcedure);
        ProgrammingProgram.returnLine.push(ProgrammingProgram.activeLine);
        break;
      case ProgrammingProgram.opType.procedure:
        ProgrammingProgram.nextLine = -1;
        ProgrammingProgram.nextProcedure = this._left;

        ProgrammingProgram.returnProcedure.push(ProgrammingProgram.activeProcedure);
        ProgrammingProgram.returnLine.push(ProgrammingProgram.activeLine);
        break;
      default:
        return false;
        break;
    }
    return true;
  }

  get left() {
    return this._left;
  }
  get leftType() {
    return this._leftType;
  }
}


class comReturn {
  constructor({ left = null }) {
    this._left = left;
  }

  printConstructor() {
    return "new comReturn ({ left :" + this._left + " }) ";
  }

  run() {

    if (ProgrammingProgram.returnLine.length == 0) {
      return false;
    }

    ProgrammingProgram.nextLine = ProgrammingProgram.returnLine.pop();
    ProgrammingProgram.nextProcedure = ProgrammingProgram.returnProcedure.pop();

    return true;
  }
  get left() {
    return this._left;
  }
}


class comSleep {
  constructor({ left = null, leftType = null, operator = null, operatorType = null }) {
    this._left = left;
    this._leftType = leftType;
    this._operator = operator;
    this._operatorType = operatorType;
  }
  printConstructor() {
    return "new comSleep ({ left :" + this._left + ", leftType :" + this._leftType + ", operator :" + this._operator + ", operatorType :" + this._operatorType + " }) ";
  }
  run() {

    if (this._left == null || this._operator == null) {
      return false;
    }

    ProgrammingProgram.timerTick = 10 * this._left + this._operator;
    ProgrammingProgram.timer = setInterval(this.tick.bind(this), 100);
    return true;

  }
  tick() {
    ProgrammingProgram.timerTick--;

    if (ProgrammingProgram.timerTick == 0) {
      clearTimeout(ProgrammingProgram.timer);
    }
  }

  get left() {
    return this._left;
  }
  get leftType() {
    return this._leftType;
  }
  get operator() {
    return this._operator;
  }
  get operatorType() {
    return this._operatorType;
  }
}

class comAvatard {
  constructor({ regNo = null, left = null, leftType = null, operator = null, operatorType = null, right = null, rightType = null }) {
    this._regNo = regNo;
    this._left = left;
    this._leftType = leftType;
    this._operator = operator;
    this._operatorType = operatorType;
    this._right = right;
    this._rightType = rightType;
  }

  printConstructor() {
    return "new comAvatard ({ regNo :" + this._regNo + ", left :" + this._left + ", leftType :" + this._leftType + ", operator :" + this._operator + ", operatorType :" + this._operatorType + ", right :" + this._right + ", rightType :" + this._rightType + " }) ";
  }


  run() {

    if (this._leftType == ProgrammingProgram.opType.number) {
      if (ProgrammingProgram.avatardReg[this._regNo] == null) {
        return false;
      }
    } else if (ProgrammingProgram.avatardBlock[this._regNo] == null) {
      return false;
    }

    let delay = 700;

    let blockUnder;
    switch (this._leftType) {
      case ProgrammingProgram.opType.number:

        if (this._operatorType != ProgrammingProgram.opType.number || this._rightType != ProgrammingProgram.opType.number) {
          return false;
        }

        ProgrammingProgram.avatardBlock[this._regNo] = new BlockAvatard({});
        if (!ProgrammingProgram.avatardBlock[this._regNo].place({ x: this._left, y: this._operator, z: this._right, r: 0 })) {
          ProgrammingProgram.avatardBlock[this._regNo] = null;
          return false;

        }
        ProgrammingProgram.avatardMesh[this._regNo] = new MeshAvatard(ProgrammingProgram.avatardBlock[this._regNo], ProgrammingProgram.avatardReg[this._regNo]);
        break;
      case ProgrammingProgram.opType.black:
        blockUnder = ProgrammingProgram.avatardBlock[this._regNo].blockUnder();
        if (blockUnder == null) {
          return false;
        }
        blockUnder.color = meshColor.black;
        break;
      case ProgrammingProgram.opType.red:
        blockUnder = ProgrammingProgram.avatardBlock[this._regNo].blockUnder();
        if (blockUnder == null) {
          return false;
        }
        blockUnder.color = meshColor.red;
        break;
      case ProgrammingProgram.opType.green:
        blockUnder = ProgrammingProgram.avatardBlock[this._regNo].blockUnder();
        if (blockUnder == null) {
          return false;
        }
        blockUnder.color = meshColor.green;
        break;
      case ProgrammingProgram.opType.blue:
        blockUnder = ProgrammingProgram.avatardBlock[this._regNo].blockUnder();
        if (blockUnder == null) {
          return false;
        }
        blockUnder.color = meshColor.blue;
        break;
      case ProgrammingProgram.opType.left:
        if (!ProgrammingProgram.avatardBlock[this._regNo].turnLeft()) {
          return false;
        }
        ProgrammingProgram.avatardMesh[this._regNo].updatePos();
        ProgrammingProgram.timerTick = 1;
        ProgrammingProgram.timer = setTimeout(function () { ProgrammingProgram.timerTick = 0 }.bind(this), delay);
        break;
      case ProgrammingProgram.opType.right:
        if (!ProgrammingProgram.avatardBlock[this._regNo].turnRight()) {
          return false;
        }
        ProgrammingProgram.avatardMesh[this._regNo].updatePos();
        ProgrammingProgram.timerTick = 1;
        ProgrammingProgram.timer = setTimeout(function () { ProgrammingProgram.timerTick = 0 }.bind(this), delay);

        break;
      case ProgrammingProgram.opType.forward:
        if (!ProgrammingProgram.avatardBlock[this._regNo].moveForward()) {
          return false;
        }
        ProgrammingProgram.avatardMesh[this._regNo].updatePos();
        ProgrammingProgram.timerTick = 1;
        ProgrammingProgram.timer = setTimeout(function () { ProgrammingProgram.timerTick = 0 }.bind(this), delay);
        break;
      case ProgrammingProgram.opType.up:
        if (!ProgrammingProgram.avatardBlock[this._regNo].moveUp()) {
          return false;
        }
        ProgrammingProgram.avatardMesh[this._regNo].updatePos();
        ProgrammingProgram.timerTick = 1;
        ProgrammingProgram.timer = setTimeout(function () { ProgrammingProgram.timerTick = 0 }.bind(this), delay);
        break;
      case ProgrammingProgram.opType.down:
        if (!ProgrammingProgram.avatardBlock[this._regNo].moveDown()) {
          return false;
        }
        ProgrammingProgram.avatardMesh[this._regNo].updatePos();
        ProgrammingProgram.timerTick = 1;
        ProgrammingProgram.timer = setTimeout(function () { ProgrammingProgram.timerTick = 0 }.bind(this), delay);
        break;
      default:
        return false;
        break;
    }
    return true;
  }

  get regNo() {
    return this._regNo
  }

  get left() {
    return this._left;
  }
  get leftType() {
    return this._leftType;
  }

  get operator() {
    return this._operator;
  }
  get operatorType() {
    return this._operatorType;
  }
  get right() {
    return this._right;
  }

  get rightType() {
    return this._rightType;
  }

}



class ProgrammingProgram {

  static processLoadObject(program) {

    for (let ii = 0; ii < program.procedure.length; ii++) {
      if (program.procedure[ii] != null) {
        for (let i = 0; i < program.procedure[ii].line.length; i++) {
          if (program.procedure[ii].line[i] != null) {
            program.procedure[ii].line[i] = eval(program.procedure[ii].line[i]);
          }
        }
      }
    }

    for (let i = 0; i < program.shapeReg.length; i++) {
      if (program.shapeReg[i] != null) {
        program.shapeReg[i] = eval(program.shapeReg[i]);
      }
    }

    for (let i = 0; i < program.avatardReg.length; i++) {
      if (program.avatardReg[i] != null) {
        program.avatardReg[i] = eval(program.avatardReg[i]);
      }
    }

    return program;

  }

  static init() {
    ProgrammingProgram.opType = {
      val: 0,
      bool: 1,
      int: 2,
      shape: 3,
      avatard: 4,
      equal: 5,
      notEqual: 6,
      greater: 7,
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
      label: 34,
      trueFalse: 35,
      shapeEmpty: 36,


    }

    ProgrammingProgram.intReg = [];

    ProgrammingProgram.boolReg = [];
    ProgrammingProgram.shapeReg = [];
    ProgrammingProgram.shapeRegConfigPos = [];
    ProgrammingProgram.shapeRegConfigCol = [];
    ProgrammingProgram.avatardReg = [];
    ProgrammingProgram.avatardBlock = [];
    ProgrammingProgram.avatardMesh = [];
    ProgrammingProgram.labelReg = [];
    ProgrammingProgram.labelRegProcedure = [];

    ProgrammingProgram.timer;
    ProgrammingProgram.timerTick;

    ProgrammingProgram.returnProcedure = [];
    ProgrammingProgram.returnLine = [];

  }


  constructor({ procedure = [], intReg = [], boolReg = [], shapeReg = [], shapeRegConfigPos = [], shapeRegConfigCol = [], avatardReg = [], game = null }) {

    this._procedure = procedure;

    for (let i = 0; i < 100; i++) {
      if (this._procedure[i] == null) {
        this._procedure[i] = { line: [] };
      }
    }

    for (let i = 0; i < 100; i++) {
      if (shapeRegConfigPos[i] == null) {
        shapeRegConfigPos[i] = ProgrammingProgram.opType.equalPos;
      }
      if (shapeRegConfigCol[i] == null) {
        shapeRegConfigCol[i] = ProgrammingProgram.opType.equalCol;
      }
    }

    ProgrammingProgram.intReg = intReg;

    ProgrammingProgram.boolReg = boolReg;
    ProgrammingProgram.shapeReg = shapeReg;
    ProgrammingProgram.shapeRegConfigPos = shapeRegConfigPos;
    ProgrammingProgram.shapeRegConfigCol = shapeRegConfigCol;
    ProgrammingProgram.avatardReg = avatardReg;
    ProgrammingProgram.labelReg = [];
    ProgrammingProgram.labelRegProcedure = [];
    ProgrammingProgram.activeProcedure = 0;
    ProgrammingProgram.activeLine = -1;

    ProgrammingProgram.nextProcedure = 0;
    ProgrammingProgram.nextLine = -1;

    ProgrammingProgram.game = game;

    this._intReg = intReg;

    this._boolReg = boolReg;
    this._shapeReg = shapeReg;
    this._shapeRegConfigPos = shapeRegConfigPos;
    this._shapeRegConfigCol = shapeRegConfigCol;
    this._avatardReg = avatardReg;

    this._firstStep = true;

  }

  close() {
    this.reset();//!!!
    ProgrammingProgram.avatardMesh.forEach(function (item) {
      if (item != null) {
        item.dispose();
      }
    });
  }

  reset() {

    if (!this._firstStep) {
      this._firstStep = true;

      clearTimeout(ProgrammingProgram.timer);
      ProgrammingProgram.timerTick = 0;

      ProgrammingProgram.activeProcedure = 0;
      ProgrammingProgram.activeLine = -1;

      ProgrammingProgram.nextProcedure = 0;
      ProgrammingProgram.nextLine = -1;

      ProgrammingProgram.avatardBlock = [];
      ProgrammingProgram.avatardMesh.forEach(function (item) {
        if (item != null) {
          item.dispose();
        }
      });
      ProgrammingProgram.avatardMesh = [];

      ProgrammingProgram.avatardMesh

      ProgrammingProgram.intReg = this._intReg;

      ProgrammingProgram.boolReg = this._boolReg;
      ProgrammingProgram.shapeReg = this._shapeReg;
      ProgrammingProgram.shapeRegConfigPos = this._shapeRegConfigPos;
      ProgrammingProgram.shapeRegConfigCol = this._shapeRegConfigCol;

      ProgrammingProgram.avatardReg = this._avatardReg;

      ProgrammingProgram.returnProcedure = [];
      ProgrammingProgram.returnLine = [];
    }

  }

  buildLabelReg() {
    ProgrammingProgram.labelReg = [];
    ProgrammingProgram.labelRegProcedure = [];

    this._procedure.forEach(function (p, pi) {
      p.line.forEach(function (l, li) {
        if (l instanceof comLabel && l.left != null) {
          ProgrammingProgram.labelReg[l.left] = li;
          ProgrammingProgram.labelRegProcedure[l.left] = pi;
        }

      }.bind(this));
    }.bind(this));

  }

  step() {

    if (this._firstStep) {

      this.buildLabelReg();

      this._intReg = ProgrammingProgram.intReg.slice(0);
      this._boolReg = ProgrammingProgram.boolReg.slice(0);

      this._shapeReg = [];
      ProgrammingProgram.shapeReg.forEach(function (item, index) {
        if (item != null) {
          this._shapeReg[index] = Block.copy(item);
        }
      }.bind(this))

      this._shapeRegConfigPos = ProgrammingProgram.shapeRegConfigPos.slice(0);
      this._shapeRegConfigCol = ProgrammingProgram.shapeRegConfigCol.slice(0);
      this._avatardReg = ProgrammingProgram.avatardReg.slice(0);

      this._firstStep = false;
    }
    if (ProgrammingProgram.timerTick > 0) {
      return true;

    }

    ProgrammingProgram.activeProcedure = ProgrammingProgram.nextProcedure;
    ProgrammingProgram.activeLine = ProgrammingProgram.nextLine;

    if (this._procedure[ProgrammingProgram.activeProcedure].line.length > ProgrammingProgram.activeLine) {
      ProgrammingProgram.activeLine++;
      ProgrammingProgram.nextLine++;
    }

    while (this._procedure[ProgrammingProgram.activeProcedure].line.length > ProgrammingProgram.activeLine) {
      if (this._procedure[ProgrammingProgram.activeProcedure].line[ProgrammingProgram.activeLine] != null) {
        if (this._procedure[ProgrammingProgram.activeProcedure].line[ProgrammingProgram.activeLine].run()) {
          return true;
        }
      }

      ProgrammingProgram.activeLine++;
      ProgrammingProgram.nextLine++;
    }
    return false;
  }

  get procedure() {
    return this._procedure;
  }

  get activeProcedure() {
    return ProgrammingProgram.activeProcedure;
  }

  get activeLine() {
    return ProgrammingProgram.activeLine;
  }

  get opType() {
    return ProgrammingProgram.opType;
  }

  get boolReg() {
    return ProgrammingProgram.boolReg;
  }

  get intReg() {
    return ProgrammingProgram.intReg;
  }

  get shapeReg() {
    return ProgrammingProgram.shapeReg;
  }

  get shapeRegConfigPos() {
    return ProgrammingProgram.shapeRegConfigPos;
  }

  get shapeRegConfigCol() {
    return ProgrammingProgram.shapeRegConfigCol;
  }

  get avatardReg() {
    return ProgrammingProgram.avatardReg;
  }

  get labelReg() {
    return ProgrammingProgram.labelReg;
  }


}

