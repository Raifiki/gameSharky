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
        this.drawFrames(ctx,ofst);
    }

    drawFrames(ctx, ofst){
        if (this instanceof MoveableObject || this instanceof BackgroundObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x - ofst, this.y, this.width,this.height);
            ctx.stroke();
        }
        this.drawFrame(ctx,ofst,this.hitBox,'blue');
        this.drawFrame(ctx,ofst,this.attackBox,'red');
        this.drawFrame(ctx,ofst,this.detectBox,'yellow');

    }

    drawFrame(ctx,ofst,Box,color){
        if (this instanceof FightableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = color;
            ctx.rect(Box.x - ofst, Box.y, Box.w,Box.h);
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