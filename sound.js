
let sound = {

    correctMp3: new Audio("./sounds/correct.mp3"),
    wrongMp3: new Audio("./sounds/wrong.mp3"),
    winMp3: new Audio("./sounds/win.mp3"),
    failMp3: new Audio("./sounds/fail.mp3"),
    buttonMp3: new Audio("./sounds/click.mp3"),
    mute: false,
    init: function(){

//        this.buttonMp3 = new Audio("./sounds/click.mp3");

        this.buttonMp3.volume = 0.1;
        this.correctMp3.volume = 0.1;
        this.wrongMp3.volume = 0.1;
        this.winMp3.volume = 0.2;
        this.failMp3.volume = 0.3;




    },


    off: function(){
        sound.mute = true;
        console.log("ooff")
     

    },
    on: function(){
        sound.mute = false;
     

    },

    button : function(){
        //console.log("this.mute: " + this.mute)
        if(this.mute){
            return;
        }

        this.buttonMp3.play();
       
    },
    wrong: function(percentageCompleted){
        if(this.mute){
            return;
        }
        //console.log("wrong: " + percentageCompleted);
        if(percentageCompleted < 0.4){
            this.wrongMp3.volume = 0.05;
            
        }else if(percentageCompleted < 0.6){
            this.wrongMp3.volume = 0.1;
        }else if(percentageCompleted < 0.8){
            this.wrongMp3.volume = 0.3;
        }else{
            this.wrongMp3.volume = 1;
        }

        this.wrongMp3.play();
    },
    correct: function(percentageCompleted){
        if(this.mute){
            return;
        }

        
        //sound level not correct
        if(percentageCompleted < 0.4){
            this.correctMp3.volume = 0.02;
        }else if(percentageCompleted < 0.6){
            this.correctMp3.volume = 0.05;
        }else if(percentageCompleted < 0.8){
            this.correctMp3.volume = 0.1 ;
        }else{
            this.correctMp3.volume = 0.2;
        }

        this.correctMp3.play();
    },
    fail: function(){
        if(this.mute){
            return;
        }
        this.failMp3.play();
    },
    win: function(){
        if(this.mute){
            return;
        }
        this.winMp3.play();
    }

};