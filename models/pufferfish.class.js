class Pufferfish extends FightableObject {
    //fields

    //methodes
    constructor(x,y,w,h){
        super(x,y,w,h);
        this.loadImg('../img/02_Enemy/1_Pufferfish/1_Swim/1.swim1.png');

        this.speedX = 0.5;
        this.speedY = 1;

        this.hitBox.w = 0.8*this.width;
        this.hitBox.h = 0.8*this.width;
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
            this.setBoxes();
        },10)
    }

    outsideLvlBorderRight(){
        return this.x > world.level.length;
    }
    outsideLvlBorderLeft(){
        return this.x + this.width < 0;
    }
}