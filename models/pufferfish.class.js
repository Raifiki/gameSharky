class Pufferfish extends FightableObject {
    //fields

    //methodes
    constructor(x,y,w,h){
        super(x,y,w,h);
        this.loadImg('../img/02_Enemy/1_Pufferfish/1_Swim/1.swim1.png');
        this.directionIMG = false;
        this.directionX = false;

        this.speedX = 0;
        this.speedY = 0;

        this.health = 20;
        this.damage = 10;
        this.state = 'MOVE';

        this.hitBox.w = 0.95*this.width;
        this.hitBox.h = 0.7*this.width;
        this.attackBox.w = 0*this.width;
        this.attackBox.h = 0*this.width;
        this.detectBox.w = 0*this.width;
        this.detectBox.h = 0*this.width;

        this.move();
    }


    move(){
        setInterval(() => {
            if (this.outsideLvlBorderLeft()) {
                this.x = world.level.length;
            }
            this.moveLeft();
            this.setBoxes(-5,-10);
        },10)
    }

    outsideLvlBorderRight(){
        return this.x > world.level.length;
    }
    outsideLvlBorderLeft(){
        return this.x + this.width < 0;
    }
}