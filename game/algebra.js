class Algebra extends Game {
  constructor() {
    let level = [];

    level.push({ difficulty: [], image: null });



    level[0].difficulty.push({ image: "./icon/games/algebra/lvl1.svg" });
    level[0].difficulty.push({ image: "./icon/games/algebra/lvl2.svg" });
    level[0].difficulty.push({ image: "./icon/games/algebra/lvl3.svg" });


    level.push({ difficulty: [], image: null });
    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);

    level.push({ difficulty: [], image: null });
    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);

    level.push({ difficulty: [], image: null });
    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);

        level.push({ difficulty: [], image: null });
    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);

    level.push({ difficulty: [], image: null });
    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([]);



    super({ level: level });

    this._result = 0;

    this._leftPillar = {
      block: new BlockPillar({ x: 4, y: 0, z: 7 }),
      mesh: null,
      active: false,
    };

    this._centerPillar = {
      block: new BlockPillar({ x: 4, y: 0, z: 4 }),
      mesh: null,
      active: false,
    };

    this._rightPillar = {
      block: new BlockPillar({ x: 4, y: 0, z: 1 }),
      mesh: null,
      active: false,
    };



    this._leftNumber = {
      block: new BlockNumber({ x: 0, y: 0, z: 10 }),
      mesh: null,
      active: false,
      fixed: false,
      val: 0,
      yellow: false,
      green: false,
    };

    this._leftOperator = {
      block: new BlockNumber({ x: 0, y: 0, z: 7.5 }),
      mesh: null,
      active: false,
      val: MeshNumber._staticOperator.plus
    };

    this._centerNumber = {
      block: new BlockNumber({ x: 0, y: 0, z: 4.5 }),
      mesh: null,
      active: false,
      fixed: false,
      val: 0,
      yellow: false,
      green: false,
    };

    this._rightOperator = {
      block: new BlockNumber({ x: 0, y: 0, z: 1.5 }),
      mesh: null,
      active: false,
      fixed: false,
      val: MeshNumber._staticOperator.equal
    };

    this._rightNumber = {
      block: new BlockNumber({ x: 0, y: 0, z: -1 }),
      mesh: null,
      active: false,
      fixed: false,
      val: 0,
      yellow: false,
      green: false,
    };


    this._minusCalc = false;
    this._noCalc = false;
    this._useFraction = false;
    this._maxNumber = 10;
    this._minNumber = 0;

    camera.moveBaseDown();

    this._setLevel({ level: 1, difficulty: 0 });


  }



  _setLevel({ level = 0, difficulty = 0 }) {

    console.log("algebra, level: " + level + " difficulty: " + difficulty);

    super._setLevel({ level: level, difficulty: difficulty });

   // database.setLevel({ name: this.constructor.name, level: level, difficulty: difficulty });
    this.reset();


    this._leftPillar.active = false;
    this._centerPillar.active = false;
    this._rightPillar.active = false;

    this._leftNumber.active = false;
    this._leftOperator.active = false;
    this._centerNumber.active = false;
    this._rightOperator.active = false;
    this._rightNumber.active = false;

    this._leftOperator.block.color = meshColor.green;
    this._rightOperator.block.color = meshColor.green;


    this._leftNumber.fixed = false;
    this._centerNumber.fixed = false;
    this._rightNumber.fixed = false;

    this._leftNumber.yellow = false;
    this._centerNumber.yellow = false;
    this._rightNumber.yellow = false;

    this._leftNumber.green = false;
    this._centerNumber.green = false;
    this._rightNumber.green = false;


    this._minusCalc = false;
    this._noCalc = false;
    this._useFraction = false;

    this._maxNumber = 10;
    this._minNumber = 0;

    switch (level) {
      case 0:

        switch (difficulty) {
          case 0:
            this._centerNumber.active = true;
            this._centerPillar.active = true;
            this._noCalc = true;
            break;
          case 1:
            this._leftNumber.active = true;
            this._leftOperator.active = true;
            this._centerNumber.active = true;
            this._rightOperator.active = true;
            this._rightNumber.active = true;

            this._leftPillar.active = true;
            this._centerPillar.active = true;
            this._rightPillar.active = true;
            break;
          case 2:
            this._leftNumber.active = true;
            this._leftOperator.active = true;
            this._centerNumber.active = true;
            this._rightOperator.active = true;
            this._rightNumber.active = true;

            this._leftPillar.active = true;
            this._centerPillar.active = true;
            this._rightPillar.active = true;

            this._minusCalc = true;

            break;
        }

        break;
      case 1:
        this._centerNumber.active = true; 

        this._centerNumber.yellow = true;

        this._centerPillar.active = true;

        this._rightOperator.active = true;
        this._rightOperator.fixed = true;

        this._rightNumber.active = true;
        this._rightNumber.fixed = true;
        this._rightNumber.green = true;
        this._rightNumber.block.color = meshColor.green;



        break;
      case 2:
        this._leftNumber.active = true;
        this._leftOperator.active = true;
        this._centerNumber.active = true;
        this._rightOperator.active = true;
        this._rightNumber.active = true;

        this._leftPillar.active = true;
        this._centerPillar.active = true;
        this._rightPillar.active = true;

        this._leftNumber.fixed = true;
        this._centerNumber.fixed = true;

        this._rightNumber.yellow = true;


        break;

      case 3:
      this._leftNumber.active = true;
      this._leftOperator.active = true;
      this._centerNumber.active = true;
      this._rightOperator.active = true;
      this._rightNumber.active = true;

      this._leftPillar.active = true;
      this._centerPillar.active = true;
      this._rightPillar.active = true;

      this._leftNumber.fixed = true;
      this._centerNumber.fixed = true;

      this._rightNumber.yellow = true;
        this._minusCalc = true;


        // this._rightNumber.fixed = true;    


        break;

        case 4:
        this._leftNumber.active = true;
        this._leftOperator.active = true;
        this._centerNumber.active = true;
        this._rightOperator.active = true;
        this._rightNumber.active = true;
  
        this._leftPillar.active = true;
        this._centerPillar.active = true;
        this._rightPillar.active = true;
  
        this._leftNumber.fixed = true;
        this._rightNumber.fixed = true;
  
        this._centerNumber.yellow = true;
     
  
  
          // this._rightNumber.fixed = true;    
  
  
          break;

          case 5:
                  this._leftNumber.active = true;
        this._leftOperator.active = true;
        this._centerNumber.active = true;
        this._rightOperator.active = true;
        this._rightNumber.active = true;
  
        this._leftPillar.active = true;
        this._centerPillar.active = true;
        this._rightPillar.active = true;
  
        this._leftNumber.fixed = true;
        this._rightNumber.fixed = true;
  
        this._centerNumber.yellow = true;



            this._minusCalc = true;
    
    
            // this._rightNumber.fixed = true;    
    
    
            break;

    }


    if (level > 0) {

      switch (difficulty) {
        case 0:
        this._maxNumber = 3;
        this._minNumber = 0;
          break;
        case 1:
        this._maxNumber = 6;
        this._minNumber = 2;

        case 2:
        this._maxNumber = 10;
        this._minNumber = 4;

          break;
      }

      this.showDifficultyButton();

      while (true) {

        let numbers = [100, 100, 100];

        while (numbers[0] > this._maxNumber || numbers[1] > this._maxNumber || numbers[2] > this._maxNumber ||
          numbers[0] < this._minNumber || numbers[1] < this._minNumber || numbers[2] < this._minNumber ||
          numbers[0] == this._leftNumber.val || numbers[1] == this._centerNumber.val || numbers[2] == this._rightNumber.val) {
          numbers[0] = Math.floor(Math.random() * 10);
          numbers[1] = Math.floor(Math.random() * 10);
          numbers[2] = Math.floor(Math.random() * 10);

        }

        if (this._useFraction) {
          numbers[0] += (1 + Math.floor(Math.random() * 3)) / 4;
          numbers[1] += (1 + Math.floor(Math.random() * 3)) / 4;
          numbers[2] += (1 + Math.floor(Math.random() * 3)) / 4;
        }
        if (this._leftNumber.active) {
          if (this._minusCalc) {
            numbers[2] = numbers[0] - numbers[1]
          } else {
            numbers[2] = numbers[0] + numbers[1]
          }

          let neededBlocks = 0;
          for (let i = 0; i < 3; i++) {
            neededBlocks += Math.floor(numbers[i]);
            if (numbers[1] - Math.floor(numbers[i]) > 0) {
              if (numbers[1] - Math.floor(numbers[i]) < 0.75) {
                neededBlocks += 1;
              } else {
                neededBlocks += 2;
              }
            }
          }
          if (neededBlocks < 19 && numbers[2] >= 0) {
            if (this._leftNumber.fixed) {
              this._leftNumber.val = numbers[0];
            }
            if (this._centerNumber.fixed) {
              this._centerNumber.val = numbers[1];
            }
            if (this._rightNumber.fixed) {
              this._rightNumber.val = numbers[2];
            }
            break;
          }

        } else {

          this._leftNumber.val = 0;
          this._rightNumber.val = numbers[2];

          break;
        }
      }


    }


    if (this._leftPillar.active) {
      this._leftPillar.mesh = new MeshNumberPillar(this._leftPillar.block)
    }
    if (this._centerPillar.active) {
      this._centerPillar.mesh = new MeshNumberPillar(this._centerPillar.block)
    }
    if (this._rightPillar.active) {
      this._rightPillar.mesh = new MeshNumberPillar(this._rightPillar.block)
    }


    this._updateNumber({ newVal: this._leftNumber.val, number: this._leftNumber, yellow: this._leftNumber.yellow, green: this._leftNumber.green });

    if (this._minusCalc) {
      this._leftOperator.val = MeshNumber._staticOperator.minus;
    } else {
      this._leftOperator.val = MeshNumber._staticOperator.plus;
    }
    this._updateNumber({ newVal: this._leftOperator.val, number: this._leftOperator });

    this._updateNumber({ newVal: this._centerNumber.val, number: this._centerNumber, yellow: this._leftNumber.yellow, green: this._leftNumber.green });


    this._updateNumber({ newVal: this._rightOperator.val, number: this._rightOperator });


    this._updateNumber({ newVal: this._rightNumber.val, number: this._rightNumber, yellow: this._leftNumber.yellow, green: this._leftNumber.green });


    this.update(); //Remove?

  }


  _updateNumber({ newVal = 0, number = null, fixed = false, yellow = false, green = false }) {
    if (number.active) {

      if (yellow) {
        number.block.color = meshColor.yellow;

      }
      if (green) {
        number.block.color = meshColor.green;

      }

      if (number.mesh == null) {
        if (!fixed) {
          number.val = newVal;
        }
        number.mesh = new MeshNumber(number.block, number.val);

      } else if (newVal != number.val) {
        if (!fixed) {
          number.val = newVal;
        }
        this._resetMesh(number);
        number.mesh = new MeshNumber(number.block, number.val);
      } else {
        //force refresh of color        
        number.mesh.block = number.block;

      }

    }
  }

  update() {

    super.update();

    let leftNumber = 0; //= this._leftNumber.val;
    let leftOperator = 0; //= this._leftOperator.val;
    let centerNumber = 0; //= this._centerNumber.val;
    let rightOperator = 0; //= this._rightOperator.val;
    let rightNumber = 0; //= this._rightNumber.val;

    let leftCorrect = false;
    let centerCorrect = false;
    let rightCorrect = false;

    let worldPixel = BlockPixel.convertBlock(world.block);
    let setLeftPillar;
    let setCenterPillar;
    let setRightPillar;

    if (this._leftPillar.active) {
      setLeftPillar = BlockPillar.calcSet({ left: worldPixel, right: this._leftPillar.block });
      leftNumber = setLeftPillar.intersectionLeft.length / 4;
    }

    if (this._centerPillar.active) {
      setCenterPillar = BlockPillar.calcSet({ left: worldPixel, right: this._centerPillar.block });
      centerNumber = setCenterPillar.intersectionLeft.length / 4;
    }

    if (this._rightPillar.active) {
      setRightPillar = BlockPillar.calcSet({ left: worldPixel, right: this._rightPillar.block });
      rightNumber = setRightPillar.intersectionLeft.length / 4;
    }

    if (this._leftNumber.fixed) {
      if (leftNumber > this._leftNumber.val) {
        this._leftNumber.block.color = meshColor.red;
      } else if (leftNumber < this._leftNumber.val) {
        this._leftNumber.block.color = meshColor.blue;
      } else {
        leftCorrect = true;
        this._leftNumber.block.color = meshColor.green;
      }
      leftNumber = this._leftNumber.val;
    }

    if (this._centerNumber.fixed) {
      if (centerNumber > this._centerNumber.val) {
        this._centerNumber.block.color = meshColor.red;
      } else if (centerNumber < this._centerNumber.val) {
        this._centerNumber.block.color = meshColor.blue;
      } else {
        centerCorrect = true;
        this._centerNumber.block.color = meshColor.green;
      }
      centerNumber = this._centerNumber.val;
    }

    if (this._rightNumber.fixed) {
      if (rightNumber > this._rightNumber.val) {
        this._rightNumber.block.color = meshColor.red;
      } else if (rightNumber < this._rightNumber.val) {
        this._rightNumber.block.color = meshColor.blue;
      } else {
        rightCorrect = true;
        this._rightNumber.block.color = meshColor.green;
      }
      rightNumber = this._rightNumber.val;
    }


    let result = 0;
    if (this._noCalc) {
      
      result = rightNumber;

    } else if (this._minusCalc) {
      result = leftNumber - centerNumber;
     
    } else {

      result = leftNumber + centerNumber;
   
    }



 

    if (rightNumber > result) {
      rightOperator = MeshNumber._staticOperator.less;
      if (!this._leftNumber.fixed) {
        this._leftNumber.block.color = meshColor.blue;
      }
      if (!this._centerNumber.fixed) {
        this._centerNumber.block.color = meshColor.blue;
      }
      if (!this._rightNumber.fixed) {
        this._rightNumber.block.color = meshColor.red;
      }
    } else if (rightNumber < result) {
      rightOperator = MeshNumber._staticOperator.greater;
      if (!this._leftNumber.fixed) {
        this._leftNumber.block.color = meshColor.red;
      }
      if (!this._centerNumber.fixed) {
        this._centerNumber.block.color = meshColor.red;
      }
      if (!this._rightNumber.fixed) {
        this._rightNumber.block.color = meshColor.blue;
      }
    } else {
      rightOperator = MeshNumber._staticOperator.equal;
      if (!this._leftNumber.fixed) {
        leftCorrect = true;
        this._leftNumber.block.color = meshColor.green;
      }
      if (!this._centerNumber.fixed) {
        centerCorrect = true;
        this._centerNumber.block.color = meshColor.green;
      }
      if (!this._rightNumber.fixed) {
        rightCorrect = true;
        this._rightNumber.block.color = meshColor.green;
      }
    }


    if (this._leftPillar.active) {
      BlockPixel.setBlockColor({ block: setLeftPillar.intersectionLeft, color: this._leftNumber.block.color[0], colorComplete: false });
    }
    this._updateNumber({ newVal: leftNumber, number: this._leftNumber, fixed: this._leftNumber.fixed, yellow: this._leftNumber.yellow, green: this._leftNumber.green });



    if (this._centerPillar.active) {
      BlockPixel.setBlockColor({ block: setCenterPillar.intersectionLeft, color: this._centerNumber.block.color[0], colorComplete: false });
    }
    this._updateNumber({ newVal: centerNumber, number: this._centerNumber, fixed: this._centerNumber.fixed, yellow: this._centerNumber.yellow, green: this._centerNumber.green });

    if (!this._rightOperator.fixed) {
      this._updateNumber({ newVal: rightOperator, number: this._rightOperator });
    }

    if (this._rightPillar.active) {
      BlockPixel.setBlockColor({ block: setRightPillar.intersectionLeft, color: this._rightNumber.block.color[0], colorComplete: false });
    }
    this._updateNumber({ newVal: rightNumber, number: this._rightNumber, fixed: this._rightNumber.fixed, yellow: this._rightNumber.yellow, green: this._rightNumber.green });


    if (this._levelIndex == 1){
      if(this._rightNumber.val == this._centerNumber.val){
        this.win({});
      }
    }else if (this._levelIndex > 1){
      if( leftCorrect && centerCorrect && rightCorrect){
        this.win({});        
      }
    }


  }

  _resetMesh(obj) {
    if (obj.mesh != null) {
      obj.mesh.dispose();
      obj.mesh = null;
    }

  }

  reset() {
    super.reset();

    this._resetMesh(this._leftNumber);
    this._resetMesh(this._leftOperator);
    this._resetMesh(this._centerNumber);
    this._resetMesh(this._rightOperator);
    this._resetMesh(this._rightNumber);

    this._resetMesh(this._leftPillar);
    this._resetMesh(this._centerPillar);
    this._resetMesh(this._rightPillar);

  }
  close(){
    camera.reset();
    super.close();
  }

}