class BackgroundObject extends DrawableObject{
    // fields

    // methodes
    constructor(imgPath,x,w,h){
        super(x,0,w,h);
        this.loadImg(imgPath);
    }
}