class Tangram2D extends Game {
  constructor() {
    let level = [];

    level.push({ difficulty: [], image: null });
    tangram2DLevel.buildLevel(level)

    super({ level: level, userCreatedLevel: true });
    this._tangram2DState = 0;

    this._enumTangram2DState = {
      front: 0,
      right: 1,
      back: 2,
      left: 3,
      top: 4,
    }

    this._setLevel({ level: 1, difficulty: 0 });
    let shadowStage = BlockShadow.convert({ block: this.activeStage });

  }

  _setLevel({ level = 0, difficulty = 0 }) {

    super._setLevel({ level: level, difficulty: difficulty });

    this._tangram2DState = 0;

    if (level > 0) {
      this.showDifficultyButton();
    }
  }

  reset() {
    super.reset();
  }

  _convertGuiToShadow() {

    let returnShadow = [];

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (GuiButtonPaint._picturePixels[y][x] != null && GuiButtonPaint._picturePixels[y][x] != 0) {
          let color = GuiButtonPaint._picturePixels[y][x];
          if (color == 1) {
            color = meshColor.red;
          } else if (color == 2) {
            color = meshColor.green;
          } else if (color == 3) {
            color = meshColor.blue;
          } else {
            console.log("color error")
          }

          switch (this._tangram2DState) {
            case this._enumTangram2DState.front:
              returnShadow.push(new BlockShadowFront({ z: x, y: y, color: [color] }));
              break;
            case this._enumTangram2DState.right:
              returnShadow.push(new BlockShadowRight({ x: (9 - x), y: y, color: [color] }));
              break;
            case this._enumTangram2DState.back:
              returnShadow.push(new BlockShadowBack({ z: (9 - x), y: y, color: [color] }));
              break;
            case this._enumTangram2DState.left:
              returnShadow.push(new BlockShadowLeft({ x: x, y: y, color: [color] }));
              break;
            case this._enumTangram2DState.top:        
              returnShadow.push(new BlockShadowTop({ x: y, z: x, color: [color] }));
              break;
          }
        }
      }
    }
    return returnShadow;
  }

  update() {

    super.update();

    if (this.state == this.enumState.busyCreatingShape) {
      return;
    }

    let set = Block.calcSet({ left: world.block, right: this.activeStage, careColor: false, careRotation: false });

    Block.setColor({ block: set.diffLeft, color: meshColor.red, blink: true })

    this.show({ block: set.diffRight, careColor: true });
    Block.copyColor({ to: world.block, from: this.activeStage, careRotation: false });

    if (set.diffLeft.length == 0 && set.diffRight.length == 0) {

      GuiButtonPaint.show();
      let shadowStage = BlockShadow.convert({ block: this.activeStage });
      let set;
      switch (this._tangram2DState) {
        case this._enumTangram2DState.front:
          camera.moveBase(cameraAlpha.front);
          set = BlockShadow.calcSet({ left: shadowStage.front, right: this._convertGuiToShadow(), careColor: true, careGap: false });
          world.base.ledFront = meshColor.green;
          world.base.ledLeft = meshColor.black;
          world.base.ledRight = meshColor.black;
          world.base.ledBack = meshColor.black;
          if (set.diffRight.length == 0 && set.diffLeft.length == 0) {
            this._tangram2DState = this._enumTangram2DState.right;
          }
          break;
        case this._enumTangram2DState.right:
          camera.moveBase(cameraAlpha.right);

          set = BlockShadow.calcSet({ left: shadowStage.right, right: this._convertGuiToShadow(), careColor: true, careGap: false });
          world.base.ledFront = meshColor.black;
          world.base.ledLeft = meshColor.black;
          world.base.ledRight = meshColor.green;
          world.base.ledBack = meshColor.black;
          if (set.diffRight.length == 0 && set.diffLeft.length == 0) {
            this._tangram2DState = this._enumTangram2DState.back;
          }

          break;
        case this._enumTangram2DState.back:
          camera.moveBase(cameraAlpha.back);

          set = BlockShadow.calcSet({ left: shadowStage.back, right: this._convertGuiToShadow(), careColor: true, careGap: false });

          world.base.ledFront = meshColor.black;
          world.base.ledLeft = meshColor.black;
          world.base.ledRight = meshColor.black;
          world.base.ledBack = meshColor.green;
          if (set.diffRight.length == 0 && set.diffLeft.length == 0) {
            this._tangram2DState = this._enumTangram2DState.left;
          }

          break;
        case this._enumTangram2DState.left:
          camera.moveBase(cameraAlpha.left);

          set = BlockShadow.calcSet({ left: shadowStage.left, right: this._convertGuiToShadow(), careColor: true, careGap: false });

          world.base.ledFront = meshColor.black;
          world.base.ledLeft = meshColor.green;
          world.base.ledRight = meshColor.black;
          world.base.ledBack = meshColor.black;
          if (set.diffRight.length == 0 && set.diffLeft.length == 0) {
            this._tangram2DState = this._enumTangram2DState.top;
          }

          break;
        case this._enumTangram2DState.top:
          camera.moveBase(cameraAlpha.top);

          set = BlockShadow.calcSet({ left: shadowStage.top, right: this._convertGuiToShadow(), careColor: true, careGap: false });

          world.base.ledFront = meshColor.black;
          world.base.ledLeft = meshColor.green;
          world.base.ledRight = meshColor.green;
          world.base.ledBack = meshColor.green;
          if (set.diffRight.length == 0 && set.diffLeft.length == 0) {
            this.win({});
          }
          break;
      }

    } else {
      camera.reset();
      GuiButtonPaint.reset();
    }

  }

  close() {
    camera.reset();
    GuiButtonPaint.reset();
    super.close();
  }

  clearForCenterButton(){
    GuiButtonPaint.reset();
  }

}