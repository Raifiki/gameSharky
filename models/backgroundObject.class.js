/**
* Class representing a Backgroundobject. 
 * @extends DrawableObject
 */
class BackgroundObject extends DrawableObject{
    // fields

    // methodes
    /**
     * This function initialize an background object
     * 
     * @param {string} imgPath - this is an path to an img 
     * @param {number} x - this is the x coordinate from the background object
     * @param {number} y - this is the y coordinate from the background object
     * @param {number} w - this is the width of the background object
     * @param {number} h - this is the height of the background object
     */
    constructor(imgPath,x,y,w,h){
        super(x,y,w,h);
        this.loadImg(imgPath);
    }
}