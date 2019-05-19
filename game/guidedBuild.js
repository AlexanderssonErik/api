class GuidedBuild extends Game {
    constructor() {
        let level = [];
       
 
        level.push({difficulty: [], image: null});
        guidedBuildLevel.buildLevel(level)       

          /*level.push({difficulty: [], image: null});
        level[level.length-1].difficulty.push({stage: [], image: "./icon/level/lvl1.svg"});
        level[level.length-1].difficulty.push({stage: [], image: "./icon/level/lvl2.svg"});*/
       

        //menu under?

    
        super(     {level : level, userCreatedLevel : true}     );

       
        this._setLevel ({level: 1, difficulty: 0 }); 
       // this.update(); //Remove?


    }

    _setLevel({ level = 0, difficulty = 0 }) {

      super._setLevel({ level: level, difficulty: difficulty });

      if(level > 0){
        this.showDifficultyButton();
      }
    }

    reset() {
      super.reset();

    }

    //block turn one way doesn't work
    //color is blinking while correct

    update(){

        super.update();    

        if(this.state == this.enumState.busyCreatingShape){
          return;
        }


        let set = Block.calcSet({left: world.block, right: this.activeStage, careColor: false, careRotation: false});

        Block.setColor({block: set.diffLeft, color: meshColor.red, blink: true})

       this.show({block : set.diffRight, careColor : false});        
        Block.copyColor({to: world.block, from: this.activeStage, careRotation: false});
        this.soundProgression({correct: set.intersectionLeft.length, wrong: set.diffLeft.length });

        if(set.diffLeft.length == 0 && set.diffRight.length == 0){
          this.win({});
        }

    }



}