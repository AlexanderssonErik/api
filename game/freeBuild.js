class FreeBuild extends Game {
    constructor() {
        let level = [];

        level.push({difficulty: [], image: null});
 
        level[0].difficulty.push({image: "./icon/games/freeBuild/lvlRgb.svg"});
        level[0].difficulty.push({image: "./icon/games/freeBuild/lvlTwoRow.svg"});
        level[0].difficulty.push({image: "./icon/games/freeBuild/lvlOnBase.svg"});


        colorWheel.colorSection();
 
        super(     {level : level}     );

        this._paintbrush = meshColor.black;

        this._rgbBlock = [];
    
        this._rgbBlock.push( new Block2x2({ x : 1, y : 0, z : 1, r : 2, color : [1,1]}));
        this._rgbBlock.push( new Block2x2({ x : 0, y : 0, z : 1, r : 1, color : [4,4]}));
        this._rgbBlock.push( new Block2x2({ x : 0, y : 0, z : 0, r : 0, color : [2,2]}));
        this._rgbBlock.push( new Block2x2({ x : 1, y : 0, z : 0, r : 3, color : [3,3]}));
        this._rgbBlock.push( new Block2x2({ x : 1, y : 0, z : 9, r : 2, color : [3,3]}));
        this._rgbBlock.push( new Block2x2({ x : 0, y : 0, z : 9, r : 1, color : [5,5]}));
        this._rgbBlock.push( new Block2x2({ x : 0, y : 0, z : 8, r : 0, color : [7,7]}));
        this._rgbBlock.push( new Block2x2({ x : 1, y : 0, z : 8, r : 3, color : [6,6]}));


        this._rgbBlockActive = false;
        this._paintBrush =  meshColor.black;
        this._paintedBlocks = [];
        
        this._setLevel ({level: 0, difficulty: 0 }); 

    }

    _setLevel ({level = 0, difficulty = 0 } ){

      database.setLevel({name: this.constructor.name, level: level, difficulty: difficulty});
      this.reset();
      switch(difficulty){
        case 0:
        this._rgbBlockActive = false;
        colorWheel.colorComplete();
        break;
        case 1:
        this._rgbBlockActive = false;
        colorWheel.colorSection();
        break;
        case 2:
        this._rgbBlockActive = true;
        this._paintedBlocks = world.block;
        colorWheel.colorSection();
        world.meshBase.showRgbNipple();
        break;
      }
  
      this.update(); 

    }


    update(){
 
      super.update();

      if(this._rgbBlockActive == true){
   
        let set = Block.calcSet({left: world.block, right: this._rgbBlock, careColor: false});
        if(set.intersectionLeft.length > 0){     
          this._paintBrush = set.intersectionRight[0].ledA;
        }else{
          this._paintBrush = meshColor.black ;       
        }

        Block.setColor({ block: set.intersectionLeft, color: this._paintBrush });

         set = Block.calcSet({left: set.diffLeft, right: this._paintedBlocks, careColor: false, careRotation: false}); 

        Block.setColor({ block: set.diffLeft, color: this._paintBrush });

        this._paintedBlocks = world.block;


      }

    }

    reset() {
      super.reset();
      colorWheel.disenable();
      this._paintBrush =  meshColor.black;

   
      world.meshBase.hideRgbNipple();

    }
}