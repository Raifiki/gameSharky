/**
 * Class representing a status icon
 */
class Statusicon {
    //fields
    x;
    y;
    width;
    height;
    img = new Image();
    type;
    character;
    amount = 0;
    imgCache = [];

    imgCoin = './img/05_Statusicons/Coin.png';
    imgPoison = './img/05_Statusicons/Poison.png';
    imgBubble = './img/05_Statusicons/Bubble.png';
    imgBubblePoison = './img/05_Statusicons/PoisonedBubble.png';

    // methodes
    /**
     * This function initialize an status icon object
     * 
     * @param {number} x - this is the initial x coordinate 
     * @param {number} y - this is the initial y coordinate 
     * @param {number} w - this is the initial width
     * @param {number} h - this is the initial height
     * @param {string} type - the type if the icon, 'coin', 'poison', 'bubble'
     */
    constructor(x,y,w,h,type){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.addIMG2Cache(this.imgCoin);
        this.addIMG2Cache(this.imgPoison);
        this.addIMG2Cache(this.imgBubble);
        this.addIMG2Cache(this.imgBubblePoison);

        this.setIconType(type);
    }


    /**
     * This function draw the image on the canvas element
     * 
     * @param {CanvasRenderingContext2D} ctx - context of the canvas where the imgeg will be draw 
     */
    draw(ctx){
        this.updateAmountValue();
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height); 
        this.drawTxt(ctx);
    }


    /**
     * This function add a Text next to the icon image to the canvas
     * 
     * @param {CanvasRenderingContext2D} ctx - context of the canvas where the imgeg will be draw 
     */
    drawTxt(ctx){
        ctx.font = "30px Arial";
        ctx.fillStyle = "orange";
        ctx.textAlign = "left";
        ctx.fillText(this.amount, this.x + this.width/2 + 25,this.y + this.height/2 + 11);	
    }


    /**
     * This function set the type of the icon
     * 
     * @param {string} type - type of the icon, 'coin', 'poison', 'bubble'
     */
    setIconType(type){
        this.type = type;
        switch (type) {
            case 'coin':
                this.img = this.imgCache[this.imgCoin];
                break;
            case 'poison':
                this.img = this.imgCache[this.imgPoison];
                break;
            case 'bubble':
                this.img = this.imgCache[this.imgBubble];
                break;
        }
    }

    
    /**
     * This function updates the amount if the object
     */
    updateAmountValue(){
        switch (this.type) {
            case 'coin':
                this.amount = this.character.coins;
                break;
            case 'poison':
                this.amount = this.character.poison;
                break;
            case 'bubble':
                this.amount = this.character.bubbleShots;
                this.updateBubbleImg();
                break;
        }
    }

    /**
     * This function set the correct bubble image for this icon 
     */
    updateBubbleImg(){
        if (this.character.bubbleType == 'poison') {
            this.img = this.imgCache[this.imgBubblePoison];
        } else {
            this.img = this.imgCache[this.imgBubble];
        }
    }

    /**
     * This function add images to the image cache of this bar object
     * 
     * @param {array} imgPaths - an array with one string for each image wich has to be added
     */
    addIMG2Cache(path){
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
    }
}