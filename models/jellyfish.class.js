class Jellyfish extends MovableObject {
    //fields

    //methodes
    constructor(x,y,w,h){
        super();
        this.x = x;
        this.y = y;
        this.loadImg('../img/02_Enemy/2_Jellyfish/Regular damage/Lila 1.png');
        this.width = w;
        this.height = h;

        this.speedX = 0.5;
        this.speedY = 1;

        this.move();
    }


    move(){
        setInterval(() => {
            this.checkLevelBorder();
            this.moveLeft();
            if (this.direction) {
                this.moveUp();
            } else {
                this.moveDown();
            }
        },10)
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
            this.direction = !this.direction;
        }
    }
}