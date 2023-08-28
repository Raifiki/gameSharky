class Endboss extends FightableObject{
    //fields

    //methodes
    constructor(x,y,w,h){
        super(x,y,w,h);
        this.loadImg('../img/02_Enemy/3_FinalEnemy/floating/1.png');
        this.directionIMG = false;
        this.directionX = false;

        this.speedX = 0;
        this.speedY = 0;

        this.health = 100;
        this.damage = 30;

        this.hitBox.w = 0.9*this.width;
        this.hitBox.h = 0.5*this.width;
        this.attackBox.w = 0.8*this.width;
        this.attackBox.h = 0.5*this.width;
        this.detectBox.w = 0*this.width;
        this.detectBox.h = 0*this.width;

        this.move();
    }

    move(){
        setInterval(() => {
            this.setBoxes(-2,30);
        },10)
    }
}
