class GuidedBuild extends Game {
  constructor() {
    let level = [];

    level.push({ difficulty: [], image: null });
    guidedBuildLevel.buildLevel(level)

    super({ level: level, userCreatedLevel: true, displayLevel: true, displayStage: true  });

    this._setLevel({ level: 1, difficulty: 0 });


  }

  _setLevel({ level = 0, difficulty = 0 }) {

    super._setLevel({ level: level, difficulty: difficulty});

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


    let set = Block.calcSet({ left: world.block, right: this.activeStage, careColor: false, careRotation: false });

    Block.setColor({ block: set.diffLeft, color: meshColor.red, blink: true })

    this.show({ block: set.diffRight, careColor: false });
    Block.copyColor({ to: world.block, from: this.activeStage, careRotation: false });
    this.soundProgression({ correct: set.intersectionLeft.length, wrong: set.diffLeft.length });

    if (set.diffLeft.length == 0 && set.diffRight.length == 0) {
      this.win({});
    }

  }



}