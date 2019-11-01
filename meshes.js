

//support functions
function createNipple() {

    let nippleShape = [new BABYLON.Vector3(-0.21, 0, -0.29),
    new BABYLON.Vector3(0.21, 0, -0.29),
    new BABYLON.Vector3(0.29, 0, -0.21),
    new BABYLON.Vector3(0.29, 0, 0.21),
    new BABYLON.Vector3(0.21, 0, 0.29),
    new BABYLON.Vector3(-0.21, 0, 0.29),
    new BABYLON.Vector3(-0.29, 0, 0.21),
    new BABYLON.Vector3(-0.29, 0, -0.21)
    ];

    let nipple = BABYLON.MeshBuilder.ExtrudePolygon("", { shape: nippleShape, depth: 0.16, sideOrientation: BABYLON.Mesh.FRONTSIDE }, scene);
    nipple.rotation.x = Math.PI;

    return nipple;

}

function createNippleLine() {

    let nippleLineShape = [new BABYLON.Vector3(-0.21, 0, -0.29),
    new BABYLON.Vector3(0.21, 0, -0.29),
    new BABYLON.Vector3(0.29, 0, -0.21),
    new BABYLON.Vector3(0.29, 0, 0.21),
    new BABYLON.Vector3(0.21, 0, 0.29),
    new BABYLON.Vector3(-0.21, 0, 0.29),
    new BABYLON.Vector3(-0.29, 0, 0.21),
    new BABYLON.Vector3(-0.29, 0, -0.21),
    new BABYLON.Vector3(-0.21, 0, -0.29)
    ];

    let NippleLine = BABYLON.MeshBuilder.CreateLines("", { points: nippleLineShape }, scene);
    NippleLine.position.y = 0.162;
    NippleLine.isPickable = false;

    return NippleLine;
}

//Base


function meshesBase() {

    let data = {
        mesh: [],
        line: [],

        ledUpRightCW: [],
        ledSideRightCW: [],

        rgbNipple: [],
        rgbNippleLine: [],
    }

    let ledUpShape = [new BABYLON.Vector3(0, 0, -0.5),
    new BABYLON.Vector3(0.1, 0, -0.5),
    new BABYLON.Vector3(0.2, 0, -0.4),
    new BABYLON.Vector3(0.2, 0, 0.4),
    new BABYLON.Vector3(0.1, 0, 0.5),
    new BABYLON.Vector3(0, 0, 0.5)
    ];

    let mergMesh = []

    for (let i = 0; i < 12; i++) {
        if (i % 3 == 0) {
            mergMesh.push(BABYLON.MeshBuilder.CreatePolygon("", { shape: ledUpShape, sideOrientation: BABYLON.Mesh.FRONTSIDE }, scene));
        } else {
            mergMesh.push(mergMesh[0].clone());
        }
        mergMesh[mergMesh.length - 1].position.y = 0.001;
        if (i < 3) {
            mergMesh[mergMesh.length - 1].position.x = 1 + i % 3 * 3.5;
            mergMesh[mergMesh.length - 1].position.z = -0.5;
            mergMesh[mergMesh.length - 1].rotation.y = -Math.PI / 2;
        } else if (i < 6) {
            mergMesh[mergMesh.length - 1].position.x = -0.5;
            mergMesh[mergMesh.length - 1].position.z = 1 + i % 3 * 3.5;
        } else if (i < 9) {
            mergMesh[mergMesh.length - 1].position.x = 1 + i % 3 * 3.5;
            mergMesh[mergMesh.length - 1].position.z = 9.5;
            mergMesh[mergMesh.length - 1].rotation.y = Math.PI / 2;
        } else {
            mergMesh[mergMesh.length - 1].position.x = 9.5;
            mergMesh[mergMesh.length - 1].position.z = 1 + i % 3 * 3.5;
            mergMesh[mergMesh.length - 1].rotation.y = Math.PI;
        }

        if (i % 3 == 2) {
            data.mesh.push(BABYLON.Mesh.MergeMeshes(mergMesh));
            data.ledUpRightCW.push(data.mesh[data.mesh.length - 1]);
            mergMesh = [];
        }

    }

    //----------------
    let ledSideShape = [new BABYLON.Vector3(-0.2, 0, -0.5),
    new BABYLON.Vector3(-0.15, 0, -0.6),
    new BABYLON.Vector3(0.15, 0, -0.6),
    new BABYLON.Vector3(0.2, 0, -0.5),
    new BABYLON.Vector3(0.2, 0, 0.5),
    new BABYLON.Vector3(0.15, 0, 0.6),
    new BABYLON.Vector3(-0.15, 0, 0.6),
    new BABYLON.Vector3(-0.2, 0, 0.5)
    ];


    for (let i = 0; i < 12; i++) {
        if (i % 3 == 0) {
            mergMesh.push(BABYLON.MeshBuilder.ExtrudePolygon("", { shape: ledSideShape, depth: 0.08, sideOrientation: BABYLON.Mesh.FRONTSIDE }, scene));
        } else {
            mergMesh.push(mergMesh[0].clone());
        }
        mergMesh[mergMesh.length - 1].position.y = -0.5;
        if (i < 3) {
            mergMesh[mergMesh.length - 1].position.x = 1 + i % 3 * 3.5;
            mergMesh[mergMesh.length - 1].position.z = -0.1;
            mergMesh[mergMesh.length - 1].rotation.y = -Math.PI / 2;
            mergMesh[mergMesh.length - 1].rotation.z = -Math.PI / 2 + Math.PI / 12;

        } else if (i < 6) {
            mergMesh[mergMesh.length - 1].position.x = -0.1;
            mergMesh[mergMesh.length - 1].position.z = 1 + i % 3 * 3.5;
            mergMesh[mergMesh.length - 1].rotation.z = -Math.PI / 2 + Math.PI / 12;

        } else if (i < 9) {
            mergMesh[mergMesh.length - 1].position.x = 1 + i % 3 * 3.5;
            mergMesh[mergMesh.length - 1].position.z = 9.18;
            mergMesh[mergMesh.length - 1].rotation.y = -Math.PI / 2;
            mergMesh[mergMesh.length - 1].rotation.z = -Math.PI / 2 - Math.PI / 12;

        } else {
            mergMesh[mergMesh.length - 1].position.x = 9.18;
            mergMesh[mergMesh.length - 1].position.z = 1 + i % 3 * 3.5;
            mergMesh[mergMesh.length - 1].rotation.z = -Math.PI / 2 - Math.PI / 12;

        }
        if (i % 3 == 2) {
            data.mesh.push(BABYLON.Mesh.MergeMeshes(mergMesh));
            data.ledSideRightCW.push(data.mesh[data.mesh.length - 1]);
            mergMesh = [];
        }
    }

    // -------------------------------------------------------

    let sideShape = [new BABYLON.Vector3(-4.8, -5, 0),
    new BABYLON.Vector3(-5, -4.8, 0),
    new BABYLON.Vector3(-5, 4.8, 0),
    new BABYLON.Vector3(-4.8, 5, 0),
    new BABYLON.Vector3(4.8, 5, 0),
    new BABYLON.Vector3(5, 4.8, 0),
    new BABYLON.Vector3(5, -4.8, 0),
    new BABYLON.Vector3(4.8, -5, 0),
    ];

    sideShape.push(sideShape[0]);

    let myPath = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0, 0, 0.1),
        new BABYLON.Vector3(0, 0, 0.2),
        new BABYLON.Vector3(0, 0, 1.19)
    ];

    let scaling = function (i, distance) {
        if (i == 0) {
            return 1;
        } else if (i == 1) {
            return 1;
        } else if (i == 2) {
            return 0.95;
        } else if (i == 3) {
            return 0.9;
        }
    };

    data.mesh.push(BABYLON.MeshBuilder.ExtrudeShapeCustom("", { shape: sideShape, path: myPath, scaleFunction: scaling, sideOrientation: BABYLON.Mesh.BACKSIDE, updatable: false }, scene));
    data.mesh[data.mesh.length - 1].rotation.x = Math.PI / 2;
    data.mesh[data.mesh.length - 1].position.x = 4.5;
    data.mesh[data.mesh.length - 1].position.z = 4.5;
    data.mesh[data.mesh.length - 1].isPickable = false;

    //  -------------------------------------------------------

    let topShape = [new BABYLON.Vector3(-4.8, 0, -5),
    new BABYLON.Vector3(-5, 0, -4.8),
    new BABYLON.Vector3(-5, 0, 4.8),
    new BABYLON.Vector3(-4.8, 0, 5),
    new BABYLON.Vector3(4.8, 0, 5),
    new BABYLON.Vector3(5, 0, 4.8),
    new BABYLON.Vector3(5, 0, -4.8),
    new BABYLON.Vector3(4.8, 0, -5)
    ];

    data.mesh.push(BABYLON.MeshBuilder.CreatePolygon("", { shape: topShape, sideOrientation: BABYLON.Mesh.FRONTSIDE }, scene));
    data.mesh[data.mesh.length - 1].position.x = 4.5;
    data.mesh[data.mesh.length - 1].position.y = 0;
    data.mesh[data.mesh.length - 1].position.z = 4.5;
    data.mesh[data.mesh.length - 1].isPickable = false;

    //  -------------------------------------------------------

    data.mesh.push(createNipple());
    meshIndex = data.mesh.length - 1;

    for (let x = 0; x < 10; ++x) {
        for (let z = 0; z < 10; z++) {
            if (x == 0 && z == 0) {
                data.rgbNipple.push(data.mesh[data.mesh.length - 1]);
            } else if (x < 2 && (z < 2 || z > 7)) {
                data.mesh.push(data.mesh[meshIndex].clone());
                data.rgbNipple.push(data.mesh[data.mesh.length - 1]);
            } else {
                data.mesh.push(data.mesh[meshIndex].clone());
            }
            data.mesh[data.mesh.length - 1].position.x = x;
            data.mesh[data.mesh.length - 1].position.z = z;
            data.mesh[data.mesh.length - 1].isPickable = false;
        }
    }

    //------------------

    data.line.push(createNippleLine());
    data.line[data.line.length - 1].alphaIndex = -1;

    meshIndex = data.line.length - 1;

    for (let x = 0; x < 10; ++x) {
        for (let z = 0; z < 10; z++) {
            if (x != 0 || z != 0) {
                data.line.push(data.line[meshIndex].clone());
            }
            if (x < 2 && (z < 2 || z > 7)) {
                data.rgbNippleLine.push(data.line[data.line.length - 1]);
            }
            data.line[data.line.length - 1].position.x = x;
            data.line[data.line.length - 1].position.z = z;
        }
    }

    //------------------

    let insertLineShape = [new BABYLON.Vector3(-0.48, 0, -0.3),
    new BABYLON.Vector3(-0.48, 0, 1.3),
    new BABYLON.Vector3(-0.3, 0, 1.48),
    new BABYLON.Vector3(1.3, 0, 1.48),
    new BABYLON.Vector3(1.48, 0, 1.3),
    new BABYLON.Vector3(1.48, 0, -0.3),
    new BABYLON.Vector3(1.3, 0, -0.48),
    new BABYLON.Vector3(-0.3, 0, -0.48),
    new BABYLON.Vector3(-0.48, 0, -0.3),
    ];

    data.line.push(BABYLON.MeshBuilder.CreateLines("", { points: insertLineShape }, scene));
    data.line[data.line.length - 1].alphaIndex = -1;
    data.line[data.line.length - 1].position.y = 0.02;

    meshIndex = data.line.length - 1;

    for (let x = 1; x < 8; x += 3) {
        for (let y = 1; y < 8; y += 3) {
            if (x != 1 || y != 1) {
                data.line.push(data.line[meshIndex].clone());
            }
            data.line[data.line.length - 1].position.x = x;
            data.line[data.line.length - 1].position.z = y;
            data.line[data.line.length - 1].isPickable = false;
        }
    }
    return data;
};


function createBlockChamfBody() {

    let chamfBlockShape = [
        new BABYLON.Vector3(-0.3, 0, -0.48),
        new BABYLON.Vector3(1.3, 0, -0.48),
        new BABYLON.Vector3(1.48, 0, -0.3),
        new BABYLON.Vector3(1.48, 0, 0.5),
        new BABYLON.Vector3(-0.48, 0, 0.5),
        new BABYLON.Vector3(-0.48, 0, -0.3)
    ];

    let blockChamfBody = BABYLON.MeshBuilder.ExtrudePolygon("polygon", { shape: chamfBlockShape, depth: 1.18, sideOrientation: BABYLON.Mesh.FRONTSIDE }, this.scene);

    blockChamfBody.rotation.z = Math.PI;
    blockChamfBody.rotation.y = Math.PI / 2;

    let blockChamfNipple1 = createNipple();
    blockChamfNipple1.position.y = 1.19;

    let blockChamfNipple2 = createNipple();
    blockChamfNipple2.position.y = 1.19;
    blockChamfNipple2.position.z = 1;

    let blockChamfArray = [blockChamfBody, blockChamfNipple1, blockChamfNipple2];
    let blockChamfTemplate = BABYLON.Mesh.MergeMeshes(blockChamfArray);
    scene.meshes.pop();

    return blockChamfTemplate;

}


function createBlockNoChamfBody(x) {

    let noChamfBlockShape = [
        new BABYLON.Vector3(1.48, 0, -0.5),
        new BABYLON.Vector3(1.48, 0, 0.5),
        new BABYLON.Vector3(-0.48, 0, 0.5),
        new BABYLON.Vector3(-0.48, 0, -0.5)
    ];


    let blockNoChamfBody = BABYLON.MeshBuilder.ExtrudePolygon("polygonx", { shape: noChamfBlockShape, depth: 1.18, sideOrientation: BABYLON.Mesh.FRONTSIDE }, this.scene);
    blockNoChamfBody.rotation.z = Math.PI;
    blockNoChamfBody.rotation.y = Math.PI / 2;
    blockNoChamfBody.position.x = 1 + x

    let blockNoChamfNipple1 = createNipple();
    blockNoChamfNipple1.position.y = 1.19;
    blockNoChamfNipple1.position.x = 1 + x;
    let blockNoChamfNipple2 = createNipple();
    blockNoChamfNipple2.position.y = 1.19;
    blockNoChamfNipple2.position.z = 1;
    blockNoChamfNipple2.position.x = 1 + x;

    let blockNoChamfArray = [blockNoChamfBody, blockNoChamfNipple1, blockNoChamfNipple2];
    let blockNoChamfTemplate = BABYLON.Mesh.MergeMeshes(blockNoChamfArray);

    scene.meshes.pop();
    return blockNoChamfTemplate;
}


function createBlockChamfLinesBack() {
    let line = [];

    let nippleLineShape0 = [new BABYLON.Vector3(-0.21, 1.35, -0.29),
    new BABYLON.Vector3(0.21, 1.35, -0.29),
    new BABYLON.Vector3(0.29, 1.35, -0.21),
    new BABYLON.Vector3(0.29, 1.35, 0.21),
    new BABYLON.Vector3(0.21, 1.35, 0.29),
    new BABYLON.Vector3(-0.21, 1.35, 0.29),
    new BABYLON.Vector3(-0.29, 1.35, 0.21),
    new BABYLON.Vector3(-0.29, 1.35, -0.21),
    new BABYLON.Vector3(-0.21, 1.35, -0.29)
    ];

    line.push(nippleLineShape0);


    let nippleLineShape1 = [new BABYLON.Vector3(-0.21, 1.35, 0.71),
    new BABYLON.Vector3(0.21, 1.35, 0.71),
    new BABYLON.Vector3(0.29, 1.35, 0.79),
    new BABYLON.Vector3(0.29, 1.35, 1.21),
    new BABYLON.Vector3(0.21, 1.35, 1.29),
    new BABYLON.Vector3(-0.21, 1.35, 1.29),
    new BABYLON.Vector3(-0.29, 1.35, 1.21),
    new BABYLON.Vector3(-0.29, 1.35, 0.79),
    new BABYLON.Vector3(-0.21, 1.35, 0.71)
    ];

    line.push(nippleLineShape1);


    let blockChamfLineShape = [new BABYLON.Vector3(0.5, 1.18, -0.48),
    new BABYLON.Vector3(-0.3, 1.18, -0.48),
    new BABYLON.Vector3(-0.48, 1.18, -0.3),
    new BABYLON.Vector3(-0.48, 1.18, 1.3),
    new BABYLON.Vector3(-0.3, 1.18, 1.48),
    new BABYLON.Vector3(0.5, 1.18, 1.48)
    ];



    line.push(blockChamfLineShape);


    let lineSystem = BABYLON.MeshBuilder.CreateLineSystem("", { lines: line }, scene);
    scene.meshes.pop();
    lineSystem.isPickable = false;

    return lineSystem;

}


function createBlockChamfLinesFront(x) {
    let line = [];

    let nippleLineShape0 = [new BABYLON.Vector3(0.79 + x, 1.35, -0.29),
    new BABYLON.Vector3(1.21 + x, 1.35, -0.29),
    new BABYLON.Vector3(1.29 + x, 1.35, -0.21),
    new BABYLON.Vector3(1.29 + x, 1.35, 0.21),
    new BABYLON.Vector3(1.21 + x, 1.35, 0.29),
    new BABYLON.Vector3(0.79 + x, 1.35, 0.29),
    new BABYLON.Vector3(0.71 + x, 1.35, 0.21),
    new BABYLON.Vector3(0.71 + x, 1.35, -0.21),
    new BABYLON.Vector3(0.79 + x, 1.35, -0.29)
    ];

    line.push(nippleLineShape0);

    let nippleLineShape1 = [new BABYLON.Vector3(0.79 + x, 1.35, 0.71),
    new BABYLON.Vector3(1.21 + x, 1.35, 0.71),
    new BABYLON.Vector3(1.29 + x, 1.35, 0.79),
    new BABYLON.Vector3(1.29 + x, 1.35, 1.21),
    new BABYLON.Vector3(1.21 + x, 1.35, 1.29),
    new BABYLON.Vector3(0.79 + x, 1.35, 1.29),
    new BABYLON.Vector3(0.71 + x, 1.35, 1.21),
    new BABYLON.Vector3(0.71 + x, 1.35, 0.79),
    new BABYLON.Vector3(0.79 + x, 1.35, 0.71)
    ];

    line.push(nippleLineShape1);


    let blockChamfLineShape = [new BABYLON.Vector3(0.5 + x, 1.18, -0.48),
    new BABYLON.Vector3(1.3 + x, 1.18, -0.48),
    new BABYLON.Vector3(1.48 + x, 1.18, -0.3),
    new BABYLON.Vector3(1.48 + x, 1.18, 1.3),
    new BABYLON.Vector3(1.3 + x, 1.18, 1.48),
    new BABYLON.Vector3(0.5 + x, 1.18, 1.48)
    ];


    line.push(blockChamfLineShape);
    let lineSystem = BABYLON.MeshBuilder.CreateLineSystem("", { lines: line }, scene);
    scene.meshes.pop();

    lineSystem.isPickable = false;

    return lineSystem;



}


function createBlockNoChamfLines(x) {
    let line = [];

    let nippleLineShape0 = [new BABYLON.Vector3(0.79 + x, 1.35, -0.29),
    new BABYLON.Vector3(1.21 + x, 1.35, -0.29),
    new BABYLON.Vector3(1.29 + x, 1.35, -0.21),
    new BABYLON.Vector3(1.29 + x, 1.35, 0.21),
    new BABYLON.Vector3(1.21 + x, 1.35, 0.29),
    new BABYLON.Vector3(0.79 + x, 1.35, 0.29),
    new BABYLON.Vector3(0.71 + x, 1.35, 0.21),
    new BABYLON.Vector3(0.71 + x, 1.35, -0.21),
    new BABYLON.Vector3(0.79 + x, 1.35, -0.29)
    ];

    line.push(nippleLineShape0);

    let nippleLineShape1 = [new BABYLON.Vector3(0.79 + x, 1.35, 0.71),
    new BABYLON.Vector3(1.21 + x, 1.35, 0.71),
    new BABYLON.Vector3(1.29 + x, 1.35, 0.79),
    new BABYLON.Vector3(1.29 + x, 1.35, 1.21),
    new BABYLON.Vector3(1.21 + x, 1.35, 1.29),
    new BABYLON.Vector3(0.79 + x, 1.35, 1.29),
    new BABYLON.Vector3(0.71 + x, 1.35, 1.21),
    new BABYLON.Vector3(0.71 + x, 1.35, 0.79),
    new BABYLON.Vector3(0.79 + x, 1.35, 0.71)
    ];

    line.push(nippleLineShape1);



    let blockNoChamfLineShapeA = [new BABYLON.Vector3(0.5 + x, 1.18, -0.48),
    new BABYLON.Vector3(1.5 + x, 1.18, -0.48),
    ];

    line.push(blockNoChamfLineShapeA);
    let blockNoChamfLineShapeB = [
        new BABYLON.Vector3(1.5 + x, 1.18, 1.48),
        new BABYLON.Vector3(0.5 + x, 1.18, 1.48)
    ];
    line.push(blockNoChamfLineShapeB);

    let lineSystem = BABYLON.MeshBuilder.CreateLineSystem("", { lines: line }, scene);
    scene.meshes.pop();

    lineSystem.isPickable = false;
    return lineSystem;

}


function createBlockFullBody(twoByFour) {

    let blockShape;

    if (twoByFour) {

        blockShape = [
            new BABYLON.Vector3(-0.48, 1.18, -0.3),
            new BABYLON.Vector3(-0.3, 1.18, -0.48),
            new BABYLON.Vector3(3.3, 1.18, -0.48),
            new BABYLON.Vector3(3.48, 1.18, -0.3),
            new BABYLON.Vector3(3.48, 1.18, 1.3),
            new BABYLON.Vector3(3.3, 1.18, 1.48),
            new BABYLON.Vector3(-0.3, 1.18, 1.48),
            new BABYLON.Vector3(-0.48, 1.18, 1.3),
            new BABYLON.Vector3(-0.48, 1.18, -0.3),
        ];

    } else {
        blockShape = [
            new BABYLON.Vector3(-0.48, 1.18, -0.3),
            new BABYLON.Vector3(-0.3, 1.18, -0.48),
            new BABYLON.Vector3(1.3, 1.18, -0.48),
            new BABYLON.Vector3(1.48, 1.18, -0.3),
            new BABYLON.Vector3(1.48, 1.18, 1.3),
            new BABYLON.Vector3(1.3, 1.18, 1.48),
            new BABYLON.Vector3(-0.3, 1.18, 1.48),
            new BABYLON.Vector3(-0.48, 1.18, 1.3),
            new BABYLON.Vector3(-0.48, 1.18, -0.3),
        ];
    }


    let blockArray = [];

    blockArray.push(BABYLON.MeshBuilder.ExtrudePolygon("polygon", { shape: blockShape, depth: 1.18, sideOrientation: BABYLON.Mesh.FRONTSIDE }, this.scene));
    blockArray[blockArray.length - 1].rotation.z = Math.PI;
    blockArray[blockArray.length - 1].rotation.y = Math.PI;
    blockArray[blockArray.length - 1].position.z = 1;

    let endX = 2;
    if (twoByFour) {
        endX = 4;

    }

    for (let x = 0; x < endX; x++) {
        for (let z = 0; z < 2; z++) {
            blockArray.push(createNipple());
            blockArray[blockArray.length - 1].position.y = 1.19;
            blockArray[blockArray.length - 1].position.z = z;
            blockArray[blockArray.length - 1].position.x = x;
        }
    }

    let block = BABYLON.Mesh.MergeMeshes(blockArray);
    scene.meshes.pop();
    block.isPickable = false;

    return block;

}



function meshes2x2() {

    let data = {
        mesh: [],
        line: [],
    }

    data.mesh.push(createBlockChamfBody());

    let oppositeSideMesh = createBlockChamfBody();
    oppositeSideMesh.position.z = 1;
    oppositeSideMesh.position.x = 1;
    oppositeSideMesh.rotation.y = Math.PI;

    data.mesh.push(BABYLON.Mesh.MergeMeshes([oppositeSideMesh]));
    scene.meshes.pop();

    data.line.push(createBlockChamfLinesBack());

    data.line.push(createBlockChamfLinesFront(0));
    return data;
}




function meshes2x4() {

    let data = {
        mesh: [],
        line: [],
    }

    data.mesh.push(createBlockChamfBody());

    data.mesh.push(createBlockNoChamfBody(0));
    data.mesh.push(createBlockNoChamfBody(1));

    let oppositeSideMesh = createBlockChamfBody();
    oppositeSideMesh.position.z = 1;
    oppositeSideMesh.position.x = 3;
    oppositeSideMesh.rotation.y = Math.PI;

    data.mesh.push(BABYLON.Mesh.MergeMeshes([oppositeSideMesh]));
    scene.meshes.pop();

    data.line.push(createBlockChamfLinesBack());

    data.line.push(createBlockNoChamfLines(0));
    data.line.push(createBlockNoChamfLines(1));

    data.line.push(createBlockChamfLinesFront(2));

    return data;
}

function meshes2x2Full() {

    let data = {
        mesh: [],
        line: [],
    }

    data.mesh.push(createBlockFullBody(false));
    return data;
}


function meshes2x4Full() {

    let data = {
        mesh: [],
        line: [],
    }

    data.mesh.push(createBlockFullBody(true));
    return data;
}

function meshesPixel() {

    let data = {
        mesh: [],
        line: [],
    }

    let shape = [new BABYLON.Vector3(-0.5, 0, -0.5),
    new BABYLON.Vector3(0.5, 0, -0.5),
    new BABYLON.Vector3(0.5, 0, 0.5),
    new BABYLON.Vector3(-0.5, 0, 0.5),

    ];

    let pixel = BABYLON.MeshBuilder.ExtrudePolygon("", { shape: shape, depth: 1.18, sideOrientation: BABYLON.Mesh.FRONTSIDE }, scene);
    pixel.rotation.x = Math.PI;
    pixel.isPickable = false;
    scene.meshes.pop();

    data.mesh.push(pixel);
    return data;
}


function meshesStar() {

    let data = {
        mesh: [],
        line: [],
        particle: null,
    }

    let shape = [new BABYLON.Vector3(0, 0.3, 0),
    new BABYLON.Vector3(0.069, 0.094, 0),
    new BABYLON.Vector3(0.285, 0.093, 0),
    new BABYLON.Vector3(0.111, -0.036, 0),
    new BABYLON.Vector3(0.176, -0.243, 0),
    new BABYLON.Vector3(0, -0.117, 0),
    new BABYLON.Vector3(-0.176, -0.243, 0),
    new BABYLON.Vector3(-0.111, -0.036, 0),
    new BABYLON.Vector3(-0.285, 0.093, 0),
    new BABYLON.Vector3(-0.069, 0.094, 0),
    new BABYLON.Vector3(0, 0.3, 0)

    ];


    let path = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0, 0, 0.1)
    ];

    let scaling = function (i, distance) {
        if (i == 0) {
            return 1;
        } else if (i == 1) {
            return 0;
        } else if (i == 2) {
            return 0;
        } else if (i == 3) {
            return 0.9;
        }

    };


    let meshA = BABYLON.MeshBuilder.ExtrudeShapeCustom("", { shape: shape, path: path, scaleFunction: scaling, sideOrientation: BABYLON.Mesh.BACKSIDE, updatable: false }, scene);
    meshA.rotation.x = Math.PI;
    meshA.rotation.y = Math.PI + Math.PI / 2;
    meshA.rotation.z = Math.PI;
    meshA.isPickable = false;
    meshA.scaling = new BABYLON.Vector3(3, 3, 3);

    let meshB = meshA.clone("");
    meshB.isPickable = false;
    meshB.rotation.y = Math.PI / 2;

    data.mesh.push(BABYLON.Mesh.MergeMeshes([meshA, meshB]));

    data.mesh[0].isPickable = false;
    scene.meshes.pop();


    //-------------------------- particle

    // Create a particle system
    data.particle = new BABYLON.ParticleSystem("particles", 1000, scene);
    //Texture of each particle
    data.particle.particleTexture = new BABYLON.Texture("./icon/settings/snapOff.svg", scene);
    // Where the particles come from
    data.particle.minEmitBox = new BABYLON.Vector3(-1, 0, 0); // Starting all from
    data.particle.maxEmitBox = new BABYLON.Vector3(1, 0, 0); // To...           
    // Colors of all particles
    data.particle.color1 = new BABYLON.Color4(0, 1, 0, 1.0);
    data.particle.color2 = new BABYLON.Color4(1, 0, 0, 1.0);
    data.particle.colorDead = new BABYLON.Color4(0.7, 0.8, 0, 0.2);
    // Size of each particle (random between...
    data.particle.minSize = 0.05;
    data.particle.maxSize = 0.3;
    // Life time of each particle (random between...
    data.particle.minLifeTime = 0.3;
    data.particle.maxLifeTime = 0.5;
    // Emission rate
    data.particle.emitRate = 300;
    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    data.particle.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    // Set the gravity of all particles
    data.particle.gravity = new BABYLON.Vector3(0, -9.81, 0);
    // Direction of each particle after it has been emitted      
    data.particle.direction1 = new BABYLON.Vector3(-7, 8, 3);
    data.particle.direction2 = new BABYLON.Vector3(7, 8, -3);
    // Angular speed, in radians
    data.particle.minAngularSpeed = 0;
    data.particle.maxAngularSpeed = Math.PI;
    // Speed
    data.particle.minEmitPower = 1;
    data.particle.maxEmitPower = 3;
    data.particle.updateSpeed = 0.005;

    return data;
}


function createShadowSide() {

    let shadow = BABYLON.MeshBuilder.CreatePlane("blockPixel", { width: 1, height: Mesh._staticPitch }, scene);
    shadow.position.y = Mesh._staticPitch / 2;
    return shadow;

}


function createShadowBottom() {

    let shadow = BABYLON.MeshBuilder.CreatePlane("blockPixel", { width: 1, height: 1 }, scene);
    shadow.position.y = 0.01;
    return shadow;

}
function meshesShadowLeft() {

    let data = {
        mesh: []

    }

    let shadow = createShadowSide();

    shadow.rotation.y = 0;
    shadow.position.z = 9.5;

    shadow = BABYLON.Mesh.MergeMeshes([shadow]);
    shadow.isPickable = false;

    scene.meshes.pop();
    data.mesh.push(shadow);
    return data;

}


function meshesShadowRight() {

    let data = {
        mesh: []

    }

    let shadow = createShadowSide();

    shadow.rotation.y = Math.PI;
    shadow.position.z = -0.5;

    shadow = BABYLON.Mesh.MergeMeshes([shadow]);
    shadow.isPickable = false;

    scene.meshes.pop();
    data.mesh.push(shadow);
    return data;
}




function meshesShadowFront() {

    let data = {
        mesh: []

    }

    let shadow = createShadowSide();

    shadow.rotation.y = -Math.PI / 2;
    shadow.position.x = -0.5;

    shadow = BABYLON.Mesh.MergeMeshes([shadow]);
    shadow.isPickable = false;

    scene.meshes.pop();
    data.mesh.push(shadow);
    return data;

}



function meshesShadowBack() {

    let data = {
        mesh: []

    }

    let shadow = createShadowSide();

    shadow.rotation.y = Math.PI / 2;
    shadow.position.x = 9.5;

    shadow = BABYLON.Mesh.MergeMeshes([shadow]);
    shadow.isPickable = false;

    scene.meshes.pop();
    data.mesh.push(shadow);
    return data;
}

function meshesShadowBottom() {

    let data = {
        mesh: []

    }

    let shadow = createShadowBottom();

    shadow.rotation.x = Math.PI / 2;

    shadow = BABYLON.Mesh.MergeMeshes([shadow]);
    shadow.isPickable = false;

    scene.meshes.pop();
    data.mesh.push(shadow);
    return data;

}


function createNumber(newMeshes, particleSystems, skeletons, id, data) {


    if (newMeshes.length > 0) {

        scene.meshes.pop();

        data.mesh[id] = BABYLON.Mesh.MergeMeshes(newMeshes);

        data.mesh[id].rotation.y = Math.PI / 2;
        data.mesh[id].rotation.x = -Math.PI / 2 + Math.PI / 8;
        data.mesh[id].position.y = 2;
        data.mesh[id].scaling = new BABYLON.Vector3(0.1875, 0.1875, 0.1875);
        if (id == 10) {
            data.mesh[id].position.z = 1;
        }

        if (id > 10 && id < 14) {
            data.mesh[id].position.z = -1.2;
            data.mesh[id].position.y = 2.7;
            data.mesh[id].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        }

        data.mesh[id] = BABYLON.Mesh.MergeMeshes([data.mesh[id]]);

        scene.meshes.pop();
    }
}



function meshesNumber() {

    let data = {
        mesh: []

    }

    BABYLON.SceneLoader.ImportMesh("", "", "numbers/0.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 0, data); });
    BABYLON.SceneLoader.ImportMesh("", "", "numbers/1.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 1, data); });
    BABYLON.SceneLoader.ImportMesh("", "", "numbers/2.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 2, data); });
    BABYLON.SceneLoader.ImportMesh("", "", "numbers/3.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 3, data); });

    BABYLON.SceneLoader.ImportMesh("", "", "numbers/4.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 4, data); });
    BABYLON.SceneLoader.ImportMesh("", "", "numbers/5.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 5, data); });
    BABYLON.SceneLoader.ImportMesh("", "", "numbers/6.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 6, data); });
    BABYLON.SceneLoader.ImportMesh("", "", "numbers/7.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 7, data); });
    BABYLON.SceneLoader.ImportMesh("", "", "numbers/8.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 8, data); });
    BABYLON.SceneLoader.ImportMesh("", "", "numbers/9.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 9, data); });

    BABYLON.SceneLoader.ImportMesh("", "", "numbers/1.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 10, data); });

    BABYLON.SceneLoader.ImportMesh("", "", "numbers/forth.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 11, data); });
    BABYLON.SceneLoader.ImportMesh("", "", "numbers/half.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 12, data); });
    BABYLON.SceneLoader.ImportMesh("", "", "numbers/third.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 13, data); });
    BABYLON.SceneLoader.ImportMesh("", "", "numbers/x.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 14, data); });

    BABYLON.SceneLoader.ImportMesh("", "", "numbers/less.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 15, data); });
    BABYLON.SceneLoader.ImportMesh("", "", "numbers/greater.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 16, data); });
    BABYLON.SceneLoader.ImportMesh("", "", "numbers/equal.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 17, data); });
    BABYLON.SceneLoader.ImportMesh("", "", "numbers/plus.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 18, data); });
    BABYLON.SceneLoader.ImportMesh("", "", "numbers/minus.jpg", scene, function (newMeshes, particleSystems, skeletons) { createNumber(newMeshes, particleSystems, skeletons, 19, data); });

    return data;

}

function meshesNumberPillar() {

    let data = {
        mesh: []

    }

    let shape = [
        new BABYLON.Vector3(-0.46, 1.18, -0.3),
        new BABYLON.Vector3(-0.28, 1.18, -0.46),
        new BABYLON.Vector3(1.28, 1.18, -0.46),
        new BABYLON.Vector3(1.46, 1.18, -0.28),
        new BABYLON.Vector3(1.46, 1.18, 1.28),
        new BABYLON.Vector3(1.28, 1.18, 1.46),
        new BABYLON.Vector3(-0.28, 1.18, 1.46),
        new BABYLON.Vector3(-0.46, 1.18, 1.28),
        new BABYLON.Vector3(-0.46, 1.18, -0.28),
    ];


    let mesh = BABYLON.MeshBuilder.ExtrudePolygon("", { shape: shape, depth: Mesh._staticPitch * 11, sideOrientation: BABYLON.Mesh.FRONTSIDE }, scene);
    mesh.rotation.z = Math.PI;
    mesh.rotation.y = Math.PI / 2;

    mesh.position.x = 0;
    mesh.position.y = 0.01;
    mesh.position.z = 0;
    mesh.alphaIndex = -1;

    mesh = BABYLON.Mesh.MergeMeshes([mesh]);
    mesh.isPickable = false;
    data.mesh.push(mesh);

    scene.meshes.pop();

    return data;
}

function meshesPad() {

    let data = {
        mesh: []

    }

    let mesh = BABYLON.MeshBuilder.CreatePlane("", { width: 1.5, height: 1.5 }, scene);

    mesh.rotation.x = Math.PI / 2;

    mesh.position.x = 0.5;
    mesh.position.y = 0.005;
    mesh.position.z = 0.5;

    mesh = BABYLON.Mesh.MergeMeshes([mesh]);
    mesh.isPickable = false;
    data.mesh.push(mesh);

    scene.meshes.pop();

    return data;
}
















