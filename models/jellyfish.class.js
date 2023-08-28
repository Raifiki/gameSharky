class Jellyfish extends FightableObject {
    //fields

    //methodes
    constructor(x,y,w,h){
        super(x,y,w,h);
        this.loadImg('../img/02_Enemy/2_Jellyfish/Regular damage/Lila 1.png');
        this.directionIMG = false;
        this.directionX = false;

        this.speedX = 0.5;
        this.speedY = 1;

        this.health = 50;
        this.damage = 15;

        this.hitBox.w = 1*this.width;
        this.hitBox.h = 0.85*this.width;
        this.attackBox.w = 0;
        this.attackBox.h = 0;
        this.detectBox.w = 2.5*this.width;
        this.detectBox.h = 2*this.width;

        this.run10();
    }

    run10(){
        setInterval(() => {
            this.attack();
            this.move();   
        },10)
    }

    move(){
        this.checkLevelBorder();
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
        //this.setState('move');
    }

    outsideLvlBorderRight(){
        return this.x > LEVEL_1.length;
    }
    outsideLvlBorderLeft(){
        return this.x + this.width < 0;
    }
    outsideLvlBorderTop(){
        return this.y < 0;
    }
    outsideLvlBorderBottom(){
        return this.y + this.height > LEVEL_1.height;
    }

    checkLevelBorder(){
        if (this.outsideLvlBorderLeft()) {
            this.x = LEVEL_1.length;
        }
        if (this.outsideLvlBorderTop() || this.outsideLvlBorderBottom()) {
            this.directionY = !this.directionY;
        }
    }

    attack(){
        if (this.state == 'ATTACK') {
            let dx = this.detectedObject.center.x - this.center.x;
            let dy = this.detectedObject.center.y - this.center.y;
            let dt = 5 * 10; // time till object reach detected object (time[s]*samplerate[ms] (run))
            this.speedX = Math.abs(dx/dt);
            this.speedY = Math.abs(dy/dt);
            this.directionX = dx > 0;
            this.directionY = dy < 0;
        } else {
            this.speedX = 0.5;
            this.speedY = 1;
        }
    }
}