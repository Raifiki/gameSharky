class Pufferfish extends MovableObject {
    //fields

    //methodes
    constructor(x,y,w,h){
        super();
        this.x = x;
        this.y = y;
        this.loadImg('../img/02_Enemy/1_Pufferfish/1_Swim/1.swim1.png');
        this.width = w;
        this.height = h;

        this.speedX = 0.5;
        this.speedY = 1;

        this.move();
    }


    move(){
        setInterval(() => {
            if (this.outsideLvlBorderLeft()) {
                this.x = world.level.length;
            }
            this.moveLeft();
        },10)
    }

    outsideLvlBorderRight(){
        return this.x > world.level.length;
    }
    outsideLvlBorderLeft(){
        return this.x + this.width < 0;
    }
}