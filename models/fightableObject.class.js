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
    state = 'IDLE';

    //methodes
    constructor(x,y,w,h){
        super(x,y,w,h);
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

    isColliding(obj){
        let x1= this.hitBox.x; // Zuweisung über Kurzschreibweise machen
        let y1= this.hitBox.y;
        let w1= this.hitBox.w;
        let h1= this.hitBox.h;
        let x2= obj.hitBox.x;
        let y2= obj.hitBox.y;
        let w2= obj.hitBox.w;
        let h2= obj.hitBox.h;
        return ((x2 <= x1 && x1 <= x2+w2) || (x2 <= x1+w1 && x1+w1 <= x2+w2) || (x1<x2 && x1+w1 > x2+w2)) && 
               ((y2 <= y1 && y1 <= y2+h2) ||(y2 <= y1+h1 && y1+h1 <= y2+h2) ||  (y1<y2 && y1+h1 > y2+h2));
    }

    isHit(dmg){
        if (!this.isDead() && this.state != 'HURT') {
            this.health -= dmg;
            console.log('Health: ',this.health);
            this.state = 'HURT';
            this.isDead();
        }
    }

    isDead(){
        if (this.health<=0) {
            this.state = 'REMOVE'; // should be DEAD because of animation
        }
        return this.health<=0;
    }
}