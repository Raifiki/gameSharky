/**
 * Class representing a fighatbale object. A fightable object can get hit, can attack, can detect and can die.
 * @extends MoveableObject 
 */
class FightableObject extends MoveableObject {
    //fields
    maxHealth;
    health;
    damage;
    hitBox = {w: 0,h: 0};
    attackBox= {w: 0,h: 0};
    detectBox= {w: 0,h: 0};
    
    hitBy;
    attackType;

    detectedObject;

    state = 'IDLE';

    timeStamps = {
        lastAction: new Date().getTime(),
        lastHit: new Date().getTime(),
        startAttack: new Date().getTime(),
        deadTime: new Date().getTime()*2,
    }
    tAttack = 1;
    tHurt = 1;
    tDead = 1;
    tAction = 1;

        //methodes
    /**
     * This function initialize an fightable object
     * 
     * @param {number} x - this is the initial x coordinate of the object
     * @param {number} y - this is the initial y coordinate of the object
     * @param {number} w - this is the width of th object
     * @param {number} h - this is the hieght of th object
     */
    constructor(x,y,w,h){
        super(x,y,w,h);
        this.updateBoxes(0,0);
        this.run10();
    }


    /**
     * This function generates the 10ms game loop for the fightable object. If the global gamestate is run the loop functions will be executed
     */
    run10(){
        setInterval(() => this.handleTimers(),10);
    }


    /**
     * This function set the state of the object. Possible states: IDLE, MOVE, ATTACK, HURT, DEAD and REMOVE
     * 
     * @param {string} event - transition event to an other state. Events: 'idle','move', 'attack', 'hurt', 'dead', 'remove', 'attackFinished', 'hurtFinished'
     */
    setState(event){
        switch (this.state) {
            case 'IDLE':
                this.stateIDLE(event);
                break;
            case 'MOVE':
                this.stateMOVE(event);
                break;   
            case 'ATTACK':
                this.stateATTACK(event);
                break; 
            case 'HURT':
                this.stateHURT(event);
                break; 
            case 'DEAD':
                this.stateDEAD(event);
                break; 
            case 'REMOVE':
                break;      
        }
    }


    /**
     * This function represents the idle state of this object.
     * 
     * @param {string} event - transition event from IDLE state. Events: 'hurt', 'attack', 'move'
     */
    stateIDLE(event){
        if (event == 'hurt') {
            this.state = 'HURT';
            this.timeStamps.lastHit = new Date().getTime();
        } else if (event == 'attack'){
            this.state = 'ATTACK';
            this.timeStamps.startAttack = new Date().getTime();  
        } else if (event == 'move'){
            this.state = 'MOVE';
        }
    }


    /**
     * This function represents the move state of this object.
     * 
     * @param {string} event - transition event from MOVE state. Events: 'hurt', 'attack', 'idle'
     */
    stateMOVE(event){
        if (event == 'hurt') {
            this.state = 'HURT';
            this.timeStamps.lastHit = new Date().getTime();
        } else if (event == 'attack'){
            this.state = 'ATTACK';
            this.timeStamps.startAttack = new Date().getTime();  
        } else if (event == 'idle'){
            this.state = 'IDLE';
            this.timeStamps.lastAction = new Date().getTime();
        }
    }


    /**
     * This function represents the attack state of this object.
     * 
     * @param {string} event - transition event from ATTACK state. Events: 'hurt', 'attackFinsihed'
     */
    stateATTACK(event){
        if (event == 'hurt') {
            this.state = 'HURT';
            this.timeStamps.lastHit = new Date().getTime();
        } else if (event == 'attackFinished'){
            this.state = 'IDLE';
            this.timeStamps.lastAction = new Date().getTime();
        }
    }


    /**
     * This function represents the hurt state of this object.
     * 
     * @param {string} event - transition event from HURT state. Events: 'dead', 'hurtFinished'
     */
    stateHURT(event){
        if (event == 'dead') {
            this.state = 'DEAD';
            this.timeStamps.deadTime = new Date().getTime();
        }
        if (event == 'hurtFinished') {
            this.state = 'IDLE';
            this.timeStamps.lastAction = new Date().getTime();
        }
    }


    /**
     * This function represents the dead state of this object.
     * 
     * @param {string} event - transition event from DEAD state. Events: 'remove'
     */
    stateDEAD(event){
        if (event == 'remove') {
            this.state = 'REMOVE';
        }
    }


    /**
     * This function updates the hitbox, attackbox and detectbox coordinates
     * 
     * @param {number} yOfs - offset in y direction of the hitbox, attackbox and detectbox.
     * @param {number} xOfsHit - offset in x direction of the hitbox with respect to the center.
     * @param {number} xOfsAtk - offset in x direction of the attackbox with respect to the center.
     * @param {number} xOfsDet - offset in x direction of the detectbox with respect to the center.
     */
    updateBoxes(yOfs,xOfsHit,xOfsAtk,xOfsDet){
        this.updateBox(this.hitBox,xOfsHit,yOfs);
        this.updateBox(this.attackBox,xOfsAtk,yOfs);
        this.updateBox(this.detectBox,xOfsDet,yOfs);
    }


    /**
     * This function updats the coordinates of a box
     * 
     * @param {json} box - box as json with the keys: x,y,h,w
     * @param {number} xOfs - offset in x direction of the box with respect to the center
     * @param {number} yOfs - offset in y direction of the box with respect to the center
     */
    updateBox(box,xOfs,yOfs){
        if (this.directionX) {
            box.x = this.center.x  + xOfs;
        } else {
            box.x = this.center.x - box.w - xOfs;             
        }
        box.y = this.center.y - box.h/2 + yOfs;
    }


    /**
     * This functions checks if 2 boxes are colliding. Colliding: boxes are touching each other on the map
     * 
     * @param {json} obj1Box - box as json with the keys: x,y,h,w
     * @param {json} obj2Box - box as json with the keys: x,y,h,w
     * @returns {boolean} - true, if the boxes are colliding, fale, boxes are not colliding
     */
    isColliding(obj1Box,obj2Box){
        let [x1,y1,w1,h1]= [obj1Box.x,obj1Box.y,obj1Box.w,obj1Box.h];
        let [x2,y2,w2,h2]= [obj2Box.x,obj2Box.y,obj2Box.w,obj2Box.h];
        return ((x2 <= x1 && x1 <= x2+w2) || (x2 <= x1+w1 && x1+w1 <= x2+w2) || (x1<x2 && x1+w1 > x2+w2)) && 
               ((y2 <= y1 && y1 <= y2+h2) ||(y2 <= y1+h1 && y1+h1 <= y2+h2) ||  (y1<y2 && y1+h1 > y2+h2));
    }


    /**
     * This function do an hit to this object
     * 
     * @param {number} dmg - amount of damage to this object
     */
    hit(dmg){
        if (!this.isState('HURT')) {
            this.health -= dmg;
            this.setState('hurt');
            if (this.health<=0) this.kill();
        }
    }


    /**
     * This function kills this object
     */
    kill(){
        this.health = 0;
        this.setState('dead');
    }


    /**
     * This function checks if this object is hurt
     * 
     * @param {number} duration - duration how long this object is hurt
     * @returns {bollean} - true, this object is hurt, false, this object is not hurt
     */
    isHurt(duration){
        let dt = new Date().getTime() - this.timeStamps.lastHit;
        dt = dt/1000;
        return dt<duration;
    }


    /**
     * This function checks if this object is attacking
     * 
     * @param {number} duration - duration how long this object is attaking
     * @returns {bollean} - true, this object is attaking, false, this object is not attacking
     */
    isAttacking(duration){
        let dt = new Date().getTime() - this.timeStamps.startAttack;
        dt = dt/1000;
        return dt<duration;
    }


    /**
     * This function checks if this object is dead
     * 
     * @param {number} duration - duration how long this object is dead
     * @returns {bollean} - true, this object is dead, false, this object is not dead
     */
    isDead(duration){
        let dt = new Date().getTime() - this.timeStamps.deadTime;
        dt = dt/1000;
        return dt<duration;
    }


    /**
     * This function checks if this object is lazy
     * 
     * @param {number} duration - duration how long this object need to get lazy
     * @returns {bollean} - true, this object is lazy, false, this object is not lazy
     */
    isLazy(duration){
        let dt = new Date().getTime() - this.timeStamps.lastAction;
        dt = dt/1000;
        return dt>duration;
    }


    /**
     * This function checks if this object detects something
     * 
     * @param {FightableObject} obj - object that can be detected
     * @returns {boolean} - true, object detected, false, no object detected
     */
    isDetecting(obj){
        return this.isColliding(this.detectBox,obj.hitBox);
    }


    /**
     * This function checks if this object can move
     * 
     * @returns {boolean} - true: can move, false: can't move
     */
    canMove(){
        return this.isState('IDLE') || this.isState('HURT') || this.isState('ATTACK');
    }


    /**
     * This function checks if this object can attack
     * 
     * @returns {boolean} - true: can attack, false: can't attack
     */
    canAttack(){
        return this.isState('IDLE') || this.isState('MOVE') ;
    }


    /**
     * This function checks if the state of this object is equal to state
     * 
     * @param {string} state - state ti check
     * @returns {boolean} - true: state is equal, false: state is not equal
     */
    isState(state){
        return this.state == state;
    }
    

    /**
     * This function checks if the duration of the state time is reached
     */
    handleTimers(){
        if(!this.isAttacking(this.tAttack)) this.setState('attackFinished');
        if (!this.isHurt(this.tHurt)) this.setState('hurtFinished');
        if (!this.isDead(this.tDead)) this.setState('remove');
    }
}