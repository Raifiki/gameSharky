/**
 * Class representing a Jellyfish
 * @extends FightableObject
 */
class Jellyfish extends FightableObject {
    //fields
    cntItems = 1;
    type = 'normal';
    radiusCnt = 0;
    frequency = 1/500;
    attackCnt = 0;
    initialSpdX;
    initialSpdY;

    soundCache = {
        hitBubble: new Audio('./audio/enemie/bubble-hit.mp3'),
        hitSlap: new Audio('./audio/enemie/slap-hit.mp3'),
        detect: new Audio('./audio/enemie/jellyfish-detected.mp3'),
        bubble: new Audio('./audio/enemie/jellyfish-bubble.mp3'),
    };
    //methodes
    /**
     * This function initialize an jellyfish object
     * 
     * @param {number} x - this is the initial x coordinate 
     * @param {number} y - this is the initial y coordinate 
     * @param {number} spdX - this is the initial speed in x direction
     * @param {number} spdY - this is the initial speed in y direction
     * @param {string} type - this set the type of the jellyfish, 'normal', 'toxic'
     */
    constructor(x,y,spdX,spdY,type){
        super(x,y,80,80);
        this.setType(type)
        this.directionIMG = false;
        this.directionX = false;

        this.initialSpdX = spdX;
        this.initialSpdY = spdY;

        this.maxHealth = this.health;

        this.tDead = 2;
        this.tAttack = 1;

        this.hitBox.w = 0.8*this.width;
        this.hitBox.h = 0.65*this.width;
        this.attackBox.w = 0;
        this.attackBox.h = 0;
        this.setDetectBoxSize(3.5);

        this.addAnimationIMGs();

        this.JFrun10();
        this.JFrun150();
    }


    /**
     * This function generates the 10ms game loop for the jellyfish. If the global gamestate is run the loop functions will be executed
     */
    JFrun10(){
        this.setStoppableInterval(() => {
            if (gameState == 'RUN') {
                this.detect();
                this.attack();
                this.move();
                this.dropItem();
            } 
        },10)
    }


    /**
     * This function generates the 150ms game loop for the character. If the global gamestate is run the loop functions will be executed
     */
    JFrun150(){
        this.setStoppableInterval(() => this.animate(),150);
    }


    /**
     * This function set the type of the jeyllyfish
     * 
     * @param {string} type - type of the jellyfish, 'normal', toxic
     */
    setType(type){
        this.type = type;
        if (type == 'normal') {
            this.setTypeNormal();
        } else {
            this.setTypeToxic();
        }
    }


    /**
     * This function set the properties of a normal jellyfish
     */
    setTypeNormal(){
        this.loadImg('./img/02_Enemy/2_Jellyfish/1_Swim/normal/p1.png');
        this.health = 30;
        this.damage = 10;
        this.cntItems = 3;
    }

    
    /**
     * This function set the properties of a toxic jellyfish
     */
    setTypeToxic(){
        this.loadImg('./img/02_Enemy/2_Jellyfish/1_Swim/toxic/g1.png');
        this.health = 20;
        this.damage = 20;
    }


    /**
     * This function moves the jellyfish according the direction and speed of this object
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
            this.updateBoxes(-2,-this.hitBox.w/2,-this.attackBox.w/2,-this.detectBox.w/2);
            this.setState('move');
        }
    }


    /**
     * This function set the moving behavior
     */
    setMoveBehavior(){
        if (!this.isState('ATTACK')) this.setMBMoving();
    }


    /**
     * This function set the moveing behavior if the jellyfish can move
     */
    setMBMoving(){
        this.setMBMovingAtBorders();
        (this.isState('HURT'))? this.setMBHurt():this.setMBNormalMoving();
    }

    setMBNormalMoving(){
        this.speedX = this.initialSpdX;
        this.speedY = this.initialSpdY;
    }


    setMBHurt(){
        this.speedX = 1;
        this.speedY = 1;
    }

    /**
     * This function set the moveing properties if the jellyfish is colliding to the level border or a barrier
     */
    setMBMovingAtBorders(){
        if (this.isCollisionWithBorderX()) this.directionX = !this.directionX;
        if (this.isCollisionWithBorderY()) this.directionY = !this.directionY;
    }
    

    /**
     * This function checks if the jellyfish is colliding with the level border or an barrier in x direction
     * 
     * @returns {boolean} - true: is colliding, false: is not colliding
     */
    isCollisionWithBorderX(){
        return this.checklvlBorder('left') || this.checkBarrier('left') || this.checklvlBorder('right') || this.checkBarrier('right');
    }


    /**
     * This function checks if the jellyfish is colliding with the level border or an barrier in y direction
     * 
     * @returns {boolean} - true: is colliding, false: is not colliding
     */
    isCollisionWithBorderY(){
        return this.checklvlBorder('top') || this.checkBarrier('top') || this.checklvlBorder('bottom') || this.checkBarrier('bottom');
    }


    /**
     * This function executes the attack behavior dependent on the jellyfish type
     */
    attack(){
        if (this.isState('ATTACK')) {
            if (this.type == 'normal') {
                this.attackMove(0,6);
            } else {
                this.attackMove(150,1);
                this.attackShot();
            }
        }
    }


    /**
     * This function sets the kinematics properties of the attack of this object to reach an attack point
     * 
     * @param {number} radius - destance between the center of detected object and the attack point of the jellyfish
     * @param {number} timeSpeed - time that it last till the jellyfish reach the attack point
     */
    attackMove(radius,timeSpeed){
        [this.speedX,this.speedY,this.directionX,this.directionY] = this.calcKinematics(radius,timeSpeed);
        this.radiusCnt++;
    }


    /**
     * This function calculates the kinematics to reach an attack point of an detected object within a defined time
     * 
     * @param {number} radius - destance between the center of detected object and the attack point of the jellyfish
     * @param {number} timeSpeed - time that it last till the jellyfish reach the attack point
     * @returns 
     */
    calcKinematics(radius,timeSpeed){
        let dx = this.detectedObject.center.x + Math.cos(this.radiusCnt*this.frequency*2*Math.PI)*radius - this.center.x ;
        let dy = this.detectedObject.center.y + Math.sin(this.radiusCnt*this.frequency*2*Math.PI)*radius - this.center.y ;
        let dt = timeSpeed*10; // time till object reach detected object (time[s]*samplerate[ms] (run))
        let spdX = Math.abs(dx/dt);
        let spdY = Math.abs(dy/dt);
        let dirX = dx > 0;
        let dirY = dy < 0;
        return [spdX,spdY,dirX,dirY]
    }


    /**
     * This function shot a bubble frequently
     */
    attackShot(){
        if (this.attackCnt >= 200){
            this.generateBubble();
            this.attackCnt = 0;
            this.playSound('bubble');
        }
        this.attackCnt++;
    }


    /**
     * This function generates a Bubble on the map in derection of the center from the detected object
     */
    generateBubble(){
        let [spdX,spdY,dirX,dirY] = this.calcKinematics(0,10);
        world.bubbles.push(new Bubble(this.center.x,this.center.y,spdX,spdY, dirX, dirY,'poison','enemy'));
    }


    /**
     * This function detects the character is inside the detection box
     */
    detect(){
        if(this.isCharacterDetected()){
            this.setODetectedProperties();
            this.playSound('detect');
        } else {
            this.setNotDetectedProperties();
        }
    }


    /**
     * This functions checks if the character is detected and alive
     * 
     * @returns {boolean} true: character detected, false: character not detected
     */
    isCharacterDetected(){
        return this.isDetecting(world.character[0]) && world.character[0].state != 'DEAD';
    }


    /**
     * This function sets the object properties if the character is detected
     */
    setODetectedProperties(){
        this.detectedObject = world.character[0];
        this.initAttack();
        this.setState('attack');
        this.setDetectBoxSize(6.5);
    }


    /**
     * This function sets the object properties if the character is not detected
     */
    setNotDetectedProperties(){
        this.detectedObject = [];
        this.setState('attackFinished');
        (this.isState('HURT'))? this.setDetectBoxSize(6.5):this.setDetectBoxSize(3.5); 
    }


    /**
     * This function set the initial radius counter in that why, that the jellyfish moves in a stright why to the attack point 
     */
    initAttack(){
        if (this.needToInitAttack()) {
            let dx = this.detectedObject.center.x - this.center.x ;
            let dy = this.detectedObject.center.y - this.center.y ;
            let angle = Math.atan2(-dy,-dx);
            this.radiusCnt = angle * 1/this.frequency/2/Math.PI;
        }
    }

    
    /**
     * This function checks if the radius counter needs to initialize
     * 
     * @returns {boolean} - true: do initialize, false: don't initialize
     */
    needToInitAttack(){
        return this.state != 'ATTACK' && this.state != 'HURT';
    }


    /**
     * This funktion resize the detection box
     * 
     * @param {number} size - size of the detection box
     */
    setDetectBoxSize(size){
        this.detectBox.w = size*this.width;
        this.detectBox.h = size*this.width;
    }


    /**
     * This function drop the item if the object is removed from the map
     */
    dropItem(){
        if (this.canDropItem()) {
            (this.type == 'normal')? this.generateItem('coin'):this.generateItem('poison');
            this.cntItems--;            
        }
    }


    /**
     * This function checks if the object can drop a Item
     * 
     * @returns {boolean} true: drop item, false: don't drop item
     */
    canDropItem(){
        return this.isState('DEAD') && this.cntItems>0;
    }


    /**
     * This function generates the item on the map
     * 
     * @param {string} type - defines the type of the item, 'coin', 'poison', 'heart'
     */
    generateItem(type){
        let x = this.center.x + (this.cntItems-1)*20;
        let y = this.center.y - (this.cntItems-1)*20;
        world.level.collectables.push(new CollectableObject(x,y,type));
    }


    /**
     * This function add all animation images of the jellyfish to the image cache
     */
    addAnimationIMGs(){
        this.animationIMGs = ANIMATION_IMGS_JELLYFISH;
        this.addIMG2Cache(this.animationIMGs.normal.yellow.SWIM);
        this.addIMG2Cache(this.animationIMGs.normal.yellow.DEAD_BUBBLE);
        this.addIMG2Cache(this.animationIMGs.normal.yellow.DEAD_SLAP);
        this.addIMG2Cache(this.animationIMGs.normal.purple.SWIM);
        this.addIMG2Cache(this.animationIMGs.normal.purple.DEAD_BUBBLE);
        this.addIMG2Cache(this.animationIMGs.normal.purple.DEAD_SLAP);
        this.addIMG2Cache(this.animationIMGs.toxic.green.SWIM);
        this.addIMG2Cache(this.animationIMGs.toxic.green.DEAD_BUBBLE);
        this.addIMG2Cache(this.animationIMGs.toxic.green.DEAD_SLAP);
        this.addIMG2Cache(this.animationIMGs.toxic.pink.SWIM);
        this.addIMG2Cache(this.animationIMGs.toxic.pink.DEAD_BUBBLE);
        this.addIMG2Cache(this.animationIMGs.toxic.pink.DEAD_SLAP);
    }


    /**
     * This function sets the animation which has to be executed for the current jellyfish properties
     */
    animate(){
        if (this.isState('MOVE')) this.animateMOVE();
        if (this.isState('ATTACK')) this.animateATTACK();
        if (this.isState('HURT')) this.animateHURT();
        if (this.isState('DEAD')) this.animateDEAD();
    }


    /**
     * This function replay the animation for MOVE state
     */
    animateMOVE(){
        if (this.type == 'normal') {
            this.playAnimation(this.animationIMGs.normal.purple.SWIM,'repeat');
        } else {
            this.playAnimation(this.animationIMGs.toxic.pink.SWIM,'repeat');
        }
    }


    /**
     * This function replay the animation for Attack state
     */
    animateATTACK(){
        if (this.type == 'normal') {
            this.playAnimation(this.animationIMGs.normal.yellow.SWIM,'repeat');
        } else {
            this.playAnimation(this.animationIMGs.toxic.green.SWIM,'repeat');
        }
    }


    /**
     * This function replay the animation for Hurt state
     */
    animateHURT(){
        if (this.type == 'normal') {
            this.playAnimation(this.animationIMGs.normal.HURT,'repeat');
        } else {
            this.playAnimation(this.animationIMGs.toxic.HURT,'repeat');
        }
        (this.hitBy == 'slap')? this.playSound('hitSlap'):this.playSound('hitBubble');
    }


    /**
     * This function replay the animation for Dead state
     */
    animateDEAD(){
        if (this.hitBy == 'bubble') {
            this.animateDeadByBubble();
            this.playSound('hitBubble');
        } else {
            this.animateDeadBySlap();
            this.playSound('hitSlap');
        }
    }


    /**
     * This function replay the animation for died by bubble
     */
    animateDeadByBubble(){
        this.width = 60;
        this.height = 60;
        if (this.type == 'normal') {
            this.playAnimation(this.animationIMGs.normal.purple.DEAD_BUBBLE,'repeat');
        } else {
            this.playAnimation(this.animationIMGs.toxic.pink.DEAD_BUBBLE,'repeat');
        }
    }


    /**
     * This function replay the animation for died by slap
     */
    animateDeadBySlap(){
        if (this.type == 'normal') {
            this.playAnimation(this.animationIMGs.normal.purple.DEAD_SLAP,'repeat');
        } else {
            this.playAnimation(this.animationIMGs.toxic.pink.DEAD_SLAP,'repeat');
        }
    }


    /**
     * This function plays the sound of the sound cache with the sound key
     * 
     * @param {string} soundKey - sound which should be played, 'hitBubble', 'hitSlap', 'detect', 'bubble'
     */
    playSound(soundKey){
        if (this.isSoundOn()) {
            this.soundCache[soundKey].volume = gameSoundVolume;
            this.soundCache[soundKey].play();
        }
    }


    /**
     * This function checks if the sound is switched on
     * 
     * @returns {boolean} - true: sound on, false: sound off
     */
    isSoundOn(){
        return sound == 'ON' && gameState == 'RUN';
    }
}