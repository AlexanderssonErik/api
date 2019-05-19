//color wheel triggered by index

//onther buttons triggered directeley

//move and button up handled by index

let guiOptions = {
    left: 0,
    center: 1,
    right: 2,
    top: 0,
    bottom: 2,
    childRight: 0,
    childBottom: 1,
    childLeft: 2,
    childTop: 3,

}

class Gui {
    static init(scene) {
        Gui._SizeSetting = 1;
        Gui._VisibleStack = [];
    }

    static pointerDown(evt) {

        let hitElement = Gui._VisibleStack.find(function (item, index) {
            if (evt.pageX >= item.xMin && evt.pageX <= item.xMax && evt.pageY >= item.yMin && evt.pageY <= item.yMax) {
                return true;
            }
        });

        if (hitElement != undefined) {      
           
            hitElement.guiElement.pointerDown(evt);
           
            return true;
        }else{
            return false;
        }

    }

    static resize(){
        let oldVisibleStack = Gui._VisibleStack;
        Gui._VisibleStack =[];

        oldVisibleStack.forEach(item => item.guiElement.setVisible(item.guiElement._horPos, item.guiElement._verPos, item.guiElement._horAlign, item.guiElement._verAlign ));

    }

    static changeSize(){
        Gui._SizeSetting = (Gui._SizeSetting+1)%3;
        Gui.resize();

    }


    constructor(element) {
        this._element = element;
        this._element.style.position = 'fixed';
        this._element.style.margin = "0 0 0 0";
        this._element.style.pointerEvents = 'none';
        this._element.style.borderRadius = "20%";
        //this._element.onselectstart = function () { return false };
        //this._element.onfocus = function () { return false };

        this._horAlign = guiOptions.center;
        this._verAlign = guiOptions.center;

        this._horPos = 0;
        this._verPos = 0;

        this._size = [4, 7, 13];
        this._sizeWidthMulti = 1;
        this._margin = [0.5, 1, 2];

        this._cameraAlreadLocked = false;

    }

    pointerUp(){
        if(!this._cameraAlreadLocked){
        camera.unlock();
        }
    }
    pointerDown(){
        if(camera.locked){
            this._cameraAlreadLocked = true;
        }else{
            this._cameraAlreadLocked = false;
            camera.lock();
        }
        //sound.button(); 
        
    }


    _setPos({hor = 0, ver = 0, horAlign = 0, verAlign = 0}) {

        this._horPos = hor;
        this._verPos = ver;

        this._horAlign = horAlign;
        this._verAlign = verAlign;

        this._element.style.width = this._sizeWidthMulti * (this._size[Gui._SizeSetting] - this._margin[Gui._SizeSetting]) + '%';
        this._element.style.height = window.innerWidth / window.innerHeight * (this._size[Gui._SizeSetting] - this._margin[Gui._SizeSetting]) + '%'; //  window.innerWidth  * (guiElement.size[this.style][guiElement.sizeSetting]- guiElement.margin[this.style][guiElement.sizeSetting])/100 + 'px';

        switch (this._horAlign) {
            case guiOptions.left:
                this._element.style.left = this._sizeWidthMulti * (this._margin[Gui._SizeSetting] / 2 + hor * this._size[Gui._SizeSetting]) + '%';
                break;
            case guiOptions.center:
                this._element.style.left = 50 + this._sizeWidthMulti * ((-this._size[Gui._SizeSetting] + this._margin[Gui._SizeSetting]) / 2 + hor * this._size[Gui._SizeSetting]) + '%';
                break;
            case guiOptions.right:
                this._element.style.left = 100 - this._sizeWidthMulti * (((this._size[Gui._SizeSetting] - this._margin[Gui._SizeSetting] / 2) - hor * this._size[Gui._SizeSetting])) + '%';
                break;
        }
        switch (this._verAlign) {
            case guiOptions.top:
                this._element.style.top = window.innerWidth / window.innerHeight * this._margin[Gui._SizeSetting] / 2 + ver * window.innerWidth / window.innerHeight * this._size[Gui._SizeSetting] + "%";
                break;
            case guiOptions.center:
                this._element.style.top = 50 - (window.innerWidth / window.innerHeight * this._size[Gui._SizeSetting] - window.innerWidth / window.innerHeight * this._margin[Gui._SizeSetting]) / 2 + ver * window.innerWidth / window.innerHeight * this._size[Gui._SizeSetting] + "%";
                break;
            case guiOptions.bottom:
                this._element.style.top = 100 + window.innerWidth / window.innerHeight * this._margin[Gui._SizeSetting] / 2 - window.innerWidth / window.innerHeight * this._size[Gui._SizeSetting] + ver * window.innerWidth / window.innerHeight * this._size[Gui._SizeSetting] + "%";
                break;
        }

        this._element.style.background = this._background;

        document.body.appendChild(this._element);


    }

    _hide() {
        document.body.removeChild(this._element);
    }



    setVisible(hor, ver, horAlign, verAlign) {

        //remove if already visisble???

        this._setPos({hor: hor, ver: ver, horAlign: horAlign, verAlign: verAlign});

        let buttonPosition = {
            xMin: Math.round(window.innerWidth * Number(this._element.style.left.slice(0, this._element.style.left.length - 1)) / 100),
            xMax: Math.round(window.innerWidth * (Number(this._element.style.left.slice(0, this._element.style.left.length - 1)) + this._size[Gui._SizeSetting] - this._margin[Gui._SizeSetting]) / 100),
            yMin: Math.round(window.innerHeight * Number(this._element.style.top.slice(0, this._element.style.top.length - 1)) / 100),
            yMax: Math.round(window.innerHeight * (Number(this._element.style.top.slice(0, this._element.style.top.length - 1)) + window.innerWidth / window.innerHeight * (this._size[Gui._SizeSetting] - this._margin[Gui._SizeSetting])) / 100),
            guiElement: this
        }
        Gui._VisibleStack.push(buttonPosition);

    }

    setNotVisible(){

        let index = Gui._VisibleStack.length - 1;
        while (index >= 0) {
            if (Gui._VisibleStack[index].guiElement == this) {
                Gui._VisibleStack[index].guiElement._hide();
                Gui._VisibleStack.splice(index, 1);

            }
            index--;
        }

    }


}


class GuiColorWheel extends Gui {
    constructor() {
        super(document.createElement('IMG'));
        this._element.src = "./icon/colorWheel/rgb.svg";
        this._size = [15, 30, 50];
        this._element.style.background = 'rgba(0, 0, 0, 0.0)';
        this._background = 'rgba(0, 0, 0, 0.0)';
        this._currentMeshFunction = null

        this._horAlign = guiOptions.left;
        this._verAlign = guiOptions.top;

        this._downPageX = null;
        this._downPageY = null;

        this._colorComplete = true;

        this._enabled = false;

    }

    pointerDown(evt, meshFunction) {
        
        if(!this._enabled){
            return;
        }
        
        this._currentMeshFunction = meshFunction;
        scene.onPointerMove = this.pointerMove.bind(this);
        scene.onPointerUp = this.pointerUp.bind(this);

        this._downPageX = evt.pageX;
        this._downPageY = evt.pageY;

        this._setPos({hor: ((100 * evt.pageX / window.innerWidth) - this._size[Gui._SizeSetting] / 2) / this._size[Gui._SizeSetting], ver: ((window.innerHeight / window.innerWidth * (100 * evt.pageY / window.innerHeight) - this._size[Gui._SizeSetting] / 2) / this._size[Gui._SizeSetting]), horAlign: this._horAlign, verAlign: this._verAlign});


        if(this._colorComplete){
            this._element.src = "./icon/colorWheel/rgb.svg";
        }else{
            this._element.src = "./icon/colorWheel/twoRow.svg";
        }
        super.pointerDown();

    }
    pointerMove(evt) {
        let radius = ((Math.sqrt(Math.pow(Math.abs(evt.pageX - this._downPageX), 2) + Math.pow(Math.abs(evt.pageY - this._downPageY), 2))) / window.innerWidth) * 100;
        let angle = Math.atan((evt.pageX - this._downPageX) / (evt.pageY - this._downPageY));

        let color;
        if (evt.pageY < this._downPageY) {
            if (angle > Math.PI / 4) {
                color = meshColor.magenta;
            } else if (angle > 0) {
                color = meshColor.red;
            } else if (angle > -Math.PI / 4) {
                color = meshColor.yellow;
            } else {
                color = meshColor.green;
            }
        } else {
            if (angle > Math.PI / 4) {
                color = meshColor.cyan;
            } else if (angle > 0) {
                color = meshColor.blue;
            } else if (angle > -Math.PI / 4) {
                color = meshColor.black;
            } else {
                color = meshColor.white;
            }
        }

      
        if (this._colorComplete) {
            if (radius > 0.25 * this._size[Gui._SizeSetting] && radius < 0.475 * this._size[Gui._SizeSetting]) {
                this._currentMeshFunction({color : color, colorComplete : true});         
            }
        } else {
            if (radius > 0.165 * 2 * this._size[Gui._SizeSetting] && radius < 0.165 * 3 * this._size[Gui._SizeSetting]) {
                this._currentMeshFunction({color : color, section : 1});
            } else if (radius > 0.165 * this._size[Gui._SizeSetting] && radius < 0.165 * 2 * this._size[Gui._SizeSetting]) {
                this._currentMeshFunction({color : color, section : 0});   
            }
        }


    }
    pointerUp() {
        super.pointerUp();
        scene.onPointerMove = null;
        scene.onPointerUp = null;
      
        

        this._hide();
    }


    disenable(){
        this._enabled = false;
    }


    colorComplete(){
        this._enabled = true;
        this._colorComplete = true;

    }
    colorSection(){
        this._enabled = true;
        this._colorComplete = false;
    }



}


class GuiButton extends Gui {
    static init() {
        this._ActiveStack = [];
        this._ActiveElement = null;
    }


    static _HideChildren() {
        GuiButton._ActiveStack.forEach(function (item, index) {
            if (index != 0) {
                item.guiElement._hide();
            }
        });
        GuiButton._ActiveStack.splice(1, GuiButton._ActiveStack.length - 1);
    }

    constructor(element, pointerUp) {
        super(element);
        this._pointerUpFunction = pointerUp;

        this._background = 'rgba(96, 96, 96, 0.3)';
        this._backgroundDown = 'rgba(96, 96, 96, 0.5)';
        this._child = [[], [], [], []];
        this._direction = null;
        this._parent = null;


    }


    addChild(guiElment, direction) {

        this._child[direction].push(guiElment);
        return guiElment;
    }


    pointerDown(evt) {
        
       
       // sound.button();

        scene.onPointerMove = this.pointerMove.bind(this);
        scene.onPointerUp = this.pointerUp.bind(this);



        GuiButton._ActiveStack = [];


        // func?
        let buttonPosition = {
            xMin: Math.round(window.innerWidth * Number(this._element.style.left.slice(0, this._element.style.left.length - 1)) / 100),
            xMax: Math.round(window.innerWidth * (Number(this._element.style.left.slice(0, this._element.style.left.length - 1)) + this._size[Gui._SizeSetting] - this._margin[Gui._SizeSetting]) / 100),
            yMin: Math.round(window.innerHeight * Number(this._element.style.top.slice(0, this._element.style.top.length - 1)) / 100),
            yMax: Math.round(window.innerHeight * (Number(this._element.style.top.slice(0, this._element.style.top.length - 1)) + window.innerWidth / window.innerHeight * (this._size[Gui._SizeSetting] - this._margin[Gui._SizeSetting])) / 100),
            guiElement: this
        }
        GuiButton._ActiveStack.push(buttonPosition);
        GuiButton._ActiveElement = this;
        this._element.style.background = this._backgroundDown;
        this._direction = null;
        this._parent = null;

        this._showChildren();

        super.pointerDown();

    }

    _showChildren(onlyShowDirection) {

        if (this._parent != null) {
            this._parent._showChildren(this._direction);
        }

        this._child.forEach(function (item, direction) {
            item.forEach(function (button, index) {
                if (onlyShowDirection == null || direction == onlyShowDirection) {
                    switch (direction) {
                        case guiOptions.childRight:
                            button._setPos({hor: this._horPos + index + 1, ver: this._verPos, horAlign: this._horAlign, verAlign: this._verAlign});
                            break;
                        case guiOptions.childBottom:
                            button._setPos({ hor: this._horPos, ver: this._verPos + index + 1, horAlign: this._horAlign, verAlign: this._verAlign});
                            break;
                        case guiOptions.childLeft:
                            button._setPos({hor: this._horPos - (index + 1), ver: this._verPos, horAlign: this._horAlign, verAlign: this._verAlign});
                            break;
                        case guiOptions.childTop:
                            button._setPos({hor: this._horPos, ver: this._verPos - (index + 1), horAlign: this._horAlign, verAlign: this._verAlign});
                            break;

                    }

                    let childButtonPosition = {
                        xMin: Math.round(window.innerWidth * Number(button._element.style.left.slice(0, button._element.style.left.length - 1)) / 100),
                        xMax: Math.round(window.innerWidth * (Number(button._element.style.left.slice(0, button._element.style.left.length - 1)) + button._size[Gui._SizeSetting] - button._margin[Gui._SizeSetting]) / 100),
                        yMin: Math.round(window.innerHeight * Number(button._element.style.top.slice(0, button._element.style.top.length - 1)) / 100),
                        yMax: Math.round(window.innerHeight * (Number(button._element.style.top.slice(0, button._element.style.top.length - 1)) + window.innerWidth / window.innerHeight * (button._size[Gui._SizeSetting] - button._margin[Gui._SizeSetting])) / 100),
                        guiElement: button
                    }
                    button._direction = direction;
                    button._parent = this;

                    GuiButton._ActiveStack.push(childButtonPosition);
                }
            }.bind(this));
        }.bind(this));


    }


    _setBackground() {
        this._element.style.background = this._background;  //needed?
    }

    pointerMove(evt) {
        let hitElement = GuiButton._ActiveStack.find(function (item, index) {
            if (evt.pageX >= item.xMin && evt.pageX <= item.xMax && evt.pageY >= item.yMin && evt.pageY <= item.yMax) {
                return true;
            }
        });

        if (hitElement != undefined) {
            if (hitElement.guiElement != GuiButton._ActiveElement) {
                GuiButton._HideChildren();
                GuiButton._ActiveElement._element.style.background = this._background;
                GuiButton._ActiveElement = hitElement.guiElement;
                GuiButton._ActiveElement._showChildren();
            }
            GuiButton._ActiveElement._element.style.background = this._backgroundDown;
        } else {
            this._element.style.background = this._background;
        }
    }



    pointerUp(evt) {
       /* console.log("pointer up")
        //double events on pointer up
        if(scene.onPointerUp == null){
            return; 
        }*/

        super.pointerUp();
        scene.onPointerMove = null;
        scene.onPointerUp = null;


        this._element.style.background = this._background;


        let hitElement = GuiButton._ActiveStack.find(function (item, index) {
            if (evt.pageX >= item.xMin && evt.pageX <= item.xMax && evt.pageY >= item.yMin && evt.pageY <= item.yMax) {
                return true;
            }
        });

        if (hitElement != undefined && hitElement.guiElement._pointerUpFunction != null) {   
            sound.button();
            hitElement.guiElement._pointerUpFunction();
        }
        GuiButton._HideChildren();


    }
    /*setNotVisible(){

        let index = Gui._VisibleStack.length - 1;
        while (index >= 0) {
            if (Gui._VisibleStack[index].guiElement == this) {
                Gui._VisibleStack[index].guiElement._hide();
                Gui._VisibleStack.splice(index, 1);

            }
            index--;
        }

    }*/


}

class GuiButtonImg extends GuiButton {

    constructor(img, pointerUp) {
        super(document.createElement('IMG'), pointerUp);
        this._element.src = img;

    }

}

class GuiBattery extends Gui {

    constructor() {
        super(document.createElement('IMG'), null);
        this._element.src = "./icon/battery/" + 0 + "bar.svg"
        

    }
    set numberOfBars(numberOfBars){     
        this._element.src = "./icon/battery/" + numberOfBars + "bar.svg"
    }

    pointerDown(evt) {
        return;
    }


}


class GuiInput extends Gui {
    constructor(text) {
        super(document.createElement('input'), null );
       
        this._element.style.pointerEvents = 'auto';
        this._element.type = 'text';
       // this._element.type = 'text';

        this._element.value = text;
        this._background = 'rgba(96, 96, 96, 0.3)',
        
        this._element.style.textAlign = "center";
        this._element.style.border = '0';
        this._element.style.outline = '0';
        this._element.style.color = 'white';

        this._element.style.borderRadius = "10px";
        //this._element.src = img;

      //  this._element.style.borderRadius = "0%";
      //  this._background = 'rgba(96, 96, 96, 0.6)';
        this._sizeWidthMulti = 9;
      /*  this._size = [, 8, 5];
        this._margin = [0.1, 0.1, 0.1];*/


    }
    _setPos({hor = 0, ver = 0, horAlign = 0, verAlign = 0}) {
        
        this._element.style.lineHeight = window.innerWidth  * (this._size[Gui._SizeSetting] - this._margin[Gui._SizeSetting]) / 100 + 'px';
        this._element.style.fontSize = window.innerHeight*window.innerWidth  / window.innerHeight * this._size[Gui._SizeSetting]/200 +'px'
/*
        this._element.style.width = this._sizeWidthMulti * (this._size[Gui._SizeSetting] - this._margin[Gui._SizeSetting]) + '%';
        this._element.style.height = window.innerWidth / window.innerHeight * (this._size[Gui._SizeSetting] - this._margin[Gui._SizeSetting]) + '%'; //  window.innerWidth  * (guiElement.size[this.style][guiElement.sizeSetting]- guiElement.margin[this.style][guiElement.sizeSetting])/100 + 'px';
*/
 

        super._setPos({hor: hor, ver: ver, horAlign: horAlign, verAlign: verAlign})

    }

    pointerDown(evt) {
        return;
    }

    get text(){
        return this._element.value;
    }




}


class GuiButtonPaint extends Gui {
    static init() {
        // this._initialized = false;
        this._hidden = true;
        this._ActiveElement = null;
        this._paintBrush = 0;
        this._paintBrushColors = ['rgba(96, 96, 96, 0.6)',
            'rgba(120, 0, 0, 0.7)',
            'rgba(0, 120, 0, 0.7)',
            'rgba(0, 0, 120, 0.7)'
        ];
        this._paintBrushColorsSelected = ['rgba(60, 60, 60, 1)',
            'rgba(220, 0, 0, 1)',
            'rgba(0, 220, 0, 1)',
            'rgba(0, 0, 255, 1)'
        ];
        this._picturePixels = [[], [], [], [], [], [], [], [], [], []];
        this._paintBrushButtons = [];
        this._paintBrushButtons = [];

    }
    static reset() {

        GuiButtonPaint._picturePixels = [[], [], [], [], [], [], [], [], [], []];
        GuiButtonPaint.hide();

    }



    static hide() {

        GuiButtonPaint._hidden = true;
        GuiButtonPaint._paintBrushButtons = [];

        let index = Gui._VisibleStack.length - 1;
        while (index >= 0) {
            if (Gui._VisibleStack[index].guiElement instanceof GuiButtonPaint) {
                Gui._VisibleStack[index].guiElement._hide();
                Gui._VisibleStack.splice(index, 1);

            }
            index--;
        }

    }
    static show() {
        console.log("show use colors")//!!
        if (GuiButtonPaint._hidden) {
            //GuiButtonPaint._initialized = true;
            GuiButtonPaint._hidden = false;
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y < 10; y++) {
                    let button = new GuiButtonPaint(9 - y, 9 - x); //3D coordinates ,looking from above 
                    if (this._picturePixels[9 - y][9 - x] != null) {
                        button._background = GuiButtonPaint._paintBrushColors[this._picturePixels[9 - y][9 - x]];
                    }

                    button._setPos({hor: x - 4.5, ver: y - 4.5, horAlign: guiOptions.center, verAlign: guiOptions.center});

                    let buttonPosition = {
                        xMin: Math.round(window.innerWidth * Number(button._element.style.left.slice(0, button._element.style.left.length - 1)) / 100),
                        xMax: Math.round(window.innerWidth * (Number(button._element.style.left.slice(0, button._element.style.left.length - 1)) + button._size[Gui._SizeSetting] - button._margin[Gui._SizeSetting]) / 100),
                        yMin: Math.round(window.innerHeight * Number(button._element.style.top.slice(0, button._element.style.top.length - 1)) / 100),
                        yMax: Math.round(window.innerHeight * (Number(button._element.style.top.slice(0, button._element.style.top.length - 1)) + window.innerWidth / window.innerHeight * (button._size[Gui._SizeSetting] - button._margin[Gui._SizeSetting])) / 100),
                        guiElement: button
                    }
                    Gui._VisibleStack.push(buttonPosition);
                }
            }

            for (let x = 0; x < 4; x++) {

                let button = new GuiButtonPaint(0, 0); //3D coordinates ,looking from above 
                button._background = this._paintBrushColors[x];
                button._setPos({hor: x - 4.5, ver: -5.5, horAlign: guiOptions.center, verAlign: guiOptions.center});

                let buttonPosition = {
                    xMin: Math.round(window.innerWidth * Number(button._element.style.left.slice(0, button._element.style.left.length - 1)) / 100),
                    xMax: Math.round(window.innerWidth * (Number(button._element.style.left.slice(0, button._element.style.left.length - 1)) + button._size[Gui._SizeSetting] - button._margin[Gui._SizeSetting]) / 100),
                    yMin: Math.round(window.innerHeight * Number(button._element.style.top.slice(0, button._element.style.top.length - 1)) / 100),
                    yMax: Math.round(window.innerHeight * (Number(button._element.style.top.slice(0, button._element.style.top.length - 1)) + window.innerWidth / window.innerHeight * (button._size[Gui._SizeSetting] - button._margin[Gui._SizeSetting])) / 100),
                    guiElement: button
                }
                Gui._VisibleStack.push(buttonPosition);

                button._paintBrush = true;
                button._paintBrushColor = x;

                GuiButtonPaint._paintBrushButtons.push(button);

            }

            GuiButtonPaint._paintBrush = 0;
        }/*else if(GuiButtonPaint._hidden){
            Gui._VisibleStack.forEach(function (item){
                if(item.guiElement instanceof GuiButtonPaint){
                    document.body.appendChild(item.guiElement._element);
                }
            });

            GuiButtonPaint._hidden = false;
        }*/


    }



    constructor(x, z) {
        super(document.createElement('p'));
        // this._element.borderRadius = "0%"; 
        this._element.style.borderRadius = "0%";
        this._background = 'rgba(96, 96, 96, 0.6)';
        this._size = [2, 8, 5];
        this._margin = [0.1, 0.1, 0.1];
        this._color = 0;
        this._x = x;
        this._z = z;
        this._paintBrush = false;
        this._paintBrushColor = 0;

    }
    _applyColor() {
        if (this._paintBrush) {
            GuiButtonPaint._paintBrushButtons.forEach(function (item, index) {
                item._background = GuiButtonPaint._paintBrushColors[index];
                item._element.style.background = item._background;
            });
            GuiButtonPaint._paintBrush = this._paintBrushColor;
            this._background = GuiButtonPaint._paintBrushColorsSelected[this._paintBrushColor];

        } else {
            this._background = GuiButtonPaint._paintBrushColors[GuiButtonPaint._paintBrush];
            GuiButtonPaint._picturePixels[this._x][this._z] = GuiButtonPaint._paintBrush;
        }
        this._element.style.background = this._background;

    }

    pointerDown(evt) {
        super.pointerDown();
        scene.onPointerMove = this.pointerMove.bind(this);
        scene.onPointerUp = this.pointerUp.bind(this);

    /*    Gui.onPointerMove = this.pointerMove.bind(this);
        Gui.onPointerUp = this.pointerUp.bind(this);*/
        
        this._applyColor();
        /* this._background = GuiButtonPaint._paintBrushColors[GuiButtonPaint._paintBrush];
         this._element.style.background = this._background;*/


    }

    pointerMove(evt) {
        let hitElement = Gui._VisibleStack.find(function (item, index) {
            if (evt.pageX >= item.xMin && evt.pageX <= item.xMax && evt.pageY >= item.yMin && evt.pageY <= item.yMax) {
                return true;
            }
        });

        if (hitElement != undefined && hitElement.guiElement instanceof GuiButtonPaint) {
            hitElement.guiElement._applyColor();
        }

    }

    pointerUp(evt) {
        super.pointerUp();
        scene.onPointerMove = null;
        scene.onPointerUp = null;

        /*Gui.onPointerMove = null;
        Gui.onPointerUp = null;*/
    }


}
