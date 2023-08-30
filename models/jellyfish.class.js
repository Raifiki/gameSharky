class Jellyfish extends FightableObject {
    //fields

    //methodes
    constructor(x,y,w,h){
        super(x,y,w,h);
        this.loadImg('../img/02_Enemy/2_Jellyfish/Regular damage/Lila 1.png');
        this.directionIMG = false;
        this.directionX = false;

        this.speedX = 0;
        this.speedY = 0;

        this.health = 50;
        this.damage = 15;

        this.hitBox.w = 1*this.width;
        this.hitBox.h = 0.85*this.width;
        this.attackBox.w = 0;
        this.attackBox.h = 0;
        this.detectBox.w = 2.5*this.width;
        this.detectBox.h = 2*this.width;

        this.JFrun10();
    }

    JFrun10(){
        setInterval(() => {
            if (gameState == 'RUN') {
                this.detect();
                this.attack();
                this.move();
                this.dropItem();
            } 
        },10)
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
            this.setBoxes(-2,5);
            this.setState('move');
        }
    }


    setMoveBehavior(){
        if (this.checklvlBorder('left') || this.checkBarrier('left') || this.checklvlBorder('right') || this.checkBarrier('right')) {
            this.directionX = !this.directionX;
        }
        if (this.checklvlBorder('top') || this.checkBarrier('top') || this.checklvlBorder('bottom') || this.checkBarrier('bottom')) {
            this.directionY = !this.directionY;
        }
    }


    attack(){
        if (this.state == 'ATTACK') {
            let dx = this.detectedObject.center.x - this.center.x;
            let dy = this.detectedObject.center.y - this.center.y;
            let dt = 10*10; // time till object reach detected object (time[s]*samplerate[ms] (run))
            this.speedX = Math.abs(dx/dt);
            this.speedY = Math.abs(dy/dt);
            this.directionX = dx > 0;
            this.directionY = dy < 0;
        } else {
            this.speedX = 0;
            this.speedY = 0;
        }
    }

    detect(){
            if(this.isDetecting(world.character[0])){
                this.setState('attack');
                this.detectedObject = world.character[0];
            } else {
                this.detectedObject = [];
                this.setState('attackFinished');
            }
    }

    dropItem(){
        if (this.state == 'DEAD') {
            world.level.collectables.push(new CollectableObject(this.center.x,this.center.y,30,30,'coin'));            
        }
    }
}