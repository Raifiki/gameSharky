class MoveableObject extends AnmiatedObject {
    //field
    speedX = 0;
    speedY = 0;

    //method
    constructor(x,y,w,h){
        super(x,y,w,h);
    }

    moveLeft(){
        this.x -= this.speedX;
        this.calcCenter();
    }

    moveRight(){
        this.x += this.speedX;
        this.calcCenter();
    }

    moveUp(){
        this.y -= this.speedY;
        this.calcCenter();
    }

    moveDown(){
        this.y += this.speedY;
        this.calcCenter();
    }
}