/**
* Class representing a Barrier. 
 * @extends DrawableObject
 */
class Barrier extends DrawableObject{
    // fields
    IMGs = [
        './img/03_Background/Barrier/TopBottom.png',
        './img/03_Background/Barrier/horizontal.png',
        './img/03_Background/Barrier/vertical.png',
    ]
    hitBox
    // methodes
    /**
     * This function initialize an barrier object
     * 
     * @param {number} x - this is the x coordinate from the barrier object
     * @param {number} y - this is the y coordinate from the barrier object
     * @param {number} w - this is the width of the barrier object
     * @param {number} h - this is the height of the barrier object
     * @param {number} type - this is the type of the barrier object
     */
    constructor(x,y,w,h,type){
        super(x,y,w,h);
        this.loadImg(this.IMGs[type]);
        this.directionX = true;
        this.setHitBox(type);
    }


    /**
     * This function is used to set the hitbox for an barrier object
     * 
     * @param {number} type - this is the type of the barrier, there are 3 different types [0: top and bottom,1: horizontal ,2: vertical]
     */
    setHitBox(type){
        switch (type) {
            case 0:
                this.setPropertiesBarrier0();
                break;
            case 1:
                this.setPropertiesBarrier1();
                break;
            case 2:
                this.setPropertiesBarrier2();
                break;
        }
    }


    /**
     * This function set the properties for an berrier object type 0:top and bottom
     * 
     */
    setPropertiesBarrier0(){
            this.hitBox = [
        {
            x: this.x,
            y: this.y,
            w: this.width,
            h: this.height/4,
        },
        {
            x: this.x,
            y: this.y + this.height*4/5,
            w: this.width,
            h: this.height/5,
        }
    ];
    }


    /**
     * This function set the properties for an berrier object type 1: horizontal
     * 
     */
    setPropertiesBarrier1(){
        this.hitBox = [{
            x: this.x,
            y: this.y + this.height*(1-0.7),
            w: this.width,
            h: this.height*0.7,
        }]
    }


    /**
     * This function set the properties for an berrier object type 2: vertical
     * 
     */
    setPropertiesBarrier2(){
        this.hitBox = [{
            x: this.x + this.width*(1-0.6)/2,
            y: this.y,
            w: this.width*0.6,
            h: this.height,
        }]
    }

}