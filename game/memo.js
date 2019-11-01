class Memo extends Game {
    constructor() {
        let level = [];
          
        super(     {level : level, userCreatedLevel : false}     );
        this._colorMatchState = 0;
        this._currentPlayer = 0;
        this._playerScore = [0,0];

        this._enumMemoState = {
          build: 0,
          remove: 1,
          reproduce: 2,
          builderReproduce: 3,
          showCorrect: 4,
          win: 5,
         
        }

        this._builtBlock = [];

        this._instructionText = new GuiText("Player 1 Build!");
        this._instructionText.setVisible(0,1 , guiOptions.center, guiOptions.top);

        this._playerScoreText = [];
        this._playerScoreText[0] = new GuiText("Player 1: 0");
        this._playerScoreText[1] = new GuiText("Player 2: 0");

        this._playerColor = [meshColor.magenta, meshColor.cyan];



        this._playerScoreText[0].color = this._playerColor[0];
        this._playerScoreText[1].color = this._playerColor[1];

        this._playerScoreText[0].setVisible(0,0 , guiOptions.left, guiOptions.top);
        this._playerScoreText[1].setVisible(0,0 , guiOptions.right, guiOptions.top);
        

        this._giveUpContinueButton = new GuiButtonImg("./icon/games/ok.svg", function() {this._giveUpContinue()}.bind(this)); //this.reset.bind(this));
        
        this._giveUpContinueButton.setVisible(0,0 , guiOptions.center, guiOptions.bottom);
        this._giveUpContinueButtonVisible = true;

        this._giveUpContinueClick = false;

      //  this._setLevel ({level: 1, difficulty: 0 }); 
        this.update(); //Remove?


    }

    reset() {
      super.reset();

    }

    //block turn one way doesn't work
    //color is blinking while correct
    _giveUpContinue(){
      this._giveUpContinueButton.setNotVisible();
      this._giveUpContinueButtonVisible = false;
      this._giveUpContinueClick = true;
      
    }


    update(){



        super.update();    

        let set;

        switch (this._colorMatchState) {
          case this._enumMemoState.build:
          this._instructionText.text = "Player " + (this._currentPlayer + 1) + " Build!"

          world.base.ledFront = this._playerColor[this._currentPlayer];
          world.base.ledLeft = meshColor.black;
          world.base.ledRight = meshColor.black;
          world.base.ledBack = meshColor.black;

          
          if(this._giveUpContinueClick){
            this._builtBlock = world.block;
            this._colorMatchState = this._enumMemoState.remove;
            break;

          }

          if(world.block.length > 0 && !this._giveUpContinueButtonVisible){
          
            this._giveUpContinueButtonVisible = true;
            this._giveUpContinueButton.setVisible(0,0 , guiOptions.center, guiOptions.bottom);
          }else if(world.block.length == 0 && this._giveUpContinueButtonVisible) {
          
            this._giveUpContinueButtonVisible = false;
            this._giveUpContinueButton.setNotVisible();
          }


          break;
          case this._enumMemoState.remove:
          this._instructionText.text = "Player " + (this._currentPlayer + 1) + " Remove Blocks!"
          world.base.ledFront = meshColor.yellow;
          world.base.ledLeft = meshColor.yellow;
          world.base.ledRight = meshColor.yellow;
          world.base.ledBack = meshColor.yellow;


          if(world.block.length == 0){
            this._giveUpContinueClick = false;
            this._colorMatchState = this._enumMemoState.reproduce;
          }


          break;
          case this._enumMemoState.reproduce:
          this._instructionText.text = "Player " + ((this._currentPlayer + 1)%2 + 1) + " Reproduce!"
          world.base.ledFront = this._playerColor[(this._currentPlayer + 1)%2];
          world.base.ledLeft = meshColor.black;
          world.base.ledRight = meshColor.black;
          world.base.ledBack = meshColor.black;

         

          if(!this._giveUpContinueButtonVisible){
            
            this._giveUpContinueButtonVisible = true;
            this._giveUpContinueButton.setVisible(0,0 , guiOptions.center, guiOptions.bottom);
          }
         

          set = Block.calcSet({left: world.block, right: this._builtBlock, careColor: false, careRotation: false});


          if(set.diffLeft.length == 0 && set.diffRight.length == 0){
            sound.win();            
            Block.setColor({block: world.block, color: meshColor.green});
            this._playerScore[(this._currentPlayer+1)%2] +=10;
            this._colorMatchState = this._enumMemoState.win;
            this._giveUpContinueClick = false;
            return;

          }

          if(this._giveUpContinueClick){
            sound.fail();
            this._giveUpContinueClick = false;
            this._colorMatchState = this._enumMemoState.builderReproduce;
          }

          break;
          case this._enumMemoState.builderReproduce:
          this._instructionText.text = "Player " + (this._currentPlayer + 1) + " Reproduce!"
          world.base.ledFront = this._playerColor[this._currentPlayer];
          world.base.ledLeft = meshColor.black;
          world.base.ledRight = meshColor.black;
          world.base.ledBack = meshColor.black;

          if(!this._giveUpContinueButtonVisible){
            this._giveUpContinueButtonVisible = true;
            this._giveUpContinueButton.setVisible(0,0 , guiOptions.center, guiOptions.bottom);
          }

          set = Block.calcSet({left: world.block, right: this._builtBlock, careColor: false, careRotation: false});


          if(set.diffLeft.length == 0 && set.diffRight.length == 0){
            sound.win();
            Block.setColor({block: world.block, color: meshColor.green});
            this._colorMatchState = this._enumMemoState.win;//!!!
            this._giveUpContinueClick = false;
            return;
          }

          if(this._giveUpContinueClick){
            sound.fail();
            this._giveUpContinueClick = false;

            
            this._playerScore[ this._currentPlayer] -= 5;
             this._colorMatchState = this._enumMemoState.showCorrect;

          }
          break;
          
          case this._enumMemoState.showCorrect:
          this._instructionText.text = "Remove Blocks!"
          world.base.ledFront = meshColor.red;
          world.base.ledLeft = meshColor.red;
          world.base.ledRight = meshColor.red;
          world.base.ledBack = meshColor.red;


          if(this._giveUpContinueButtonVisible) {

            this._giveUpContinueButtonVisible = false;
            this._giveUpContinueButton.setNotVisible();
          }
      

          set = Block.calcSet({left: world.block, right: this._builtBlock, careColor: false, careRotation: false});
          this.show({block : set.diffRight, careColor : false});     

          this._playerScoreText[0].text = "Player 1: " + this._playerScore[0];
          this._playerScoreText[1].text = "Player 2: " + this._playerScore[1];

          if(world.block.length == 0){           
            this.show({block : [], careColor : false});     
            this._colorMatchState = this._enumMemoState.build;
            this._giveUpContinueClick = false;
            this._currentPlayer++;
            this._currentPlayer%=2;
          }
          break;

          case this._enumMemoState.win:
          this._instructionText.text = "Remove Blocks!"
          world.base.ledFront = meshColor.green;
          world.base.ledLeft = meshColor.green;
          world.base.ledRight = meshColor.green;
          world.base.ledBack = meshColor.green;

          if(this._giveUpContinueButtonVisible) {
      
            this._giveUpContinueButtonVisible = false;
            this._giveUpContinueButton.setNotVisible();
          }
      
          
          this._playerScoreText[0].text = "Player 1: " + this._playerScore[0];
          this._playerScoreText[1].text = "Player 2: " + this._playerScore[1];

          if(world.block.length == 0){            
            this._colorMatchState = this._enumMemoState.build;
            this._giveUpContinueClick = false;
            this._currentPlayer++;
            this._currentPlayer%=2;
          }
          break;

        }

/*        if(this.state == this.enumState.busyCreatingShape){
          return;
        }


        let set = Block.calcSet({left: world.block, right: this.activeStage, careColor: false, careRotation: false});

        Block.setColor({block: set.diffLeft, color: meshColor.red, blink: true})

       this.show({block : set.diffRight, careColor : false});        
        Block.copyColor({to: world.block, from: this.activeStage, careRotation: false});
        this.soundProgression({correct: set.intersectionLeft.length, wrong: set.diffLeft.length });

        if(set.diffLeft.length == 0 && set.diffRight.length == 0){
          this.win({});
        }*/

    }

    close(){
      this._instructionText.setNotVisible();
      this._playerScoreText[0].setNotVisible();
      this._playerScoreText[1].setNotVisible();

      if(this._giveUpContinueButtonVisible) {        
        this._giveUpContinueButtonVisible = false;
        this._giveUpContinueButton.setNotVisible();
      }
  
      
      super.close();
    }



}