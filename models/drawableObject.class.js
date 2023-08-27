class DrawableObject {
    // Fields
        x;
        y;
        width;
        height;
        center;
        img = new Image();
        direction = true;
    // methodes
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.calcCenter();
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
        if (this instanceof MoveableObject || this instanceof BackgroundObject) {
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

    calcCenter(){
        this.center = {
            x: this.x + this.width/2,
            y: this.y + this.height/2,
        }
    }
}