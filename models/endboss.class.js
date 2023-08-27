class Endboss extends FightableObject{
    //fields

    //methodes
    constructor(x,y,w,h){
        super(x,y,w,h);
        this.loadImg('../img/02_Enemy/3_FinalEnemy/floating/1.png');

        this.speedX = 0;
        this.speedY = 0;

        this.hitBox.w = 0.8*this.width;
        this.hitBox.h = 0.8*this.width;
        this.attackBox.w = 1*this.width;
        this.attackBox.h = 0.5*this.width;
        this.detectBox.w = 1.5*this.width;
        this.detectBox.h = 1.1*this.width;

        this.move();
    }

    move(){
        setInterval(() => {
            this.setBoxes();
        },10)
    }
}
