class Party {
  constructor({ players = 1 }) {


    this._players = players;
    this._currentPlayer = 0;
    this._playerScore = [0, 0, 0, 0];

    this._playerLevel = [];



    this._levelMap = [];
    this._difficultyMap = [];

    this._enumGame = {
      guidedBuild: 0,
      tangram: 1,
      tangram2D: 2,
      algebra: 3,
      shapeHunter: 4,
      colorMatch: 5,
      masterMind: 6,
      whack: 7,
      blockTris: 8,
      readProgram: 9,
    }



    //guided build
    this._levelMap[0] = [1, 2, 2, 3];
    this._difficultyMap[0] = [0, 0, 1, 0];

    //tangram
    this._levelMap[1] = [1, 2, 2, 3, 3, 4, 5, 5, 5];
    this._difficultyMap[1] = [0, 0, 1, 0, 1, 1, 0, 1, 2];

    //tangram2D
    this._levelMap[2] = [1, 2, 3];
    this._difficultyMap[2] = [0, 0, 0];

    //algebra
    this._levelMap[3] = [1, 2, 3, 4, 5];
    this._difficultyMap[3] = [1, 1, 1, 1, 1];

    //shapehunter
    this._levelMap[4] = [1, 1, 2, 2, 3, 4];
    this._difficultyMap[4] = [0, 1, 0, 1, 1, 1];

    //colorMatch
    this._levelMap[5] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    this._difficultyMap[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    //masterMind
    this._levelMap[6] = [1, 2, 3, 4];
    this._difficultyMap[6] = [0, 0, 0, 0];

    //whack
    this._levelMap[7] = [1, 2, 3, 4, 5, 6];
    this._difficultyMap[7] = [0, 0, 0, 0, 0, 0];

    //blockTris
    this._levelMap[8] = [1, 2, 3, 4, 5];
    this._difficultyMap[8] = [0, 0, 0, 0, 0];

    //readProgram
    this._levelMap[9] = [1, 1, 2, 2, 3];
    this._difficultyMap[9] = [0, 1, 0, 1, 0];


    this._timeOut = null;


    this._playerColor = [meshColor.magenta, meshColor.cyan, meshColor.yellow, meshColor.blue];

    this._messageText = new GuiText("Player 1");
    this._messageText.color = this._playerColor[0];
    this._messageText.setVisible(0, 1, guiOptions.center, guiOptions.top);
    this._messageTextUnder = new GuiText("");
    this._messageTextUnder.color = this._playerColor[0];
    this._messageTextUnder.setVisible(0, 2, guiOptions.center, guiOptions.top);

    this._scoreText = [];
    for (let i = 0; i < this._players; i++) {
      this._scoreText[i] = new GuiText("Player " + (i + 1) + " - Score: 0");
      this._scoreText[i].color = this._playerColor[i];
      if (i % 2 == 0) {
        this._scoreText[i].setVisible(0, Math.floor(i / 2), guiOptions.left, guiOptions.top);
      } else {
        this._scoreText[i].setVisible(0, Math.floor(i / 2), guiOptions.right, guiOptions.top);
      }


      this._playerLevel[i] = []; 

      for (let ii = 0; ii < this._levelMap.length; ii++) {
        this._playerLevel[i].push(0);
      }

    }

    this._fail = false;
    this._giveUpButton = new GuiButtonImg("./icon/games/ok.svg", function () { this._giveUp() }.bind(this));
    this._giveUpButton.setVisible(0, 0, guiOptions.right, guiOptions.top);



    this._currentGame = this._enumGame.guidedBuild;

    this._game = new GuidedBuild(this);
    this._game._setLevel({ level: 1, difficulty: 0 });

    database.selectContent({ name: this.constructor.name });

  }

  _playerScoreIncrease(increase) {
    if (increase) {
      this._playerScore[this._currentPlayer] += 1;
      if (this._playerLevel[this._currentPlayer][this._currentGame] + 1 < this._levelMap[this._currentGame].length) {
        this._playerLevel[this._currentPlayer][this._currentGame]++;
      }
    } else {
      this._playerScore[this._currentPlayer] -= 1;
      if (this._playerLevel[this._currentPlayer][this._currentGame] > 0) {
        this._playerLevel[this._currentPlayer][this._currentGame]--;
      }

    }

    this._scoreText[this._currentPlayer].text = "Player " + (this._currentPlayer + 1) + " - Score: " + this._playerScore[this._currentPlayer];



  }

  _changePlayer() {

    this._currentPlayer++;
    this._currentPlayer %= this._players;
    this._messageText.color = this._playerColor[this._currentPlayer];
    this._messageText.text = "Player " + (this._currentPlayer + 1);

    this._messageTextUnder.color = this._playerColor[this._currentPlayer];
    this._messageTextUnder.text = "Remove Blocks";


  }

  _newGame() {
    if (world.block.length != 0) {
      this._timeOut = setTimeout(this._newGame.bind(this), 1000);


      world.base.ledFront = this._playerColor[this._currentPlayer];
      world.base.ledLeft = this._playerColor[this._currentPlayer];
      world.base.ledRight = this._playerColor[this._currentPlayer];
      world.base.ledBack = this._playerColor[this._currentPlayer];

      return;
    } else {
      this._messageTextUnder.text = "";

    }


    this._timeOut = null;
    this._game.close();

    let randGame = Math.floor(Math.random() * this._levelMap.length);
    while (randGame == this._currentGame) {
      randGame = Math.floor(Math.random() * this._levelMap.length);
    }

    this._currentGame = randGame;

    let lev = this._playerLevel[this._currentPlayer][randGame];
    let level = this._levelMap[randGame][lev];
    let difficulty = this._difficultyMap[randGame][lev];

    switch (randGame) {
      case this._enumGame.guidedBuild:
        this._game = new GuidedBuild(this);
        break;
      case this._enumGame.tangram:
        this._game = new Tangram(this);
        break;
      case this._enumGame.tangram2D:
        this._game = new Tangram2D(this);
        break;
      case this._enumGame.algebra:
        this._game = new Algebra(this);
        break;
      case this._enumGame.shapeHunter:
        this._game = new ShapeHunter(this);
        break;
      case this._enumGame.colorMatch:
        this._game = new ColorMatch(this);
        break;
      case this._enumGame.masterMind:
        this._game = new MasterMind(this);
        break;
      case this._enumGame.whack:
        this._game = new Whack(this);
        break;
      case this._enumGame.blockTris:
        this._game = new BlockTris(this);
        break;
      case this._enumGame.readProgram:
        this._game = new ReadProgram(this);
        break;
    }

    this._game._setLevel({ level: level, difficulty: difficulty });


    this._fail = false;
    this._giveUpButton.setVisible(0, 0, guiOptions.center, guiOptions.bottom);

  }



  win() {
    this._giveUpButton.setNotVisible();

    world.base.ledFront = meshColor.green;
    world.base.ledLeft = meshColor.green;
    world.base.ledRight = meshColor.green;
    world.base.ledBack = meshColor.green;

    sound.win();

    this._playerScoreIncrease(true);
    this._changePlayer();
    this._timeOut = setTimeout(this._newGame.bind(this), 2000);

  }

  fail() {
    if (!this._fail) {
      this._giveUp();
    }
  }


  _giveUp() {
    this._fail = true;

    this._giveUpButton.setNotVisible();

    world.base.ledFront = meshColor.red;
    world.base.ledLeft = meshColor.red;
    world.base.ledRight = meshColor.red;
    world.base.ledBack = meshColor.red;
    sound.fail();




    this._playerScoreIncrease(false);
    this._changePlayer();
    this._timeOut = setTimeout(this._newGame.bind(this), 1000);

  }

  close() {
    if (this._timeOut != null) {
      clearTimeout(this._timeOut);
    }

    this._messageText.setNotVisible();
    this._messageTextUnder.setNotVisible();

    this._scoreText.forEach(item => item.setNotVisible());

    this._giveUpButton.setNotVisible();

  }



}