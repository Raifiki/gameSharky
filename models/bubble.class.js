class Bubble extends FightableObject{
    //fields
    IMGs = {
        normal: '../img/01_Sharkie/4_Attack/BubbleTrap/Bubble.png',
        poison: '../img/01_Sharkie/4_Attack/BubbleTrap/PoisonedBubble.png',
    }
    from;
    type;
    //methodes
    constructor(x,y,speedX,speedY,dirX,dirY,type,from){
        super(x-30/2,y-30/2,30,30);
        this.speedX = speedX;
        this.speedY = speedY;
        this.setType(type);
        this.directionX = dirX;
        this.directionY = dirY;


        this.health = 1;
        this.damage = 10;
        this.state = 'MOVE';
        this.from = from;

        this.hitBox.w = 1*this.width;
        this.hitBox.h = 1*this.width;
        this.attackBox.w = 0;
        this.attackBox.h = 0;
        this.detectBox.w = 0;
        this.detectBox.h = 0;

        this.Brun10();
    }

    Brun10(){
        setInterval(() => {
            if (gameState == 'RUN') {
                this.move();
                this.checkBorder();
            }
        },10)
    }

    move(){
        if (this.directionX) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
        if (this.directionY) {
            this.moveUp();
        } else {
            this.moveDown();
        }
        this.setSpeed();
        this.setBoxes(0,-this.hitBox.w/2,-this.attackBox.w/2,-this.detectBox.w/2);
    }

    setType(type){
        this.type = type;
        if (type == 'poison') {
            this.loadImg(this.IMGs.poison);
        } else {
            this.loadImg(this.IMGs.normal);
            this.speedY = 0;
        }
    }

    setSpeed(){
        if (this.type == 'normal') {
            this.speedX = Math.max(this.speedX - 0.05, 0);
            this.speedY += 0.025;
        }
    }

    checkBorder(){
        let barrier = this.checkBarrier('right') || this.checkBarrier('left') || this.checkBarrier('top') || this.checkBarrier('bottom');
        let lvlBorder = this.checklvlBorder('right') || this.checklvlBorder('left') || this.checklvlBorder('top') || this.checklvlBorder('bottom');
        if (barrier || lvlBorder) {
            this.setState('hurt');
            this.setState('dead');
            this.setState('remove');
        }
    }
}