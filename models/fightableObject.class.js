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
    state;

    //methodes
    constructor(x,y,w,h){
        super(x,y,w,h);
    }

    setBoxes(){
        this.hitBox.x = this.center.x - this.hitBox.w/2;
        this.hitBox.y = this.center.y - this.hitBox.h/2;
        this.attackBox.y = this.center.y - this.attackBox.h/2;
        this.detectBox.y = this.center.y - this.detectBox.h/2;
        if (this.direction) {
            this.attackBox.x = this.center.x;    
            this.detectBox.x = this.center.x - this.detectBox.w/4;
        } else {
            this.attackBox.x = this.center.x - this.attackBox.w;            
            this.detectBox.x = this.center.x - this.detectBox.w*3/4;
        }
    }

    isColliding(){
        
    }
}