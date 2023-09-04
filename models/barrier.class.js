class Barrier extends DrawableObject{
    // fields
    IMGs = [
        './img/03_Background/Barrier/TopBottom.png',
        './img/03_Background/Barrier/horizontal.png',
        './img/03_Background/Barrier/vertical.png',
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
        switch (type) {
            case 0:
                this.hitBox = [
                    {
                        x: this.x,
                        y: this.y,
                        w: this.width,
                        h: this.height/4,
                    },
                    {
                        x: this.x,
                        y: this.y + this.height*4/5,
                        w: this.width,
                        h: this.height/5,
                    }
                ];
                break;
            case 1:
                this.hitBox = [{
                    x: this.x,
                    y: this.y + this.height*(1-0.7),
                    w: this.width,
                    h: this.height*0.7,
                }]
                break;
            case 2:
                this.hitBox = [{
                    x: this.x + this.width*(1-0.6)/2,
                    y: this.y,
                    w: this.width*0.6,
                    h: this.height,
                }]
                break;
        }
    }
}