class Bubble extends FightableObject{
    //fields
    IMGs = {
        normal: '../img/01_Sharkie/4_Attack/Bubble trap/Bubble.png',
        poison: '../img/01_Sharkie/4_Attack/Bubble trap/PoisonedBubble.png',
    }
    type;
    //methodes
    constructor(x,y,w,h,type,dir){
        super(x,y,w,h);
        this.setImgPath(type);
        this.directionX = dir;
        this.type = type;

        this.health = 1;
        this.damage = 10;
        this.state = 'MOVE'

        this.hitBox.w = 1*this.width;
        this.hitBox.h = 1*this.width;
        this.attackBox.w = 0;
        this.attackBox.h = 0;
        this.detectBox.w = 0;
        this.detectBox.h = 0;

        this.speedX = 10;
        this.speedY = 0;

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
        this.moveUp();
        this.setSpeed();
        this.setBoxes(0,0);
    }

    setImgPath(type){
        if (type == 'poison') {
            this.loadImg(this.IMGs.poison);
        } else {
            this.loadImg(this.IMGs.normal);
        }
    }

    setSpeed(){
        if (this.type == 'normal') {
            this.speedX = Math.max(this.speedX - 0.1, 0);
            this.speedY += 0.01;
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