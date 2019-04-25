class CompassCalibration extends Game {
    constructor() {
        let level = [];

      /*  level.push({difficulty: [], image: null});
 
        level[0].difficulty.push({image: "./icon/games/freeBuild/lvlRgb.svg"});
        level[0].difficulty.push({image: "./icon/games/freeBuild/lvlTwoRow.svg"});


        colorWheel.colorSection();*/
      //  level[0]  = null;
        
       // guidedBuildLevel.buildLevel(level)       
        super(     {level : level}     );
    
      //  this._level = [];
      //  guidedBuildLevel.buildLevel(this._level);
        //super({ x: 0, y: 0, z: 0 });

        this.enumState.front =  this.enumState.max+1;
        this.enumState.frontWaitClick =  this.enumState.max+2;
        this.enumState.right =  this.enumState.max+3;
        this.enumState.rightWaitClick =  this.enumState.max+4;
        this.enumState.back =  this.enumState.max+5;
        this.enumState.backWaitClick =  this.enumState.max+6;
        this.enumState.left =  this.enumState.max+7;
        this.enumState.leftWaitClick =  this.enumState.max+8;

        this.update();

        this._okButton = new GuiButtonImg("./icon/games/ok.svg", function() {this._okButtonNextSide()}.bind(this)); //this.reset.bind(this));
        this._compassDataX = [];
        this._compassDataZ = [];
     //   this._okButton.setVisible(0,0 , guiOptions.center, guiOptions.bottom);

        this._timeOutShowGreen = null;
        world.compass.enabled = false;

    }

    reset() {
      super.reset();

      if( this._timeOutShowGreen != null){
        clearTimeout(this._timeOutShowGreen);      
        this._timeOutShowGreen = null;
    }
    camera.unlock();

    }

    _setLevel ({level = 0, difficulty = 0 } ){

      switch(difficulty){
        case 0:
        colorWheel.colorComplete();
        break;
        case 1:
        colorWheel.colorSection();
        break;
      }
  

    }

    _okButtonNextSide(){
      


      world.base.stopBlink();
    
      this._okButton.setNotVisible();

      switch(this.state){
        case this.enumState.frontWaitClick:
        world.base.ledFront = meshColor.green;
        break;
        case this.enumState.rightWaitClick:
        world.base.ledRight = meshColor.green;
        break;
        case this.enumState.backWaitClick:
        world.base.ledBack = meshColor.green;
        break;
        case this.enumState.leftWaitClick:
        world.base.ledLeft = meshColor.green;
        break;
      }

      this._timeOutShowGreen = setTimeout(this._timeOutShowGreenFunction.bind(this), 400);

      
      this._compassDataX.push( world.compass.x );
      this._compassDataZ.push( world.compass.z );


      
    }

    _timeOutShowGreenFunction(){


      if(this.state == this.enumState.leftWaitClick){


        world.compass.zeroX = (Math.max(...this._compassDataX) + Math.min(...this._compassDataX))/2
        world.compass.zeroZ = (Math.max(...this._compassDataZ) + Math.min(...this._compassDataZ))/2

   

        for(let i =0; i < 4; i++){
          
          let x = this._compassDataX[i] - world.compass.zeroX;
          let z = this._compassDataZ[i] - world.compass.zeroZ;           
      
          if(x >= 0 && z >= 0){
            world.compass.zeroAngle[i] =  Math.atan (z/x);
          }else if (x < 0 && z >= 0){
            world.compass.zeroAngle[i]  =  Math.PI/2 - Math.atan (x/z);
          }else if (x < 0 && z < 0){
            world.compass.zeroAngle[i] =  -Math.PI/2 - Math.atan (x /z);
          }else if (x >= 0 && z < 0){
            world.compass.zeroAngle[i] =  Math.atan (z/x);
          }

      }

      for(let i =0; i < 4; i++){
        world.compass.sensAngle[i] =  this._calcSens( world.compass.zeroAngle[i],  world.compass.zeroAngle[(i+1)%4]);

      }

      world.compass.enabled = true;
        this.win({nextWhenBlocksRemoved : false, filterWin : false, nextButton : false })
        camera.unlock();
      }else {
        this.state++;
      }
    }


    _calcSens(angle1, angle2){

      if(Math.abs(angle1 - angle2) > Math.PI){
          if(angle1 > angle2){
              return (angle2 - angle1 + 2*Math.PI)/(Math.PI/2) 
          }else{
              return (angle1 - angle2 + 2*Math.PI)/(Math.PI/2) 
          }
      }else{
          return Math.abs(angle1 - angle2) / (Math.PI/2);
  
      }
  
  }

    update(){
 
      switch(this.state){
        case this.enumState.start:
       
        camera.lock();
        this.state = this.enumState.front;
        
        break;
        case this.enumState.front:
       
        world.base.color = meshColor.black;
        world.base.blink();
        world.base.ledFront = meshColor.red;
        camera.setAlpha(cameraAlpha.front, true, true);      
        this._okButton.setVisible(0,0 , guiOptions.center, guiOptions.bottom);
        this.state++;
        
        break;
        case this.enumState.right:
        world.base.color = meshColor.black;
        world.base.blink();
        world.base.ledRight = meshColor.red;
        camera.setAlpha(cameraAlpha.right, true, true);      
        this._okButton.setVisible(0,0 , guiOptions.center, guiOptions.bottom);
        this.state++;
        break;
        case this.enumState.back:
        world.base.color = meshColor.black;
        world.base.blink();
        world.base.ledBack = meshColor.red;
        camera.setAlpha(cameraAlpha.back, true, true);      
        this._okButton.setVisible(0,0 , guiOptions.center, guiOptions.bottom);
        this.state++;
        break;
        case this.enumState.left:
        world.base.color = meshColor.black;
        world.base.blink();
        world.base.ledLeft = meshColor.red;
        camera.setAlpha(cameraAlpha.left, true, true);      
        this._okButton.setVisible(0,0 , guiOptions.center, guiOptions.bottom);
        this.state++;
        break;

      }



    }


}