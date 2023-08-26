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
        
        this.speedX = 15;
        this.speedY = 5;

        this.move();
    }

    move(){
        setInterval(() =>{
            if (this.keyListener.RIGHT && !this.outsideLvlBorderRight()) {
                this.moveRight();
                this.setDirection('right');
            }
            if (this.keyListener.LEFT && !this.outsideLvlBorderLeft()) {
                this.moveLeft();
                this.setDirection('left');
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
        return this.x + this.width > world.level.length - this.speedX/2;
    }
    outsideLvlBorderLeft(){
        return this.x < this.speedX/2;
    }
    outsideLvlBorderTop(){
        return this.y < this.speedY/2;
    }
    outsideLvlBorderBottom(){
        return this.y + this.height > world.level.height - this.speedY/2;
    }

    setCameraOfst(){
        let newOfst = this.x - this.xOfst;
            if (newOfst>= 0 && newOfst <= world.level.length - world.canvas.width){
                world.cameraOfst = newOfst;
            } else if(newOfst<0){
                world.cameraOfst = 0;
            } else if (newOfst>world.level.length - world.canvas.width){
                world.cameraOfst = world.level.length - world.canvas.width;
            }
    }

    setDirection(dir){
        if (dir == 'right') {
            this.direction = true;
            this.xOfst = Math.max(this.xOfst - 10,100);
        } else {
            this.direction = false;
            this.xOfst = Math.min(this.xOfst + 10,canvas_w - this.width - 100);
        }        
    }
}

