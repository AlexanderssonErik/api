class GuidedBuild extends Game {
    constructor() {
        let level = [];
       
        level.push({difficulty: [], image: null});
        
        guidedBuildLevel.buildLevel(level)       
        super(     {level : level}     );

       
        this.update(); //Remove?


    }

    reset() {
      super.reset();

    }

    //block turn one way doesn't work
    //color is blinking while correct

    update(){

        super.update();    

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