class DrawableObject {
    // Fields
        x;
        y;
        width;
        height;
        img = new Image();
        direction = true;
    // methodes
    constructor(){

    }

    draw(ctx,ofst){
        let x = this.x - ofst;
        ctx.drawImage(this.img,x,this.y,this.width,this.height);
        this.drawFrame(ctx,ofst);
    }

    drawFrame(ctx, ofst){
        if (this instanceof MovableObject || this instanceof BackgroundObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x - ofst, this.y, this.width,this.height);
            ctx.stroke();
        }
    }

    loadImg(path){ 
        this.img.src = path;
    }
}