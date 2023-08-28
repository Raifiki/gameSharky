class World {
    //Fields
    ctx;
    canvas;
    level = LEVEL_1;
    character = [new Character(100,100,150,150)];
    bubbles = [];
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
        this.run1000();
    }


    addToMap(ary){
        ary.forEach(e => {
            e.draw(this.ctx,this.cameraOfst);
        });
    }


    drawMap(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        this.addToMap(this.level.background);
        this.addToMap(this.level.barrier);
        this.addToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addToMap(this.bubbles);
        
        
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

    showWorldState(){
        console.clear();
        console.log(
            '========Character========\n',
            'HP: ',this.character[0].health,'\n',
            'State: ',this.character[0].state,'\n',
            'Bubbles: ',this.character[0].bubbleShots,'\n',
            'Poison: ',this.character[0].poison,'\n',
            )

        this.level.enemies.forEach((e,idx) =>{
            console.log('========Enemy'+idx+'========\n',
            'HP: ',e.health,'\n',
            'State: ',e.state,'\n',
            )
        })
    }

    run100(){
        setInterval(() => {
            this.removeBubbles();
            this.removeEnemies();

            this.checkHitToCharacter();
            this.checkHitToEnemies();

            this.checkDetections();
        }, 100);
    }

    run1000(){
        setInterval(() => {
            //delete at end
            this.showWorldState();
            //delete at end
        }, 1000);
    }

    removeBubbles(){
        let visibleBubbles = [];
        this.bubbles.forEach(bubble =>{
            if (bubble.x < this.cameraOfst + this.canvas.width && bubble.x > this.cameraOfst) {
                visibleBubbles.push(bubble);
            }
        });
        this.bubbles = visibleBubbles;
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
            if (this.character[0].isColliding(this.character[0].hitBox,e.hitBox)) {
                this.character[0].hit(e.damage); // hurt by colliding
            }
            if (e instanceof Endboss){
                if (this.character[0].isColliding(this.character[0].hitBox,e.attackBox) && e.state == 'ATTACK') {
                    this.character[0].hit(e.damage); // hurt by Endboss attack
                }
            }
        });
        // Attacke (Endbos)
    }

    checkHitToEnemies(){       
        this.level.enemies.forEach(e =>{
            // BubbleTrap
            this.bubbles.forEach((b,idx) =>{
                if (e.isColliding(e.hitBox,b.hitBox) && e.state != 'HURT') {
                    e.hit(b.damage); // hurt by bubble
                    this.bubbles.splice(idx,1);
                }
            });
            // Slap Attacke Sharky
            if (e.isColliding(e.hitBox,this.character[0].attackBox) && this.character[0].state == 'ATTACK') {
                e.hit(this.character[0].damage); // hurt by character attack
            }  
        })
    }

    checkDetections(){
        this.level.enemies.forEach(e =>{
            if(e.isDetecting(this.character[0])){
                e.setState('attack');
                e.detectedObject = this.character[0];
            } else {
                e.detectedObject = [];
                e.setState('attackFinished');
            }
        })
    }
}