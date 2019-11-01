class Columns extends Game {
  constructor() {
    let level = [];





    super({ level: level, userCreatedLevel: false });

    this._enumColumnsState = {
      displayColor: 0,
      setColor: 1,
     // fail: 5,
    }
    this._columnsState = 0;




    
    this._colorCount = 2;
    this._currentColor = 0;
    this._timeoutDelay = null;
    this._columnsCurrentLevel = 0;

    this._speedColorSelect = 3;


    this._colorSelector = new BlockPillar({ x: 1, y: 0, z: 1, color: [meshColor.blue]});
    this._playFieldBlocks = [];
    

    this._playfield = [new BlockPillar({ x: 7, y: 0, z: 7, color: [meshColor.blue]}), new BlockPillar({ x: 7, y: 0, z: 5, color: [meshColor.blue]}), new BlockPillar({ x: 7, y: 0, z: 3, color: [meshColor.blue]}), new BlockPillar({ x: 5, y: 0, z: 7, color: [meshColor.blue]}), new BlockPillar({ x: 5, y: 0, z: 5, color: [meshColor.blue]}), new BlockPillar({ x: 3, y: 0, z: 7, color: [meshColor.blue]}),];
    this._meshPlayfield = [];
    //this._meshPlayfield[0] = new MeshPad(this._playfield[0]);

    this._playfield.forEach( item => this._meshPlayfield.push(new MeshPad(item)) );
   // this._meshPlayfield = new MeshPad(this._playfield);
  /*   this._redPad.mesh = new MeshPad(new BlockPillar({ x: 0, y: 0, z: 0, color: [meshColor.red] }));
    this._greenPad.mesh = new MeshPad(this._greenPad.block);
    this._bluePad.mesh = new MeshPad(this._bluePad.block);*/

//ALL ON GRID or on 
//blocks on color select one color select
//all playfield blocks
//all color select blocks

  
  this._setLevel({ level: 1, difficulty: 0 });

//   this._activeDisplayBlocks = [];

}

_setLevel({ level = 0, difficulty = 0 }) {

  super._setLevel({ level: level, difficulty: difficulty });

  this._playFieldBlocks = [];
  this._columnsState = this._enumColumnsState.displayColor;
  this._currentColor = 0;


  switch(level){
    case 1:
    this._colorCount = 2;

    this._speedColorSelect = 3;
    break;
    case 2:
    this._colorCount = 3;
    this._speedColorSelect = 2;


    break;
    case 3:
    this._colorCount = 4;
    this._speedColorSelect = 2;


    break;
    case 4:
    this._colorCount = 4;
    this._speedColorSelect = 1;


      break;
      default:
      this._colorCount = 5;
      this._speedColorSelect = 1;

      break;

    }

  //  this._activeDisplayBlocks = [new Block2x2({ x: 8, y: 0, z: 4, r: 0, color: [0, 0] }), new Block2x2({ x: 8, y: 1, z: 4, r: 0, color: [0, 0] })];
    this.update();
    /*if (level > 0) {
     // this.showDifficultyButton();
    }*/



  }

  reset() {
    super.reset();
    if (this._redPad.mesh != null) {
      this._redPad.mesh.dispose();
      this._greenPad.mesh.dispose();
      this._bluePad.mesh.dispose();
      this._redPad.mesh = null;

    }

  }

  //block turn one way doesn't work
  //color is blinking while correct

  _timeoutDelayFunction() {

    clearTimeout(this._timeoutDelay);
    this._timeoutDelay = null;
    console.log("timeout")


  }

  update() {

    super.update();

    /* if(this.state == this.enumState.busyCreatingShape){
       return;
     }*/
     

    
     //this._playFieldBlocks = [];

     let currentColorSelectorBlocks = [];
     //let currentPlayFieldBlocks = [];

     let currentPlayFieldBlocks =  [] //world.block;//= Block.calcSet({ left: world.block, right: this._colorSelector, careColor: false, careRotation: false });
 
     //let set = 
     //check all on Field
     //show 

     

     let setWorldColorSelector = BlockPillar.calcSet({ left: BlockPixel.convertBlock(world.block), right: this._colorSelector, careColor: false, careRotation: false });
 
     setWorldColorSelector.intersectionLeft.forEach( function (item, index) {    
    
      if( currentColorSelectorBlocks.find( findItem => item == findItem) === undefined){
        currentColorSelectorBlocks.push(item.block);
      }

     });

    setWorldColorSelector = Block.calcSet({ left: world.block, right: currentColorSelectorBlocks, careColor: false, careRotation: false });
     
    let setCurrentPlayFieldBlocks = BlockPillar.calcSet({ left: setWorldColorSelector.diffLeft, right: this._playfield , careColor: false, careRotation: false });
     
    currentPlayFieldBlocks = setCurrentPlayFieldBlocks.intersectionLeft;


    setCurrentPlayFieldBlocks.diffLeft //set REEEED
    //set red 
//--
     //!! HERE !!
     //world convert pixels
     //world all overlap with this._colorSelector in currentColorSelectorBlocks
     //set world and  currentColorSelectorBlocks
     //set this._playfield 

     //check pillar
     //if no pillar show block
  

     //state select color
        //check pillar
          //if no pillar show block
          //if pillar cycle colors on second
    //state color
  

    console.log("columns")
    return;




    let set = Block.calcSet({ left: world.block, right: this._activeDisplayBlocks, careColor: false, careRotation: false });
    //Block.setColor({block: set.diffLeft, color: meshColor.red, blink: true})
    this.show({ block: set.diffRight, careColor: false });


    let setWorldAndDisplayBlocks;

    

    switch (this._colorMatchState) {
      case this._enumColorMatchState.build:
        Block.setColor({ block: set.intersectionLeft, color: meshColor.black });

        if (set.diffRight.length == 0) {
          this._colorMatchState = this._enumColorMatchState.delayShowColor;
          this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 1500);


        }

        break;
      case this._enumColorMatchState.delayShowColor:

        if (set.diffRight.length != 0) {
          this._colorMatchState = this._enumColorMatchState.build;
          clearTimeout(this._timeoutDelay);
          this._timeoutDelay = null;
          return;

        }

        if (this._timeoutDelay == null) {
          this._shownColorCount = 0;
          this._paintBrush = 0;
          //this._shownColor = [];
          this._colorMatchState = this._enumColorMatchState.showColor;
        }



        break;

      case this._enumColorMatchState.showColor:

        if (this._timeoutDelay == null) {

          if (this._shownColorCount == this._activeDisplayBlocks.length) {
            this._colorMatchState = this._enumColorMatchState.reproduce;
            this._shownColorCount++;//NEW!!!
            this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 6000 +  2500 * this._activeDisplayBlocks.length );
        
          } else {
            this._timeoutDelay = setTimeout(this._timeoutDelayFunction.bind(this), 800);
            this._shownColorCount++;
            let randColor = Math.floor(Math.random() * 3);

            switch (randColor) {
              case 0:
              this._activeDisplayBlocks[this._shownColorCount-1].color = meshColor.red;
                //this._shownColor.push(meshColor.red);
                break;
              case 1:
              this._activeDisplayBlocks[this._shownColorCount-1].color = meshColor.green;
                //this._shownColor.push(meshColor.green);
                break;
              case 2:
                //this._shownColor.push(meshColor.blue);
                this._activeDisplayBlocks[this._shownColorCount-1].color = meshColor.blue;
                break;

            }
          }

        }

        let setBlockToColor = Block.calcSet({ left: world.block, right: this._activeDisplayBlocks, careColor: false, careRotation: false });
        Block.setColor({ block: setBlockToColor.intersectionLeft, color: meshColor.black });

        if(this._shownColorCount <= this._activeDisplayBlocks.length){
        setBlockToColor = Block.calcSet({ left: world.block, right: this._activeDisplayBlocks[this._shownColorCount - 1], careColor: false, careRotation: false });
        Block.setColor({ block: setBlockToColor.intersectionLeft, color:  this._activeDisplayBlocks[this._shownColorCount-1].color[0]});
        }

        break;

      case this._enumColorMatchState.reproduce:

        if (this._redPad.mesh == null) {
          this._redPad.mesh = new MeshPad(this._redPad.block);
          this._greenPad.mesh = new MeshPad(this._greenPad.block);
          this._bluePad.mesh = new MeshPad(this._bluePad.block);
        }

        let worldPixel = BlockPixel.convertBlock(world.block);
        let setColorPilar = BlockPillar.calcSet({ left: worldPixel, right: this._redPad.block });
        if (setColorPilar.intersectionLeft.length != 0) {
          this._paintBrush = meshColor.red;
        }
        setColorPilar = BlockPillar.calcSet({ left: worldPixel, right: this._greenPad.block });
        if (setColorPilar.intersectionLeft.length != 0) {
          this._paintBrush = meshColor.green;
        }
        setColorPilar = BlockPillar.calcSet({ left: worldPixel, right: this._bluePad.block });
        if (setColorPilar.intersectionLeft.length != 0) {
          this._paintBrush = meshColor.blue;
        }


        //filter out playing field
        setWorldAndDisplayBlocks = Block.calcSet({ left: world.block, right: this._activeDisplayBlocks, careColor: false, careRotation: false });
      

          //PAINTBRUSH

        let paintBlocks = Block.calcSet({ left: setWorldAndDisplayBlocks.diffLeft, right: this._placedBlocks, careColor: false, careRotation: false });
      
        
        Block.setColor({ block: paintBlocks.diffLeft, color: this._paintBrush}) ;

        this._placedBlocks = world.block;
      
        let playPixels = BlockPixel.convertBlock(setWorldAndDisplayBlocks.diffLeft);
        let activeDisplayPixels = BlockPixel.convertBlock(this._activeDisplayBlocks);
       // console.log("playPixels.length: " + playPixels.length)
       // console.log("activeDisplayPixels.length: " + activeDisplayPixels.length)
        //PROBLEM!!
        let setPlayPixelAndDisplayBlocks = BlockPixel.calcSetNoCarePosition({left: playPixels, right: activeDisplayPixels,  careColor: true, careRotation: true  })

        if (setPlayPixelAndDisplayBlocks.diffLeft.length == 0 && setPlayPixelAndDisplayBlocks.diffRight.length == 0){
          this._colorMatchState = this._enumColorMatchState.win;
        }else if(this._timeoutDelay == null){
          this._colorMatchState = this._enumColorMatchState.fail;
        }


        if(this._colorMatchCurrentLevel == 0 && this._winCount == 0){

        //  setPlayPixelAndDisplayBlocks.diffRight
        //  let showCorrect = Block.transform({block: setPlayPixelAndDisplayBlocks.diffRight, x: -4});
        let showCorrect = Block.transform({block:  this._activeDisplayBlocks, x: -4});
       
         // console.log("showCorrect.length: " + showCorrect.length);
         // console.log("setPlayPixelAndDisplayBlocks.diffRight.length: " + setPlayPixelAndDisplayBlocks.diffRight.length);
         // if (set.diffRight.length == 0) {
            this.show({ block: showCorrect, careColor: true });
           //this.show({ block: setPlayPixelAndDisplayBlocks.diffRight, careColor: true });
           
        //  }

        }

        break;


      case this._enumColorMatchState.win:
      //timeout function
        if (this._redPad.mesh != null) {
          sound.win();  
          this._redPad.mesh.dispose();
          this._greenPad.mesh.dispose();
          this._bluePad.mesh.dispose();
          this._redPad.mesh = null;

          
   
        }

        Block.copyColor({ to: world.block, from: this._activeDisplayBlocks, careRotation: false}) 

          //filter out playing field
        setWorldAndDisplayBlocks = Block.calcSet({ left: world.block, right: this._activeDisplayBlocks, careColor: false, careRotation: false });
        Block.setColor({block: setWorldAndDisplayBlocks.diffLeft, color: meshColor.green, blink: true});

        if(setWorldAndDisplayBlocks.diffLeft.length == 0){    
          clearTimeout(this._timeoutDelay);
          this._colorMatchState = this._enumColorMatchState.build;
          this._winCount++;
          if(this._winCount > 1){
            this._winCount = 0;
            this._colorMatchCurrentLevel++;
            if(this._colorMatchLevel.length > this._colorMatchCurrentLevel){
              this._activeDisplayBlocks = this._colorMatchLevel[this._colorMatchCurrentLevel];
            }          
          }
        }


        break;

      case this._enumColorMatchState.fail:
        if (this._redPad.mesh != null) {
          sound.fail();
          this._redPad.mesh.dispose();
          this._greenPad.mesh.dispose();
          this._bluePad.mesh.dispose();
          this._redPad.mesh = null;

          this._winCount = 0;
        }

        Block.copyColor({ to: world.block, from: this._activeDisplayBlocks, careRotation: false}) 

        setWorldAndDisplayBlocks = Block.calcSet({ left: world.block, right: this._activeDisplayBlocks, careColor: false, careRotation: false });
        Block.setColor({block: setWorldAndDisplayBlocks.diffLeft, color: meshColor.red, blink: true});

        if(setWorldAndDisplayBlocks.diffLeft.length == 0){    
          this._colorMatchState = this._enumColorMatchState.build;
        }


        break;


    }





  }



}