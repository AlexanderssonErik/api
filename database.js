let database = {
    //add firebase account here
    _config: {
        apiKey: "AIzaSyAYJgJb07yCtFdoQKEcxuNHH7qe_aX2hq4",
        authDomain: "bilo-d71d2.firebaseapp.com",
        projectId: "bilo-d71d2",
      },
     _data: null,
    _signInGoogleButton: null,
    _signInMailButton: null,
    createSignInMailButton: null,
    
    _emailInput: null,
    _passwordInput: null,
 
    _pendingSettingOfScore: false,
    _user: {
      loggedIn: false,
      uid: "",
      name: "",
      email: ""
    },

    _showGui: function(){
        if(this._signInGoogleButton == null){
            this._emailInput = new GuiInput("not using Google/top button: email");
            this._passwordInput  = new GuiInput("password");
            this._signInGoogleButton = new GuiButtonImg("./icon/signIn/googleGSignIn.svg", this._signInGoolge);
            this._createSignInMailButton = new GuiButtonImg("./icon/signIn/createAccount.svg", this._createSignInMail);
            this._signInMailButton = new GuiButtonImg("./icon/signIn/signIn1.svg", this._signInMail);
        }
        this._emailInput.setVisible(0,1 , guiOptions.center, guiOptions.center);
        this._passwordInput.setVisible(0,2 , guiOptions.center, guiOptions.center);
        this._signInGoogleButton.setVisible(0,-1 , guiOptions.center, guiOptions.center);
        this._createSignInMailButton.setVisible(-1,0 , guiOptions.center, guiOptions.center);
        this._signInMailButton.setVisible(1,0 , guiOptions.center, guiOptions.center);
    
      },

      _hideGui: function(){
        if(this._signInGoogleButton != null){
         
            this._emailInput.setNotVisible();
            this._passwordInput.setNotVisible();
            this._signInGoogleButton.setNotVisible();
            this._createSignInMailButton.setNotVisible();
            this._signInMailButton.setNotVisible();
            this._emailInput = null;
            this._passwordInput = null;
            this._signInGoogleButton = null;
            this._createSignInMailButton = null;
            this._signInMailButton = null;
        }
      },

    init: function ({enabled = false}) {

        if(!enabled){
            ble.callAfterDatabaseLogin();
        }else{
              
              firebase.initializeApp(this._config);
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
         alert("please allow popup. OBS: Google login doesn't work with iOS app WebBLE ")
         firebase.auth().signInWithPopup(provider).then(function (result) {
         }).catch(function (error) {
           alert("Google login: " + error.message);
         });
     
       },



       win: function ({name = null, level = null, difficulty = null}) {
        if(!this._user.loggedIn || this._user.uid == ""){
          return;
        }
  
       
    
        this._data.collection(name).doc(this._user.uid).set({ timeStamp: firebase.firestore.FieldValue.arrayUnion( {level: level, difficulty: difficulty, timeStamp: firebase.firestore.Timestamp.now().toMillis(), type: "win"}) }, { merge: true }).then(function () {
        }).catch(function (error) {
          alert("Win timestamp error: " + error.message);
        });
    
      },

  
      setLevel: function ({name = null, level = null , difficulty = null}) {
        if(!this._user.loggedIn || this._user.uid == ""){
            return;
          }
    
          this._data.collection(name).doc(this._user.uid).set({ timeStamp: firebase.firestore.FieldValue.arrayUnion( {level: level, difficulty: difficulty, timeStamp: firebase.firestore.Timestamp.now().toMillis(), type: "start"}) }, { merge: true }).then(function () {
    
        }).catch(function (error) {
          alert("set level timestamp error: " + error.message);
        });
    
      },
      fail: function ({name = null, level = null , difficulty = null}) {
        if(!this._user.loggedIn || this._user.uid == ""){
            return;
          }
    
    
          this._data.collection(name).doc(this._user.uid).set({ timeStamp: firebase.firestore.FieldValue.arrayUnion( {level: level, difficulty: difficulty, timeStamp: firebase.firestore.Timestamp.now().toMillis(), type: "fail"}) }, { merge: true }).then(function () {
    
        }).catch(function (error) {
          alert("fail timestamp error: " + error.message);
        });
    
      },

      saveUserLevel: function ({name = null, difficulty = null, block = null}) {
        if(!this._user.loggedIn || this._user.uid == ""){
            return;
        }

          let userLevel = {};
          eval("userLevel.difficulty" + difficulty + '= "' + block + '"');
   
          this._data.collection(name).doc(this._user.uid).set({ userLevel : userLevel}, { merge: true }).then(function () {
        }).catch(function (error) {
          alert("save user level error: " + error.message);
        });

    },

    loadUserLevel: function ({name = null, difficulty = null, callBackFunction = null}) {
        if(!this._user.loggedIn || this._user.uid == ""){
            return;
        }


        //let docRef = this._data.collection(name).doc(this._user.uid).collection("userLevel").doc("difficulty" + difficulty);
        let docRef = this._data.collection(name).doc(this._user.uid)//.collection("userLevel")//.doc("difficulty" + difficulty);


        docRef.get().then(function (doc) {
            if (doc.exists) {
      
           //     console.log("difficulty: " + difficulty)
              let gameData = doc.data();
            //  console.log("gd: " + gameData.userLevel )
        //      console.log("gd: " + gameData.userLevel.difficulty0 )
        //       console.log("gd: " + eval("gameData.userLevel.difficulty" + difficulty) )
                if(gameData.userLevel == null){
                    callBackFunction({difficulty: difficulty, block: null});
                }else{
                    callBackFunction({difficulty: difficulty, block: eval("gameData.userLevel.difficulty" + difficulty)});
                }
                
            } else {
                callBackFunction({difficulty: difficulty, block: null});
             
              console.log("no score data: ");
            }
           // db.pendingSettingOfScore = false;
          }.bind(difficulty)).catch(function (error) {
           // db.pendingSettingOfScore = false;
            console.log("load user level error:", error);
          });
      
          
/*
        callBackFunction();
        


          let userLevel = {};
          eval("userLevel.difficulty" + difficulty + "=" + block);
   
          this._data.collection(name).doc(this._user.uid).set({ userLevel : userLevel}, { merge: true }).then(function () {
        }).catch(function (error) {
          alert("Win timestamp error: " + error.message);
        });*/

    },
  
 
    
    


}