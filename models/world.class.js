class World {
    //Fields
    ctx;
    canvas;
    level = LEVEL_1;
    character = [new Character(100,100,150,150)];
    
    keyListener;

    cameraOfst = 0;
    //methodes
    constructor(canvas,keyListener){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.drawMap();

        this.keyListener = keyListener;
        this.character[0].keyListener = keyListener;
    }


    addToMap(ary){
        ary.forEach(e => {
            e.draw(this.ctx,this.cameraOfst);
        });
    }

    drawMap(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        this.addToMap(this.level.background);
        this.addToMap(this.character);

        let self = this;
        requestAnimationFrame(function (){self.drawMap();});  
    }    
}