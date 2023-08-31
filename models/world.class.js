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

        gameState = 'RUN';

        this.run10();
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
        this.addToMap(this.level.collectables);
        this.addToMap(this.bubbles);
        this.addToMap(this.level.enemies);
        this.addToMap(this.character);

        
        
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
            'Coins: ',this.character[0].coins,'\n',
            )

        this.level.enemies.forEach((e,idx) =>{
            console.log('========Enemy'+idx+'========\n',
            'HP: ',e.health,'\n',
            'State: ',e.state,'\n',
            )
        })
    }

    run10(){
        setInterval(() => {
            this.removeFromMap(this.bubbles);
            this.removeFromMap(this.level.enemies);
            
            this.checkHitToCharacter();
            this.checkHitToEnemies();
        }, 10);
    }

    run1000(){
        setInterval(() => {
            this.addEndbos();
            //delete at end
            //this.showWorldState();
            //delete at end
        }, 1000);
    }

    removeFromMap(ary){
        ary.forEach((e,idx,ary) => {
            if (e.state == 'REMOVE'){
                ary.splice(idx,1);
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
        // Bubble
        this.bubbles.forEach((b,idx) =>{
            if (this.character[0].isColliding(this.character[0].hitBox,b.hitBox) && this.character[0].state != 'HURT' && b.from != 'character') {
                this.character[0].hit(b.damage); // hurt by bubble
                this.bubbles.splice(idx,1);
            }
        });
        // Collectables
        this.level.collectables.forEach((c,idx) => {
            if (this.character[0].isColliding(this.character[0].hitBox,c.hitBox)) {
                if (c.type == 'coin') {
                    this.character[0].coins++;
                    this.level.collectables.splice(idx,1);
                }
                if (c.type == 'poison') {
                    this.character[0].poison++;
                    this.level.collectables.splice(idx,1); 
                }
                              
            }
        })
    }

    checkHitToEnemies(){       
        this.level.enemies.forEach(e =>{
            // BubbleTrap
            this.bubbles.forEach((b,idx) =>{
                if (e.isColliding(e.hitBox,b.hitBox) && e.state != 'HURT' && b.from != 'enemy') {
                    if (!(e.type == 'toxic' && b.type == 'poison')) {
                        console.log('enemy hurt')
                        e.hit(b.damage); // hurt by bubble
                        this.bubbles.splice(idx,1);
                    }
                }
            });
            // Slap Attacke Sharky
            if (e.isColliding(e.hitBox,this.character[0].attackBox) && this.character[0].state == 'ATTACK') {
                e.hit(this.character[0].damage); // hurt by character attack
            }  
        })
    }

    addEndbos(){
        let EB;
        this.level.enemies.forEach(e =>{
           (e instanceof Endboss)?EB= EB || true:EB= EB ||false;
        })
        if (this.character[0].x >= 2400 && !EB) {
            this.level.barrier.push(new Barrier(2200,0,200,600,2));
            this.level.enemies.push(new Endboss (3000,50,300,300));
            this.addJellyfish();
        }
    }

    addJellyfish(){
        setInterval(() => {
            let y = Math.random()*this.level.height;
            let x = this.level.length - 101;
            this.level.enemies.push(new Jellyfish(x,y,100,100,'toxic'))
        }, 20000);
    }
}