class Pufferfish extends FightableObject {
    //fields
    cntItems = 1;
    //methodes
    constructor(x,y,w,h){
        super(x,y,w,h);
        this.loadImg('../img/02_Enemy/1_Pufferfish/1_Swim/1.swim1.png');
        this.directionIMG = false;
        this.directionX = false;

        this.speedX = 0;
        this.speedY = 0;

        this.health = 20;
        this.damage = 10;
        this.state = 'MOVE';

        this.hitBox.w = 0.95*this.width;
        this.hitBox.h = 0.7*this.width;
        this.attackBox.w = 0*this.width;
        this.attackBox.h = 0*this.width;
        this.detectBox.w = 0*this.width;
        this.detectBox.h = 0*this.width;

        this.PFrun10();
    }
    PFrun10(){
        setInterval(() => {
            if (gameState == 'RUN') {
                this.move();
                this.dropItem();
             }
        },10)
    }

    move(){
        this.setState('idle');
        if (this.state == 'IDLE' || this.state == 'HURT' || this.state == 'ATTACK') {
            this.setMoveBehavior();
            if (this.directionX) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
            this.setBoxes(-5,-10,0,0);
        }
    }

    setMoveBehavior(){
        if (this.checklvlBorder('left') || this.checkBarrier('left') || this.checklvlBorder('right') || this.checkBarrier('right')) {
            this.directionX = !this.directionX;
        }
        if (this.checklvlBorder('top') || this.checkBarrier('top') || this.checklvlBorder('bottom') || this.checkBarrier('bottom')) {
            this.directionY = !this.directionY;
        }
    }

    dropItem(){
        if (this.state == 'REMOVE' && this.cntItems > 0) {
            world.level.collectables.push(new CollectableObject(this.center.x,this.center.y,30,30,'coin'));       
            this.cntItems--;        
        }
    }
}