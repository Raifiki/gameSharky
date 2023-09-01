class CollectableObject extends MoveableObject{
    // fields
    hitBox
    type
    // methodes
    constructor(x,y,w,h,type){
        super(x-w/2,y-h/2,w,h);
        this.setType(type);
        this.directionX = true;
        this.setHitBox();

        this.addAnimationIMGs();

        this.Crun10();
        this.Crun200();
    }

    Crun10(){
        setInterval(() => {
            if (gameState == 'RUN') {
                this.move();
            } 
        },10)
    }

    Crun200(){
        setInterval(() =>{
            this.animate();
        },200)
    }

    move(){
        this.moveDown();
        this.setHitBox();
    }
    setHitBox(){
        this.hitBox = {
                x: this.x,
                y: this.y,
                w: this.width,
                h: this.height,
            };
    }
    setType(type){
        this.type = type;
        if (type == 'poison') {
            this.loadImg('../img/04_Collectables/Posión/DarkLeft.png');
            this.speedY = 2;
            this.directionY = false;
        } else {
            this.loadImg('../img/04_Collectables/Coins/1.png',);
        }
    }

    addAnimationIMGs(){
        this.animationIMGs = ANIMATION_IMGS_COLLECTABLES;
        this.addIMG2Cache(this.animationIMGs.COIN);
        this.addIMG2Cache(this.animationIMGs.POISON);
    }

    animate(){
        if (this.type == 'poison') {
            this.playAnimation(this.animationIMGs.POISON,'repeat');
        }
        if (this.type == 'coin') {
            this.playAnimation(this.animationIMGs.COIN,'repeat');
        }
    }
}