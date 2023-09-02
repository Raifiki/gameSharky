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
    introduceActive = true;
    //methodes
    constructor(x,y,w,h){
        super(x,y,w,h);
        this.directionIMG = false;
        this.directionX = false;
        this.directionY = true;

        this.speedX = 0;
        this.speedY = 0;

        this.health = 200;
        this.maxHealth = this.health;
        this.damage = 20;

        this.hitBox.w = 0.8*this.width;
        this.hitBox.h = 0.3*this.width;
        this.attackBox.w = 0.3*this.width;
        this.attackBox.h = 0.2*this.width;
        this.detectBox.w = 1.5*this.width;
        this.detectBox.h = 0.8*this.width;

        this.detectedObject = [];
        this.tAttack = 5;
        this.tDead = 10;

        this.addAnimationIMGs();

        this.Whrun10();
        this.Whrun150();
    }

    Whrun10(){
        setInterval(() => {
            if (gameState == 'RUN') {
                if (this.introduceActive) {
                    this.introduce();
                } else {
                    this.move();
                    this.detect();
                    this.attack();
                }
            }
        },10)
    }

    Whrun150(){
        setInterval(() =>{
            this.animate();
        },150)
    }


    introduce(){
        let dt = (new Date().getTime() - this.introduceStartTime)/1000;
        if (dt<5) {
            this.directionY =false;
            this.speedY += 0.015;
            if (dt<1.5) {
                this.moveDown();
                this.setBoxes(40,-this.hitBox.w/2,60,-100);
            } else {
                this.setState('move');
            }           
        } else {
            this.introduceActive = false;
            this.speedY = 0;;
        }
    }

    move(){
        this.setState('idle');
        if (this.state == 'IDLE' || this.state == 'HURT' || this.state == 'ATTACK') {
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
            this.setBoxes(40,-this.hitBox.w/2,60,-100);
            this.resizeDetectBoxe(true);
            this.setState('move');    
        }
    }


    setMoveBehavior(){
        if (this.state != 'ATTACK'){
            if (this.bubbleDetected) {
                let [spdX,spdY,dirX,dirY] = this.calcEscapeKinematics();
                this.speedX = spdX;
                this.speedY = spdY;
                this.directionX = dirX;
                this.directionY = dirY;
            } else {
                if (this.checklvlBorder('left') || this.checkBarrier('left') || this.checklvlBorder('right') || this.checkBarrier('right')) {
                    this.directionX = !this.directionX;
                }
                if (this.checklvlBorder('top') || this.checkBarrier('top') || this.checklvlBorder('bottom') || this.checkBarrier('bottom')) {
                    this.directionY = !this.directionY;
                }
                this.speedX = (this.speedX + Math.random()*0.01) %2;
                this.speedY = (this.speedY + Math.random()*0.01) %2;
                if ((Math.random())<0.005) {
                    this.directionX = !this.directionX;
                }
                if ((Math.random())<0.005) {
                    this.directionY = !this.directionY;
                }
            }
        }
    }

    detect(){
        this.detectBubble();
        if(this.isDetecting(world.character[0])){
            this.setState('attack');
            if (!this.characterDetected) {
                this.smashAttack.x = world.character[0].center.x;
                this.smashAttack.y = world.character[0].center.y;
                this.characterDetected = true;
            }
            this.detectedObject = world.character[0];
        } else {
            this.characterDetected = false;
            this.detectedObject = [];
            this.setState('attackFinished');
        }
    }

    detectBubble(){
        this.bubbleDetected = false;
        world.bubbles.forEach(b => {
            if (this.isDetecting(b) && b.type != 'poison') {
                this.bubbleDetected= true;
                this.detectedBubble = b;
            }
        });
        if (!this.bubbleDetected){
            this.detectedBubble = [];
        }
    }


    attack(){
        if (this.state == 'ATTACK') {
            this.attackSmash();
        }
    }

    attackSmash(){
        let dt = (new Date().getTime() - this.timeStamps.startAttack)/1000
        if (dt <= 0.5) { // angry
            this.speedX = 0;
            this.speedY = 0;
        } else if(dt <= 1) { // smash
            let [spdX,spdY,dirX,dirY] = this.calcAttackKinematics(this.smashAttack.x,this.smashAttack.y,0.75,100);
            this.speedX = spdX;
            this.speedY = spdY;
            this.directionX = dirX;
            this.directionY = dirY;
        } else  if(dt <= 4.9){
            let [spdX,spdY,dirX,dirY] = this.calcAttackKinematics(this.detectedObject.x,this.detectedObject.y,50,0);
            this.speedX = spdX;
            this.speedY = spdY;
            this.directionX = dirX;
            this.directionY = dirY;
            this.resizeDetectBoxe(false);
        } else {
            this.characterDetected = false;
            this.detectedObject = [];
        }
    }

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

    calcDistance(){
        let dx = this.detectedObject.center.x - this.center.x;
        let dy = this.detectedObject.center.y - this.center.y;
        return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
    }

    calcEscapeKinematics(){
        let dx = this.detectedBubble.center.x - this.center.x;
        let dy = this.detectedBubble.center.y - this.center.y;
        let dirX = dx < 0;
        let dirY = dy > 0;
        return [5,5,dirX,dirY]
    }

    resizeDetectBoxe(reset){
        if (!reset){
            this.detectBox.w = 1.5*this.width;
            this.detectBox.h = 0.8*this.width;
        } else {
            this.detectBox.w += 0.8;
            this.detectBox.h += 0.4;
        }
    }

    addAnimationIMGs(){
        this.animationIMGs = ANIMATION_IMGS_EB_WHALE;
        this.addIMG2Cache(this.animationIMGs.INTRODUCE);
        this.addIMG2Cache(this.animationIMGs.SWIM);
        this.addIMG2Cache(this.animationIMGs.ATTACK);
        this.addIMG2Cache(this.animationIMGs.HURT_BUBBLE);
        this.addIMG2Cache(this.animationIMGs.DEAD);
    }

    animate(){
        if (this.state == 'IDLE') {
            if (this.introduceActive) {
                this.playAnimation(this.animationIMGs.INTRODUCE);
            }
        }
        if (this.state == 'MOVE') {
            this.playAnimation(this.animationIMGs.SWIM,'repeat');
        }

        if (this.state == 'ATTACK') {
            this.animateATTACK();
        }

        if (this.state == 'HURT') {
            this.animateHURT();
        }
        if (this.state == 'DEAD') {
            this.playAnimation(this.animationIMGs.DEAD);
        }
    }

    animateHURT(){
        if (this.hitBy == 'bubble') {
            this.playAnimation(this.animationIMGs.HURT_BUBBLE,'repeat');
        } else {
            this.playAnimation(this.animationIMGs.HURT_SLAP,'repeat');
        }
    }

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
