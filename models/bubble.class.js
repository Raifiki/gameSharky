class Bubble extends FightableObject{
    //fields
    IMGs = {
        normal: '../img/01_Sharkie/4_Attack/Bubble trap/Bubble.png',
        poison: '../img/01_Sharkie/4_Attack/Bubble trap/PoisonedBubble.png',
    }
    type;
    //methodes
    constructor(x,y,w,h,type,dir){
        super();
        this.x = x;
        this.y = y;
        this.setImgPath(type);
        this.width = w;
        this.height = h;
        this.direction = dir;
        this.type = type;

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