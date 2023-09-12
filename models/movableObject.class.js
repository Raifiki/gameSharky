/**
 * Class representing a moveable object. A moveable object can move on the map in all directions
 */
class MoveableObject extends AnmiatedObject {
    //field
    speedX = 0;
    speedY = 0;

    timerIDs = [];

    //method
    /**
     * This function initialize an moveable object
     * 
     * @param {number} x - this is the initial x coordinate of a drawable object
     * @param {number} y - this is the initial y coordinate of a drawable object
     * @param {number} w - this is the width of the drawable object
     * @param {number} h - this is the height of the drawable object
     */
    constructor(x,y,w,h){
        super(x,y,w,h);
    }


    /**
     * This function moves the object with the speed in x direction to the right direction
     */
    moveRight(){
        if (this.canMoveRight()) {
            this.x += this.speedX;
            this.calcCenter();    
        }   
    }
    

    /**
     * This function moves the object with the speed in x direction to the left direction
     */
    moveLeft(){
        if (this.canMoveLeft()) {
            this.x -= this.speedX;
            this.calcCenter();
        }
    }


    /**
     * This function moves the object with the speed in y direction in the up direction
     */
    moveUp(){
        if (this.canMoveUp()) {
            this.y -= this.speedY;
            this.calcCenter();    
        } 
    }


    /**
     * This function moves the object with the speed in y direction in the down direction
     */
    moveDown(){
        if (this.canMoveDown()) {
            this.y += this.speedY;
            this.calcCenter();    
        }   
    }


    /**
     * This function checks if this object collides with a barrier on the right side respect to this object
     * 
     * @param {box} obj2Box - box of the barrier
     * @returns {boolean} - true: is colliding, false: is not colliding
     */
    isBarrierRight(obj2Box){
        let obj1Box = this.hitBox;
        let [x1,y1,w1,h1]= [obj1Box.x,obj1Box.y,obj1Box.w,obj1Box.h];
        let [x2,y2,w2,h2]= [obj2Box.x,obj2Box.y,obj2Box.w,obj2Box.h];
        let frame = 10;
        y2 += frame;
        h2 -= 2*frame;
        return (x2 <= x1+w1 && x1+w1 <= x2+w2) && 
               ((y2 <= y1 && y1 <= y2+h2) ||(y2 <= y1+h1 && y1+h1 <= y2+h2) ||  (y1<y2 && y1+h1 > y2+h2));
    }


    /**
     * This function checks if this object collides with a barrier on the left side respect to this object
     * 
     * @param {box} obj2Box - box of the barrier
     * @returns {boolean} - true: is colliding, false: is not colliding
     */
    isBarrierLeft(obj2Box){
        let obj1Box = this.hitBox;
        let [x1,y1,w1,h1]= [obj1Box.x,obj1Box.y,obj1Box.w,obj1Box.h];
        let [x2,y2,w2,h2]= [obj2Box.x,obj2Box.y,obj2Box.w,obj2Box.h];
        let frame = 10;
        y2 += frame;
        h2 -= 2*frame;
        return (x2 <= x1 && x1 <= x2+w2) && 
               ((y2 <= y1 && y1 <= y2+h2) ||(y2 <= y1+h1 && y1+h1 <= y2+h2) ||  (y1<y2 && y1+h1 > y2+h2));
    }


    /**
     * This function checks if this object collides with a barrier on the top side respect to this object
     * 
     * @param {box} obj2Box - box of the barrier
     * @returns {boolean} - true: is colliding, false: is not colliding
     */
    isBarrierTop(obj2Box){
        let obj1Box = this.hitBox;
        let [x1,y1,w1,h1]= [obj1Box.x,obj1Box.y,obj1Box.w,obj1Box.h];
        let [x2,y2,w2,h2]= [obj2Box.x,obj2Box.y,obj2Box.w,obj2Box.h];
        let frame = 15;
        x2 += frame;
        w2 -= 2*frame;
        return ((x2 <= x1 && x1 <= x2+w2) || (x2 <= x1+w1 && x1+w1 <= x2+w2) || (x1<x2 && x1+w1 > x2+w2)) && 
                (y2 <= y1 && y1 <= y2+h2);
    }


    
    /**
     * This function checks if this object collides with a barrier on the bottom side respect to this object
     * 
     * @param {box} obj2Box - box of the barrier
     * @returns {boolean} - true: is colliding, false: is not colliding
     */
    isBarrierBottom(obj2Box){
        let obj1Box = this.hitBox;
        let [x1,y1,w1,h1]= [obj1Box.x,obj1Box.y,obj1Box.w,obj1Box.h];
        let [x2,y2,w2,h2]= [obj2Box.x,obj2Box.y,obj2Box.w,obj2Box.h];
        let frame = 15;
        x2 += frame;
        w2 -= 2*frame;
        return ((x2 <= x1 && x1 <= x2+w2) || (x2 <= x1+w1 && x1+w1 <= x2+w2) || (x1<x2 && x1+w1 > x2+w2)) && 
                (y2 <= y1+h1 && y1+h1 <= y2+h2);
    }


    /**
     * This function checks if this object is colliding with a barrier
     * 
     * @param {string} direction - direction which side has to be checked, 'right', 'left', 'top', 'bottom'
     * @returns {boolean} - true: is colliding, false: is not colliding
     */
    checkBarrier(direction){
        let barrier = false;
        world.level.barrier.forEach(b => {
            b.hitBox.forEach(hB =>{
                switch (direction) {
                    case 'right':   
                        barrier = barrier || this.isBarrierRight(hB)? true : false;
                        break;
                    case 'left':   
                        barrier = barrier || this.isBarrierLeft(hB)? true : false;
                        break;
                    case 'top': 
                        barrier = barrier || this.isBarrierTop(hB)? true : false;
                        break;
                    case 'bottom':
                        barrier = barrier || this.isBarrierBottom(hB)? true : false;
                        break;
                }
            })
        });
        return barrier;
    }


    /**
     * This function checks if this object is colliding with the level border
     * 
     * @param {string} direction - direction which side has to be checked, 'right', 'left', 'top', 'bottom' 
     * @returns {boolean} - true: is colliding, false: is not colliding
     */
    checklvlBorder(direction){
        switch (direction) {
            case 'right':   
                return this.hitBox.x + this.hitBox.w > world.level.length - this.speedX/2;
            case 'left':   
                return this.hitBox.x < this.speedX/2;;
            case 'top': 
                return this.hitBox.y < this.speedY/2 + 30;   
            case 'bottom': 
                return this.hitBox.y + this.hitBox.h > world.level.height - this.speedY/2 - 50;
        }
    }




    /**
     * This function checks if this object can move right
     * 
     * @returns {boolean} - true: can move right, false: can't move right
     */
    canMoveRight(){
        return !this.checkBarrier('right') && !this.checklvlBorder('right');
    }


    /**
     * This function checks if this object can move left
     * 
     * @returns {boolean} - true: can move left, false: can't move left
     */
    canMoveLeft(){
        return !this.checkBarrier('left') && !this.checklvlBorder('left');
    }


    /**
     * This function checks if this object can move up
     * 
     * @returns {boolean} - true: can move up, false: can't move up
     */
    canMoveUp(){
        return !this.checkBarrier('top') && !this.checklvlBorder('top');
    }


    /**
     * This function checks if this object can move down
     * 
     * @returns {boolean} - true: can move down, false: can't move down
     */
    canMoveDown(){
        return !this.checkBarrier('bottom') && !this.checklvlBorder('bottom');
    }


    /**
     * This function starts an stopaable interval for this object
     * 
     * @param {function} fn - function which will be excuted frequently
     * @param {*} tInterval - interval time
     */
    setStoppableInterval(fn, tInterval){
        let ID = setInterval(fn,tInterval);
        this.timerIDs.push(ID);
    }


    /**
     * This function clear all intervalls which are registered in timerIDs
     */
    clearRunIntervalls(){
        this.timerIDs.forEach(ID => clearInterval(ID));
    }
}