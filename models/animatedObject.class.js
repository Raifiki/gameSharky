class AnmiatedObject extends DrawableObject {
    //field
    imgCache = [];
    imgIdx = 0;
    animationIMGs;
    currentAnimation;
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

    playAnimation(imgPaths,repeat){
        this.setIdx(imgPaths,repeat);
        let path = imgPaths[this.imgIdx];
        this.img = this.imgCache[path];
    }


    setIdx(animation,repeat){
        if (this.animationHasChanged(animation) || (this.isIdxOutOfRange() && repeat == 'repeat')){
            this.imgIdx = 0;
        } else{
            this.imgIdx = Math.min(this.currentAnimation.length-1, this.imgIdx+1);
        }
    }

    animationHasChanged(animation){
        let animationChanged = animation != this.currentAnimation;
        if (animationChanged) {
            this.currentAnimation = animation;
        }
        return animationChanged;
    }

    isIdxOutOfRange(){
        return this.imgIdx >= this.currentAnimation.length-1;
    }
}