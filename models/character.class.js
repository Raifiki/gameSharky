class Character extends FightableObject{
    //field
    keyListener;

    coins = 0;
    poison = 0;
    bubbleShots = 2;

    xOfst = 100;
    //method
    constructor(x,y,w,h){
        super(x,y,w,h);
        this.loadImg('../img/01_Sharkie/1_IDLE/1.png');

        this.speedX = 15;
        this.speedY = 5;

        this.health = 100;
        this.damage = 20;

        this.hitBox.w = 0.7*this.width;
        this.hitBox.h = 0.35*this.width;
        this.attackBox.w = 0.8*this.width;
        this.attackBox.h = 0.4*this.width;
        this.detectBox.w = 0*this.width;
        this.detectBox.h = 0*this.width;

        this.move();
        this.run100();
        this.loadBubbleShot();
    }

    run100(){
        setInterval(() => {
            if (gameState == 'RUN') {
                this.attack();
            }
        },100);
    }

    move(){
        setInterval(() =>{
            this.setState('idle');
            if (this.state == 'IDLE' || this.state == 'HURT' || this.state == 'ATTACK') {
                if (this.keyListener.RIGHT) {
                    this.moveRight();
                    this.setDirection('right');
                    this.setState('move');
                }
                if (this.keyListener.LEFT) {
                    this.moveLeft();
                    this.setDirection('left');
                    this.setState('move');
                }
                if (this.keyListener.UP) {
                    this.moveUp();
                    this.setState('move');
                }
                if (this.keyListener.DOWN) {
                    this.moveDown();
                    this.setState('move');
                }
                this.setBoxes(0,15,80,0);
                this.setCameraOfst();
        }
        },10)
    }

    setCameraOfst(){
        let newOfst = this.hitBox.x - this.xOfst;
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
            this.directionX = true;
            this.xOfst = Math.max(this.xOfst - 10,100);
        } else {
            this.directionX = false;
            this.xOfst = Math.min(this.xOfst + 10,canvas_w - this.width - 100);
        }        
    }


    attack(){
        if (this.state == 'IDLE' || this.state == 'MOVE' ) {
            if (this.keyListener.SPACE) {
                this.setState('attack');
                this.attackBubbleTrap();
            }
            if (this.keyListener.S) {
                this.setState('attack');
            }
        }
    }

    attackBubbleTrap(){
            let [x,y] = [this.center.x,this.center.y+15];
            let type = this.chooseBubbleType();
            if (type != 'noShots') {
                world.bubbles.push(new Bubble(x,y,10,0, this.directionX,true,type,'character'));
            } else {
                
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

