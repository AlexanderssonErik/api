let database = {
  //add firebase account here
  _config: {

    apiKey: "AIzaSyAYJgJb07yCtFdoQKEcxuNHH7qe_aX2hq4",
    authDomain: "bilo-d71d2.firebaseapp.com",
    databaseURL: "https://bilo-d71d2.firebaseio.com",
    projectId: "bilo-d71d2",
    storageBucket: "bilo-d71d2.appspot.com",
    messagingSenderId: "699058898703",
    appId: "1:699058898703:web:2d52cf91c70bee90a1a07a",
    measurementId: "G-LQ66YHH7EP"

  },
  _data: null,
  _signInGoogleButton: null,
  _signInMailButton: null,
  createSignInMailButton: null,

  _analytics: null,

  _emailInput: null,
  _passwordInput: null,

  _pendingSettingOfScore: false,
  _user: {
    loggedIn: false,
    uid: "",
    name: "",
    email: ""
  },

  _showGui: function () {
    if (this._signInGoogleButton == null) {
      this._emailInput = new GuiInput("email");
      this._passwordInput = new GuiInput("password");
      this._signInGoogleButton = new GuiButtonImg("./icon/signIn/googleGSignIn.svg", this._signInGoolge);
      this._mailSignInMenu = new GuiButtonImg("./icon/signIn/googleSignIn.svg", this._signInMailMenu.bind(this));
      this._createSignInMailButton = new GuiButtonImg("./icon/signIn/createAccount.svg", this._createSignInMail);
      this._signInMailButton = new GuiButtonImg("./icon/signIn/signIn1.svg", this._signInMail);
    }
    this._signInGoogleButton.setVisible(0, -1, guiOptions.center, guiOptions.center);
    this._mailSignInMenu.setVisible(0, 1, guiOptions.center, guiOptions.center);
  },

  _signInMailMenu: function () {
    if (this._signInGoogleButton != null) {
      this._signInGoogleButton.setNotVisible();
      this._signInGoogleButton = null;
    }
    if (this._mailSignInMenu != null) {
      this._mailSignInMenu.setNotVisible();
      this._mailSignInMenu = null;
    }
    this._emailInput.setVisible(0, 1, guiOptions.center, guiOptions.center);
    this._passwordInput.setVisible(0, 2, guiOptions.center, guiOptions.center);
    this._createSignInMailButton.setVisible(-1, 0, guiOptions.center, guiOptions.center);
    this._signInMailButton.setVisible(1, 0, guiOptions.center, guiOptions.center);

  },

  _hideGui: function () {
    if (this._signInGoogleButton != null) {
      this._signInGoogleButton.setNotVisible();
      this._signInGoogleButton = null;
    }
    if (this._mailSignInMenu != null) {
      this._mailSignInMenu.setNotVisible();
      this._mailSignInMenu = null;
    }
    if (this._emailInput != null) {
      this._emailInput.setNotVisible();
      this._emailInput = null;
    }
    if (this._passwordInput != null) {
      this._passwordInput.setNotVisible();
      this._passwordInput = null;
    }

    if (this._createSignInMailButton != null) {
      this._createSignInMailButton.setNotVisible();
      this._createSignInMailButton = null;
    }
    if (this._signInMailButton != null) {
      this._signInMailButton.setNotVisible();
      this._signInMailButton = null;
    }

  },

  init: function ({ enabled = false }) {

    if (!enabled) {
      ble.callAfterDatabaseLogin();
    } else {

      firebase.initializeApp(this._config);
      this._analytics = firebase.analytics();

      this._data = firebase.firestore();

      firebase.auth().onAuthStateChanged(function (authUser) {
        if (authUser) {
          database._user.name = authUser.displayName;
          database._user.uid = authUser.uid;
          database._user.email = authUser.email;
          database._user.loggedIn = true;

          console.log("authUser.displayName: " + authUser.uid)
          console.log("authUser.displayName: " + authUser.email)
          database._hideGui();

          ble.callAfterDatabaseLogin();

          let time = firebase.firestore.Timestamp.now();
          let d = time.toMillis();

          database._analytics.logEvent('login', {
            method: "?",
            items: [{ name: database._user.uid }]
          });

          database._data.collection("user").doc(database._user.uid).set({ name: database._user.name, email: database._user.email, timestamp: firebase.firestore.FieldValue.arrayUnion(d) }, { merge: true }).then(function () {
          }).catch(function (error) {
            console.log("Error setting user document:", error);
          });

        } else {
          database._showGui();
          database._user.loggedIn = false;
          console.log("no user")
        }
      });

    }

  },

  _createSignInMail: function () {

    firebase.auth().createUserWithEmailAndPassword(database._emailInput.text, database._passwordInput.text).catch(function (error) {
      alert(error.message);
    });
  },

  _signInMail: function () {

    firebase.auth().signInWithEmailAndPassword(database._emailInput.text, database._passwordInput.text).catch(function (error) {
      alert(error.message);
    });
  },

  _signInGoolge: function () {
    let provider = new firebase.auth.GoogleAuthProvider();
    alert("Please allow pop-ups! OBS: Google login doesn't work with iOS app WebBLE")
    firebase.auth().signInWithPopup(provider).then(function (result) {
    }).catch(function (error) {
      alert("Google login: " + error.message);
    });

  },



  win: function ({ name = null, level = null, difficulty = null }) {
    if (!this._user.loggedIn || this._user.uid == "") {
      return;
    }

    this._analytics.logEvent('level_end', {
      level_name: name + level + difficulty,
      success: "yes",
      items: [{ name: this._user.uid }]
    });


    this._data.collection(name).doc(this._user.uid).set({ timeStamp: firebase.firestore.FieldValue.arrayUnion({ level: level, difficulty: difficulty, timeStamp: firebase.firestore.Timestamp.now().toMillis(), type: "win" }) }, { merge: true }).then(function () {
    }).catch(function (error) {
      alert("Win timestamp error: " + error.message);
    });

  },

  selectContent: function ({ name = null }) {
    if (!this._user.loggedIn || this._user.uid == "") {
      return;
    }
    this._analytics.logEvent('select_content', {
      content_type: name,
      item_id: this._user.uid,
      items: [{ name: this._user.uid }]
    });

  },

  setLevel: function ({ name = null, level = null, difficulty = null }) {
    if (!this._user.loggedIn || this._user.uid == "") {
      return;
    }


    this._analytics.logEvent('level_start', {
      level_name: name + level + difficulty,
      items: [{ name: this._user.uid }]
    });

    this._data.collection(name).doc(this._user.uid).set({ timeStamp: firebase.firestore.FieldValue.arrayUnion({ level: level, difficulty: difficulty, timeStamp: firebase.firestore.Timestamp.now().toMillis(), type: "start" }) }, { merge: true }).then(function () {

    }).catch(function (error) {
      alert("set level timestamp error: " + error.message);
    });

  },
  fail: function ({ name = null, level = null, difficulty = null }) {
    if (!this._user.loggedIn || this._user.uid == "") {
      return;
    }


    this._data.collection(name).doc(this._user.uid).set({ timeStamp: firebase.firestore.FieldValue.arrayUnion({ level: level, difficulty: difficulty, timeStamp: firebase.firestore.Timestamp.now().toMillis(), type: "fail" }) }, { merge: true }).then(function () {

    }).catch(function (error) {
      alert("fail timestamp error: " + error.message);
    });

  },

  saveUserLevel: function ({ name = null, difficulty = null, block = null }) {
    if (!this._user.loggedIn || this._user.uid == "") {
      return;
    }

    let userLevel = {};
    eval("userLevel.difficulty" + difficulty + '= "' + block + '"');

    this._data.collection(name).doc(this._user.uid).set({ userLevel: userLevel }, { merge: true }).then(function () {
    }).catch(function (error) {
      alert("save user level error: " + error.message);
    });

  },

  saveProgram: function ({ name = null, level = null, program = null }) {

    if (!this._user.loggedIn || this._user.uid == "") {
      return;
    }
   
    this._data.collection(name).doc(this._user.uid).set({ ["userProgram" + level]: program }, { merge: true }).then(function () {
    }).catch(function (error) {
      alert("save program error: " + error.message);
    });

  },


  loadProgram: function ({ name = null, level = null, callBackFunction = null }) {
    if (!this._user.loggedIn || this._user.uid == "") {
      return;
    }

    
    let docRef = this._data.collection(name).doc(this._user.uid)

    docRef.get().then(function (doc) {
      if (doc.exists) {

        let gameData = doc.data();

          let prog = eval("gameData.userProgram" + level) ;          

          if (prog == null) {
            callBackFunction({ level: level, program: null });
          }else{
          callBackFunction({ level: level, program: eval("gameData.userProgram" + level) });
          }        

      } else {
        callBackFunction({ level: level, program: null });
        console.log("no program data: ");
      }
    
    }.bind(level)).catch(function (error) { 
      console.log("load program error:", error);
    });



  },


  loadUserLevel: function ({ name = null, difficulty = null, callBackFunction = null }) {
    if (!this._user.loggedIn || this._user.uid == "") {
      return;
    }

    let docRef = this._data.collection(name).doc(this._user.uid)//.collection("userLevel")//.doc("difficulty" + difficulty);


    docRef.get().then(function (doc) {
      if (doc.exists) {
        let gameData = doc.data();

        if (gameData.userLevel == null) {
          callBackFunction({ difficulty: difficulty, block: null });
        } else {
          callBackFunction({ difficulty: difficulty, block: eval("gameData.userLevel.difficulty" + difficulty) });
        }

      } else {
        callBackFunction({ difficulty: difficulty, block: null });
        console.log("no score data: ");
      }

    }.bind(difficulty)).catch(function (error) {
      console.log("load user level error:", error);
    });



  },






}