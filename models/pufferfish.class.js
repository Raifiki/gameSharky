/**
 * Class representing a pufferfish
 * @extends FightableObject
 */
class Pufferfish extends FightableObject {
    //fields
    cntItems = 1;
    type;

    soundCache = {
        hitBubble: new Audio('./audio/enemie/bubble-hit.mp3'),
        hitSlap: new Audio('./audio/enemie/slap-hit.mp3'),
    };

    //methodes
    /**
     * This function initialize an pufferfish object
     * 
     * @param {number} x - this is the initial x coordinate of a pufferfish
     * @param {number} y - this is the initial y coordinate of a pufferfish
     * @param {number} spdY - Speed in y direction
     * @param {string} type - type of the pufferfish, 'green', 'orange', 'red'
     */
    constructor(x,y,spdY,type){
        super(x,y,80,80);
        
        this.directionIMG = false;
        this.directionX = false;
        this.speedY = spdY;
        this.setType(type);

        this.health = 20;
        this.maxHealth = this.health;
        this.damage = 15;
        this.state = 'MOVE';


        this.tDead = 1;
        this.tHurt = 0.7;

        this.hitBox.w = 0.95*this.width;
        this.hitBox.h = 0.7*this.width;
        this.attackBox.w = 0*this.width;
        this.attackBox.h = 0*this.width;
        this.detectBox.w = 0*this.width;
        this.detectBox.h = 0*this.width;

        this.setDifficulty();

        this.addAnimationIMGs();
        this.setSoundSetting();

        this.PFrun10();
        this.PFrun100();
    }


    /**
     * This function generates the 10ms game loop for the pufferfish. If the global gamestate is run the loop functions will be executed
     */
    PFrun10(){
        this.setStoppableInterval(() => {
            if (gameState == 'RUN') {
                this.move();
                this.dropItem();
             }
        },10)
    }


    /**
     * This function generates the 100ms game loop for the pufferfish. If the global gamestate is run the loop functions will be executed
     */
    PFrun100(){
        this.setStoppableInterval(() =>{
            this.animate();
        },100)
    }

    
    /**
     * This function set the type of the pufferfish
     * 
     * @param {*} type 
     */
    setType(type){
        this.type = type;
        if (type == 'green') this.setTypeGreen();
        if (type == 'orange') this.setTypeOrange();
        if (type == 'red') this.setTypeRed();
    }


    /**
     * This function set the properties of a green pufferfish
     */
    setTypeGreen(){
        this.loadImg('./img/02_Enemy/1_Pufferfish/1_Swim/g1.png');
        this.speedX = 1;
    }

    /**
     * This function set the properties of a orange pufferfish
     */
    setTypeOrange(){
        this.loadImg('./img/02_Enemy/1_Pufferfish/1_Swim/o1.png');
        this.speedX = 1.5;
    }


    /**
     * This function set the properties of a red pufferfish
     */
    setTypeRed(){
        this.loadImg('./img/02_Enemy/1_Pufferfish/1_Swim/r1.png');
        this.speedX = 2;
    }


    /**
     * This function moves the pufferfish according the direction and speed of this object
     */
    move(){
        this.setState('idle');
        if (this.canMove()) {
            this.setMoveBehavior();
            (this.directionX)? this.moveRight(): this.moveLeft();
            this.setState('move');
        } else if (this.isState('DEAD')){
            this.setMoveBehaviorDead();
        }
        this.updateBoxes(-10,-this.hitBox.w/2,-this.attackBox.w/2,-this.detectBox.w/2);
    }


    /**
     * This function set the moving behavior
     */
    setMoveBehavior(){
        this.setMBMovingAtBorders();
    }

    /**
     * This function set the moveing properties if the pufferfish is colliding to the level border or a barrier
     */
    setMBMovingAtBorders(){
        if (this.isCollisionWithBorderX()) this.directionX = !this.directionX;
        if (this.isCollisionWithBorderY()) this.directionY = !this.directionY;
    }
    

    /**
     * This function checks if the pufferfish is colliding with the level border or an barrier in x direction
     * 
     * @returns {boolean} - true: is colliding, false: is not colliding
     */
    isCollisionWithBorderX(){
        return this.checklvlBorder('left') || this.checkBarrier('left') || this.checklvlBorder('right') || this.checkBarrier('right');
    }


    /**
     * This function checks if the pufferfish is colliding with the level border or an barrier in y direction
     * 
     * @returns {boolean} - true: is colliding, false: is not colliding
     */
    isCollisionWithBorderY(){
        return this.checklvlBorder('top') || this.checkBarrier('top') || this.checklvlBorder('bottom') || this.checkBarrier('bottom');
    }


    /**
     * This function set the move behavior of the pufferfish if it is dead
     */
    setMoveBehaviorDead(){
        this.speedX = 1;
        this.speedY = 5;
        (this.directionX)? this.moveRight() : this.moveLeft();
        this.moveUp();
    }


    /**
     * This function drop the item if the object is removed from the map
     */
    dropItem(){
        if (this.canDropItem()) {
            (this.type == 'red')? this.generateItem('heart'): this.generateItem('coin');      
            this.cntItems--; 
        }
    }


    /**
     * This function checks if the object can drop a Item
     * 
     * @returns {boolean} true: drop item, false: don't drop item
     */
    canDropItem(){
        return this.isState('DEAD') && this.cntItems > 0;
    }


    /**
     * This function generates the item on the map
     * 
     * @param {string} type - defines the type of the item, 'coin', 'poison', 'heart'
     */
    generateItem(type){
        world.level.collectables.push(new CollectableObject(this.center.x,this.center.y,type));  
    }


    /**
     * This function add all animation images of the pufferfish to the image cache
     */
    addAnimationIMGs(){
        this.animationIMGs = ANIMATION_IMGS_PUFFERFISH;
        this.addIMG2Cache(this.animationIMGs.green.SWIM);
        this.addIMG2Cache(this.animationIMGs.green.DEAD);
        this.addIMG2Cache(this.animationIMGs.orange.SWIM);
        this.addIMG2Cache(this.animationIMGs.orange.DEAD);
        this.addIMG2Cache(this.animationIMGs.red.SWIM);
        this.addIMG2Cache(this.animationIMGs.red.DEAD);
    }


    /**
     * This function sets the animation which has to be executed for the current pufferfish properties
     */
    animate(){
        if (this.isState('MOVE')) this.animateMOVE();
        if (this.isState('HURT')) this.animateHURT();
        if (this.isState('DEAD')) this.animateDEAD();
    }


    /**
     * This function replay the animation for MOVE state
     */
    animateMOVE(){
        if (this.type == 'green') {
            this.playAnimation(this.animationIMGs.green.SWIM,'repeat');
        }
        if (this.type == 'orange') {
            this.playAnimation(this.animationIMGs.orange.SWIM,'repeat');
        }
        if (this.type == 'red') {
            this.playAnimation(this.animationIMGs.red.SWIM,'repeat');
        }
    }

    /**
     * This function replay the animation for HURT state
     */
    animateHURT(){
        this.playAnimation(this.animationIMGs.HURT,'repeat');
        (this.hitBy == 'slap')? this.playSound('hitSlap'):this.playSound('hitBubble');
    }

    /**
     * This function replay the animation for Dead state
     */
    animateDEAD(){
        if (this.type == 'green') {
            this.playAnimation(this.animationIMGs.green.DEAD,'repeat');
        }
        if (this.type == 'orange') {
            this.playAnimation(this.animationIMGs.orange.DEAD,'repeat');
        }
        if (this.type == 'red') {
            this.playAnimation(this.animationIMGs.red.DEAD,'repeat');
        }
        (this.hitBy == 'slap')? this.playSound('hitSlap'):this.playSound('hitBubble');
    }


    /**
     * This function plays the sound of the sound cache with the sound key
     * 
     * @param {string} soundKey - sound which should be played, 'hitBubble', 'hitSlap'
     */
    playSound(soundKey){
        if (this.isSoundOn()) this.soundCache[soundKey].play();
    }

    /**
     * This function sets the setting of the sounds
     */
    setSoundSetting(){
        Object.keys(this.soundCache).forEach(key => {
            this.soundCache[key].volume = gameSoundVolume;
        });
    }


    /**
     * This function checks if the sound is switched on
     * 
     * @returns {boolean} - true: sound on, false: sound off
     */
    isSoundOn(){
        return sound == 'ON' && gameState == 'RUN';
    }


    /**
     * This function sets the difficulty of an pufferfsih
     */
    setDifficulty(){
        if (difficulty == 'EASY') {
            this.speedY *= 0.8;
        } else if(difficulty == 'HARD' || difficulty == 'EXTREME'){
            this.damage *= 1.2; 
        }
    }
}