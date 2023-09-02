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

    imgBarOrange = [
        '../img/05_Statusicons/Bar/0.png',
        '../img/05_Statusicons/Bar/o20.png',
        '../img/05_Statusicons/Bar/o40.png',
        '../img/05_Statusicons/Bar/o60.png',
        '../img/05_Statusicons/Bar/o80.png',
        '../img/05_Statusicons/Bar/o100.png',
    ];

    imgBarPurpel = [
        '../img/05_Statusicons/Bar/0.png',
        '../img/05_Statusicons/Bar/p20.png',
        '../img/05_Statusicons/Bar/p40.png',
        '../img/05_Statusicons/Bar/p60.png',
        '../img/05_Statusicons/Bar/p80.png',
        '../img/05_Statusicons/Bar/p100.png',
    ];

    // methodes
    constructor(x,y,w,h,dir){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.direction = dir;
    }

    draw(ctx){
        this.update();
        this.setPercentage ();
        if (this.direction) {
            ctx.drawImage(this.img,this.x,this.y,this.width,this.height); 
            this.drawTxt(ctx);
        } else {
            this.flipImg(ctx)
            this.drawTxt(ctx);
        }

    }


    drawTxt(ctx){
        ctx.font = "30px Arial";
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

    loadImg(path){ 
        this.img.src = path;
    }


    setPercentage (){
        let path;
        if (this.direction) {
            path = this.imgBarOrange[this.resolveImg ()];
        } else {
            path = this.imgBarPurpel[this.resolveImg ()];
        }
        this.loadImg(path);
    }

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

    flipImg(ctx){
        ctx.save();
        ctx.scale(-1, 1);
        let x = -this.x - this.width;
        ctx.drawImage(this.img,x,this.y,this.width,this.height);
        ctx.restore()
    }

    update(){
        this.percentageLP = this.character.health/this.character.maxHealth * 100;
    }
}