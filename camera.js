let cameraAlpha = {
  front: -Math.PI,
  left: Math.PI / 2,
  back: 0,
  right: -Math.PI / 2,
  top: 4
}

let cameraSnap = {
  off: 0,
  diagonal: 1,
  horizontal: 2,
  deg: 3
}

let camera = {

  _arcRotateCamera: 0,
  _lastTargetAngle: 0,
  _animateFrameRate: 30,
  _animateFrameTime: 6,
  _animate: 0,
  // animateFrames : [],
  _animation: 0,
  _pointerActive: false,
  _locked: false,
  _snap: 0, //1 = diagonal, 2= vertical, 3= 45 deg
  _baseDown: false,
  //  onPointerUp : null;
  init: function () {


    this._arcRotateCamera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(4.5, 0, 4.5), scene);
    this._arcRotateCamera.setPosition(new BABYLON.Vector3(15, 15, 15));
    this._arcRotateCamera.lowerBetaLimit = Math.PI / 8;
    this._arcRotateCamera.upperBetaLimit = Math.PI - Math.PI / 2;
    this._arcRotateCamera.lowerRadiusLimit = 10;
    this._arcRotateCamera.upperRadiusLimit = 40;
    this._arcRotateCamera.attachControl(canvas, true);
    this._arcRotateCamera.angularSensibilityX = 2000;
    this._arcRotateCamera.angularSensibilityY = 3000;
    this._arcRotateCamera.angularSensibilityZ = 2000;
    this._arcRotateCamera.wheelPrecision = 50;
    this._arcRotateCamera.radius = 20;

    this._arcRotateCamera.useBouncingBehavior = false;

    this._arcRotateCamera.alpha = cameraAlpha.front;
    this._animate = new BABYLON.Animation("", "alpha", this._animateFrameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);


    let light0 = new BABYLON.HemisphericLight("", new BABYLON.Vector3(0, 5, 0), scene);

    light0.specular = new BABYLON.Color3(0, 0, 0);
    light0.specularPower = 0;
    light0.diffuse = new BABYLON.Color3(1, 1, 1);
    light0.intensity = 0.75;

    let light1 = new BABYLON.HemisphericLight("", new BABYLON.Vector3(4.5, -5, 4.5), scene);

    light1.specular = new BABYLON.Color3(0, 0, 0);
    light1.specularPower = 0;
    light1.diffuse = new BABYLON.Color3(1, 1, 1);
    light1.intensity = 0.15;

    this._lastFreeTarget = new BABYLON.Vector3(4.5, 0, 4.5);
    this._free = false;


  },

  get lookingAtFrontOrBack() {
    let angle = Math.abs(this._arcRotateCamera.alpha % (Math.PI))
    if (angle > 0.75 * Math.PI || angle < 0.25 * Math.PI) {
      return true;
    }
    return false;
  },

  lookAngle: function () {


    if (this._arcRotateCamera.alpha < 0) {
      return Math.PI * 2 - (Math.abs(this._arcRotateCamera.alpha) % (Math.PI * 2));
    } else {
      return this._arcRotateCamera.alpha % (Math.PI * 2);
    }

  },

  moveZ: function (dir) {
    this._arcRotateCamera.target.z += dir;
    if (this._arcRotateCamera.target.x - 0.5 == Math.floor(this._arcRotateCamera.target.x)) {
       this._lastFreeTarget = new BABYLON.Vector3(this._arcRotateCamera.target.x, this._arcRotateCamera.target.y, this._arcRotateCamera.target.z);
    }else{
      this._lastFreeTarget.z += dir; 
    }
  },

  moveY: function (dir) {
    this._arcRotateCamera.target.y += dir * Mesh._staticPitch;
    if (this._arcRotateCamera.target.x - 0.5 == Math.floor(this._arcRotateCamera.target.x)) {
         this._lastFreeTarget = new BABYLON.Vector3(this._arcRotateCamera.target.x, this._arcRotateCamera.target.y, this._arcRotateCamera.target.z);
    }else{
      this._lastFreeTarget.y += dir * Mesh._staticPitch;
    }
  },

  moveX: function (dir) {
    this._arcRotateCamera.target.x += dir;
    if (this._arcRotateCamera.target.x - 0.5 == Math.floor(this._arcRotateCamera.target.x)) {
      this._lastFreeTarget = new BABYLON.Vector3(this._arcRotateCamera.target.x, this._arcRotateCamera.target.y, this._arcRotateCamera.target.z);
    }else{
      this._lastFreeTarget.x += dir;
    }
  },


  get lookingFront() {
    let angle = this.lookAngle();
    if (angle > 0.75 * Math.PI && angle < 1.25 * Math.PI) {
      return true;
    }
    return false;
  },

  get lookingRight() {
    let angle = this.lookAngle();
    if (angle > 1.25 * Math.PI && angle < 1.75 * Math.PI) {
      return true;
    }
    return false;
  },

  get lookingBack() {
    let angle = this.lookAngle();
    if (angle > 1.75 * Math.PI || angle < 0.25 * Math.PI) {
      return true;
    }
    return false;
  },
  get lookingLeft() {
    let angle = this.lookAngle();
    if (angle > 0.25 * Math.PI && angle < 0.75 * Math.PI) {
      return true;
    }
    return false;
  },




  set snap(snap) {
    this._snap = snap;
    this.pointerUp();

  },

  fovView: function () {
    //this._arcRotateCamera.fovMode = this._arcRotateCamera.FOVMODE_HORIZONTAL_FIXED;
    this._arcRotateCamera.fov = 0.2;
    this._arcRotateCamera.upperRadiusLimit = 100;
    this._baseDown = true;
    this._arcRotateCamera.setTarget(new BABYLON.Vector3(4.5, 4.0, 4.5)); //5.5
    this._arcRotateCamera.radius = 55; //70
    //this._arcRotateCamera.beta = Math.PI / 2 - Math.PI / 15;
    this._arcRotateCamera.beta = Math.PI / 2 - Math.PI / 10;

    this._arcRotateCamera.alpha = Math.PI + Math.PI / 8;
    //this._arcRotateCamera.alpha = Math.PI + Math.PI / 4;
    this._arcRotateCamera.lowerBetaLimit = Math.PI / 8;
    this._arcRotateCamera.upperBetaLimit = Math.PI;
    this.lock();
  },

  fovViewOff: function () {
    this._arcRotateCamera.fov = 0.8;
  },

  free() {
    this._arcRotateCamera.lowerBetaLimit = -Math.PI;
    this._arcRotateCamera.upperBetaLimit = Math.PI;
    this._arcRotateCamera.upperRadiusLimit = 80;

    this._free = true;



  },

  noFree() {
    this._free = false;
    this._arcRotateCamera.setTarget(new BABYLON.Vector3(4.5, 0, 4.5));
    this._arcRotateCamera.upperRadiusLimit = 40;
    this._lastFreeTarget = new BABYLON.Vector3(4.5, 0, 4.5);

  },

  reset: function () {


    this.unlock();
    if (this._baseDown) {
      this._baseDown = false;
      this.zoomToStartPos();
    }
    this._arcRotateCamera.upperRadiusLimit = 40;
    this._arcRotateCamera.lowerBetaLimit = Math.PI / 8;
    this._arcRotateCamera.upperBetaLimit = Math.PI - Math.PI / 2;

  },



  moveBaseDown: function () {

    this._baseDown = true;
    this._arcRotateCamera.setTarget(new BABYLON.Vector3(4.5, 3.5, 4.5));
    this._arcRotateCamera.radius = 27;
    this._arcRotateCamera.beta = Math.PI / 3;

    this.setAlpha(cameraAlpha.front, true, true);
    this.lock();

  },

  moveBase: function (orientation) {
    this._baseDown = true;
    if (orientation != cameraAlpha.top) {
      this._arcRotateCamera.setTarget(new BABYLON.Vector3(4.5, 9, 4.5));
      this._arcRotateCamera.radius = 35;
      this._arcRotateCamera.upperBetaLimit = Math.PI;
      this._arcRotateCamera.lowerBetaLimit = 0;
      this._arcRotateCamera.beta = Math.PI / 1.75; //1.8 
      this._arcRotateCamera.upperBetaLimit = Math.PI;
      this.setAlpha(orientation, true, true);
    } else {
      this._arcRotateCamera.setTarget(new BABYLON.Vector3(4.5, 0, 4.5));
      this._arcRotateCamera.upperRadiusLimit = 65;
      //this._arcRotateCamera.radius = 40;
      this._arcRotateCamera.radius = 15;
      this._arcRotateCamera.lowerBetaLimit = 0;
      this._arcRotateCamera.beta = 0;
      this.setAlpha(cameraAlpha.front, true, true);
    }

    this.lock();

  },

  topView: function () {
    this._baseDown = true;
    this._arcRotateCamera.setTarget(new BABYLON.Vector3(4.5, 0, 4.5));
    this._arcRotateCamera.upperRadiusLimit = 65;
    //this._arcRotateCamera.radius = 40;
    this._arcRotateCamera.radius = 15;
    this._arcRotateCamera.lowerBetaLimit = 0;
    this._arcRotateCamera.beta = 0;
    this.setAlpha(cameraAlpha.front, true, true);


    // this._arcRotateCamera.lowerBetaLimit =Math.PI/8;
    this._arcRotateCamera.upperBetaLimit = 0;
  },

  /*
  aboveView : function (){
    this._baseDown = true;
    this._arcRotateCamera.setTarget(new BABYLON.Vector3(4.5,3.5 ,4.5));
    this._arcRotateCamera.radius = 27;
    this._arcRotateCamera.beta = Math.PI/3;
  },*/






  zoomToStartPos: function () {
    if (this._locked) {
      return;
    }
    this._arcRotateCamera.radius = 20;

    if (this._free) {
      this._arcRotateCamera.setTarget(new BABYLON.Vector3(this._lastFreeTarget.x, this._lastFreeTarget.y, this._lastFreeTarget.z));
    } else {
      this._arcRotateCamera.setTarget(new BABYLON.Vector3(4.5, 0, 4.5));
    }
  },
  get locked() {
    return this._locked;
  },

  guiLock: function () {
    scene.activeCamera.detachControl(canvas);
  },

  guiUnlock: function () {
    if (!this._locked) {
      scene.activeCamera.attachControl(canvas);
    }
  },

  lock: function () {
    scene.activeCamera.detachControl(canvas);
    this._locked = true;
  },
  unlock: function () {
    scene.activeCamera.attachControl(canvas);
    this._locked = false;

  },

  setAlpha: function (angle, noFilter, disableSnap) {


    if (this._baseDown && !disableSnap) {
      return;
    }


    if (!this._pointerActive && (noFilter || Math.abs(this._lastTargetAngle - angle) > Math.PI / 40)) {

      this._lastTargetAngle = angle;
      let startAlpha = (this._arcRotateCamera.alpha % (2 * Math.PI));

      if (this._snap != 0 && !disableSnap) {
        angle = this.calcSnap(angle);
      }


      if (startAlpha - angle > Math.PI) {
        angle += 2 * Math.PI;
      } else if (startAlpha - angle < -Math.PI) {
        angle -= 2 * Math.PI;
      }
      if (this._animation != 0) {
        this._animation.stop();
      }

      let animateFrames = [];


      let dampener = Math.PI / 20000;
      if (angle > startAlpha) {
        dampener = -Math.PI / 20000;
      }

      animateFrames.push({
        frame: 0,
        value: startAlpha
      });
      animateFrames.push({
        frame: 1 + this._animateFrameTime * Math.abs(startAlpha - angle),
        value: angle + dampener
      });
      animateFrames.push({
        frame: 15 + this._animateFrameTime * Math.abs(startAlpha - angle),
        value: angle
      });
      animateFrames.push({
        frame: 20 + this._animateFrameTime * Math.abs(startAlpha - angle),
        value: angle
      });


      this._animate.setKeys(animateFrames);
      this._animation = scene.beginDirectAnimation(this._arcRotateCamera, [this._animate], 0, 2 * this._animateFrameRate, false);//,1, function () { this.animationEnd() }.bind(this));                           
      // this._animation = scene.beginDirectAnimation(this._arcRotateCamera, [this._animate], 0, 2 * this._animateFrameRate, false,1, function () { this.animationEnd(angle) }.bind(this));

      //this._arcRotateCamera.alpha = angle;
    }


  },

  /*    animationEnd: function(angle){
  
        console.log("animation End: " + angle)
       // this._arcRotateCamera.alpha = Math.PI/4;
  
  
      },*/

  pointerDown: function () {
    this._pointerActive = true;
    this._arcRotateCamera.inertia = 0.9;
    //    this.onPointerUp = this.pointerUp.bind(this);
    scene.onPointerUp = this.pointerUp.bind(this);


  },
  pointerUp: function () {
    this._pointerActive = false;
    // this.onPointerUp = null;
    if (this._snap != 0 && !this._locked) {

      this.setAlpha(this._arcRotateCamera.alpha, true);
    }

    scene.onPointerUp = null;

  },
  calcSnap: function (angle) {
    let snapAngle = Math.PI / 2;
    let diagonal = 0;

    if (this._snap == 1) {
      diagonal = Math.PI / 4;
    } else if (this._snap == 3) {
      snapAngle = Math.PI / 4;
    }

    let direction = 1;
    if (angle > 0 && angle % snapAngle < diagonal + snapAngle / 2) {
      direction = 0;
    } else if (angle < 0 && angle % snapAngle < diagonal - snapAngle / 2) {
      direction = 0;
    }

    return diagonal + snapAngle * Math.floor(angle / (snapAngle)) + direction * snapAngle;
  }

};
