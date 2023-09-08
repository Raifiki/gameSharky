class World {
    //Fields
    ctx;
    canvas;
    level;
    character = [new Character(200,175)];
    statusBars = [new Statusbar(30,20,250,70,true)];
    statusIcons = [
                   new Statusicon(30,90,50,50,'coin'),
                   new Statusicon(140,90,50,50,'poison'),
                   new Statusicon(250,100,30,30,'bubble'),
                ]
    bubbles = [];
    endboss;
    keyListener;

    cameraOfst = 0;

    //methodes
    constructor(canvas,keyListener,level){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.level = level;

        this.keyListener = keyListener;
        this.character[0].keyListener = keyListener;

        this.statusBars[0].character = this.character[0];
        this.statusIcons[0].character = this.character[0];
        this.statusIcons[1].character = this.character[0];
        this.statusIcons[2].character = this.character[0];

        gameState = 'RUN';

        this.drawMap();
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
        this.addToMap(this.statusBars);
        this.addToMap(this.statusIcons);
      
        
        //delete Code
        //this.drawCameraView();
        this.showCamOfsOnMap()
        //delete Code

        let self = this;
        requestAnimationFrame(function (){self.drawMap();});  
    }    


    drawCameraView(){ // function for debuggung
        this.ctx.beginPath();
        this.ctx.lineWidth = '2';
        this.ctx.strokeStyle = 'green';
        this.ctx.rect(this.character[0].x, 5, canvas_w,canvas_h - 10);
        this.ctx.stroke();
    }

    showWorldState(){ // function for debuggung
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
            if (e instanceof Jellyfish && e.type == 'toxic') {
                console.log('========Enemy'+idx+'========\n',
                'HP: ',e.health,'\n',
                'State: ',e.state,'\n',
                )
            }
        })
    }

    showCamOfsOnMap(){// function for debuggung
        this.ctx.font = "60px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "left";
        this.ctx.fillText(this.character[0].x, 10,canvas_h - 10);	
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
            this.showWorldState();
            //delete at end
        }, 200);
    }

    removeFromMap(ary){
        ary.forEach((e,idx,ary) => {
            if (e.state == 'REMOVE'){
                ary.splice(idx,1);
            }
        })
    }

    checkHitToCharacter(){
        if (this.character[0].state != 'DEAD') {
            // collision
            this.level.enemies.forEach(e =>{
                if (this.character[0].isColliding(this.character[0].hitBox,e.hitBox) && e.state != 'DEAD') {
                    this.character[0].hit(e.damage); // hurt by colliding
                    if (e instanceof Jellyfish) {
                        this.character[0].hitBy = 'poison';
                    } else {
                        this.character[0].hitBy = 'electroShock';
                    }
                }
                if (e instanceof Endboss){
                    if (this.character[0].isColliding(this.character[0].hitBox,e.attackBox) && e.state == 'ATTACK') {
                        this.character[0].hit(e.damage); // hurt by Endboss attack
                        this.character[0].hitBy = 'electroShock';
                    }
                }
            });
            // Bubble
            this.bubbles.forEach((b,idx) =>{
                if (this.character[0].isColliding(this.character[0].hitBox,b.hitBox) && this.character[0].state != 'HURT' && b.from != 'character') {
                    this.character[0].hit(b.damage); // hurt by bubble
                    this.bubbles.splice(idx,1);
                    this.character[0].hitBy = 'poison';
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
                    if (c.type == 'heart') {
                        this.character[0].health = Math.min(this.character[0].health + 10,100);
                        this.level.collectables.splice(idx,1); 
                    }             
                }
            })
        }
    }

    checkHitToEnemies(){       
        this.level.enemies.forEach(e =>{
            // BubbleTrap
            this.bubbles.forEach((b,idx) =>{
                if (e.isColliding(e.hitBox,b.hitBox) && e.state != 'HURT' && b.from != 'enemy') {
                    if (!(e.type == 'toxic' && b.type == 'poison')) {
                        e.hit(b.damage);
                        e.hitBy = 'bubble';
                        this.bubbles.splice(idx,1);
                    }
                }
            });
            // Slap Attacke Sharky
            if (e.isColliding(e.hitBox,this.character[0].attackBox) && this.character[0].state == 'ATTACK' && this.character[0].attackType == 'slap') {
                e.hit(this.character[0].damage); // hurt by character attack
                e.hitBy = 'slap';
            }
        })
    }

    addEndbos(){
        let EB;
        this.level.enemies.forEach(e =>{
           (e instanceof Endboss)? EB= EB || true:EB= EB ||false;
        })
        if ( this.character[0].x >= (this.level.length - canvas_w + 150) && !EB) {
            this.level.barrier.push(new Barrier(6700,265,150,70,2));
            this.endboss = new Endboss (this.level.length - 500,0);
            this.level.enemies.push(this.endboss);
            //this.addJellyfish();
            this.addPufferfish();
            this.statusBars.push(new Statusbar(canvas_w - 280,20,250,70,false));
            this.statusBars[1].character =this.endboss;
        } else if(!EB) {
            this.statusBars.splice(1,1);
        }
    }

    addJellyfish(){
        setInterval(() => {
            let y = Math.random()*(this.level.height - 150);
            let x = this.level.length - 101;
            this.level.enemies.push(new Jellyfish(x,y,0.2,0.2,'toxic'))
        }, 40000);
    }


    addPufferfish(){
        setInterval(() => {
            let y = Math.random()*(this.level.height - 150);
            let x = this.level.length - 101;
            this.level.enemies.push(new Pufferfish(x,y,0,'red'))
        }, 25000);
    }
}