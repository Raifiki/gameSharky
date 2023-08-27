class FightableObject extends MoveableObject {
    //fields
    health;
    damage;
    hitBox;
    attackBox;
    detectBox;
    state;

    //methodes
    constructor(x,y,w,h){
        super(x,y,w,h);
    }
}