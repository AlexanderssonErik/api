class Tangram extends Game {
  constructor() {

    let level = [];

    level.push({ difficulty: [], image: null });

    tangramLevel.buildLevel(level)
    super({ level: level,  userCreatedLevel : true});


    this._showAllSides = false;
    this._careColor = false;
    this._careGap = false;
    this._showNoHints = false;

    this._sidesCorrect = 0;

    this._shadowPixelCorrect = 0;
    this._shadowPixelWrong = 0;
    this._shadowPixelMaxCorrect = 0;

    this._setLevel ({level: 1, difficulty: 0 }); 

    // this.update(); //Remove?


  }

  reset() {
    super.reset();

  }

  _setLevel({ level = 0, difficulty = 0 }) {
    /*if(level == 0){
      level = 1;
      difficulty = 0;
    }*/
    super._setLevel({ level: level, difficulty: difficulty, update: false });

    this._activeStageShadow = BlockShadow.convert({ block: this.activeStage });

    this._shadowPixelMaxCorrect = this._activeStageShadow.left.length + this._activeStageShadow.right.length + this._activeStageShadow.back.length + this._activeStageShadow.front.length + this._activeStageShadow.bottom.length



    switch (level) {
      case 0:
        this._showAllSides = true;
        this._careColor = false;
        this._careGap = false;
        this._showNoHints = false;
        break;
      case 1:
        this._showAllSides = false;
        this._careColor = false;
        this._careGap = false;
        this._showNoHints = false;
        break;
      case 2:
        this._showAllSides = true;
        this._careColor = false;
        this._careGap = false;
        this._showNoHints = false;        
        break;
      case 3:
        this._showAllSides = true;
        this._careColor = true;
        this._careGap = false;
        this._showNoHints = false;
        colorWheel.colorComplete();
        break;
      case 4:
        this._showAllSides = true;
        this._careColor = false;
        this._careGap = true;
        this._showNoHints = false;
        
        break;
      case 5:
        this._showAllSides = true;
        this._careColor = false;
        this._careGap = true;
        this._showNoHints = true;
        
        break;
    }

    if(level > 0){
      this.showDifficultyButton();
    }

    this.update();
  }

  updateSide({ worldShadow = [], gameShadow = [] }) {


    
    let set = BlockShadow.calcSet({ left: worldShadow, right: gameShadow, careColor: this._careColor, careGap: this._careGap });

    if(set.diffRight.length == 0 && set.diffLeft.length == 0){
      this._sidesCorrect++;
    }

    
   // this._shadowPixelWrong += set.diffLeft.length;

    if(this._showNoHints){
      this.showShadow({ block: gameShadow, careColor: this._careColor, careGap: this._careGap, add: true });
    }else{
      this._shadowPixelCorrect += set.intersectionLeft.length;

    //what about clearing shadow
    this.showShadow({ block: set.diffRight, careColor: this._careColor, careGap: this._careGap, add: true });

    //if(!this._careColor){
    if(!this._careColor){  
    BlockShadow.setColor({ block: set.intersectionLeft, color: meshColor.green });
    this.showShadow({ block: set.intersectionLeft, add: true });
    }
    //}

    if(this._careColor ||  this._careGap){

      set = BlockShadow.calcSet({ left: worldShadow, right: gameShadow, careColor: false, careGap: false });
      this._shadowPixelWrong += set.diffLeft.length;
      BlockShadow.setColor({ block: set.diffLeft, color: meshColor.red })
      BlockShadow.setBlockColor({ block: set.diffLeft, color: meshColor.red, blink: true })

    
    }else{
      this._shadowPixelWrong += set.diffLeft.length;
      BlockShadow.setColor({ block: set.diffLeft, color: meshColor.red })
      BlockShadow.setBlockColor({ block: set.diffLeft, color: meshColor.red, blink: true })
      this.showShadow({ block: set.diffLeft, add: true });

    }
    }

    
  }

  update() {

    super.update();

    if(this.state == this.enumState.busyCreatingShape){
      return;
    }

    this._sidesCorrect = 0;
    this._shadowPixelCorrect = 0;
    this._shadowPixelWrong = 0;


    let shadow = BlockShadow.convert({ block: world.block });


    this.showShadow({ block: [], careColor: this._careColor, careGap: this._careGap });


    //let set = BlockShadow.calcSet({left: shadow.left, right: this._activeStageShadow.left, careColor: this._careColor, careGap: this._careGap});

    // let setDiffRight

    //console.log("shadow.left.length: " + shadow.left.length );
    //let set = BlockShadow.calcSet({left: shadow.left, right: this._activeStageShadow.left, careColor: this._careColor, careGap: this._careGap});
    /*if (this._showNoHints) {

    } else {*/
      

      this.updateSide({ worldShadow: shadow.back, gameShadow: this._activeStageShadow.back });

      if (this._showAllSides) {
        this.updateSide({ worldShadow: shadow.right, gameShadow: this._activeStageShadow.right });        
        this.updateSide({ worldShadow: shadow.front, gameShadow: this._activeStageShadow.front });
        this.updateSide({ worldShadow: shadow.left, gameShadow: this._activeStageShadow.left });        
        this.updateSide({ worldShadow: shadow.bottom, gameShadow: this._activeStageShadow.bottom });
        if(   this._sidesCorrect == 5){
          this.win({});
        }
      }else{
        if(   this._sidesCorrect == 1){
          this.win({});
        }
      }

 

  

      this.soundProgression({correct: this._shadowPixelCorrect, wrong: this._shadowPixelWrong, maxCorret: this._shadowPixelMaxCorrect});
    //}

    //this.showShadow({block: set.diffRight, careColor: this._careColor, careGap: this._careGap});
    //this.showShadow({block: set.diffRight, careColor: this._careColor, careGap: this._careGap});
    //  console.log("this._activeStageShadow.left.length" + this._activeStageShadow.left.length)

    //!!
    /* if(!this._careColor){
       BlockShadow.setColor({block: set.intersectionLeft, color: meshColor.green} );
       this.showShadow({block: set.intersectionLeft, add: true });
     }
     
     BlockShadow.setColor({block: set.diffLeft, color: meshColor.red})
     BlockShadow.setBlockColor({block: set.diffLeft, color: meshColor.red, blink: true})
 this.showShadow({block: set.diffLeft, add: true });*/

    //!!

    /*  if(this._showAllSides){
      
         set = BlockShadow.calcSet({left: shadow.right, right: this._activeStageShadow.right, careColor: this._careColor, careGap: this._careGap});
         this.showShadow({block: set.diffRight, careColor: this._careColor, careGap: this._careGap, add: true});

         set = BlockShadow.calcSet({left: shadow.back, right: this._activeStageShadow.back, careColor: this._careColor, careGap: this._careGap});
        this.showShadow({block: set.diffRight, careColor: this._careColor, careGap: this._careGap, add: true});

         set = BlockShadow.calcSet({left: shadow.front, right: this._activeStageShadow.front, careColor: this._careColor, careGap: this._careGap});
        this.showShadow({block: set.diffRight, careColor: this._careColor, careGap: this._careGap, add: true});
  
         set = BlockShadow.calcSet({left: shadow.bottom, right: this._activeStageShadow.bottom, careColor: this._careColor, careGap: this._careGap});
         this.showShadow({block: set.diffRight, careColor: this._careColor, careGap: this._careGap, add: true});
    
      }*/


    //this.showShadow({block: set.diffRight});

    /*
     if(!this._careColor){
         BlockShadow.setColor({block: set.intersectionLeft, color: meshColor.green} );
     }
     this.showShadow({block: set.intersectionLeft, add: true });

     BlockShadow.setColor({block: set.diffLeft, color: meshColor.red})
     BlockShadow.setBlockColor({block: set.diffLeft, color: meshColor.red, blink: true})
     this.showShadow({block: set.diffLeft, add: true });*/

    //!!!!! work with showShadow !!!!


    //--
    /*  let set = Block.calcSet({left: world.block, right: this.activeStage, careColor: false, careRotation: false});

      Block.setColor({block: set.diffLeft, color: meshColor.red, blink: true})

     this.show({block : set.diffRight, careColor : false});        
      Block.copyColor({to: world.block, from: this.activeStage, careRotation: false});
      this.soundProgression({correct: set.intersectionLeft.length, wrong: set.diffLeft.length });

      if(set.diffLeft.length == 0 && set.diffRight.length == 0){
        this.win({});
      }*/

  }

  /*buildLevel(level) {

    level.push({ difficulty: [], image: null });

    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([new Block2x2({ x: 4, y: 0, z: 7, r: 0, color: [0, 0] }), new Block2x4({ x: 5, y: 1, z: 5, r: 3, color: [0, 0, 0, 0] }),]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([new Block2x2({ x: 4, y: 0, z: 1, r: 0, color: [0, 0] }), new Block2x4({ x: 5, y: 1, z: -1, r: 3, color: [0, 0, 0, 0] }),]);


    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([new Block2x2({ x: 4, y: 0, z: 6, r: 0, color: [0, 0] }), new Block2x2({ x: 5, y: 0, z: 2, r: 3, color: [0, 0] }), new Block2x4({ x: 5, y: 1, z: 3, r: 3, color: [0, 0, 0, 0] }),]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([new Block2x2({ x: 5, y: 0, z: 6, r: 0, color: [0, 0] }), new Block2x2({ x: 4, y: 0, z: 2, r: 3, color: [0, 0] }), new Block2x4({ x: 5, y: 1, z: 3, r: 3, color: [0, 0, 0, 0] }),]);


    level.push({ difficulty: [], image: null });

    level[level.length - 1].difficulty.push({ stage: [], image: null });
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([new Block2x2({ x: 4, y: 0, z: 4, r: 0, color: [0, 0] }), new Block2x4({ x: 6, y: 1, z: 3, r: 3, color: [0, 0, 0, 0] }), new Block2x2({ x: 4, y: 1, z: 4, r: 3, color: [0, 0] }), new Block2x2({ x: 5, y: 2, z: 4, r: 3, color: [0, 0] }),]);
    level[level.length - 1].difficulty[level[level.length - 1].difficulty.length - 1].stage.push([new Block2x2({ x: 7, y: 0, z: 6, r: 0, color: [0, 0] }), new Block2x2({ x: 8, y: 0, z: 3, r: 2, color: [0, 0] }), new Block2x4({ x: 8, y: 1, z: 3, r: 3, color: [0, 0, 0, 0] }), new Block2x2({ x: 8, y: 2, z: 4, r: 3, color: [0, 0] }),]);


    // level[level.length-1].difficulty[level[level.length-1].difficulty.length-1].stage.push(  [new Block2x2({ x : 0, y : 0, z :0, r : 0, color : [1, 1]}), new Block2x2({ x : 2, y : 0, z :0, r : 0, color : [0, 0]})]);
    // level[level.length-1].difficulty[level[level.length-1].difficulty.length-1].stage.push(  [new Block2x2({ x : 0, y : 0, z :2, r : 0, color : [1, 1]}), new Block2x2({ x : 2, y : 0, z :0, r : 0, color : [0, 0]})]);




  }*/



}