


class Block {

    static init() {


        Block._blinkTimer = setTimeout(Block._blinkTimerFunction, 500); //setInterval(Block._blinkTimerFunction, 500); // setTimeout(Block._blinkTimerFunction, 500);   
        Block._blinkTimerRunning = true;
        Block._blink = false;

    }

    static copy(block) {
        let returnBlock = [];
        block.forEach(item => returnBlock.push(item._copy()));
        return returnBlock;

    }

    static setColor({ block = [], color = 0, blink = false }) {
        if (!Array.isArray(block)) {
            block = [block];
        }

        block.forEach(function (item) {
            item.color = color;
            if (blink) {
                item.blink();
            } else {
                item.stopBlink();
            }

        })

    }


    //syncronice timer with update rate of base -> run more slowly when many blocks
    static startBlinkTimer() {
        if (!Block._blinkTimerRunning) {
            Block._blinkTimer = setTimeout(Block._blinkTimerFunction, 500); //setInterval(Block._blinkTimerFunction, 500); // setTimeout(Block._blinkTimerFunction, 500);   
            Block._blinkTimerRunning = true;
        }


    }

    static _blinkTimerFunction() {
        Block._blink = !Block._blink;
        Block._blinkTimerRunning = false;
    }



    static copyColor({ to = [], from = [], careRotation = true, blink = false }) {
        to.forEach(function (item) {
            let fromWithColor = item._find({ block: from, careColor: false, careRotation: careRotation });
            if (fromWithColor != null) {
                item.copyColor(fromWithColor);
                if (blink) {
                    item.blink();
                } else {
                    item.stopBlink();
                }

            }

        });

    }

    //care rotation 180deg


    static calcSet({ left = [], right = [], careColor = true, careRotation = true, careGap = true }) {

        if (!Array.isArray(left)) {
            left = [left];
        }
        if (!Array.isArray(right)) {
            right = [right];
        }
        let set = {
            intersectionLeft: [],
            intersectionRight: [],
            diffLeft: [],
            diffRight: [],
            get union() {
                return this.diffLeft.concat(this.intersectionLeft, this.diffRight);
            }
        }
        left.forEach(function (item) {
            if (item._isIn({ block: right, careColor: careColor, careRotation: careRotation, careGap: careGap  })) {

                set.intersectionLeft.push(item);
            } else {
                set.diffLeft.push(item);
            }
        });
        right.forEach(function (item) {
            if (item._isIn({ block: left, careColor: careColor, careRotation: careRotation, careGap: careGap })) {
                set.intersectionRight.push(item);
            } else {
                set.diffRight.push(item);
            }
        });
        return set;

    }



    //blink individual colors?
    blink() {
        for (let i = 0; i < this._blink.length; i++) {
            this._blink[i] = true;
        }
    }

    stopBlink() {
        for (let i = 0; i < this._blink.length; i++) {
            this._blink[i] = false;
        }

    }



    constructor({ x = 0, y = 0, z = 0, r = 0, color = [0, 0, 0, 0] }) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._r = r;
        this._color = color;
        this._blink = new Array(color.length);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get z() {
        return this._z;
    }
    get r() {
        return this._r;
    }
    get color() {
        //console.log("get Color")
        return this._color;
    }

    set color(color) {

        for (let i = 0; i < this._color.length; i++) {
            this._color[i] = color;
        }
    }


    //_isIn(block, careColor, careRotation) {
    _isIn({ block = [], careColor = true, careRotation = true, careGap = true }) {


        for (let i = 0; i < block.length; i++) {
            if (this.equal({ block: block[i], careColor: careColor, careRotation: careRotation, careGap: careGap })) {
                // if (this._equal(block[i], careColor, careRotation)) {
                return true;
            }
        }
        return false;
    }

    //_find(block, careColor, careRotation){
    _find({ block = [], careColor = true, careRotation = true }) {
        for (let i = 0; i < block.length; i++) {
            if (this.equal({ block: block[i], careColor: careColor, careRotation: careRotation })) {
                //if (this._equal(block[i], careColor, careRotation)) {
                return block[i];
            }
        }
        return null;
    }

    copyColor(block) {

        for (let i = 0; i < this._color.length; i++) {
            this._color[i] = block._color[i]
        }
    }

    _returnColor(index) {

        if (this._blink[index] && Block._blink) {
            return 0;
        }
        return this._color[index];
    }


}




//good to have for checking intererance
class BlockBase extends Block {
    constructor() {
        super({ x: 0, y: 0, z: 0 });
    }

    get ledRight() {
        return this._returnColor(0);
    }
    get ledFront() {
        return this._returnColor(1);
    }
    get ledLeft() {
        return this._returnColor(2);
    }
    get ledBack() {
        return this._returnColor(3);
    }

    set ledRight(color) {
        this._color[0] = color;
    }
    set ledFront(color) {
        this._color[1] = color;
    }
    set ledLeft(color) {
        this._color[2] = color;
    }
    set ledBack(color) {
        this._color[3] = color;
    }
}

class Block2x2 extends Block {

    set ledA(color) {
        this._color[0] = color;
    }
    set ledB(color) {
        this._color[1] = color;
    }

    get ledA() {
        return this._returnColor(0);
    }
    get ledB() {
        return this._returnColor(1);
    }

    constructor({ x = 0, y = 0, z = 0, r = 0, color = [0, 0] }) {
        super({ x: x, y: y, z: z, r: r, color: color });

    }

    _copy() {
        let color = [];
        this.color.forEach(item => color.push(item));
        return new Block2x2({ x: this.x, y: this.y, z: this.z, r: this.r, color: color })
    }

    equal({ block = null, careColor = true, careRotation = true }) {
        // _equal(block, careColor, careRotation) {
        if (!(block instanceof Block2x2)) {
            return false;
        }

        if (this._y != block._y) {
            return false;
        } else if (this._x == block._x && this._z == block._z && this._r == block._r) {
            if (!careColor || (this._color[0] == block._color[0] && this._color[1] == block._color[1])) {
                // console.log("A1")
                return true;
            }
        } else if (!careRotation) {

            let set = BlockPixel.calcSet({ left: BlockPixel.convertBlock(this), right: BlockPixel.convertBlock(block), careColor: careColor });
            if (set.intersectionLeft.length == 4) {
                return true;
            }

        }


        return false;

    }

}

class Block2x4 extends Block {

    set ledA(color) {
        this._color[0] = color;
    }
    set ledB(color) {
        this._color[1] = color;
    }
    set ledC(color) {
        this._color[2] = color;
    }
    set ledD(color) {
        this._color[3] = color;
    }

    get ledA() {
        return this._returnColor(0);
    }
    get ledB() {
        return this._returnColor(1);
    }
    get ledC() {
        return this._returnColor(2);
    }
    get ledD() {
        return this._returnColor(3);
    }

    _copy() {
        let color = [];
        this.color.forEach(item => color.push(item));
        return new Block2x4({ x: this.x, y: this.y, z: this.z, r: this.r, color: color })
    }
    equal({ block = null, careColor = true, careRotation = true }) {
        //_equal(block, careColor, careRotation) {

        if (!(block instanceof Block2x4)) {
            return false;
        }



        if (this._y != block._y) {
            return false;
        } else if (this._x == block._x && this._z == block._z && this._r == block._r) {
            if (!careColor || (this._color[0] == block._color[0] && this._color[1] == block._color[1] && this._color[2] == block._color[2] && this._color[3] == block._color[3])) {
                return true;
            }
        } else if (!careRotation) {
            let set = BlockPixel.calcSet({ left: BlockPixel.convertBlock(this), right: BlockPixel.convertBlock(block), careColor: careColor });
            if (set.intersectionLeft.length == 8) {
                return true;
            }
            //pixel
        }


        return false;

    }

}

class BlockPixel extends Block {

    
    static setBlockColor({ block = [], color = 0, blink = false, colorComplete = true }) {
        if (!Array.isArray(block)) {
            block = [block];
        }

        block.forEach(function (pixel) {          
            pixel.setBlockColor({color: color, blink: blink, colorComplete: colorComplete });              
        });

    }

    static convertBlock(block) {
        if (!Array.isArray(block)) {
            block = [block];
        }
        let pixels = [];
        let index = 0;

        let xOffset = [];
        let zOffset = [];

        xOffset[0] = [0, 0, 1, 1, 2, 2, 3, 3];
        xOffset[1] = [0, 1, 0, 1, 0, 1, 0, 1];
        xOffset[2] = [0, 0, -1, -1, -2, -2, -3, -3];
        xOffset[3] = [0, -1, 0, -1, 0, -1, 0, -1];

        zOffset[0] = [0, 1, 0, 1, 0, 1, 0, 1];
        zOffset[1] = [0, 0, -1, -1, -2, -2, -3, -3];
        zOffset[2] = [0, -1, 0, -1, 0, -1, 0, -1];
        zOffset[3] = [0, 0, 1, 1, 2, 2, 3, 3];

        block.forEach(function (item) {
            let qtyPixels = 8;
            if (item instanceof Block2x2) {
                qtyPixels = 4;
            }
            while (qtyPixels > 0) {
                qtyPixels--;
                pixels[index] = new BlockPixel({ x: item.x + xOffset[item.r][qtyPixels], y: item.y, z: item.z + zOffset[item.r][qtyPixels], color: [item.color[Math.floor(qtyPixels / 2)]], block: item });
                index++;
            }

        });

        return pixels
    }


    /*
        static calcSetNoColor(left, right) {
            return BlockPixel._calcSet(left, right, false);
        }
    
        static calcSet(left, right) {
            return BlockPixel._calcSet(left, right, true);
    
    
        }
    
        static _calcSet(left, right, careColor) {
            let set = {         
                intersection: [],         
                diffLeft: [],
                diffRight: [],
                get union() {
                    return this.diffLeft.concat(this.intersection, this.diffRight);
                }
            }
            left.forEach(function (item) {
                if(item._isIn(right, careColor)){
                    set.intersection.push(item);                
                }else{
                    set.diffLeft.push(item);  
                }
            } );
            right.forEach(function (item) {
                if(!item._isIn(left, careColor)){
                    set.diffRight.push(item);                
                }
            } );
            return set;
        }*/
    constructor({ x = 0, y = 0, z = 0, color = [0], block = null }) {
        if (!Array.isArray(color)) {
            color = [color];
        }

        super({ x: x, y: y, z: z, color: color });
        this.block = block;
    }

    //super no?
    /* _isIn(block, careColor, careRotation){
 
             for(let i = 0; i < block.length; i++){
                 if(this._equal(block[i], careColor, careRotation)){
                     return true;
                 }
             }
             return false;
     }*/

    setBlockColor({color = 0, blink = false, colorComplete = true }) {
        if(colorComplete){
            this.block.color = color;
        }else{
            //rotation 
            //distacne
            let distance = 0;

            if(this.block.r == 0 || this.block.r == 2 ){
                distance = this.x - this.block.x;               
            }else{
                distance = this.z - this.block.z;
            }
           
            switch(Math.abs(distance)){
                case 0:
                this.block.ledA = color;
                break;
                case 1:
                this.block.ledB = color;
                break;
                case 2:
                this.block.ledC = color;
                break;
                case 3:
                this.block.ledD = color;
                break;
            }
           

        }
      
        if (blink) {
            this.block.blink();
        } else {
            this.block.stopBlink();
        }

    }

    equal({ block = null, careColor = true }) {
        // _equal(block, careColor) {
        if (!(block instanceof BlockPixel)) {
            return false;
        }

        if (this._x == block._x && this._y == block._y && this._z == block._z) {
            if (!careColor || (this._color[0] == block._color[0])) {
                return true;
            }
        }
        return false;
    }
}

class BlockShadow extends Block {

    static setBlockColor({ block = [], color = 0, blink = false }) {
        if (!Array.isArray(block)) {
            block = [block];
        }

        block.forEach(function (shadow) {            
            shadow.block.forEach(function (pixelOfShadow) {
                pixelOfShadow.setBlockColor({color: color, blink: true });              

            });

        })

    }


    static convert({ block = [] }) {

        let shadow = {
            left: [],
            right: [],
            back: [],
            front: [],
            bottom: []
        }

        let pixel = BlockPixel.convertBlock(block);

        pixel.forEach(function (item) {

            let left = new BlockShadowLeft({ x: item.x, y: item.y, block: item });
            let find = left._find({block: shadow.left})
            if (find == null) {
                shadow.left.push(left);
            } else {
                find.block.push(item);
            }
            let right = new BlockShadowRight({ x: item.x, y: item.y, block: item });
            find = right._find({block: shadow.right})
            if (find == null) {
                shadow.right.push(right);
            } else {
                find.block.push(item);
            }

            let back = new BlockShadowBack({ z: item.z, y: item.y, block: item });
            find = back._find({block: shadow.back})
            if (find == null) {
                shadow.back.push(back);
            } else {
                find.block.push(item);
            }

            let front = new BlockShadowFront({ z: item.z, y: item.y, block: item });
            find = front._find({block: shadow.front})
            if (find == null) {
                shadow.front.push(front);
            } else {
                find.block.push(item);
            }

            let bottom = new BlockShadowBottom({ x: item.x, z: item.z, block: item });
            find = bottom._find({block: shadow.bottom})
            if (find == null) {
                shadow.bottom.push(bottom);
            } else {
                find.block.push(item);
            }


            //if in find next



        });

        return shadow;


    }
    constructor({ x = null, y = null, z = null, color = [null], block = null}) { // color = [null]?
        super({ x: x, y: y, z: z, color: color });
        this.block = [block];
       // console.log("A this.block: " + this.block)

    }



    _find({ block = [], careColor = false, careGap = false }) {
      
        for (let i = 0; i < block.length; i++) {
            if (this.equal({ block: block[i], careColor: careColor, careGap: careGap })) {
                //if (this._equal(block[i], careColor, careRotation)) {
                return block[i];
            }
        }
        return null;
    }

    get color(){
        if(this._color[0] != null){

            return this._color;
        }

        return [this._calcColor()];

    }

    set color(color){
        this._color[0] = color;
    }

    //makeColor

    _calcColor({max = 0, min = 0, retColor = 0, careColor = true, careGap = true }) {

        if(!careColor){
            retColor = 0;
        }

        if(careGap){
            //console.log("Max: " + max + "Min: " +min + "Block l : " + this.block.length)
            /*console.log("max: " + max)
            console.log("min: " + min)
            console.log("this.block.length: " + this.block.length)*/

            if(max - min >= this.block.length){
              //  console.log("up")
                retColor += 8;
            } 
        }

        return retColor;
    }


}

//care color
//care gap

class BlockShadowLeft extends BlockShadow {

    equal({ block = null, careColor = false, careGap = false }) {
  
        if (this._x == block._x && this._y == block._y) {
            ///care color!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            if ((!careColor && !careGap) || (this.calcColor({careColor: careColor,  careGap: careGap }) == block.calcColor({careColor: careColor, careGap: careGap }))) {
                return true;
            }
        }
        return false;
    }

    _copy() {
        return new BlockShadowLeft({ x: this.x, y: this.y})
    }
    //do I want to use care color
    // what about red?
    //how do I flag NG?
    //go trhought the process

    //!!!!!!!!!!!!!!!
    
    // COLOR WHEN SET RED

    calcColor({careColor = true, careGap = true }) {



        let max = -999;
        let min = 999;
        let retColor = 0;
        this.block.forEach(function (item) {
            if(item.z < min){
                min = item.z;
            }

            if(item.z > max){
                max = item.z;
                retColor = item.color[0]; //pixel color
            }

        });

        return super._calcColor({max: max, min: min, retColor: retColor, careColor: careColor, careGap: careGap });

    }

}

class BlockShadowRight extends BlockShadow {

    equal({ block = null, careColor = false, careGap = false }) {

        if (this._x == block._x && this._y == block._y) {
            if ((!careColor && !careGap) || (this.calcColor({careColor: careColor,  careGap: careGap }) == block.calcColor({careColor: careColor, careGap: careGap }))) {
                return true;
            }
        }
        return false;
    }

    _copy() {
        return new BlockShadowRight({ x: this.x, y: this.y})
    }

    calcColor({careColor = true, careGap = true }) {

        let max = -999;
        let min = 999;
        let retColor = 0;
        this.block.forEach(function (item) {
            if(item.z < min){
                min = item.z;
                retColor = item.color[0]; //pixel color
            }

            if(item.z > max){
                max = item.z;
                
            }

        });
        return super._calcColor({max: max, min: min, retColor: retColor, careColor: careColor, careGap: careGap });


    }



}

class BlockShadowBack extends BlockShadow {
    equal({ block = null, careColor = false, careGap = false }) {

        if (this._z == block._z && this._y == block._y) {
            if ((!careColor && !careGap) || (this.calcColor({careColor: careColor,  careGap: careGap }) == block.calcColor({careColor: careColor, careGap: careGap }))) {
                return true;
            }
        }
        return false;
    }

    _copy() {
        return new BlockShadowBack({  y: this.y, z: this.z})
    }



    calcColor({careColor = true, careGap = true }) {

        let max = -999;
        let min = 999;
        let retColor = 0;
        this.block.forEach(function (item) {
            if(item.x < min){
                min = item.x;
            }

            if(item.x > max){
                max = item.x;
                retColor = item.color[0]; //pixel color
            }

        });
        return super._calcColor({max: max, min: min, retColor: retColor, careColor: careColor, careGap: careGap });


    }

    

}
class BlockShadowFront extends BlockShadow {
    equal({ block = null, careColor = false, careGap = false }) {

        if (this._z == block._z && this._y == block._y) {
            if ((!careColor && !careGap) || (this.calcColor({careColor: careColor,  careGap: careGap }) == block.calcColor({careColor: careColor, careGap: careGap }))) {
                return true;
            }
        }
        return false;
    }

    _copy() {
        return new BlockShadowFront({  y: this.y, z: this.z})
    }

    
    calcColor({careColor = true, careGap = true }) {

        let max = -999;
        let min = 999;
        let retColor = 0;
        this.block.forEach(function (item) {
            if(item.x < min){
                min = item.x;
                retColor = item.color[0]; //pixel color
            }

            if(item.x > max){
                max = item.x;
                
            }

        });
        return super._calcColor({max: max, min: min, retColor: retColor, careColor: careColor, careGap: careGap });


    }

}

class BlockShadowBottom extends BlockShadow {

    equal({ block = null, careColor = false, careGap = false }) {

        if (this._x == block._x && this._z == block._z) {
            if ((!careColor && !careGap) || (this.calcColor({careColor: careColor,  careGap: careGap }) == block.calcColor({careColor: careColor, careGap: careGap }))) {
                return true;
            }
        }
        return false;
    }

    _copy() {
        return new BlockShadowBottom({  x: this.x, z: this.z})
    }

    calcColor({careColor = true, careGap = true }) {
 
        let max = -999;
        let min = 999;
        let retColor = 0;
     //   console.log("calc color bottom")
        this.block.forEach(function (item) {
           // console.log(" item.y: " +  item.y + "min: " + min) 
            if(item.y < min){
                min = item.y;
             //   console.log(" item.color[0]: " +  item.color[0])
                retColor = item.color[0]; //pixel color
            }

            if(item.y > max){
                max = item.y;
                
            }

        });
        return super._calcColor({max: max, min: min, retColor: retColor, careColor: careColor, careGap: careGap });


    }


    

}

class BlockNumber extends Block {
    constructor({ x = null, y = null, z = null, color = [0,0,0]}) { // color = [null]?
        super({ x: x, y: y, z: z, color: color });
      
    

    }
}

class BlockPillar extends Block {

    static convertBlock(block) {
        if (!Array.isArray(block)) {
            block = [block];
        }
        let pillar = [];


        block.forEach(function (item) {
            //let pixel = 
            //if(! (item instanceof Block2x2))

            if(item.r == 0){
                pillar.push(new BlockPillar({ x: item.x, y: 0, z: item.z, color: [item.color[0]]}) );
                if(item instanceof Block2x4){
                    pillar.push(new BlockPillar({ x: item.x+2, y: 0, z: item.z, color: [item.color[2]]}) );
                }
            }else if(item.r == 1){
                pillar.push(new BlockPillar({ x: item.x , y: 0, z: item.z-1, color: [item.color[0]]}) );
                if(item instanceof Block2x4){
                    pillar.push(new BlockPillar({ x: item.x, y: 0, z: item.z-3, color: [item.color[2]]}) );
                }
            }else if(item.r == 2){
                pillar.push(new BlockPillar({ x: item.x -1, y: 0, z: item.z-1, color: [item.color[0]]}) );
                if(item instanceof Block2x4){
                    pillar.push(new BlockPillar({ x: item.x-3, y: 0, z: item.z-1, color: [item.color[2]]}) );
                }
            }else if(item.r == 3){
                pillar.push(new BlockPillar({ x: item.x-1, y: 0, z: item.z, color: [item.color[0]]}) );
                if(item instanceof Block2x4){
                    pillar.push(new BlockPillar({ x: item.x-1, y: 0, z: item.z+2, color: [item.color[2]]}) );
                }
            }

        });

        return pillar;

     
    }


    static _isIn({isInItem = null, block = []}){

        let neededEqual = 1;

        let convertedItem = [isInItem];
        let convertedBlock = block;

      
        if(isInItem instanceof Block2x2 ){
            convertedItem = BlockPillar.convertBlock(convertedItem);        
        }else if(isInItem instanceof Block2x4){
            neededEqual = 2;
            convertedItem = BlockPillar.convertBlock(convertedItem);
        }else if(block[0] instanceof Block2x2 || block[0] instanceof Block2x4){
            convertedBlock =  BlockPillar.convertBlock(convertedBlock);
        }else if(isInItem instanceof BlockPixel){
            for (let i = 0; i < block.length; i++) {
                if(isInItem.x == block[i].x || isInItem.x == block[i].x+1){
                    if(isInItem.z == block[i].z || isInItem.z == block[i].z+1){
                        return true;
                    }
                }
            }
            return false;
        }else if(block[0] instanceof BlockPixel){
            let found = 0;           
            for (let i = 0; i < block.length; i++) {
                if(isInItem.x == block[i].x || isInItem.x+1 == block[i].x){
                    if(isInItem.z == block[i].z || isInItem.z+1 == block[i].z){
                        found++;
                    }
                }
            }
            if(found == 4){
                return true;
            }
            return false;
        }

        
        let found = 0;
        convertedItem.forEach(function (item) {
            convertedBlock.forEach(function (itemBlock) {
                if(item.x == itemBlock.x || item.z == itemBlock.z){
                    found++;
                }          
            });
        });

        if(neededEqual == found){
            return true;
        }
        return false;





        /*
        item        block       action1                                        comment
       
        2x2         pillar      convert equal 1 ok      
        2x4         pillar      convert equal 2 ok
        pillar      block       convert block to pillar(2x4 -> 2)              want pillar to is in if perfect match 2x4, but not if in middle
        pillar      pixel       overlapfunction need 4 //convert pillar to pixel equal 1 ok
        pixel       pillar      overlap function need 1   -- " --

        */



    }

    static calcSet({ left = [], right = []}) {

        if (!Array.isArray(left)) {
            left = [left];
        }
        if (!Array.isArray(right)) {
            right = [right];
        }
        let set = {
            intersectionLeft: [],
            intersectionRight: [],
            diffLeft: [],
            diffRight: [],
            get union() {
                return this.diffLeft.concat(this.intersectionLeft, this.diffRight);
            }
        }


        left.forEach(function (item) {       
            if (BlockPillar._isIn({isInItem: item, block: right})) {

                set.intersectionLeft.push(item);
            } else {
                set.diffLeft.push(item);
            }
        });
        right.forEach(function (item) {        
            if (BlockPillar._isIn({isInItem: item, block: left})) {
                set.intersectionRight.push(item);
            } else {
                set.diffRight.push(item);
            }
        });
        return set;

    }

    constructor({ x = null, y = null, z = null, color = [0]}) { // color = [null]?
        super({ x: x, y: 0, z: z, color: color });
      
    

    }
}

