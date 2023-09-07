/**
 * Class representing the Endbos
 * @extends FightableObject
 */
class Endboss extends FightableObject{
    //fields
    smashAttack = {
        x: 2500,
        y: canvas_h/2,
    }
    bubbleDetected = false;
    detectedBubble;
    characterDetected = false;

    introduceStartTime = new Date().getTime();
    //methodes
    /**
     * This function initialize an Endbos object
     * 
     * @param {number} x - this is the initial x coordinate from the character
     * @param {number} y - this is the initial y coordinate from the character
     */
    constructor(x,y){
        super(x,y,300,300);
        this.directionIMG = false;
        this.directionX = false;
        this.directionY = false;

        this.speedX = 0;
        this.speedY = 0;

        this.health = 200;
        this.maxHealth = this.health;
        this.damage = 20;

        this.hitBox.w = 0.8*this.width;
        this.hitBox.h = 0.3*this.height;
        this.attackBox.w = 0.3*this.width;
        this.attackBox.h = 0.2*this.height;
        this.detectBox.w = 1.5*this.width;
        this.detectBox.h = 0.8*this.height;

        this.detectedObject = [];
        this.tAttack = 5;
        this.tDead = 10;
        
        this.addAnimationIMGs();

        this.Whrun10();
        this.Whrun150();
    }


    /**
     * This function generates the 10ms game loop for the endbos. If the global gamestate is run the loop functions will be executed
     */
    Whrun10(){
        setInterval(() => {
            if (gameState == 'RUN') {
                if (this.isIntruduceing()) {
                    this.introduce();
                } else {
                    this.move();
                    this.detect();
                    this.attack();
                }
            }
        },10)
    }


    /**
     * This function generates the 10ms game loop for the endbos. If the global gamestate is run the loop functions will be executed
     */
    Whrun150(){
        setInterval(() =>{
            this.animate();
        },150)
    }


    /**
     * This function handles the endbos behavior at introduction
     */
    introduce(){
        this.speedY += 0.03;
        if (this.isIntroduceAnimation()) {
            this.moveDown();
            this.updateBoxes(40,-this.hitBox.w/2,60,-100);
        } else {
            this.setState('move');
        }
    }

    /**
     * This function checks if the introduce animation is active
     * 
     * @returns {boolean} - true: animation active, false: animation finished
     */
    isIntroduceAnimation(){
        return this.speedY<2.5;
    }


    /**
     * This function checks if the introduction is active
     * 
     * @returns {boolean} - true: introduction active, false: introduction finished
     */
    isIntruduceing(){
        let dt = (new Date().getTime() - this.introduceStartTime)/1000;
        return dt<5
    }


    /**
     * This function moves the character according the direction and speed of this object
     */
    move(){
        this.setState('idle');
        if (this.canMove()) {  
            this.setMoveBehavior();
            if (this.directionY) {
                this.moveUp();
            } else {
                this.moveDown();
            }
            if (this.directionX) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
            this.updateBoxes(40,-this.hitBox.w/2,60,-100);
            this.resizeDetectBoxe(true);
            this.setState('move');
        }
    }


    /**
     * This function set the moving behavior
     */
    setMoveBehavior(){
        if (!this.isState('ATTACK')){
            if (this.bubbleDetected) {
                this.setMBBubbleDetect();
            } else {
                this.setMBMoving();
            }
        }
    }


    /**
     * This function set the moving properties if a bubble is detected
     */
    setMBBubbleDetect(){
        let [spdX,spdY,dirX,dirY] = this.calcEscapeKinematics();
        this.speedX = spdX;
        this.speedY = spdY;
        this.directionX = dirX;
        this.directionY = dirY;
    }


    /**
     * This function set the moveing behavior if the enbos can move
     */
    setMBMoving(){
        if (this.isCollisionWithBorder()) {
            this.setMBMovingAtBorders();
        } else {
            this.setMBRandomMoving();
        }
    }


    /**
     * This function set the moveing properties if the enbos is colliding to the level border or a barrier
     */
    setMBMovingAtBorders(){
        if (this.isCollisionWithBorderX()) this.directionX = !this.directionX;
        if (this.isCollisionWithBorderY()) this.directionY = !this.directionY;
    }


    /**
     * This function checks if the enbos is colliding with the level border or an barrier
     * 
     * @returns {boolean} - true: is colliding, false: is not colliding
     */
    isCollisionWithBorder(){
        return this.isCollisionWithBorderX() || this.isCollisionWithBorderY();
    }


    /**
     * This function checks if the enbos is colliding with the level border or an barrier in x direction
     * 
     * @returns {boolean} - true: is colliding, false: is not colliding
     */
    isCollisionWithBorderX(){
        return this.checklvlBorder('left') || this.checkBarrier('left') || this.checklvlBorder('right') || this.checkBarrier('right');
    }


    /**
     * This function checks if the enbos is colliding with the level border or an barrier in y direction
     * 
     * @returns {boolean} - true: is colliding, false: is not colliding
     */
    isCollisionWithBorderY(){
        return this.checklvlBorder('top') || this.checkBarrier('top') || this.checklvlBorder('bottom') || this.checkBarrier('bottom');
    }


    /**
     * This function sets the moving properties witd a random moving pattern
     */
    setMBRandomMoving(){
        this.speedX = (this.speedX + Math.random()*0.01) %2;
        this.speedY = (this.speedY + Math.random()*0.01) %2;
        if ((Math.random())<0.005) {
            this.directionX = !this.directionX;
        }
        if ((Math.random())<0.005) {
            this.directionY = !this.directionY;
        }
    }


    /**
     * This function detect an character or a normal bubble if it is in detection range
     */
    detect(){
        this.detectBubble();
        this.detectCharacter();
    }


    /**
     * this function detect normal bubbles
     */
    detectBubble(){
        this.bubbleDetected = false;
        world.bubbles.forEach(b => this.setBubbleDetectionProperties(b));
    }

    /**
     * This function set the bubble detection properties of the endbos
     * 
     * @param {Bubble} bubble - Bubble Object which will be checked on detection
     */
    setBubbleDetectionProperties(bubble){
        if (this.isDetecting(bubble) && bubble.type != 'poison') {
            this.bubbleDetected= true;
            this.detectedBubble = bubble;
        } else if(!this.bubbleDetected){
            this.detectedBubble = [];
        }
    }


    /**
     * This function detect the charactter
     */
    detectCharacter(){
        if(this.isDetecting(world.character[0])){
            this.setDetectedObjectProperties();
        } else {
            this.setNoObjectDetectedProperteis();
        }
    }


    /**
     * This function set the object detection properties of the endbos if an object is detected
     */
    setDetectedObjectProperties(){
        this.setState('attack');
        if (!this.characterDetected) {
            this.smashAttack.x = world.character[0].center.x;
            this.smashAttack.y = world.character[0].center.y;
            this.characterDetected = true;
        }
        this.detectedObject = world.character[0];
    }


    /**
     * This function set the object detection properties of the endbos if no object is detected
     */
    setNoObjectDetectedProperteis(){
        this.characterDetected = false;
        this.detectedObject = [];
        this.setState('attackFinished');
    }


    /**
     * This function executes the attack behavior
     */
    attack(){
        if (this.isState('ATTACK')) this.attackSmash();
    }


    /**
     *  This function executes the smash attack behavior, this is separated in 3 phases[angry,smash,move]
     */
    attackSmash(){
        let dt = (new Date().getTime() - this.timeStamps.startAttack)/1000
        if (dt <= 0.5) { // angry
            this.setSmashAttackPropertiesAngry();
        } else if(dt <= 1) { // smash
            this.setSmashAttackPropertiesSmash();
        } else  if(dt <= 4.9){
            this.setSmashAttackPropertiesMove();
        }
    }


    /**
     * This function set the attack properties for the phase angry
     */
    setSmashAttackPropertiesAngry(){
        this.speedX = 0;
        this.speedY = 0;
    }


    /**
     * This function set the attack properties for the phase smash
     */
    setSmashAttackPropertiesSmash(){
        let [spdX,spdY,dirX,dirY] = this.calcAttackKinematics(this.smashAttack.x,this.smashAttack.y,0.75,100);
        this.speedX = spdX;
        this.speedY = spdY;
        this.directionX = dirX;
        this.directionY = dirY;
    }


    /**
     * This function set the attack properties for the phase move
     */
    setSmashAttackPropertiesMove(){
        let [spdX,spdY,dirX,dirY] = this.calcAttackKinematics(this.detectedObject.x,this.detectedObject.y,50,0);
        this.speedX = spdX;
        this.speedY = spdY;
        this.directionX = dirX;
        this.directionY = dirY;
        this.resizeDetectBoxe(false);
    }


    /**
     * This function calculates the attack kinematics for the smash attack. It will calculate the speed that the endbos reaches the destinaion after t secondes
     * 
     * @param {number} x - the x coordinate of the destination
     * @param {number} y - the y coordinate of the destination
     * @param {number} t - the time in seconds till the enbos reach the destination
     * @param {number} ofs - ofset in x direction of the destination
     * @returns {array} - an array with the speed in x and y direction and the direction in x and y [spdX.spdY,dirX,dirY]
     */
    calcAttackKinematics(x,y,t,ofs){
        let xOfs = this.directionX? ofs:-ofs;
        let dx = x - this.center.x - xOfs;
        let dy = y - this.center.y;
        let dt = t*10; // time till object reach detected object (time[s]*samplerate[ms] (run))
        let spdX = Math.abs(dx/dt);
        let spdY = Math.abs(dy/dt);
        let dirX = dx > 0;
        let dirY = dy < 0;
        return [spdX,spdY,dirX,dirY]
    }


    /**
     * This function calculates the escape kinematics if a bubble is detected
     * 
     * @returns {array} - an array with the speed in x and y direction and the direction in x and y [spdX.spdY,dirX,dirY]
     */
    calcEscapeKinematics(){
        let dx = this.detectedBubble.center.x - this.center.x;
        let dy = this.detectedBubble.center.y - this.center.y;
        let dirX = dx < 0;
        let dirY = dy > 0;
        return [5,5,dirX,dirY]
    }


    /**
     * This function rezize the detection box of the endbos
     * 
     * @param {boolean} reset - this resets the  size of the detection box to the initial values, ture: initila values, false: resize box
     */
    resizeDetectBoxe(reset){
        if (!reset){
            this.detectBox.w = 1.5*this.width;
            this.detectBox.h = 0.8*this.width;
        } else {
            this.detectBox.w += 0.8;
            this.detectBox.h += 0.4;
        }
    }


    /**
     * This function add all animation images of this object to the image cache
    */
    addAnimationIMGs(){
        this.animationIMGs = ANIMATION_IMGS_EB_WHALE;
        this.addIMG2Cache(this.animationIMGs.INTRODUCE);
        this.addIMG2Cache(this.animationIMGs.SWIM);
        this.addIMG2Cache(this.animationIMGs.ATTACK);
        this.addIMG2Cache(this.animationIMGs.HURT_BUBBLE);
        this.addIMG2Cache(this.animationIMGs.DEAD);
    }


    /**
     * This function sets the animation which has to be executed for the current character properties
     */
    animate(){
        if (this.isState('IDLE')) {
            if (this.isIntroduceAnimation()) this.playAnimation(this.animationIMGs.INTRODUCE);
        }
        if (this.isState('MOVE')) this.playAnimation(this.animationIMGs.SWIM,'repeat');
        if (this.isState('ATTACK')) this.animateATTACK();
        if (this.isState('HURT')) this.animateHURT();
        if (this.isState('DEAD')) this.playAnimation(this.animationIMGs.DEAD);
        
    }


    /**
     * This function play the animation for HURT state
     */
    animateHURT(){
        if (this.hitBy == 'bubble') {
            this.playAnimation(this.animationIMGs.HURT_BUBBLE,'repeat');
        } else {
            this.playAnimation(this.animationIMGs.HURT_SLAP,'repeat');
        }
    }


    /**
     * This function replay the animation for Attack state
     */
    animateATTACK(){
        let dt = (new Date().getTime() - this.timeStamps.startAttack)/1000
        if (dt <= 0.5) { // angry
            // angry animation fehlt bei den Bildern
        } else if(dt <= 1) { // smash
            this.playAnimation(this.animationIMGs.ATTACK,'repeat');
        } else  if(dt <= 4.9){
            this.playAnimation(this.animationIMGs.SWIM,'repeat');
        } 
    }
}
