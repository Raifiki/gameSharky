class World {
    //Fields
    ctx;
    canvas;
    level = LEVEL_1;
    character = [new Character(100,100,150,150)];
    Bubbles = [];
    keyListener;

    cameraOfst = 0;

    //methodes
    constructor(canvas,keyListener){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.drawMap();

        this.keyListener = keyListener;
        this.character[0].keyListener = keyListener;

        this.run100();
    }


    addToMap(ary){
        ary.forEach(e => {
            e.draw(this.ctx,this.cameraOfst);
        });
    }


    drawMap(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        this.addToMap(this.level.background);
        this.addToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addToMap(this.Bubbles);
        
        //delete Code
        this.drawCameraView();
        //delete Code

        let self = this;
        requestAnimationFrame(function (){self.drawMap();});  
    }    


    drawCameraView(){ // delete this function at the end
        this.ctx.beginPath();
        this.ctx.lineWidth = '2';
        this.ctx.strokeStyle = 'green';
        this.ctx.rect(0, 5, canvas_w,canvas_h - 10);
        this.ctx.stroke();
    }

    run100(){
        setInterval(() => {
            this.removeBubbles();
            this.removeEnemies();
            this.checkHitToCharacter();
            this.checkHitToEnemies();
        }, 100);
    }

    removeBubbles(){
        let visibleBubbles = [];
        this.Bubbles.forEach(bubble =>{
            if (bubble.x < this.cameraOfst + this.canvas.width && bubble.x > this.cameraOfst) {
                visibleBubbles.push(bubble);
            }
        });
        this.Bubbles = visibleBubbles;
    }

    removeEnemies(){
        this.level.enemies.forEach((e,idx) => {
            if (e.state == 'REMOVE'){
                this.level.enemies.splice(idx,1);
            }
        })
    }

    checkHitToCharacter(){
        // collision
        this.level.enemies.forEach(e =>{
            if (this.character[0].isColliding(e)) {
                this.character[0].isHit(e.damage);
            }
        });
        // Attacke (Endbos)
    }

    checkHitToEnemies(){
        // BubbleTrap
        this.Bubbles.forEach((B,idx) =>{
            this.level.enemies.forEach(e =>{
                if (e.isColliding(B) && e.state != 'HURT') {
                    e.isHit(B.damage);
                    this.Bubbles.splice(idx,1);
                }
            })
        });
        // Slap Attacke Sharky
    }
}