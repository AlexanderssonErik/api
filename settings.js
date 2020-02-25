let settings = {

    _confirmFullScreenOffButton: null,
    _confirmFullScreenOnButton: null,
    _meshStl2x2: null,
    _meshStl2x4: null,

    init: function (meshStl2x2, meshStl2x4) {
        this._meshStl2x2 = meshStl2x2;
        this._meshStl2x4 = meshStl2x4;

        let sizeButton = new GuiButtonImg("./icon/settings/size.svg", Gui.changeSize);
        sizeButton.setVisible(0, 0, guiOptions.right, guiOptions.bottom);

        //Left Down Corner (Settings)
        let startButton = new GuiButtonImg("./icon/settings/settings.svg");
        startButton.setVisible(0, 0, guiOptions.left, guiOptions.bottom);

        startButton.addChild(new GuiButtonImg("./icon/settings/hideBlocks.svg", null, function () { world.hideBlock() }), guiOptions.childRight)
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

        button = new GuiButtonImg("./icon/settings/stl.svg")
        startButton.addChild(button, guiOptions.childTop)
        button.addChild(new GuiButtonImg("./icon/settings/stlPrint.svg", this.exportSTL.bind(this)), guiOptions.childRight);
        button.addChild(new GuiButtonImg("./icon/settings/worldPrint.svg", world.printBlock), guiOptions.childRight);


        this._confirmFullScreenOffButton = new GuiButtonImg("./icon/settings/fullscreenOff.svg", this.fullscreenOff.bind(this));
        this._confirmFullScreenOnButton = new GuiButtonImg("./icon/settings/fullscreenOn.svg", this.confirmFullscreenOn.bind(this));

        //--------------------------------------------

        //Left top corner (select games)

        startButton = new GuiButtonImg("./icon/games/start.svg");
        startButton.setVisible(0, 0, guiOptions.left, guiOptions.top);

        startButton.addChild(new GuiButtonImg("./icon/games/guidedBuild.svg", function () { new GuidedBuild() }), guiOptions.childRight);
        startButton.addChild(new GuiButtonImg("./icon/games/freeBuild.svg", function () { new FreeBuild() }), guiOptions.childRight)
        startButton.addChild(new GuiButtonImg("./icon/games/freeFreeBuild.svg", function () { new FreeFreeBuild() }), guiOptions.childRight)

  

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
        button.addChild(new GuiButtonImg("./icon/games/masterMind.svg", function () { new MasterMind() }), guiOptions.childRight);


        button = new GuiButtonImg("./icon/games/categoryStackGames.svg");
        startButton.addChild(button, guiOptions.childBottom)
        button.addChild(new GuiButtonImg("./icon/games/whack.svg", function () { new Whack() }), guiOptions.childRight);

        button.addChild(new GuiButtonImg("./icon/games/columns.svg", function () { new Columns() }), guiOptions.childRight);
        button.addChild(new GuiButtonImg("./icon/games/blockTris.svg", function () { new BlockTris() }), guiOptions.childRight);


        button = new GuiButtonImg("./icon/games/categoryProgramming.svg");
        startButton.addChild(button, guiOptions.childBottom)
        button.addChild(new GuiButtonImg("./icon/games/programming.svg", function () { new Programming() }), guiOptions.childRight);
        button.addChild(new GuiButtonImg("./icon/games/readProgram.svg", function () { new ReadProgram() }), guiOptions.childRight);

        button = new GuiButtonImg("./icon/games/party1P.svg");
        startButton.addChild(button, guiOptions.childBottom)
        button.addChild(new GuiButtonImg("./icon/games/party1P.svg", function () { new Party({players: 1}) }), guiOptions.childRight)
        button.addChild(new GuiButtonImg("./icon/games/party2P.svg", function () { new Party({players: 2}) }), guiOptions.childRight)
        button.addChild(new GuiButtonImg("./icon/games/party3P.svg", function () { new Party({players: 3}) }), guiOptions.childRight)
        button.addChild(new GuiButtonImg("./icon/games/party4P.svg", function () { new Party({players: 4}) }), guiOptions.childRight)




        //--------------------------------------------

        //Right corner (help menu)

        startButton = new GuiButtonImg("./icon/help/help.svg", null, null, function () {
            if (this._helpVideo != null) {
                this._helpVideo.setNotVisible();
                this._helpVideo = null;
                this._helpCloseButton.setNotVisible();
            }
        }.bind(this));
        startButton.setVisible(0, -1, guiOptions.right, guiOptions.bottom);     
        startButton.addChild(new GuiButtonImg("./icon/level/lvl1Diy.svg", function () { this.help("https://www.youtube.com/embed/2Jn9MmeOorY") }.bind(this)), guiOptions.childLeft);
        startButton.addChild(new GuiButtonImg("./icon/settings/compass.svg", function () { this.help("https://www.youtube.com/embed/wG9-cGm1N08") }.bind(this)), guiOptions.childLeft);
        startButton.addChild(new GuiButtonImg("./icon/ble/bluetooth.svg", function () { this.help("https://www.youtube.com/embed/Ni5b-7ulv2o") }.bind(this)), guiOptions.childLeft);

        button = new GuiButtonImg("./icon/games/start.svg");
        startButton.addChild(button, guiOptions.childTop)
        button.addChild(new GuiButtonImg("./icon/games/guidedBuild.svg", function () { this.help("https://www.youtube.com/embed/DKaHmufR4Bk") }.bind(this)), guiOptions.childLeft);
        button.addChild(new GuiButtonImg("./icon/games/freeBuild.svg", function () { this.help("https://www.youtube.com/embed/QC_pxsuDvm4") }.bind(this)), guiOptions.childLeft);   

        button = new GuiButtonImg("./icon/games/categoryProjection.svg");
        startButton.addChild(button, guiOptions.childTop)
        button.addChild(new GuiButtonImg("./icon/games/tangram.svg", function () { this.help("https://www.youtube.com/embed/s8N8TuYAMHo") }.bind(this)), guiOptions.childLeft);
        button.addChild(new GuiButtonImg("./icon/games/tangram2D.svg", function () { this.help("https://www.youtube.com/embed/i6vMuhG-HiY") }.bind(this)), guiOptions.childLeft);

        button = new GuiButtonImg("./icon/games/categoryMath.svg");
        startButton.addChild(button, guiOptions.childTop)
        button.addChild(new GuiButtonImg("./icon/games/algebra.svg", function () { this.help("https://www.youtube.com/embed/gr-0V6hi6H4") }.bind(this)), guiOptions.childLeft);

        button = new GuiButtonImg("./icon/games/categoryMemory.svg");
        startButton.addChild(button, guiOptions.childTop)
        button.addChild(new GuiButtonImg("./icon/games/shapeHunter.svg", function () { this.help("https://www.youtube.com/embed/Ugq0ZZ2NI0Y") }.bind(this)), guiOptions.childLeft);
        button.addChild(new GuiButtonImg("./icon/games/memory.svg", function () { this.help("https://www.youtube.com/embed/MV5AfA9PLyw")}.bind(this)), guiOptions.childLeft);
        button.addChild(new GuiButtonImg("./icon/games/colorMatch.svg", function () {this.help("https://www.youtube.com/embed/yCwmG7zVtJA") }.bind(this)), guiOptions.childLeft);

        button = new GuiButtonImg("./icon/games/categoryStackGames.svg");
        startButton.addChild(button, guiOptions.childTop)
        button.addChild(new GuiButtonImg("./icon/games/whack.svg", function () { this.help("https://www.youtube.com/embed/HbCW-IeRxhI") }.bind(this)), guiOptions.childLeft);
        button.addChild(new GuiButtonImg("./icon/games/columns.svg", function () { this.help("https://www.youtube.com/embed/JUmKSpZL1qE") }.bind(this)), guiOptions.childLeft);

        this._helpVideo = null;
        this._helpCloseButton = new GuiButtonImg("./icon/games/ok.svg", function () {
            this._helpVideo.setNotVisible();
            this._helpVideo = null;
            this._helpCloseButton.setNotVisible();
        }.bind(this));

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

    exportSTL: function () {
        let meshWorldBlock = [];
        world.block.forEach(item => meshWorldBlock.push(this.createSTLMesh(item)));
        if (meshWorldBlock.length == 0) {
            return
        }
        let mergedMeshes = BABYLON.Mesh.MergeMeshes(meshWorldBlock);
        scene.meshes.pop();
        mergedMeshes.rotation.x = Math.PI / 2;
        new BABYLON.STLExport.CreateSTL([mergedMeshes]);
    },

    createSTLMesh: function (block) {
        let mesh;
        if (block instanceof Block2x2) {
            mesh = this._meshStl2x2.clone();
        } else {
            mesh = this._meshStl2x4.clone();
        }

        mesh.position.x = block.x;
        mesh.position.y = block.y * Mesh._staticPitch;
        mesh.position.z = block.z;
        mesh.rotation.y = Math.PI * block.r / 2;

        return mesh;
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

    help: function (src) {
        Game.close();

        if (this._helpVideo != null) {
            this._helpVideo.setNotVisible();
            this._helpVideo = null;
            this._helpCloseButton.setNotVisible();
        }

        this._helpVideo = new GuiVideo(src);
        this._helpVideo.setVisible(0, 0, guiOptions.center, guiOptions.center);

        this._helpCloseButton.setVisible(0, -2, guiOptions.right, guiOptions.bottom);


    },



}