
/**
 * Class representing a drawable object 
 */
class DrawableObject {
    // Fields
        x;
        y;
        width;
        height;
        center;
        img = new Image();
        directionX = true; // right = true, left = false
        directionY = true; // up = true, down = false
        directionIMG = true; // true = IMGs initial right orientated, false = IMGs initial left orientated
    
    /**
     * This function initialize an drawable object
     * 
     * @param {number} x - this is the initial x coordinate of a drawable object
     * @param {number} y - this is the initial y coordinate of a drawable object
     * @param {number} w - this is the width of the drawable object
     * @param {number} h - this is the height of the drawable object
     */
    // methodes
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.calcCenter();
    }


    /**
     * THis function draw the image on the canvas element in the correct direction
     * 
     * @param {CanvasRenderingContext2D} ctx - context of the canvas where the imgeg will be draw 
     * @param {number} ofst - x-offset of the canvas relative to the origon of the map 
     */
    draw(ctx,ofst){
        if (this.isVisible(ofst)) {
            let xCanvas = this.x - ofst;
            if (this.isImgInCorrectDirection()) {
                ctx.drawImage(this.img,xCanvas,this.y,this.width,this.height); 
            } else {
                this.flipImg(ctx,xCanvas);
            }
            this.drawFrames(ctx,ofst);
        }
    }


    /**
     * This function checks if the image is in the correct direction relative to the moving direction of this object
     * 
     * @returns {boolean} - true: image is in the correct direction, false: image is in the wrong direction
     */
    isImgInCorrectDirection(){
        if (this.directionIMG) {
            return this.directionX;
        } else {
            return !this.directionX;
        }
    }


    /**
     * This function draw the boxes imgBox,hitbox, attackbox and detectbox of the object
     * 
     * @param {CanvasRenderingContext2D} ctx - context of the canvas where the imgeg will be draw 
     * @param {number} ofst - x-offset of the canvas relative to the origon of the map 
     */
    drawFrames(ctx, ofst){ // function for developiing
        if (this instanceof MoveableObject) {
            let imgBox = {x:this.x,y:this.y,h:this.width,w:this.height}
            this.drawFrame(ctx,ofst,imgBox,'green')
        }
        if (this instanceof FightableObject ) {
            this.drawFrame(ctx,ofst,this.hitBox,'blue');
            this.drawFrame(ctx,ofst,this.attackBox,'red');
            this.drawFrame(ctx,ofst,this.detectBox,'yellow');
        }   
        if (this instanceof Barrier) {
            this.hitBox.forEach(hB => {
                this.drawFrame(ctx,ofst,hB,'red');
            });
            
        }
    }


    /**
     * This function draw a frame on the canvas accoring the properties of Box and color
     * 
     * @param {CanvasRenderingContext2D} ctx - context of the canvas where the imgeg will be draw 
     * @param {number} ofst - x-offset of the canvas relative to the origon of the map 
     * @param {JSON} Box - JSON array with x,y,w,h keys  (x: x-coordinate, y: y-coordinate, h: hieght, w: width) of the frame
     * @param {string} color - frame color
     */
    drawFrame(ctx,ofst,Box,color){ // function for developiing
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = color;
            ctx.rect(Box.x - ofst, Box.y, Box.w,Box.h);
            ctx.stroke();
    }


    /**
     * This function set the path to the image of this object
     * 
     * @param {string} path - path to the image
     */
    loadImg(path){ 
        this.img.src = path;
    }


    /**
     * This function checks if the object is visible within the canvas
     * 
     * @param {number} ofst - x-offset of the canvas relative to the origon of the map 
     * @returns {boolean} true: object is visible, object is not visible
     */
    isVisible(ofst){
        return !(this.x+this.width < ofst ||
            this.x > ofst + canvas_w);
    }


    /**
     * This function flips the image in the other direction
     * 
     * @param {CanvasRenderingContext2D} ctx - context of the canvas where the imgeg will be draw 
     * @param {number} x - x coordinate respect to the canvas element 
     */
    flipImg(ctx,x){
        ctx.save();
        ctx.scale(-1, 1);
        x = -x - this.width;
        ctx.drawImage(this.img,x,this.y,this.width,this.height);
        ctx.restore()
    }


    /**
     * This function calculates the coordinates of the center from the object
     */
    calcCenter(){
        this.center = {
            x: this.x + this.width/2,
            y: this.y + this.height/2,
        }
    }
}