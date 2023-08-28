class Barrier extends DrawableObject{
    // fields
    IMGs = [
        '../img/03_Background/Barrier/TopBottom.png',
        '../img/03_Background/Barrier/horizontal.png',
        '../img/03_Background/Barrier/vertical.png',
    ]
    hitBox
    // methodes
    constructor(x,y,w,h,type){
        super(x,y,w,h);
        this.loadImg(this.IMGs[type]);
        this.directionX = true;
        this.setHitBox(type);
    }

    setHitBox(type){
        if (type == 0) {
            this.hitBox = [
                {
                    x: this.x,
                    y: this.y,
                    w: this.width,
                    h: this.height/4,
                },
                {
                    x: this.x,
                    y: this.y + this.height*3/4,
                    w: this.width,
                    h: this.height/4,
                }
            ];
        } else {
            this.hitBox = [{
                    x: this.x,
                    y: this.y,
                    w: this.width,
                    h: this.height,
                }]
        }
    }
}