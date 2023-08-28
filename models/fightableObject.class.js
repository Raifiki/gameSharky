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

    //methodes
    constructor(x,y,w,h){
        super(x,y,w,h);
    }


    setState(event){
        switch (this.state) {
            case 'IDLE':
                if (event == 'hurt') {
                    this.state = 'HURT';
                } else if (event == 'attack'){
                    this.state = 'ATTACK';
                } else if (event == 'move'){
                    this.state = 'MOVE';
                }
                break;
            case 'MOVE':
                if (event == 'hurt') {
                    this.state = 'HURT';
                } else if (event == 'attack'){
                    this.state = 'ATTACK';
                } else if (event == 'idle'){
                    this.state = 'IDLE';
                }
                break;   
            case 'ATTACK':
                if (event == 'hurt') {
                    this.state = 'HURT';
                } else if (event == 'attackFinished'){
                    this.state = 'IDLE';
                }
                break; 
            case 'HURT':
                if (event == 'dead') {
                    this.state = 'DEAD';
                }
                if (event == 'hurtFinished') {
                    this.state = 'IDLE';
                }
                break; 
            case 'DEAD':
                if (event = 'remove') {
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
        let x1= obj1Box.x; // Zuweisung über Kurzschreibweise machen
        let y1= obj1Box.y;
        let w1= obj1Box.w;
        let h1= obj1Box.h;
        let x2= obj2Box.x;
        let y2= obj2Box.y;
        let w2= obj2Box.w;
        let h2= obj2Box.h;
        return ((x2 <= x1 && x1 <= x2+w2) || (x2 <= x1+w1 && x1+w1 <= x2+w2) || (x1<x2 && x1+w1 > x2+w2)) && 
               ((y2 <= y1 && y1 <= y2+h2) ||(y2 <= y1+h1 && y1+h1 <= y2+h2) ||  (y1<y2 && y1+h1 > y2+h2));
    }

    isHit(dmg){
        if (!this.isDead() && this.state != 'HUR') {
            this.health -= dmg;
            this.setState('hurt');
            this.isDead();
        }
    }

    isDead(){
        if (this.health<=0) {
            this.setState('remove'); // should be DEAD because of animation
        }
        return this.health<=0;
    }

    isDetecting(obj){
        return this.isColliding(this.detectBox,obj.hitBox);
    }
}