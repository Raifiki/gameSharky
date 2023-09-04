class Character extends FightableObject{
    //field
    keyListener;

    coins = 0;
    poison = 1;

    bubbleShots = 0;
    bubbleType = 'normal'
    bubbleChangeCnt = 0;

    xOfst = 200;
    //method
    constructor(x,y){
        super(x,y,200,200);
        this.loadImg('../img/01_Sharkie/1_IDLE/1.png');

        this.speedX = 6;
        this.speedY = 6;

        this.health = 100;
        this.maxHealth = this.health;
        this.damage = 30;

        this.hitBox.w = 0.5*this.width;
        this.hitBox.h = 0.2*this.width;
        this.attackBox.w = 0.5*this.width;
        this.attackBox.h = 0.3*this.width;
        this.detectBox.w = 0*this.width;
        this.detectBox.h = 0*this.width;

        this.tAttack =0.8;
        this.tDead = 10;
        this.tHurt = 1;
        this.tAction =5;

        this.addAnimationIMGs();

        this.Crun10();
        this.Crun100();
        this.loadBubbleShot();
    }

    Crun10(){
        setInterval(() => {
            if (gameState == 'RUN') {
                this.attack();
                this.move();
                this.chooseBubbleType();
            }
        },10);
    }

    Crun100(){
        setInterval(() =>{
            this.animate();
        },100)
    } 

    move(){
        this.setState('idle');
        if (this.state == 'IDLE' || this.state == 'HURT' || this.state == 'ATTACK') {
            if (this.keyListener.RIGHT) {
                this.moveRight();
                this.setDirection('right');
                this.setState('move');
            }
            if (this.keyListener.LEFT) {
                this.moveLeft();
                this.setDirection('left');
                this.setState('move');
            }
            if (this.keyListener.UP) {
                this.moveUp();
                this.setState('move');
            }
            if (this.keyListener.DOWN) {
                this.moveDown();
                this.setState('move');
            }
            this.setBoxes(30,-this.hitBox.w/2,-5,0);
            this.setCameraOfst();
        } else if (this.state == 'DEAD') {
            this.setMoveBehaviorDead();
        }
    }

    setMoveBehaviorDead(){
        this.speedY = 1;
        if (this.hitBy == 'poison') {
            this.moveUp();
            this.setBoxes(-50,-this.hitBox.w/2,0,0);
        } else {
            this.moveDown();
            this.setBoxes(15,-this.hitBox.w/2,0,0);
        }
    }

    setCameraOfst(){
        if (typeof world.endboss === 'undefined') {
            let newOfst = this.hitBox.x - this.xOfst;
            if (newOfst>= 0 && newOfst <= world.level.length - world.canvas.width){
                world.cameraOfst = newOfst;
            } else if(newOfst<0){
                world.cameraOfst = 0;
            } else if (newOfst>world.level.length - world.canvas.width){
                world.cameraOfst = world.level.length - world.canvas.width;
            }
        } else {
            world.cameraOfst = world.level.length - canvas_w;
        }

    }

    setDirection(dir){
        if (dir == 'right') {
            this.directionX = true;
            this.xOfst = Math.max(this.xOfst - 25,200);
        } else {
            this.directionX = false;
            this.xOfst = Math.min(this.xOfst + 25,canvas_w - this.hitBox.w - 200);
        }        
    }


    attack(){
        if (this.state == 'IDLE' || this.state == 'MOVE' ) {
            if (this.keyListener.S) {
                this.setState('attack');
                this.attackBubbleTrap();
                this.attackType = 'bubbleTrap';
            }
            if (this.keyListener.SPACE) {
                this.setState('attack');
                this.attackType = 'slap';
            }
        }
    }

    attackBubbleTrap(){
        if (this.bubbleShots > 0) {
            setTimeout(() => {
                let xOfs = this.directionX? 80:-55;
                let [x,y] = [this.center.x+xOfs,this.center.y+20];
                let spdX = 4;
                if(this.bubbleType == 'poison'){
                    this.poison--;
                    spdX = 6.5;
                }
                world.bubbles.push(new Bubble(x,y,spdX,0, this.directionX,true,this.bubbleType,'character'));
                this.bubbleShots--;

            },800);
        }
    }


    chooseBubbleType(){
        if (this.poison > 0) {
            if (this.bubbleType == 'normal' && this.keyListener.D && this.bubbleChangeCnt > 20) {
                this.bubbleType = 'poison';
                this.bubbleChangeCnt = 0;
            } else if(this.bubbleType == 'poison' && this.keyListener.D && this.bubbleChangeCnt > 20){
                this.bubbleType = 'normal';
                this.bubbleChangeCnt = 0;
            }
        } else {
            this.bubbleType = 'normal';
        }
        this.bubbleChangeCnt++;
    }

    loadBubbleShot(){
        setInterval(() =>{
            if (this.bubbleShots < 3) {
                this.bubbleShots++;
            }
        },3000);
    }

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

    animate(){
        if (this.state == 'IDLE') {
            this.animateIDLE();
        }
        if (this.state == 'MOVE') {
            this.animateMOVE();
        }

        if (this.state == 'ATTACK') {
            this.animateATTACK();
        }

        if (this.state == 'HURT') {
            this.animateHURT();
        }

        if (this.state == 'DEAD') {
            this.animateDEAD();
        }
    }

    animateIDLE(){
        if (this.isLazy(this.tAction)) {
            this.playAnimation(this.animationIMGs.LONG_IDLE,'repeat');
        } else {
            this.playAnimation(this.animationIMGs.IDLE,'repeat');
        }
    }
    animateMOVE(){
        this.playAnimation(this.animationIMGs.SWIM,'repeat');
    }

    animateATTACK(){
        if (this.attackType == 'bubbleTrap') {
            this.animateBubbleTrap();
        } else {
            this.animateSlap();
        }
    }

    animateBubbleTrap(){
        if (this.bubbleShots > 0) {
            if (this.bubbleType == 'poison') {
                this.playAnimation(this.animationIMGs.ATTACK_BUBBLETRAP_POISONBUBBLE);
            } else {
                this.playAnimation(this.animationIMGs.ATTACK_BUBBLETRAP_NORMALBUBBLE);
            }
        } else {
            this.playAnimation(this.animationIMGs.ATTACK_BUBBLETRAP_WOBUBBLE);
        }
    }

    animateSlap(){
        this.playAnimation(this.animationIMGs.ATTACK_SLAP);
    }

    animateHURT(){
        if (this.hitBy == 'poison') {
            this.playAnimation(this.animationIMGs.HURT_POISON,'repeat');
        } else {
            this.playAnimation(this.animationIMGs.HURT_ELECTRICSHOCK,'repeat');
        }
    }

    animateDEAD(){
        if (this.hitBy == 'poison') {
            this.playAnimation(this.animationIMGs.DEAD_POISON);
        } else {
            this.playAnimation(this.animationIMGs.DEAD_ELECTROSHOCK);
        }
    }

}

