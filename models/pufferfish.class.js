class Pufferfish extends FightableObject {
    //fields
    cntItems = 1;
    type;
    //methodes
    constructor(x,y,w,h,type){
        super(x,y,w,h);
        
        this.directionIMG = false;
        this.directionX = false;
        this.setType(type);
        this.speedY = 0;

        this.health = 20;
        this.maxHealth = this.health;
        this.damage = 10;
        this.state = 'MOVE';


        this.tDead = 1;
        this.tHurt = 0.7;

        this.hitBox.w = 0.95*this.width;
        this.hitBox.h = 0.7*this.width;
        this.attackBox.w = 0*this.width;
        this.attackBox.h = 0*this.width;
        this.detectBox.w = 0*this.width;
        this.detectBox.h = 0*this.width;

        this.addAnimationIMGs();

        this.PFrun10();
        this.PFrun100();
    }

    setType(type){
        this.type = type;
        if (type == 'green') {
            this.loadImg('../img/02_Enemy/1_Pufferfish/1_Swim/g1.png');
            this.speedX = 1;
        }
        if (type == 'orange') {
            this.loadImg('../img/02_Enemy/1_Pufferfish/1_Swim/o1.png');
            this.speedX = 1.5;
        }
        if (type == 'red') {
            this.loadImg('../img/02_Enemy/1_Pufferfish/1_Swim/r1.png');
            this.speedX = 2;
        }
    }


    PFrun10(){
        setInterval(() => {
            if (gameState == 'RUN') {
                this.move();
                this.dropItem();
             }
        },10)
    }

    PFrun100(){
        setInterval(() =>{
            this.animate();
        },100)
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
            this.setBoxes(-10,-this.hitBox.w/2,-this.attackBox.w/2,-this.detectBox.w/2);
            this.setState('move');
        } else if (this.state == 'DEAD'){
            this.speedX = 1;
            this.speedY = 5;
            if (this.directionX) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
            this.moveUp();
            this.setBoxes(-10,-this.hitBox.w/2,-this.attackBox.w/2,-this.detectBox.w/2);
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
        if (this.state == 'DEAD' && this.cntItems > 0) {
            if (this.type == 'red') {
                world.level.collectables.push(new CollectableObject(this.center.x,this.center.y,30,30,'heart'));  
            } else {
                world.level.collectables.push(new CollectableObject(this.center.x,this.center.y,30,30,'coin'));       
            }
            this.cntItems--; 
        }
    }


    addAnimationIMGs(){
        this.animationIMGs = ANIMATION_IMGS_PUFFERFISH;
        this.addIMG2Cache(this.animationIMGs.green.SWIM);
        this.addIMG2Cache(this.animationIMGs.green.DEAD);
        this.addIMG2Cache(this.animationIMGs.orange.SWIM);
        this.addIMG2Cache(this.animationIMGs.orange.DEAD);
        this.addIMG2Cache(this.animationIMGs.red.SWIM);
        this.addIMG2Cache(this.animationIMGs.red.DEAD);
    }


    animate(){
        if (this.state == 'MOVE') {
            this.animateMOVE();
        }
        if (this.state == 'HURT') {
            this.playAnimation(this.animationIMGs.HURT,'repeat');
        }   
        if (this.state == 'DEAD') {
            this.animateDEAD();
        } 
    }

    animateMOVE(){
        if (this.type == 'green') {
            this.playAnimation(this.animationIMGs.green.SWIM,'repeat');
        }
        if (this.type == 'orange') {
            this.playAnimation(this.animationIMGs.orange.SWIM,'repeat');
        }
        if (this.type == 'red') {
            this.playAnimation(this.animationIMGs.red.SWIM,'repeat');
        }
    }

    animateDEAD(){
        if (this.type == 'green') {
            this.playAnimation(this.animationIMGs.green.DEAD,'repeat');
        }
        if (this.type == 'orange') {
            this.playAnimation(this.animationIMGs.orange.DEAD,'repeat');
        }
        if (this.type == 'red') {
            this.playAnimation(this.animationIMGs.red.DEAD,'repeat');
        }
    }
}