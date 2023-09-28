/**
 * This class represents the wolrd of the game
 */
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
    endboss = false;
    keyListener;

    cameraOfst = 0;

    soundCache ={
        music: new Audio('./audio/game/game-run-music.mp3'),
        win: new Audio('./audio/game/game-win.mp3'),
    }

    //methodes
    /**
     * This function initialize the world
     * 
     * @param {HTMLcanvasElement } canvas - the canvas element where all pictures are drawn
     * @param {KeyListener} keyListener - key listener object to detect key or touch events
     * @param {Level} level - level object where all level details are stored
     */
    constructor(canvas,keyListener,level){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyListener = keyListener;
        this.initWorld(level);


        this.drawMap();
        this.run10();
        this.run200();
    }


    /**
     * This function initialize a new character, level and statusbars and status icons
     */
    initWorld(level){
        this.level = level;
        this.character[0].keyListener = this.keyListener;
        this.statusBars[0].character = this.character[0];
        this.statusIcons[0].character = this.character[0];
        this.statusIcons[1].character = this.character[0];
        this.statusIcons[2].character = this.character[0];
        this.endboss = false;
        this.setSoundSettings();
    }


    /**
     * This function add the object to the map
     * 
     * @param {Array} ary - an array with objects which should be added to the map
     */
    addToMap(ary){
        ary.forEach(e => e.draw(this.ctx,this.cameraOfst));
    }


    /**
     * This function redraws the map as fast as the computer can hanlde it 
     */
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
        //this.showCamOfsOnMap()
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


    /**
     * This function generates the 10ms game loop for the world object. If the global gamestate is run the loop functions will be executed
     */
    run10(){
        setInterval(() => {
            if (gameState == 'RUN') {
                this.removeFromMap(this.bubbles);
                this.removeFromMap(this.level.enemies);
                
                this.checkHitToCharacter();
                this.checkHitToEnemies();
            }
        }, 10);
    }


    /**
     * This function generates the 200ms game loop for the world object. If the global gamestate is run the loop functions will be executed
     */
    run200(){
        setInterval(() => {
            this.playSound('music');
            if (gameState == 'RUN') {
                this.addEndbos();
                this.checkEndCondition();
                //delete at end
                //this.showWorldState();
                //delete at end
            }
        }, 200);
    }


    /**
     * This function checks if the object can be removed from map
     * 
     * @param {Array} ary - array with objects that should be checked
     */
    removeFromMap(ary){
        ary.forEach((e,idx,ary) => {
            if (this.removeEnemy(e)){
                ary.splice(idx,1);
            }
        })
    }


    /**
     * This function checks if the fightable object can be removed from map
     * 
     * @param {FightableObject} e - fightable object to check if it can be removed from map
     * @returns {boolean} - true: remive fighable object, false: dont remove fightable object
     */
    removeEnemy(e){
        return e.isState('REMOVE') && !(e instanceof Endboss);
    }


    /**
     * This function checks if there is any collision with the character on the map
     */
    checkHitToCharacter(){
        if (!this.character[0].isState('DEAD')) {
            this.CharCollisionToEnemies();
            this.CharCollisionToBubble();
            this.CharCollisionToCollectable();
        }
    }


    /**
     * This function checks if the characters is colliding with any enemy
     */
    CharCollisionToEnemies(){
        this.level.enemies.forEach(e =>{
            this.CharCollisionToEnemey(e);
            if (e instanceof Endboss) this.CharAttackedByEndbos(e);
        });
    }


    /**
     * This function checks if the characters is colliding with an enemy hitbox and hit it
     */
    CharCollisionToEnemey(e){
        if (this.character[0].isColliding(this.character[0].hitBox,e.hitBox) && !e.isState('DEAD') && !e.isState('REMOVE')) {
            this.character[0].hit(e.damage); // hurt by colliding
            if (e instanceof Jellyfish) {
                this.character[0].hitBy = 'poison';
            } else {
                this.character[0].hitBy = 'electroShock';
            }
        }
    }


    /**
     * This function checks if the characters is colliding with an endbos which is attacking and hit it
     */
    CharAttackedByEndbos(e){
        if (this.character[0].isColliding(this.character[0].hitBox,e.attackBox) && e.state == 'ATTACK') {
            this.character[0].hit(e.damage); // hurt by Endboss attack
            this.character[0].hitBy = 'electroShock';
        }
    }

    /**
     * This function checks if the characters is colliding with a bubble and hit it
     */
    CharCollisionToBubble(){
        this.bubbles.forEach((b,idx) =>{
            if (this.character[0].isColliding(this.character[0].hitBox,b.hitBox) && this.character[0].state != 'HURT' && b.from != 'character') {
                this.character[0].hit(b.damage); // hurt by bubble
                this.bubbles.splice(idx,1);
                this.character[0].hitBy = 'poison';
            }
        });
    }


    /**
     * This function checks if the characters is colliding with a collectable object and collects it
     */
    CharCollisionToCollectable(){
        this.level.collectables.forEach((c,idx) => {
            if (this.character[0].isColliding(this.character[0].hitBox,c.hitBox)) {
                if (c.type == 'coin') this.collectCoin(c);
                if (c.type == 'poison') this.collectPoison(c);
                if (c.type == 'heart') this.collectHeart(c);
                c.clearRunIntervalls();
                this.level.collectables.splice(idx,1);              
            }
        })
    }


    /**
     * This function adds a coin to the character
     * 
     * @param {CollectableObject} coin - Collectable object of type coin
     */
    collectCoin(coin){
        this.character[0].coins++;
        coin.playSound('coin');
    }


    /**
     * This function adds a poison to the character
     * 
     * @param {CollectableObject} poison - Collectable object of type poison
     */
    collectPoison(poison){
        this.character[0].poison++;
        poison.playSound('poison');
    }


    /**
     * This function adds a heart to the character
     * 
     * @param {CollectableObject} heart - Collectable object of type heart
     */
    collectHeart(heart){
        this.character[0].health = Math.min(this.character[0].health + 15,100);
        heart.playSound('heart');
    }


    /**
     *  This function check if an enemy get hit by any character attack
     */
    checkHitToEnemies(){       
        this.level.enemies.forEach(e =>{
            this.enemyCollissionToBubble(e);
            this.enemyCollissionToCharAttack(e);
        })
    }


    /**
     *  This function check if an enemy get hit by a bubble from the character
     */
    enemyCollissionToBubble(e){
        this.bubbles.forEach((b,idx) =>{
            if (e.isColliding(e.hitBox,b.hitBox) && e.state != 'HURT' && b.from != 'enemy') {
                if (!(e.type == 'toxic' && b.type == 'poison')) {
                    e.hit(b.damage);
                    e.hitBy = 'bubble';
                    this.bubbles.splice(idx,1);
                }
            }
        });
    }


    /**
     *  This function check if an enemy get hit by a attack from the character
     */
    enemyCollissionToCharAttack(e){
        if (e.isColliding(e.hitBox,this.character[0].attackBox) && this.character[0].state == 'ATTACK' && this.character[0].attackType == 'slap') {
            e.hit(this.character[0].damage); // hurt by character attack
            e.hitBy = 'slap';
        }
    }


    /**
     * This function add the endboss to the map if the character is in enboss sector
     */
    addEndbos(){
        if ( this.isCharacterInEBSector() && !this.isEndbosOnMap()) {
            this.addEndbosScenarioToMap();
        } else if(!this.isEndbosOnMap()) {
            this.statusBars.splice(1,1);
        }
    }


    /**
     * This function checks if the endboss is on the map
     * 
     * @returns {boolean} true: is on map, false: is not on map
     */
    isEndbosOnMap(){
        let EB=false;
        this.level.enemies.forEach(e => {if(e instanceof Endboss) EB=true})
        return EB;
    }


    /**
     * This function checks if the character is in endboss sector
     * 
     * @returns {boolean} true: is in sector, false: is not in sector
     */
    isCharacterInEBSector(){
        return this.character[0].x >= (this.level.length - canvas_w + 300);
    }


    /**
     * This function add the endboss scenario to the map
     */
    addEndbosScenarioToMap(){
        this.level.barrier.push(new Barrier(6800,265,150,70,2));
        this.endboss = new Endboss (this.level.length - 500,0);
        this.level.enemies.push(this.endboss);
        this.addJellyfish();
        this.addPufferfish();
        this.statusBars.push(new Statusbar(canvas_w - 280,20,250,70,false));
        this.statusBars[1].character =this.endboss;
    }


    /**
     * This function add a jellyfish to the enboss scenario each 40 seconds
     */
    addJellyfish(){
        setInterval(() => {
            if (this.isCharacterInEBSector()) {
                let y = Math.random()*(this.level.height - 150);
                let x = this.level.length - 101;
                this.level.enemies.push(new Jellyfish(x,y,0.2,0.2,'toxic'));
            }
        }, 40000);
    }


    /**
     * This function add a red pufferfish to the enboss scenario each 25 seconds
     */
    addPufferfish(){
        setInterval(() => {
            if (this.isCharacterInEBSector()) {
                let y = Math.random()*(this.level.height - 150);
                let x = this.level.length - 101;
                this.level.enemies.push(new Pufferfish(x,y,0,'red'));
            }
        }, 25000);
    }


    /**
     * This function resets the world
     * 
     */
    resetWorld(level){
        this.level.clearLevel();
        this.character[0].clearCharacter();
        this.character[0] = new Character(200,175);
        this.initWorld(level);
    }


    /**
     * This function checks if the level is finsished, finished: character or Endbos dead
     */
    checkEndCondition(){
        if (this.character[0].isState('REMOVE') ) {
            this.endWorld();
            let lvlProgress = Math.round(this.character[0].x / this.level.length*100);
            showOverlay(getLooseScreenHTMLTemplate(this.character[0].coins,lvlProgress));         
        } else if (this.endboss && this.endboss.isState('REMOVE')) {
            this.playSound('win');
            this.endWorld();
            let lvlProgress = 100;
            showOverlay(getWinScreenHTMLTemplate(this.character[0].coins,lvlProgress));
        }
    }


    /**
     * This function stops all game loops except world game loops at the end of the level
     */
    endWorld(){
        this.level.clearLevel();
        this.character[0].clearCharacter();
        gameState = 'END';
    }


    /**
     * This function set the sound settings
     */
    setSoundSettings(){
        this.soundCache['music'].loop = true;
        this.soundCache['music'].volume = musicSoundVolume;
        this.soundCache['win'].volume = gameSoundVolume;
    }


    /**
     * This function plays the sound of the sound cache with the sound key
     * 
     * @param {string} soundKey - sound which should be played, 'hitBubble', 'hitSlap'
     */
    playSound(soundKey){
        (this.isSoundOn())? this.soundCache[soundKey].play():this.pauseSound();
    }


    /**
     * This function pause the game sound
     */
    pauseSound(){
        this.soundCache['music'].pause();
    }


    /**
     * This function checks if the sound is switched on
     * 
     * @returns {boolean} - true: sound on, false: sound off
     */
    isSoundOn(){
        return sound == 'ON' && gameState == 'RUN';
    }
}