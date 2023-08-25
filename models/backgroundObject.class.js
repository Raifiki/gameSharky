class BackgroundObject extends DrawableObject{
    // fields

    // methodes
    constructor(imgPath,x,w,h){
        super();
        this.x = x;
        this.y = 0;
        this.loadImg(imgPath);
        this.width = w;
        this.height = h;
    }
}