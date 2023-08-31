class Jellyfish extends FightableObject {
    //fields
    cntItems = 1;
    type = 'normal';
    radiusCnt = 0;
    frequency = 1/1000;
    attackCnt = 0;
    //methodes
    constructor(x,y,w,h,type){
        super(x,y,w,h);
        this.setType(type)
        this.directionIMG = false;
        this.directionX = false;

        this.speedX = 2;
        this.speedY = 2;

        this.health = 50;
        this.damage = 15;

        this.hitBox.w = 0.8*this.width;
        this.hitBox.h = 0.65*this.width;
        this.attackBox.w = 0;
        this.attackBox.h = 0;
        this.detectBox.w = 3.5*this.width;
        this.detectBox.h = 3.5*this.width;

        this.JFrun10();
    }

    JFrun10(){
        setInterval(() => {
            if (gameState == 'RUN') {
                this.detect();
                this.attack();
                this.move();
                this.dropItem();
            } 
        },10)
    }


    setType(type){
        this.type = type;
        if (type == 'normal') {
            this.loadImg('../img/02_Enemy/2_Jellyfish/TypeNormal/L1.png');
        } else {
            this.loadImg('../img/02_Enemy/2_Jellyfish/TypeToxic/G1.png');
        }
    }

    move(){
        this.setState('idle');
        if (this.state == 'IDLE' || this.state == 'HURT' || this.state == 'ATTACK') {
            this.setMoveBehavior();
            if (this.directionY) {
                this.moveUp();
            } else {
                this.moveDown();
            }
            if (this.directionX) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
            this.setBoxes(-2,-this.hitBox.w/2,-this.attackBox.w/2,-this.detectBox.w/2);
            this.setState('move');
        }
    }


    setMoveBehavior(){
        if ((this.checklvlBorder('left') || this.checkBarrier('left') || this.checklvlBorder('right') || this.checkBarrier('right'))){// && !this.state == 'ATTACK') {
            this.directionX = !this.directionX;
        }
        if ((this.checklvlBorder('top') || this.checkBarrier('top') || this.checklvlBorder('bottom') || this.checkBarrier('bottom'))){// && !this.state == 'ATTACK') {
            this.directionY = !this.directionY;
        }
    }

    attack(){
        if (this.type == 'normal' && this.state == 'ATTACK') {
            this.attackMove(0,10)
        } else if(this.state == 'ATTACK') {
            this.attackMove(150,1);
            this.attackShot();
        }
        this.radiusCnt++;
    }

    initRadiusCnt(){
        if (this.state != 'ATTACK' && this.state != 'HURT') {
            let dx = this.detectedObject.center.x - this.center.x ;
            let dy = this.detectedObject.center.y - this.center.y ;
            let angle = Math.atan2(dy,dx);
            this.radiusCnt = angle * 1/this.frequency/2/Math.PI;
        }
    }

    attackMove(radius,timeSpeed){
        let [spdX,spdY,dirX,dirY] = this.calcKinematics(radius,timeSpeed);
        this.speedX = spdX;
        this.speedY = spdY;
        this.directionX = dirX;
        this.directionY = dirY;
    }

    calcKinematics(radius,timeSpeed){
        let dx = this.detectedObject.center.x + Math.cos(this.radiusCnt*this.frequency*2*Math.PI)*radius - this.center.x ;
        let dy = this.detectedObject.center.y + Math.sin(this.radiusCnt*this.frequency*2*Math.PI)*radius - this.center.y ;
        let dt = timeSpeed*10; // time till object reach detected object (time[s]*samplerate[ms] (run))
        let spdX = Math.abs(dx/dt);
        let spdY = Math.abs(dy/dt);
        let dirX = dx > 0;
        let dirY = dy < 0;
        return [spdX,spdY,dirX,dirY]
    }

    attackShot(){
        if (this.attackCnt >= 100){
            let [spdX,spdY,dirX,dirY] = this.calcKinematics(0,10);
            world.bubbles.push(new Bubble(this.center.x,this.center.y,spdX,spdY, dirX, dirY,'poison','enemy'));
            this.attackCnt = 0;
        }else {
            this.attackCnt++;
        }
        
    }

    detect(){
            if(this.isDetecting(world.character[0])){
                this.setState('attack');
                this.detectedObject = world.character[0];
                this.initRadiusCnt();
            } else {
                this.detectedObject = [];
                this.setState('attackFinished');
                //this.speedX = 0;
                //this.speedY = 0;
            }
    }

    dropItem(){
        if (this.state == 'REMOVE' && this.cntItems>0) {
            if (this.type == 'normal') {
                world.level.collectables.push(new CollectableObject(this.center.x,this.center.y,30,30,'coin'));
            } else {
                world.level.collectables.push(new CollectableObject(this.center.x,this.center.y,50,50,'poison'));
            }
            this.cntItems--;            
        }
    }
}