let settings = {

    _confirmFullScreenOffButton: null,
    _confirmFullScreenOnButton: null,

    init: function () {


        let sizeButton = new GuiButtonImg("./icon/settings/size.svg", Gui.changeSize);
        sizeButton.setVisible(0, 0, guiOptions.right, guiOptions.bottom);

        //Left Down Corner (Settings)
        let startButton = new GuiButtonImg("./icon/settings/settings.svg");
        startButton.setVisible(0, 0, guiOptions.left, guiOptions.bottom);

        startButton.addChild(new GuiButtonImg("./icon/settings/hideBlocks.svg", null, function () { world.hideBlock()}), guiOptions.childRight)
        startButton.addChild(new GuiButtonImg("./icon/settings/zoomOut.svg", function () { camera.zoomToStartPos() }), guiOptions.childRight)

        let button = new GuiButtonImg("./icon/settings/snap.svg")
        startButton.addChild(button, guiOptions.childTop)
        button.addChild(new GuiButtonImg("./icon/settings/snapOff.svg", function () { camera.snap = cameraSnap.off }), guiOptions.childRight)
        button.addChild(new GuiButtonImg("./icon/settings/snap4Horizontal.svg", function () { camera.snap = cameraSnap.horizontal }), guiOptions.childRight)
        button.addChild(new GuiButtonImg("./icon/settings/snap4Diagonal.svg", function () { camera.snap = cameraSnap.diagonal }), guiOptions.childRight)
        button.addChild(new GuiButtonImg("./icon/settings/snap8.svg", function () { camera.snap = cameraSnap.deg }), guiOptions.childRight)

        button = new GuiButtonImg("./icon/settings/compass.svg")
        startButton.addChild(button, guiOptions.childTop)
        button.addChild(new GuiButtonImg("./icon/settings/compassOff.svg", world.compassOff), guiOptions.childRight)
        button.addChild(new GuiButtonImg("./icon/settings/compassOn.svg", world.compassOn), guiOptions.childRight)

        button = new GuiButtonImg("./icon/settings/render.svg")
        startButton.addChild(button, guiOptions.childTop)
        button.addChild(new GuiButtonImg("./icon/settings/renderLow.svg", function () { engine.setHardwareScalingLevel(1.5) }), guiOptions.childRight)
        button.addChild(new GuiButtonImg("./icon/settings/renderMid.svg", function () { engine.setHardwareScalingLevel(1) }), guiOptions.childRight)
        button.addChild(new GuiButtonImg("./icon/settings/renderHigh.svg", function () { engine.setHardwareScalingLevel(0.5) }), guiOptions.childRight)

        button = new GuiButtonImg("./icon/settings/fullscreen.svg")
        startButton.addChild(button, guiOptions.childTop)
        button.addChild(new GuiButtonImg("./icon/settings/fullscreenOff.svg", this.fullscreenOff.bind(this)), guiOptions.childRight)
        button.addChild(new GuiButtonImg("./icon/settings/fullscreenOn.svg", this.fullscreenOn.bind(this)), guiOptions.childRight)

        button = new GuiButtonImg("./icon/settings/sound.svg")
        startButton.addChild(button, guiOptions.childTop)
        button.addChild(new GuiButtonImg("./icon/settings/soundOff.svg", sound.off), guiOptions.childRight)
        button.addChild(new GuiButtonImg("./icon/settings/soundOn.svg", sound.on), guiOptions.childRight)

        button = new GuiButtonImg("./icon/settings/sound.svg")
        startButton.addChild(button, guiOptions.childTop)
        button.addChild(new GuiButtonImg("./icon/settings/soundOff.svg", world.printBlock), guiOptions.childRight);


        this._confirmFullScreenOffButton = new GuiButtonImg("./icon/settings/fullscreenOff.svg", this.fullscreenOff.bind(this));
        this._confirmFullScreenOnButton = new GuiButtonImg("./icon/settings/fullscreenOn.svg", this.confirmFullscreenOn.bind(this));

        //--------------------------------------------

        //Left top corner (select games)

        startButton = new GuiButtonImg("./icon/games/start.svg");
        startButton.setVisible(0, 0, guiOptions.left, guiOptions.top);

        startButton.addChild(new GuiButtonImg("./icon/games/guidedBuild.svg", function () { new GuidedBuild() }), guiOptions.childRight);
        startButton.addChild(new GuiButtonImg("./icon/games/freeBuild.svg", function () { new FreeBuild() }), guiOptions.childRight)


        button = new GuiButtonImg("./icon/games/categoryProjection.svg");
        startButton.addChild(button, guiOptions.childBottom)
        button.addChild(new GuiButtonImg("./icon/games/tangram.svg", function () { new Tangram() }), guiOptions.childRight);
        button.addChild(new GuiButtonImg("./icon/games/tangram2D.svg", function () { new Tangram2D() }), guiOptions.childRight);



        button = new GuiButtonImg("./icon/games/categoryMath.svg");
        startButton.addChild(button, guiOptions.childBottom)
        button.addChild(new GuiButtonImg("./icon/games/algebra.svg", function () { new Algebra() }), guiOptions.childRight);

        button = new GuiButtonImg("./icon/games/categoryMemory.svg");
        startButton.addChild(button, guiOptions.childBottom)
        button.addChild(new GuiButtonImg("./icon/games/shapeHunter.svg", function () { new ShapeHunter() }), guiOptions.childRight);
        button.addChild(new GuiButtonImg("./icon/games/memory.svg", function () { new Memo() }), guiOptions.childRight);
        button.addChild(new GuiButtonImg("./icon/games/colorMatch.svg", function () { new ColorMatch() }), guiOptions.childRight);

/*
        button = new GuiButtonImg("./icon/games/columns.svg");
        startButton.addChild(button, guiOptions.childBottom)
        button.addChild(new GuiButtonImg("./icon/games/whack.svg", function () { new Whack() }), guiOptions.childRight);
        button.addChild(new GuiButtonImg("./icon/games/columns.svg", function () { new MasterMind() }), guiOptions.childRight);
        button.addChild(new GuiButtonImg("./icon/games/columns.svg", function () { new Columns() }), guiOptions.childRight);*/


    },
    fullscreenOff: function () {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        this._confirmFullScreenOffButton.setNotVisible();
        this._confirmFullScreenOnButton.setNotVisible();

    },
    fullscreenOn: function () {

        this._confirmFullScreenOnButton.setVisible(-1, 0, guiOptions.center, guiOptions.center);
        this._confirmFullScreenOffButton.setVisible(1, 0, guiOptions.center, guiOptions.center);


    },

    confirmFullscreenOn: function () {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen();

        }
        this._confirmFullScreenOffButton.setNotVisible();
        this._confirmFullScreenOnButton.setNotVisible();
    },



}