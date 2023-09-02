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

    imgCoin = '../img/05_Statusicons/Coin.png';
    imgPoison = '../img/05_Statusicons/Poison.png';
    imgBubble = '../img/05_Statusicons/Bubble.png';
    imgBubblePoison = '../img/05_Statusicons/PoisonedBubble.png';

    // methodes
    constructor(x,y,w,h,type){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.setIconType(type);
    }

    draw(ctx){
        this.update();
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height); 
        // delete at end
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'green';
        ctx.rect(this.x, this.y, this.width,this.height);
        ctx.stroke();
        // delete at end
        this.drawTxt(ctx);
    }


    drawTxt(ctx){
        ctx.font = "30px Arial";
        ctx.fillStyle = "orange";
        ctx.textAlign = "left";
        ctx.fillText(this.amount, this.x + this.width/2 + 25,this.y + this.height/2 + 11);	
    }

    loadImg(path){ 
        this.img.src = path;
    }

    setIconType(type){
        this.type = type;
        switch (type) {
            case 'coin':
                this.loadImg(this.imgCoin);
                break;
            case 'poison':
                this.loadImg(this.imgPoison);
                break;
            case 'bubble':
                this.loadImg(this.imgBubble);
                break;
        }
    }

    
    update(){
        switch (this.type) {
            case 'coin':
                this.amount = this.character.coins;
                break;
            case 'poison':
                this.amount = this.character.poison;
                break;
            case 'bubble':
                this.amount = this.character.bubbleShots;
                if (this.character.bubbleType == 'poison') {
                    this.loadImg(this.imgBubblePoison);
                } else {
                    this.loadImg(this.imgBubble);
                }
                break;
        }
    }
}