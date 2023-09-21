/**
 * Class representing a Statusbar
 */
class Statusbar {
    //fields
    x;
    y;
    width;
    height;
    img = new Image();
    direction;
    percentageLP = 100;
    character;
    imgCache = [];

    imgBarOrange = [
        './img/05_Statusicons/Bar/0.png',
        './img/05_Statusicons/Bar/o20.png',
        './img/05_Statusicons/Bar/o40.png',
        './img/05_Statusicons/Bar/o60.png',
        './img/05_Statusicons/Bar/o80.png',
        './img/05_Statusicons/Bar/o100.png',
    ];

    imgBarPurpel = [
        './img/05_Statusicons/Bar/0.png',
        './img/05_Statusicons/Bar/p20.png',
        './img/05_Statusicons/Bar/p40.png',
        './img/05_Statusicons/Bar/p60.png',
        './img/05_Statusicons/Bar/p80.png',
        './img/05_Statusicons/Bar/p100.png',
    ];

    // methodes
    /**
     * This function initialize an status bar object
     * 
     * @param {number} x - this is the initial x coordinate 
     * @param {number} y - this is the initial y coordinate 
     * @param {number} w - this is the initial width
     * @param {number} h - this is the initial height
     * @param {boolean} dir - this is the direction
     */
    constructor(x,y,w,h,dir){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.direction = dir;
        this.addIMG2Cache(this.imgBarOrange);
        this.addIMG2Cache(this.imgBarPurpel);
    }


    /**
     * This function draw the image on the canvas element in the correct direction
     * 
     * @param {CanvasRenderingContext2D} ctx - context of the canvas where the imgeg will be draw 
     */
    draw(ctx){
        this.updateBar();
        (this.direction)? this.drawBarPosX(ctx) : this.drawBarNegX(ctx);
    }


    /**
     * This function draw the iamge in the positive x direction (right)
     * 
     * @param {CanvasRenderingContext2D} ctx - context of the canvas where the imgeg will be draw 
     */
    drawBarPosX(ctx){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height); 
        this.drawTxt(ctx);
    }


    /**
     * This function draw the iamge in the negative x direction (left)
     * 
     * @param {CanvasRenderingContext2D} ctx - context of the canvas where the imgeg will be draw 
     */
    drawBarNegX(ctx){
        this.flipImg(ctx)
        this.drawTxt(ctx);
    }


    /**
     * This function add a Text next to the bar image to the canvas
     * 
     * @param {CanvasRenderingContext2D} ctx - context of the canvas where the imgeg will be draw 
     */
    drawTxt(ctx){
        ctx.font = "30px LuckiestGuys";
        if (this.direction) {
            ctx.textAlign = "left";
            ctx.fillStyle = "orange";
            ctx.fillText(this.percentageLP, this.x + this.width + 10,this.y + this.height - 13);
        } else {
            ctx.textAlign = "right";
            ctx.fillStyle = "red";
            ctx.fillText(this.character.health, this.x - 10,this.y + this.height - 13);
        }
        	
    }


    /**
     * This function set the correct image dependent on the percentage health points of the character
     */
    loadIMG (){
        let idxPaths = this.resolveImg ();
        let path = (this.direction)?this.imgBarOrange[idxPaths]:this.imgBarPurpel[idxPaths];
        this.img = this.imgCache[path];
    }


    /**
     * This function checks which image has to be used depended on the health points of the character
     * 
     * @returns {number} - index of the array with the paths for the images, this.imgBarOrange, this.imgBarPurpel
     */
    resolveImg (){
        if (this.percentageLP == 100) {
            return 5;
        } else if(this.percentageLP >= 80){
            return 4;
        } else if(this.percentageLP >= 60){
            return 3;
        } else if (this.percentageLP >= 40){
            return 2;
        } else if (this.percentageLP >= 20){
            return 1;
        } else{
            return 0;
        }
    }


    /**
     * This function flips the image in the other direction
     * 
     * @param {CanvasRenderingContext2D} ctx - context of the canvas where the imgeg will be draw 
     */
    flipImg(ctx){
        ctx.save();
        ctx.scale(-1, 1);
        let x = -this.x - this.width;
        ctx.drawImage(this.img,x,this.y,this.width,this.height);
        ctx.restore()
    }


    /**
     * This function updates the percentage health points of this character
     */
    updateBar(){
        if (!this.character.isState('REMOVE')) {
            this.percentageLP = Math.round(this.character.health/this.character.maxHealth * 100);
            this.loadIMG ();
        }
    }


    /**
     * This function add images to the image cache of this bar object
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
}