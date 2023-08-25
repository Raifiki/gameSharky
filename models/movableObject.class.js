class MovableObject extends AnmiatedObject {
    //field
    speedX = 0;
    speedY = 0;

    //method
    constructor(){
        super();
    }

    moveLeft(){
        this.x -= this.speedX;
    }

    moveRight(){
        this.x += this.speedX;
    }

    moveUp(){
        this.y -= this.speedY;
    }

    moveDown(){
        this.y += this.speedY;
    }
}