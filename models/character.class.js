class Character extends MovableObject{
    //field
    keyListener;

    xOfst = 100;
    //method
    constructor(x,y,w,h){
        super();
        this.x = x;
        this.y = y;
        this.loadImg('../img/01_Sharkie/1_IDLE/1.png');
        this.width = w;
        this.height = h;
        
        this.speedX = 5;
        this.speedY = 5;

        this.move();
    }

    move(){
        setInterval(() =>{
            if (this.keyListener.RIGHT && !this.outsideLvlBorderRight()) {
                this.moveRight();
            }
            if (this.keyListener.LEFT && !this.outsideLvlBorderLeft()) {
                this.moveLeft();
            }
            if (this.keyListener.UP && !this.outsideLvlBorderTop()) {
                this.moveUp();
            }
            if (this.keyListener.DOWN && !this.outsideLvlBorderBottom()) {
                this.moveDown();
            }
            this.setCameraOfst();
        },10)
    }

    outsideLvlBorderRight(){
        return this.x + this.width > world.level.length - this.speedX;
    }
    outsideLvlBorderLeft(){
        return this.x < this.speedX;
    }
    outsideLvlBorderTop(){
        return this.y < this.speedY;
    }
    outsideLvlBorderBottom(){
        return this.y + this.height > world.level.height - this.speedY;
    }

    setCameraOfst(){
        let newOfst = this.x - this.xOfst;
        if ( newOfst>= 0 && newOfst <= world.level.length - world.canvas.width){
            world.cameraOfst = this.x - this.xOfst;
        }
    }
}

