class ShapeHunter extends Game {
  constructor(master = null) {
    let level = [];

    level.push({ difficulty: [], image: null });
    shapeHunterLevel.buildLevel(level)

    super({ level: level, userCreatedLevel: true, displayLevel: true, displayStage: true, scoreIsTime: true, master: master  });

    this._activeStagePixel = [];
    this._activeStageForbiddenPixel = [];

    this._setLevel({ level: 1, difficulty: 0 });

    world.hideBlock();
    world.hideBase();


  }

  _setLevel({ level = 0, difficulty = 0 }) {

    super._setLevel({ level: level, difficulty: difficulty });

    this._activeStagePixel = BlockPixel.convertBlock(this.activeStage);

    let activeStageShownBlocks = [];
    let activeStageForbiddenBlocks = [];

    this.activeStage.forEach(function (item) {

      if (item.color[0] != meshColor.red) {
          activeStageShownBlocks.push(item);
      } else {
        activeStageForbiddenBlocks.push(item);
      }

    }.bind(this));

    this._activeStagePixel = BlockPixel.convertBlock(activeStageShownBlocks);
    this._activeStageForbiddenPixel = BlockPixel.convertBlock(activeStageForbiddenBlocks);

    if (level < 3) {
      this.show({ block: Block.transform({ block: activeStageShownBlocks, x: 5 - activeStageShownBlocks[0].x, y: -2, z: 5 - activeStageShownBlocks[0].z, r: Math.floor(Math.random() * 4) }), careColor: false });
    }

    world.hideBlock();
    world.hideBase();

    if (level > 0) {
      this.showDifficultyButton();
    }
  }

  reset() {
    super.reset();

  }


  update() {

    super.update();

    if (this.state == this.enumState.busyCreatingShape) {
      return;
    }

    let worldPixel = BlockPixel.convertBlock(world.block);

    Block.setColor({ block: world.block, color: meshColor.black });
    let setWin = Block.calcSet({ left: worldPixel, right: this._activeStagePixel, careColor: false, careRotation: false }); //!!
    let set = Block.calcSet({ left: worldPixel, right: this._activeStageForbiddenPixel, careColor: false, careRotation: false });

    if (set.intersectionLeft.length != 0) {
      BlockPixel.setBlockColor({ block: set.intersectionLeft[0], color: meshColor.red, blink: true });
      this.soundProgression({ correct: setWin.intersectionLeft.length, wrong: 1, maxCorret: this._activeStagePixel.length });
      return;
    }

    world.block.forEach(function (item) {
      let wP = BlockPixel.convertBlock(item);
      set = Block.calcSet({ left: wP, right: this._activeStagePixel, careColor: false, careRotation: false });

      if (item instanceof Block2x2 && set.intersectionLeft.length == 4 || set.intersectionLeft.length == 8) {
        Block.setColor({ block: item, color: meshColor.green });
      } else if (set.intersectionLeft.length > 0) {
        Block.setColor({ block: item, color: meshColor.yellow });
      } else {

        let minDist = 999;
        let closestPix = [];
        wP.forEach(function (bP) {

          this._activeStagePixel.forEach(function (aSP) {
            let dist = Math.abs(bP.x - aSP.x) + Math.abs(bP.z - aSP.z) + Math.abs(bP.y - aSP.y);
            if (dist < minDist) {
              minDist = dist;
              closestPix = [];
              closestPix.push(bP);
            } else if (dist == minDist) {
              closestPix.push(bP);
            }

          }.bind(this));


        }.bind(this));
        BlockPixel.setBlockColor({ block: closestPix, color: meshColor.blue, colorComplete: false });

      }

    }.bind(this));

    if (setWin.diffLeft.length == 0 && setWin.diffRight.length == 0) {
      this.win({});
    }

    this.soundProgression({ correct: setWin.intersectionLeft.length, wrong: 0, maxCorret: this._activeStagePixel.length });

  }

  close() {
    world.showBase();
    world.showBlock();
    super.close();
  }


}