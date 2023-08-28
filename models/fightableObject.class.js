class FightableObject extends MoveableObject {
    //fields
    health;
    damage;
    hitBox = {
        w: 0,
        h: 0,
    };
    attackBox= {
        w: 0,
        h: 0,
    };
    detectBox= {
        w: 0,
        h: 0,
    };

    detectedObject;

    state = 'IDLE';

    timeStamps = {
        lastAction: new Date().getTime(),
        lastHit: new Date().getTime(),
        startAttack: new Date().getTime(),
        deadTime: new Date().getTime()*2,
    }
    tAttack = 1;
    tHurt = 1;
    tDead = 1;
    tAction = 5;
    //methodes
    constructor(x,y,w,h){
        super(x,y,w,h);
        this.setBoxes(0,0);

        this.run10();
    }

    run10(){
        setInterval(() =>{
            this.handleTimers();
        },10);
    }

    setState(event){
        switch (this.state) {
            case 'IDLE':
                if (event == 'hurt') {
                    this.state = 'HURT';
                    this.timeStamps.lastHit = new Date().getTime();
                } else if (event == 'attack'){
                    this.state = 'ATTACK';
                    this.timeStamps.startAttack = new Date().getTime();  
                } else if (event == 'move'){
                    this.state = 'MOVE';
                }
                break;
            case 'MOVE':
                if (event == 'hurt') {
                    this.state = 'HURT';
                    this.timeStamps.lastHit = new Date().getTime();
                } else if (event == 'attack'){
                    this.state = 'ATTACK';
                    this.timeStamps.startAttack = new Date().getTime();  
                } else if (event == 'idle'){
                    this.state = 'IDLE';
                    this.timeStamps.lastAction = new Date().getTime();
                }
                break;   
            case 'ATTACK':
                if (event == 'hurt') {
                    this.state = 'HURT';
                    this.timeStamps.lastHit = new Date().getTime();
                } else if (event == 'attackFinished'){
                    this.state = 'IDLE';
                    this.timeStamps.lastAction = new Date().getTime();
                }
                break; 
            case 'HURT':
                if (event == 'dead') {
                    this.state = 'DEAD';
                    this.timeStamps.deadTime = new Date().getTime();
                }
                if (event == 'hurtFinished') {
                    this.state = 'IDLE';
                    this.timeStamps.lastAction = new Date().getTime();
                }
                break; 
            case 'DEAD':
                if (event == 'remove') {
                    this.state = 'REMOVE';
                }
                break; 
            case 'REMOVE':
                break;      
        }
    }

    setBoxes(xOfs,yOfs){
        this.hitBox.x = this.center.x - this.hitBox.w/2 + xOfs;
        this.hitBox.y = this.center.y - this.hitBox.h/2 + yOfs;
        this.attackBox.y = this.center.y - this.attackBox.h/2 + yOfs;;
        this.detectBox.y = this.center.y - this.detectBox.h/2 + yOfs;;
        if (this.directionX) {
            this.attackBox.x = this.center.x + xOfs;    
            this.detectBox.x = this.center.x - this.detectBox.w/4 + xOfs;
        } else {
            this.attackBox.x = this.center.x - this.attackBox.w + xOfs;            
            this.detectBox.x = this.center.x - this.detectBox.w*3/4 + xOfs;
        }
    }

    isColliding(obj1Box,obj2Box){
        let [x1,y1,w1,h1]= [obj1Box.x,obj1Box.y,obj1Box.w,obj1Box.h];
        let [x2,y2,w2,h2]= [obj2Box.x,obj2Box.y,obj2Box.w,obj2Box.h];
        return ((x2 <= x1 && x1 <= x2+w2) || (x2 <= x1+w1 && x1+w1 <= x2+w2) || (x1<x2 && x1+w1 > x2+w2)) && 
               ((y2 <= y1 && y1 <= y2+h2) ||(y2 <= y1+h1 && y1+h1 <= y2+h2) ||  (y1<y2 && y1+h1 > y2+h2));
    }

    hit(dmg){
        if (this.state != 'HURT') {
            this.health -= dmg;
            this.setState('hurt');
            if (this.health<=0) {
                this.health = 0;
                this.setState('dead');
            }
        }
    }

    isHurt(duration){
        let dt = new Date().getTime() - this.timeStamps.lastHit;
        dt = dt/1000;
        return dt<duration;
    }

    isAttacking(duration){
        let dt = new Date().getTime() - this.timeStamps.startAttack;
        dt = dt/1000;
        return dt<duration;
    }

    isDead(duration){
        let dt = new Date().getTime() - this.timeStamps.deadTime;
        dt = dt/1000;
        return dt<duration;
    }

    isLazy(duration){
        let dt = new Date().getTime() - this.timeStamps.lastAction;
        dt = dt/1000;
        return dt>duration;
    }

    isDetecting(obj){
        return this.isColliding(this.detectBox,obj.hitBox);
    }

    handleTimers(){
        if(!this.isAttacking(this.tAttack)){
            this.setState('attackFinished');
        };
        if (!this.isHurt(this.tHurt)) {
            this.setState('hurtFinished');
        }
        if (!this.isDead(this.tDead)) {
            this.setState('remove');
        }

        //console.log('Lazy: ',this.isLazy(this.tAction) && this.state == 'IDLE'); Condition for lazy
        
        
    }
}