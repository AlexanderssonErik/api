
// game functions flagged w/o _ before function are also for classes that extends game

class Game  {

    //make freebuild
    //make guided build
    static init(){
        this._active = null;     
        this._levelMenu = null; 
    }
    /*static setGame(game, level){
        if(Game._active != null){
            Game._active.reset(); // ?
        }
        if(Game._active == newGame){                       
            return;
        }
        Game._level = [];
        newGame.buildLevel(Game._level);
        if(level == null ){

        }else{

            level.buildLevel(Game._level);
            //also use game level
            //this.level 
        }

    }*/

    static update(){
    //    console.log("static update")
        if(this._active != null){
          //  console.log("static update !!")
            this._active.update();
        }
    }

    static close(){
        if(this._active != null){           
            this._active.close();
            this._active = null;
        }       
        
    }

    
   /* static setLevel (level, difficulty){
    


    }*/

    constructor({level = null, levelMenu = true}) {

      //  console.log("XX level: "+ level);
        if(Game._active != null){
            Game._active.close(); // ?
        }

        this._levelIndex = 0;
        this._difficultyIndex = 0;
        this._level = level;
        this._levelMenu = [];
        this.activeStage = null;

       // this._block = [];

        this._meshBlock2x2 = [];
        this._meshBlock2x4 = [];


        //        
        this._meshShadowRight = [];
        this._meshShadowFront = [];
        this._meshShadowLeft = [];
        this._meshShadowBack = [];
        this._meshShadowBottom = [];

        //Progression
        this._wrong = 0;
        this._correct = 0;
        this._filterFailSoundCount = 0;
        this._filterWinSoundCount = 0;
        this._star = null;
        this._currentNoOfWins = 0;
        this._noOfWinsTillNextDifficulty = 2;
        this._filterWinCount = 0;
        this._timeOutNextWhenBlocksRemoved = null;


   


        //buttons
        this._okButton = null;

        this.enumState = {
            start : 0,
            win : 1,
            fail : 2,
            max: 2,
        }
        this.state = 0;




        //----------

     //   this._currentLevel = 0;
   //     this._difficultyNo = 0;

/*
        if(level != null){
            this._level = [];
            level.buildLevel(this._level);
        }*/

        Game._active = this;
        if(levelMenu){
        this._buildLevelMenu(this._level);
        }

        this._setLevel ({level: 1, difficulty: 0 });
    }

    

    _buildLevelMenu(level){


        /*if(level[0] != null){

        }
        for(let i = 0;)*/

        level.forEach(function (l, iL){

            if(iL == 0){
                this._levelMenu.push(new GuiButtonImg("./icon/level/lvlStart.svg",  function () { this. _setLevelByMenu({level: 0, difficulty: 0 })}.bind(this)));
                this._levelMenu[0].setVisible(0,0 , guiOptions.right, guiOptions.top);
            }else{
                this._levelMenu.push(this._levelMenu[0].addChild(new GuiButtonImg("./icon/level/lvl" + iL +".svg",  function () { this. _setLevelByMenu({level: iL, difficulty: 0 })}.bind(this)),  guiOptions.childBottom ) );

            }

            l.difficulty.forEach(function (d, iD){
                if(d.image != null){

                    //NOT levelMenu[0]
                    this._levelMenu.push(this._levelMenu[0].addChild(new GuiButtonImg(d.image,  function () { this. _setLevelByMenu({level: iL, difficulty: iD })}.bind(this)),  guiOptions.childLeft ) );
                }

            }.bind(this)
            
            );

            /*this._levelMenu.push(new GuiButtonImg("./icon/games/guidedBuild.svg",  function () { new GuidedBuild()}),  guiOptions.childRight ));;

            startButton = new GuiButtonImg("./icon/games/start.svg");
            startButton.setVisible(0,0 , guiOptions.left, guiOptions.top);
    
            startButton.addChild(new GuiButtonImg("./icon/games/guidedBuild.svg",  function () { new GuidedBuild()}),  guiOptions.childRight );*/

            
        }.bind(this));


    }

    _setLevelByMenu ({level = 1, difficulty = 0 }){
        this._currentNoOfWins = 0;
        this._setLevel({level: level, difficulty: difficulty});
    }

    _setLevel ({level = 1, difficulty = 0, update = true } ){
    
        console.log("set level: " + level + " diff : " + difficulty);

        this.reset();

        if(this._level[level] == null || this._level[level].difficulty[difficulty] == null){
          //  console.log("no level!!!!")
            return;
        }
        

        //this._currentNoOfWins = 0;
        //this._noOfWinsTillNextDifficulty = 2;

        this._levelIndex = level;
        this._difficultyIndex = difficulty;

        if(this._level[level].difficulty[difficulty].stage == null){

        }else if(this._level[level].difficulty[difficulty].stage.length > 1){
           
            let nextStage = this._level[level].difficulty[difficulty].stage[ Math.floor(Math.random()*this._level[level].difficulty[difficulty].stage.length)];
          
            while(nextStage == this.activeStage){
                nextStage = this._level[level].difficulty[difficulty].stage[ Math.floor(Math.random()*this._level[level].difficulty[difficulty].stage.length)];
                
            }
            this.activeStage = nextStage;

        }else{           
            this.activeStage = this._level[level].difficulty[difficulty].stage[0];
        }

 
        if(update){
        this.update();
    }

     /*   if(this.block [this.level][this.difficulty].length > 1){
            let nextStage = Math.floor(Math.random()*this.block [this.level][this.difficulty].length) ;
            
            while(nextStage == this.stage){
              nextStage = Math.floor(Math.random()*this.block [this.level][this.difficulty].length) ;
            }
            this.stage = nextStage;
            }else{
                this.stage = 0;
            }
    }*/




    }

    get difficultyIndex(){
        console.log("this._difficultyIndex: " + this._difficultyIndex);
            return this._difficultyIndex;
    }

    reset(){
        world.base.ledFront = meshColor.black;
        world.base.ledLeft = meshColor.magenta;
        world.base.ledRight = meshColor.cyan;
        world.base.ledBack = meshColor.black;

        this.state = this.enumState.start;

        if(this._star != null){
        this._star.dispose();
        this._star = null;
        }
        if(this._okButton != null){
            this._okButton.setNotVisible();
            this._okButton = null;
        }
        
        this._filterFailSoundCount = 0;
        this._filterWinSoundCount = 0;
        this._filterWinCount = 0;

        if( this._timeOutNextWhenBlocksRemoved != null){
            clearTimeout(this._timeOutNextWhenBlocksRemoved);      
            this._timeOutNextWhenBlocksRemoved = null;
        }
     
        //remove transperant blocks?
        

    }


    update(){
       // this._update();
    }

    _timeOutNextWhenBlocksRemovedfunction(){
        if(world.block.length == 0){
            this._timeOutNextWhenBlocksRemoved = null;
            this._setLevel({level: this._levelIndex, difficulty: this._difficultyIndex});
        }else{
            this._timeOutNextWhenBlocksRemoved = setTimeout(this._timeOutNextWhenBlocksRemovedfunction.bind(this), 200);
        }
    }

    win({nextWhenBlocksRemoved = true, filterWin = true, nextButton = true }){
        if(this.state == this.enumState.win){
            return;
        }
        this._filterWinCount++;
        if(filterWin && this._filterWinCount < 3){
            return;
        }



              //this._currentNoOfWins = 0;
        //this._noOfWinsTillNextDifficulty = 2;

        this.state = this.enumState.win;
        Block.setColor(world.base, meshColor.green);

       

        //gradually inclrease level


        this._currentNoOfWins++;
        if(this._currentNoOfWins >= this._noOfWinsTillNextDifficulty ){
            this._currentNoOfWins = 0;

            if(this._level[this._levelIndex].difficulty[this._difficultyIndex+1] != null){                
                this._difficultyIndex++;
            }else if(this._level[this._levelIndex+1] != null){
                this._difficultyIndex = 0;
                this._levelIndex++;
            }

            this._star = new MeshStar({height : world.maxHeight+2.5, three: true});

        }else{
            this._star = new MeshStar({height : world.maxHeight+2.5, three: false});
        }
        //this._noOfWinsTillNextDifficulty = 2;
        if(nextButton){
        this._okButton = new GuiButtonImg("./icon/games/ok.svg", function() {this._setLevel({level: this._levelIndex, difficulty: this._difficultyIndex } )}.bind(this)); //this.reset.bind(this));
        this._okButton.setVisible(0,0 , guiOptions.center, guiOptions.bottom);
        }

        if(nextWhenBlocksRemoved){
            this._timeOutNextWhenBlocksRemoved = setTimeout(this._timeOutNextWhenBlocksRemovedfunction.bind(this), 200);
        }

       /* let s = new MeshStar({height : world.ma});

           s.dispose();
            s = null;*/

        
    }
//wrongCount, okCount, totalCount
    soundProgression ({correct = 0, wrong = 0, maxCorret = null, filterSound = true}){

        if(maxCorret = null){
            maxCorret = this.activeStage.length;
        }
        

        if(wrong > this._wrong){
            this._filterFailSoundCount++; 
            if(!filterSound || this._filterFailSoundCount >2){
            sound.wrong(correct/maxCorret);
            this._filterFailSoundCount = 0;
            }else{
                return;
            }
            
        }else if(correct > this._correct){
            this._filterWinSoundCount++;
            if(!filterSound || this._filterWinSoundCount >1){
            sound.correct(correct/maxCorret);
            this._filterWinSoundCount = 0;
            }else{
                return;
            }
        }

        this._wrong = wrong;
        this._correct = correct;

    }


    showShadow({block = [], careColor = true, careGap = true, add = false}){




     
        if(!careColor || !careGap){
            let tmpBlock = Block.copy(block);
            tmpBlock.forEach(function (item, index){
                item.color = block[index].calcColor({careColor: careColor, careGap: careGap});
               
                //console.log("color : " + block[index].calcColor({careColor: true, careGap: true}));
            })
            block = tmpBlock;  
        }


        
        let countRight = 0;
        let countFront = 0;
        let countLeft = 0;
        let countBack = 0;
        let countBottom = 0;

        if(add){
            countRight = this._meshShadowRight.length;
            countFront = this._meshShadowFront.length;
            countLeft = this._meshShadowLeft.length;
            countBack = this._meshShadowBack.length;
            countBottom = this._meshShadowBottom.length;

        }

        block.forEach(function (item, index) {
            
            if(item instanceof BlockShadowRight){
                if(this._meshShadowRight.length  >  countRight){
                    this._meshShadowRight[countRight].block = item;                 
                }else{
                    this._meshShadowRight.push( new MeshShadowRight(item));                
                }
            
                countRight++;
            } else if(item instanceof BlockShadowFront){
                if(this._meshShadowFront.length  >  countFront){
                    this._meshShadowFront[countFront].block = item;
                }else{
                    this._meshShadowFront.push( new MeshShadowFront(item));
                }
                countFront++;
            }else if(item instanceof BlockShadowLeft){
                if(this._meshShadowLeft.length  >  countLeft){
                    this._meshShadowLeft[countLeft].block = item;
                }else{
                    this._meshShadowLeft.push( new MeshShadowLeft(item));
                }
                countLeft++;
            }else if(item instanceof BlockShadowBack){
                if(this._meshShadowBack.length  >  countBack){
                    this._meshShadowBack[countBack].block = item;
                }else{
                    this._meshShadowBack.push( new MeshShadowBack(item));
                }
                countBack++;
            }else if(item instanceof BlockShadowBottom){
                if(this._meshShadowBottom.length  >  countBottom){
                    this._meshShadowBottom[countBottom].block = item;
                }else{
                    this._meshShadowBottom.push( new MeshShadowBottom(item));
                }
                countBottom++;
            }
           


        }.bind(this));




        while(this._meshShadowRight.length > countRight){
            this._meshShadowRight[this._meshShadowRight.length - 1].dispose();
            this._meshShadowRight.pop();
        }
        while(this._meshShadowFront.length > countFront){
            this._meshShadowFront[this._meshShadowFront.length - 1].dispose();
            this._meshShadowFront.pop();
        }
        while(this._meshShadowLeft.length > countLeft){
            this._meshShadowLeft[this._meshShadowLeft.length - 1].dispose();
            this._meshShadowLeft.pop();
        }
        while(this._meshShadowBack.length > countBack){
            this._meshShadowBack[this._meshShadowBack.length - 1].dispose();
            this._meshShadowBack.pop();
        }
        while(this._meshShadowBottom.length > countBottom){
            this._meshShadowBottom[this._meshShadowBottom.length - 1].dispose();
            this._meshShadowBottom.pop();
        }

       

    }


    show({block = [], careColor = true}){

    
        if(!careColor){
          block = Block.copy(block);
          Block.setColor({block: block, color: meshColor.black});  
          block[0].color[0] = 0;
        }


       let count2x2 = 0;
       let count2x4 = 0;


     


        block.forEach(function (item, index) {
           
            if(item instanceof Block2x2){
                if(this._meshBlock2x2.length  >  count2x2){
                    this._meshBlock2x2[count2x2].block = item;                 
                }else{
                    this._meshBlock2x2.push( new Mesh2x2Trans(item));                
                }
            
                count2x2++;
            } else if(item instanceof Block2x4){
                if(this._meshBlock2x4.length  >  count2x4){
                    this._meshBlock2x4[count2x4].block = item;
                }else{
                    this._meshBlock2x4.push( new Mesh2x4Trans(item));
                }
                count2x4++;
            }
           


        }.bind(this));



        while(this._meshBlock2x2.length > count2x2){
            this._meshBlock2x2[this._meshBlock2x2.length - 1].dispose();
            this._meshBlock2x2.pop();
        }

        while(this._meshBlock2x4.length > count2x4){
            this._meshBlock2x4[this._meshBlock2x4.length - 1].dispose();
            this._meshBlock2x4.pop();
        }




    }

    close(){
       
        this.reset();
        this._levelMenu.forEach(item => item.setNotVisible());
        this._levelMenu = []; 
        while(this._meshBlock2x2.length > 0){
            this._meshBlock2x2[this._meshBlock2x2.length - 1].dispose();
            this._meshBlock2x2.pop();
        }
        while(this._meshBlock2x4.length > 0){
            this._meshBlock2x4[this._meshBlock2x4.length - 1].dispose();
            this._meshBlock2x4.pop();
        }

    }


}