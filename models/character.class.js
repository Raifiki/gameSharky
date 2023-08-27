class Character extends FightableObject{
    //field
    keyListener;

    poison = 0;
    bubbleShots = 2;

    xOfst = 100;
    //method
    constructor(x,y,w,h){
        super(x,y,w,h);
        this.loadImg('../img/01_Sharkie/1_IDLE/1.png');

        this.speedX = 15;
        this.speedY = 5;

        this.move();
        this.attack();
        this.loadBubbleShot();
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


    attack(){
        setInterval(() => {
            this.attackBubbleTrap();
        },100);
    }

    attackBubbleTrap(){
        if (this.keyListener.SPACE) {
            let x;
            if (this.direction) {
                x = this.x + this.width;
            } else {
                x = this.x - 30;
            }
            let y = this.y + this.height/2;
            let type = this.chooseBubbleType();
            if (type != 'noShots') {
                world.Bubbles.push(new Bubble(x,y,30,30,type, this.direction));
            } else {
                
            }
            
        }
    }

    chooseBubbleType(){
        if (this.bubbleShots > 0) {
            this.bubbleShots--;
            return 'normal'
        } else {
            return 'noShots'
        }
    }

    loadBubbleShot(){
        setInterval(() =>{
            if (this.bubbleShots < 5) {
                this.bubbleShots++;
            }
        },3000);
    }
}

