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
        if (!this.isNotVisible(ofst)) {
            let x = this.x - ofst;
            if (this.direction) {
                ctx.drawImage(this.img,x,this.y,this.width,this.height); 
            } else {
                this.flipImg(ctx,x);
            }
            
        }
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

    isNotVisible(ofst){
        return this.x+this.width < ofst ||
            this.x > ofst + canvas_w;
    }

    flipImg(ctx,x){
        ctx.save();
        ctx.scale(-1, 1);
        x = -x - this.width;
        ctx.drawImage(this.img,x,this.y,this.width,this.height);
        ctx.restore()
    }
}