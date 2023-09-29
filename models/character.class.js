/**
 * Class representing the Character
 * @extends FightableObject
 */
class Character extends FightableObject{
    //field
    keyListener;

    coins = 0;
    poison = 1;

    bubbleShots = 0;
    bubbleType = 'normal';
    bubbleChangeCnt = 0;

    xOfst = 200;

    soundCache = {
        bored: new Audio('./audio/sharky/bored.mp3'),
        swim: new Audio('./audio/sharky/swim.mp3'),
        hitElectroshock: new Audio('./audio/sharky/hit-electroshock.mp3'),
        hitPoison: new Audio('./audio/sharky/hit-poison.mp3'),
        dead: new Audio('./audio/sharky/dead.mp3'),
        bubbleNormal: new Audio('./audio/sharky/bubbletrap-normal.mp3'),
        bubblePoison: new Audio('./audio/sharky/bubbletrap-poison.mp3'),
    };

    /**
     * This function initialize an character object
     * 
     * @param {number} x - this is the initial x coordinate from the character
     * @param {number} y - this is the initial y coordinate from the character
     */
    //method
    constructor(x,y){
        super(x,y,200,200);
        this.loadImg('./img/01_Sharkie/1_Idle/1.png');

        this.speedX = 4;
        this.speedY = 4;

        this.health = 100;
        this.maxHealth = this.health;
        this.damage = 40;

        this.hitBox.w = 0.5*this.width;
        this.hitBox.h = 0.2*this.width;
        this.attackBox.w = 0.5*this.width;
        this.attackBox.h = 0.3*this.width;
        this.detectBox.w = 3*this.width;
        this.detectBox.h = 2*this.width;

        this.tAttack =0.8;
        this.tDead = 3;
        this.tHurt = 1;
        this.tAction =5;

        this.addAnimationIMGs();
        this.setSoundSetting();

        this.Crun10();
        this.Crun100();
        this.loadBubbleShot(3,3);
    }


    /**
     *  This function generates the 10ms game loop for the character. If the global gamestate is run the loop functions will be executed
     */
    Crun10(){
        this.setStoppableInterval(() => {
            if (gameState == 'RUN') {
                this.attack();
                this.move();
                this.chooseBubbleType();
            }
        },10);
    }


    /**
     * This function generates the 100ms game loop for the character. If the global gamestate is run the loop functions will be executed
     */
    Crun100(){
        this.setStoppableInterval(() =>{
            this.animate();
        },100)
    } 

    /**
     * This function moves the character according the direction and speed of this object
     * 
     */
    move(){
        this.setState('idle');
        if (this.canMove()) {
            if (this.keyListener.RIGHT) this.moveRight();
            if (this.keyListener.LEFT) this.moveLeft();
            if (this.keyListener.UP) this.moveUp();
            if (this.keyListener.DOWN) this.moveDown();
            this.updateBoxes(30,-this.hitBox.w/2,-5,-150);
            this.updateCameraOfst();
        } else if (this.isState('DEAD')) {
            this.setMoveBehaviorDead();
        }
    }


    /**
     * This function moves the character right and set the Xdirection of the character
     */
    moveRight(){
        super.moveRight();
        this.setDirectionX('right');
        this.setState('move');
    }


    /**
     * This function moves the character left and set the Xdirection of the character
     */
    moveLeft(){
        super.moveLeft();
        this.setDirectionX('left');
        this.setState('move');
    }


    /**
     * This function moves the character up
     */
    moveUp(){
        super.moveUp();
        this.setState('move');
    }


    /**
     * This function moves the character down
     */
    moveDown(){
        super.moveDown();
        this.setState('move');
    }


    /**
     * This function set the move behavior of the character if it is dead
     */
    setMoveBehaviorDead(){
        this.speedY = 1;
        if (this.hitBy == 'poison') {
            this.moveUp();
            this.updateBoxes(-50,-this.hitBox.w/2,0,0);
        } else {
            this.moveDown();
            this.updateBoxes(15,-this.hitBox.w/2,0,0);
        }
    }


    /**
     * This function updates the camera offset of the world
     */
    updateCameraOfst(){
        if (this.endbossScreen()) {
            world.cameraOfst = world.level.length - canvas_w;
        } else {
            world.cameraOfst = this.calcNewCameraOfst();
        }
    }


    /**
     * This function checks if the endbossscreen is active
     * 
     * @returns {bollean} - true if endboss screen is reached, else false
     */
    endbossScreen(){
        return world.endboss instanceof Endboss;
    }


    /**
     * This function calculates the new camera ofset
     * 
     * @returns {number} - camera offset as number
     */
    calcNewCameraOfst(){
        let newOfst = this.hitBox.x - this.xOfst;
        if (this.isOfstInLvlBorders(newOfst)){
            return  newOfst;
        } else if(this.ofstExceedsLeftBorder(newOfst)){
           return 0;
        } else if (this.ofstExceedsRightBorder(newOfst)){
            return world.level.length - world.canvas.width;
        } else {
            return world.cameraOfst;
        }
    }

    
    /**
     * This funtions checks of the offsett is wthin the level border
     * 
     * @param {number} newOfst - new camera offset
     * @returns {bollean} - true if the offset is inside the level border
     */
    isOfstInLvlBorders(newOfst){
        return newOfst>= 0 && newOfst <= world.level.length - world.canvas.width;
    }


    /**
     * This funtions checks of the offsett exceeds the left border
     * 
     * @param {number} newOfst - new camera offset
     * @returns {bollean} - true if the offset is outside the left border
     */
    ofstExceedsLeftBorder(newOfst){
        return newOfst<0;
    }


    /**
     * This funtions checks of the offsett exceeds the right border
     * 
     * @param {number} newOfst - new camera offset
     * @returns {bollean} - true if the offset is outside the right border (lvl length - canvas width)
     */
    ofstExceedsRightBorder(newOfst){
        return newOfst>world.level.length - world.canvas.width;
    }


    /**
     * This function set the x direction of the offset accoring the input parameter
     * 
     * @param {string} dir - direction of the character 'right', 'left'
     */
    setDirectionX(dir){
        if (dir == 'right') {
            this.directionX = true;
        } else {
            this.directionX = false;
        }
        this.setXOfstToCanvasBorder(dir,10,350);        
    }

    /**
     * This function set the x ofset of the character to the canvas border 
     * 
     * @param {string} dir - direction of the character 'right', 'left'
     * @param {number} dx - offset change for each iteration to ramp the offset
     * @param {number} ofsMax - maximal offset 
     */
    setXOfstToCanvasBorder(dir,dx,ofsMax){
        if (dir == 'right') {
            this.xOfst = Math.max(this.xOfst - dx,ofsMax);
        } else {
            this.xOfst = Math.min(this.xOfst + dx,canvas_w - this.hitBox.w - ofsMax);
        }  
    }


    /**
     * This function executs the attack of the character
     */
    attack(){
        if (this.canAttack()) {
            if (this.keyListener.BUBBLESHOT) {
                this.setState('attack');
                this.attackBubbleTrap();
                this.attackType = 'bubbleTrap';
            }
            if (this.keyListener.SLAP) {
                this.setState('attack');
                this.attackType = 'slap';
            }
        }
    }


    /**
     * This function executs the bubbletrap attack
     * 
     */
    attackBubbleTrap(){
        if (this.bubbleShots > 0) setTimeout(() => { this.generateBubble()},800);
    }

    /**
     * This function generates a Bubble on the map depended the settings defined in this object
     */
    generateBubble(){
        let [x,y,spdX] = this.calcBubbleKinematics();
        if(this.bubbleType == 'poison') this.poison--;
        world.bubbles.push(new Bubble(x,y,spdX,0, this.directionX,true,this.bubbleType,'character'));
        this.bubbleShots--;
    }

    /**
     * This function calculates the kinematics (x coordinate, y coordinate,speed in x)
     * 
     * @returns {array} - array with x,y,spdX properties
     */
    calcBubbleKinematics(){
        let xOfs = this.directionX? 80:-55;
        let [x,y] = [this.center.x+xOfs,this.center.y+20];
        let spdX = (this.bubbleType == 'poison')? 6.5:4;
        return [x,y,spdX]
    }


    /**
     * This function choose the bubble type for the bubbletrap attack
     */
    chooseBubbleType(){
        if (this.canBubbleTypeChangeTo('poison') && this.poison > 0) {
            this.bubbleType = 'poison';
            this.bubbleChangeCnt = 0;
        } else if(this.canBubbleTypeChangeTo('normal') || this.poison <= 0) {
            this.bubbleType = 'normal';
            this.bubbleChangeCnt = 0;
        }
        this.bubbleChangeCnt++;
    }


    /**
     * This function checks if the bubble type can be changed
     * 
     * @param {string} bubbleType - bubble type which should be set 'poison', normal
     * @returns {bollean} - true, can be changed, - can not be chaned
     */
    canBubbleTypeChangeTo(bubbleType){
        return this.bubbleType != bubbleType && this.keyListener.CHANGEBUBBLE && this.bubbleChangeCnt > 20;
    }


    /**
     * This function reload a bubble ever 'time' seconds
     * 
     * @param {number} time - time in s to reload a bubble
     * @param {number} maxBubbles - maximal bubbles for this character
     */
    loadBubbleShot(time,maxBubbles){
        this.setStoppableInterval(() =>{
            if (this.bubbleShots < maxBubbles) this.bubbleShots++;
        },time*1000);
    }


    /**
     * This function add all animation images of this character to the image cache
     */
    addAnimationIMGs(){
        this.animationIMGs = ANIMATION_IMGS_CHARACTER;
        this.addIMG2Cache(this.animationIMGs.IDLE);
        this.addIMG2Cache(this.animationIMGs.LONG_IDLE);
        this.addIMG2Cache(this.animationIMGs.SWIM);
        this.addIMG2Cache(this.animationIMGs.ATTACK_BUBBLETRAP_NORMALBUBBLE);
        this.addIMG2Cache(this.animationIMGs.ATTACK_BUBBLETRAP_POISONBUBBLE);
        this.addIMG2Cache(this.animationIMGs.ATTACK_BUBBLETRAP_WOBUBBLE);
        this.addIMG2Cache(this.animationIMGs.ATTACK_SLAP);
        this.addIMG2Cache(this.animationIMGs.HURT_POISON);
        this.addIMG2Cache(this.animationIMGs.HURT_ELECTRICSHOCK);
        this.addIMG2Cache(this.animationIMGs.DEAD_POISON);
        this.addIMG2Cache(this.animationIMGs.DEAD_ELECTROSHOCK);
    }


    /**
     * This function sets the animation which has to be executed for the current character properties
     */
    animate(){
        if (this.isState('IDLE')) this.animateIDLE();
        if (this.isState('MOVE')) this.animateMOVE();
        if (this.isState('ATTACK')) this.animateATTACK();
        if (this.isState('HURT')) this.animateHURT();
        if (this.isState('DEAD')) this.animateDEAD();
    }


    /**
     * This function replay the animation for IDLE state
     */
    animateIDLE(){
        if (this.isLazy(this.tAction)) {
            this.playAnimation(this.animationIMGs.LONG_IDLE,'repeat');
            this.playSound('bored');
        } else {
            this.playAnimation(this.animationIMGs.IDLE,'repeat');
            this.stopSound('swim');
        }
    }


    /**
     * This function replay the animation for MOVE state
     */
    animateMOVE(){
        this.playAnimation(this.animationIMGs.SWIM,'repeat');
        this.playSound('swim');
    }


    /**
     * This function replay the animation for Attack state
     */
    animateATTACK(){
        if (this.attackType == 'bubbleTrap') {
            this.animateBubbleTrap();
        } else {
            this.animateSlap();
        }
    }


    /**
     * This function replay the animation for bubble trap attack
     */
    animateBubbleTrap(){
        if (this.bubbleShots > 0) {
            if (this.bubbleType == 'poison') {
                this.playAnimation(this.animationIMGs.ATTACK_BUBBLETRAP_POISONBUBBLE);
                this.playSound('bubblePoison');
            } else {
                this.playAnimation(this.animationIMGs.ATTACK_BUBBLETRAP_NORMALBUBBLE);
                this.playSound('bubbleNormal');
            }
        } else {
            this.playAnimation(this.animationIMGs.ATTACK_BUBBLETRAP_WOBUBBLE);
        }
    }


    /**
     * This function play the animation for slap attack
     */
    animateSlap(){
        this.playAnimation(this.animationIMGs.ATTACK_SLAP);
    }


    /**
     * This function play the animation for HURT state
     */
    animateHURT(){
        if (this.hitBy == 'poison') {
            this.playAnimation(this.animationIMGs.HURT_POISON,'repeat');
            this.playSound('hitPoison');
        } else {
            this.playAnimation(this.animationIMGs.HURT_ELECTRICSHOCK,'repeat');
            this.playSound('hitElectroshock');
        }
    }


    /**
     * This function play the animation for DEAD state
     */
    animateDEAD(){
        if (this.hitBy == 'poison') {
            this.playAnimation(this.animationIMGs.DEAD_POISON);
        } else {
            this.playAnimation(this.animationIMGs.DEAD_ELECTROSHOCK);
        }
        this.playSound('dead');
    }


    /**
     * This function plays the sound of the sound cache with the sound key
     * 
     * @param {string} soundKey - sound which should be played, 'bored', 'swim', 'hitElectroshock', 'hitPoison', 'dead', 'bubbleNormal', 'bubblePoison'
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
     * This function stops the sound of the sound cache with the sound key
     */
    stopSound(soundKey){
        this.soundCache[soundKey].pause();
        this.soundCache[soundKey].currentTime = 0;
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
     * This function clears the character
     */
    clearCharacter(){
        this.clearRunIntervalls();
    }
}

