class Whack extends Game {
  constructor() {
    let level = [];





    super({ level: level, userCreatedLevel: false });



    /*   this._colorMatchLevel = [
         [new Block2x2({ x : 7, y : 0, z : 5, r : 1, color : [0,0]}),new Block2x2({ x : 7, y : 1, z : 5, r : 1, color : [0,0]}),],
       [new Block2x2({ x : 7, y : 0, z : 5, r : 1, color : [0,0]}),new Block2x2({ x : 7, y : 1, z : 5, r : 1, color : [0,0]}),new Block2x2({ x : 8, y : 2, z : 4, r : 3, color : [0,0]}),],
       [new Block2x2({ x : 7, y : 0, z : 8, r : 1, color : [0,0]}),new Block2x2({ x : 7, y : 0, z : 6, r : 1, color : [0,0]}),new Block2x2({ x : 8, y : 0, z : 3, r : 3, color : [0,0]}),],
       [new Block2x2({ x : 7, y : 0, z : 8, r : 1, color : [0,0]}),new Block2x2({ x : 7, y : 0, z : 6, r : 1, color : [0,0]}),new Block2x2({ x : 8, y : 0, z : 3, r : 3, color : [0,0]}),new Block2x2({ x : 7, y : 0, z : 1, r : 0, color : [0,0]}),]
       ];*/

    //  this._colorMatchCurrentLevel = 0;
   // this._winCount = 0;

 //   this._score =0;

  //  this._winCount = 0;

  this._score = 0

  this._levelScoreProgression = [0,3,5,10];

   // this._winTresholds

   this._whackCurrentLevel = 1;



    this._timeoutDelay = null;


    this._initialDelay = true;

   
      this._win = false;
      this._fail = false;




    this._enumWhackState = {
      build: 0,
      delayShow: 1,
      moveUp: 2,
      whack: 3,
      moveDown: 4,
     // fail: 5,
    }

    // this._whackState = 0;

    this._whackPillar = [];

    this._whackPillar[0] = {
      active: true,
      state: 0,
      block: [new Block2x2({ x: 7, y: 0, z: 5, r: 1, color: [0, 0] }), new Block2x2({ x: 7, y: 1, z: 5, r: 1, color: [0, 0] }),],

      timeOutCount: 0,
      delay: 5,
      speed: 5,
      currentLevel: -1,
      

    };

    this._whackPillar[1] = {
      active: false,
      state: 0,
      block: [new Block2x2({ x: 2, y: 0, z: 5, r: 1, color: [0, 0] }), new Block2x2({ x: 2, y: 1, z: 5, r: 1, color: [0, 0] }),],

      timeOutCount: 0,
      delay: 4,
      speed: 4,
      currentLevel: -1,
   

    };





    world.base.ledFront = meshColor.black;
    world.base.ledLeft = meshColor.magenta;
    world.base.ledRight = meshColor.cyan;
    world.base.ledBack = meshColor.black;


    this._setLevel({ level: 1, difficulty: 0 });


  }

  _setLevel({ level = 0, difficulty = 0 }) {

    super._setLevel({ level: level, difficulty: difficulty });
    //this._colorMatchState = this._enumColorMatchState.build;

    //  this._activeDisplayBlocks = [new Block2x2({ x: 8, y: 0, z: 4, r: 0, color: [0, 0] }), new Block2x2({ x: 8, y: 1, z: 4, r: 0, color: [0, 0] })];
    

    switch(level){
      case 1:
      this._whackPillar[0].active = true;
      this._whackPillar[1].active = false;

      break;
      case 2:
      this._whackPillar[0].active = true;
      this._whackPillar[1].active = true;

      break;
    }

    
    this.update();


    /*if (level > 0) {
     // this.showDifficultyButton();
    }*/
  }

  reset() {
    this._whackPillar.forEach ( item => item.active = false);
    this._whackPillar[0].active = true; 
    this._whackCurrentLevel = 1;
    this._reset();



    super.reset();


  }

  _reset(){

    this._whackPillar.forEach (function(item){
      item.state = 0;
      item.timeOutCount = 0;
      item.currentLevel = -1;
    } );

    this._initialDelay = true;
       
    this._win = false;
    this._fail = false;


    this._score = this._levelScoreProgression[this._whackCurrentLevel];


  
     // this._winTresholds
  
    // this._whackCurrentLevel = 1;
    

    Block.setColor({block: world.block, color: meshColor.black});

  }

  //block turn one way doesn't work
  //color is blinking while correct

  _timeoutDelayFunction() {

    clearTimeout(this._timeoutDelay);
    this._timeoutDelay = null;



  }

  update() {

    super.update();

    /* if(this.state == this.enumState.busyCreatingShape){
       return;
     }*/



    let allShown = true;


    this._whackPillar.forEach(function (item) {
      if (item.active) {
        let set = Block.calcSet({ left: world.block, right: item.block, careColor: false, careRotation: false });
        if (set.diffRight.length > 0) {
          this.show({ block: set.diffRight, careColor: false });
          allShown = false;
        }

      }

    }.bind(this));


    if (allShown && this._initialDelay) {
      this._initialDelay = false;
      this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 1000);
    }


    if (allShown && this._timeoutDelay == null) {



      this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 100);

      if(this._fail){
        this._reset();
        return
      }else if (this._win){
        sound.win();
        this._whackCurrentLevel++;
        this._reset();
        this._setLevel({ level: this._whackCurrentLevel, difficulty: 0 });
       
        return
      }

      this._whackPillar.forEach(function (item) {
        if (item.active) {

          switch (item.state) {
            /* case this._enumWhackState.build: //?remove
 
               // this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 1500);
               //this._whackState = this._enumWhackState.delayShow;
               break;*/
            case this._enumWhackState.delayShow:
              item.timeOutCount++;
              if (item.timeOutCount == item.delay) {
                item.timeOutCount = 0;
                item.state = this._enumWhackState.moveUp
              }

              break;
            case this._enumWhackState.moveUp:
              item.timeOutCount++;
              if (item.timeOutCount == item.speed) {
                item.timeOutCount = 0;

                // set block on top yellow
                //move up

                let pillarUp = BlockPillar.convertBlock(item.block[0]);
                let setMoveUp = BlockPillar.calcSet(world.block, pillarUp);

                let foundUp = false;
                for (let i = 0; i < setMoveUp.intersectionLeft.length; i++) {
                  if (setMoveUp.intersectionLeft[i].y == item.currentLevel + 1) {
                    setMoveUp.intersectionLeft[i].color = meshColor.yellow;
                    item.currentLevel++;
                    foundUp = true;
                    break;

                  }
                }

                if (foundUp) {
                  foundUp = false;
                  for (let i = 0; i < setMoveUp.intersectionLeft.length; i++) {
                    if (setMoveUp.intersectionLeft[i].y == item.currentLevel + 1) {
                      foundUp = true;
                      break;
                    }
                  }
                  if (!foundUp) {
                    item.state = this._enumWhackState.whack;
                  }

                } else {
                  setMoveUp.intersectionLeft.forEach(itemFail => itemFail.color = meshColor.red);
                  sound.fail();
                  this._fail = true;
                  clearTimeout(this._timeoutDelay);                  
                this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 1000);
                 // item.state = this._enumWhackState.fail;
                }


                //!! pull away during moving upwards? only check correct level or fail?
                //move to whack
              }


              break;
            case this._enumWhackState.whack:
              
              //

              let pillarWhack = BlockPillar.convertBlock(item.block[0]);
              let setWhack = BlockPillar.calcSet(world.block, pillarWhack);

              let foundWhack = false;
              for (let i = 0; i < setWhack.intersectionLeft.length; i++) {
                if (setWhack.intersectionLeft[i].y == item.currentLevel + 1) {
                  setWhack.intersectionLeft[i].color = meshColor.green;
                  item.currentLevel++;
                  foundWhack = true;
                  this._score++;

                  if(this._score == this._levelScoreProgression[this._whackCurrentLevel] ){
                    
                    this._win = true;
                  }else{
                    item.state = this._enumWhackState.moveDown;
                  }
                  break;

                }
              }

              item.timeOutCount++;
              if (foundWhack) {
                item.timeOutCount = 0;
              } else {
                if (item.timeOutCount == item.speed) {
                  setWhack.intersectionLeft.forEach(itemFail => itemFail.color = meshColor.red);
                  sound.fail();
                  this._fail = true;
                  clearTimeout(this._timeoutDelay);
                this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 1000);
                 // item.state = this._enumWhackState.fail;
                  //item.timeOutCount = 0;
                }
              }

              break;
            case this._enumWhackState.moveDown:
            item.timeOutCount++;
              if (item.timeOutCount == item.speed) {
                item.timeOutCount = 0;


                
                let pillarDown = BlockPillar.convertBlock(item.block[0]);
                let setMoveDown = BlockPillar.calcSet(world.block, pillarDown);

                setMoveDown.intersectionLeft.forEach (function (itemDown){
                  if(itemDown.y == item.currentLevel){
                    itemDown.color = meshColor.black;
                  }
                }.bind(this))
                item.currentLevel--;
                if(item.currentLevel == -1){
                  item.state = this._enumWhackState.delayShow;
                }
                //move move down

                //move to delay show
              }

              break;
          /*  case this._enumWhackState.fail:
              item.timeOutCount++;
              if (item.timeOutCount == 3){ //should be lower than win!!
             
                clearTimeout(this._timeoutDelay);
                this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 1000);
              
                this._reset();

                sound.fail();

                item.state = this._enumWhackState.delayShow;
              }

              break;
              case this._enumWhackState.win:

              break;*/

          }
        }

      }.bind(this));

    }






  }



}