class BackgroundObject extends DrawableObject{
    // fields

    // methodes
    constructor(imgPath,x,y,w,h){
        super(x,y,w,h);
        this.loadImg(imgPath);
    }
}