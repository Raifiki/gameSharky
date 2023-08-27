class Jellyfish extends FightableObject {
    //fields

    //methodes
    constructor(x,y,w,h){
        super(x,y,w,h);
        this.loadImg('../img/02_Enemy/2_Jellyfish/Regular damage/Lila 1.png');

        this.speedX = 0.5;
        this.speedY = 1;

        this.hitBox.w = 0.8*this.width;
        this.hitBox.h = 0.8*this.width;
        this.attackBox.w = 0;
        this.attackBox.h = 0;
        this.detectBox.w = 1.2*this.width;
        this.detectBox.h = 1.2*this.width;

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
            this.setBoxes();
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