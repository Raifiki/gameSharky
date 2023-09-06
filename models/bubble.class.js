/** 
 * Class representing a Bubble. 
 * @extends FightableObject
 */

class Bubble extends FightableObject{
    //fields
    IMGs = {
        normal: './img/01_Sharkie/4_Attack/BubbleTrap/Bubble.png',
        poison: './img/01_Sharkie/4_Attack/BubbleTrap/PoisonedBubble.png',
    }
    from;
    type;
    
    //methodes
    /**
     * This function create an new bubble
     * 
     * @param {number} x - this is the x coordinate from the bubble object
     * @param {number} y - this is the y coordinate from the bubble object
     * @param {number} speedX - this is the speed in x direction of the bubble object
     * @param {number} speedY - this is the speed in y direction of the bubble object
     * @param {bollean} dirX - this is the direction in x of the bubble object, true => right, false => left
     * @param {bollean} dirY - this is the direction in y of the bubble object, true => up, false => down
     * @param {string} type - this is the type of the bubble object, 'normal', 'poison'
     * @param {string} from - this is the object from which the bubble is created, 'character': from sharky, 'enemy': from enemy
     */
    constructor(x,y,speedX,speedY,dirX,dirY,type,from){
        super(x-30/2,y-30/2,30,30);
        this.speedX = speedX;
        this.speedY = speedY;
        this.setType(type);
        this.directionX = dirX;
        this.directionY = dirY;


        this.health = 1;
        this.state = 'MOVE';
        this.from = from;

        this.hitBox.w = 1*this.width;
        this.hitBox.h = 1*this.width;
        this.attackBox.w = 0;
        this.attackBox.h = 0;
        this.detectBox.w = 0;
        this.detectBox.h = 0;

        this.Brun10();
    }


    /**
     * This function generates the game loop for the bubble object. If the global gamestate is run the loop functions will be executed
     * 
     */
    Brun10(){
        setInterval(() => {
            if (gameState == 'RUN') {
                this.move();
                this.removeBubble();
            }
        },10)
    }


    /**
     * This function moves the bubble according the set direction
     * 
     */
    move(){
        if (this.directionX) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
        if (this.directionY) {
            this.moveUp();
        } else {
            this.moveDown();
        }
        this.setSpeed();
        this.updateBoxes(0,-this.hitBox.w/2,-this.attackBox.w/2,-this.detectBox.w/2);
    }


    /**
     * This function set the type of tha bubble and all different prperties
     * 
     * @param {string} type - this is the type of the bubble, 'normal': normal bubble, 'poison': poison bubble
     */
    setType(type){
        this.type = type;
        if (type == 'poison') {
            this.loadImg(this.IMGs.poison);
            this.damage = 30;
        } else {
            this.loadImg(this.IMGs.normal);
            this.speedY = 0;
            this.damage = 15;
        }
    }


    /**
     * This function sets the new speed value of the bubble type normal
     * 
     */
    setSpeed(){
        if (this.type == 'normal') {
            this.speedX = Math.max(this.speedX - 0.05, 0);
            this.speedY += 0.025;
        }
    }


    /**
     * This function checks if this bubble is colliding with any barrier border or level border
     * 
     * @returns - true => if there is a collsion, false => if there is no collsion
     */
    isCollisionToBorder(){
        return this.isCollisionToBarrier() || this.isCollisionToLvlBorder();
    }



    /**
     * This functions checks if the bubble is colliding with a map barrier
     * 
     * @returns - true => if there is a collsion, false => if there is no collsion
     */
    isCollisionToBarrier(){
        return this.checkBarrier('right') || this.checkBarrier('left') || this.checkBarrier('top') || this.checkBarrier('bottom');
    } 


    /**
     * This functions checks if the bubble is collding with the level border
     * 
     * @returns - true => if there is a collsion, false => if there is no collsion
     */
    isCollisionToLvlBorder(){
        return this.checklvlBorder('right') || this.checklvlBorder('left') || this.checklvlBorder('top') || this.checklvlBorder('bottom');
    }


    /**
     * This function checks if the bubble is colliding with the canvas border
     * 
     * @returns - true => if there is a collsion, false => if there is no collsion
     */
    isCollsionToCanvasBorder(){
        let ofst = world.cameraOfst;
        return this.center.x < ofst || this.center.x > ofst + canvas_w;
    }


    /**
     * This checks if the bubble is colliding with any border
     */
    removeBubble(){
        if (this.isCollisionToBorder() || this.isCollsionToCanvasBorder()) {
            this.setRemoveState();
        }
    }

    /**
     * This function set the state to remove
     * 
     */
    setRemoveState(){
        this.setState('hurt');
        this.setState('dead');
        this.setState('remove');
    }
}