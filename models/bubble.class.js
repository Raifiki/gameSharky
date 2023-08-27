class Bubble extends FightableObject{
    //fields
    IMGs = {
        normal: '../img/01_Sharkie/4_Attack/Bubble trap/Bubble.png',
        poison: '../img/01_Sharkie/4_Attack/Bubble trap/PoisonedBubble.png',
    }
    type;
    //methodes
    constructor(x,y,w,h,type,dir){
        super(x,y,w,h);
        this.setImgPath(type);
        this.direction = dir;
        this.type = type;

        this.hitBox.w = 1*this.width;
        this.hitBox.h = 1*this.width;
        this.attackBox.w = 0;
        this.attackBox.h = 0;
        this.detectBox.w = 0;
        this.detectBox.h = 0;

        this.speedX = 5;
        this.speedY = 0;

        this.move();
    }

    move(){
        setInterval(() => {
            if (this.direction) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
            this.setBoxes();
        },10)
    }

    setImgPath(type){
        if (type == 'poison') {
            this.loadImg(this.IMGs.poison);
        } else {
            this.loadImg(this.IMGs.normal);
        }
    }
}