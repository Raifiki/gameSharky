class AnmiatedObject extends DrawableObject {
    //field
    imgCache = [];
    currentIMG = 0;
    animationIMGs;
    //method
    constructor(x,y,h,w){
        super(x,y,w,h);
    }

    addIMG2Cache(imgPaths){
        imgPaths.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    playAnimation(imgPaths){
        let idx = this.currentIMG % imgPaths.length;
        let path = imgPaths[idx];
        this.img = this.imgCache[path];
        this.currentIMG++;
    }
}