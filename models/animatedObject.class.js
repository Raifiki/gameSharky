/**
* Class representing a Animatedoject. 
 * @extends DrawableObject
 */
class AnmiatedObject extends DrawableObject {
    //field
    imgCache = [];
    imgIdx = 0;
    animationIMGs;
    currentAnimation;

    //method
    /**
     * This function initialize an Animated object
     * 
     * @param {number} x - this is the x coordinate from the animated object
     * @param {number} y - this is the y coordinate from the animated object
     * @param {number} w - this is the width of the animated object
     * @param {number} h - this is the height of the animated object
     */
    constructor(x,y,h,w){
        super(x,y,w,h);
    }


    /**
     * This function add images to the image cache of this animated object
     * 
     * @param {array} imgPaths - an array with one string for each image wich has to be added
     */
    addIMG2Cache(imgPaths){
        imgPaths.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }


    /**
     * This function take an image from the image cache and saves it into the image field of the animated object
     * 
     * @param {array} imgPaths - array with one string for each image of the current animation
     * @param {string} repeat  - optional: This defines if the animation should be repeated or played just once, 'repeat' => tha animation will be repeated
     */
    playAnimation(imgPaths,repeat){
        this.setAnimationIdx(imgPaths,repeat);
        let path = imgPaths[this.imgIdx];
        this.img = this.imgCache[path];
    }


    /**
     * This function sets the index from the image path array of the current animation
     * 
     * @param {array} animation - array with one string for each image of the current animation
     * @param {string} repeat - optional: This defines if the animation should be repeated or played just once, 'repeat' => tha animation will be repeated
     */
    setAnimationIdx(animation,repeat){
        if (this.animationHasChanged(animation) || (this.isIdxOutOfRange() && repeat == 'repeat')){
            this.imgIdx = 0;
        } else{
            this.imgIdx = Math.min(this.currentAnimation.length-1, this.imgIdx+1);
        }
    }


    /**
     * This function checks if the animation has changed compared to the last execution
     * 
     * @param {array} animation - - array with one string for each image of the current animation
     * @returns - true => tha animation has changed, false => the animation has not changed
     */
    animationHasChanged(animation){
        let animationChanged = animation != this.currentAnimation;
        if (animationChanged) {
            this.currentAnimation = animation;
        }
        return animationChanged;
    }

    /**
     * This function checks if the index from the image path array of the current animation excceds the array length
     * 
     * @returns - true => index exceeds, false => index is in range
     */
    isIdxOutOfRange(){
        return this.imgIdx >= this.currentAnimation.length-1;
    }
}