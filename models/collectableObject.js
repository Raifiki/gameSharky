/**
 * class representing a collectable object. A collectable object can get collected by the character
 * @extends MoveableObject
 */
class CollectableObject extends MoveableObject{
    // fields
    hitBox
    type

    soundCache = {
        coin: new Audio ('./audio/collectables/coin.mp3'),
        poison: new Audio ('./audio/collectables/poison.mp3'),
        heart: new Audio ('./audio/collectables/heart.mp3')
    }
    // methodes
    /**
     * This function initialize a collectable object
     * 
     * @param {number} x - this is the initial x coordinate from the character
     * @param {number} y - this is the initial y coordinate from the character
     * @param {string} type - string that defines the type of the collectable object, 'coin', 'poison', 'heart'
     */
    constructor(x,y,type){
        super(x,y,60,60);
        this.setType(type);
        this.directionX = true;
        this.updateHitBox();

        this.addAnimationIMGs();
        this.setSoundSetting();

        this.Crun10();
        this.Crun200();
    }


    /**
     * This function generates the 10ms game loop for a collectable object. If the global gamestate is run the loop functions will be executed
     */
    Crun10(){
        this.setStoppableInterval(() => {
            if (gameState == 'RUN') this.move();
        },10)
    }


    /**
     * This function generates the 200ms game loop for a collectable object. If the global gamestate is run the loop functions will be executed
     */
    Crun200(){
        this.setStoppableInterval(()=>this.animate(),200);
    }


    /**
     * This function moves the object according the direction and speed of this object
     * 
     */
    move(){
        this.moveDown();
        this.updateHitBox();
    }

    /**
     * This function updates the hitbox of this object
     * 
     */
    updateHitBox(){
        this.hitBox = {
                x: this.x,
                y: this.y,
                w: this.width,
                h: this.height,
            };
    }


    /**
     * This function set the type of the collectable object
     * 
     * @param {string} type - type of the collectable object, 'coin', 'poison', 'heart'
     */
    setType(type){
        this.type = type;
        switch (type) {
            case 'poison':
                this.setPoisonProperties();
                break;
            case 'coin':
                this.setCoinProperties();
                break;
            case 'heart':
                this.setHeartProperties();
                break;
        }
    }


    /**
     * This function set all prperties of a poison type
     */
    setPoisonProperties(){
        this.loadImg('./img/04_Collectables/Poison/DarkLeft.png');
        this.speedY = 2;
        this.directionY = false;
        this.height = 60;
        this.width = 60;
    }


    /**
     * This function set all prperties of a cion type
     */
    setCoinProperties(){
        this.loadImg('./img/04_Collectables/Coins/1.png');
        this.height = 40;
        this.width = 40;
    }


    /**
     * This function set all prperties of a heart type
     */
    setHeartProperties(){
        this.loadImg('./img/04_Collectables/heart.png');
        this.height = 60;
        this.width = 60;
    }


    /**
     * This function add all animation images of this object to the image cache
     */
    addAnimationIMGs(){
        this.animationIMGs = ANIMATION_IMGS_COLLECTABLES;
        this.addIMG2Cache(this.animationIMGs.COIN);
        this.addIMG2Cache(this.animationIMGs.POISON);
    }


    /**
     * This function sets the animation which has to be executed for the current object properties
     */
    animate(){
        //debugger
        if (this.type == 'poison') this.playAnimation(this.animationIMGs.POISON,'repeat');
        if (this.type == 'coin') this.playAnimation(this.animationIMGs.COIN,'repeat');
    }


    /**
     * This function plays the sound of the sound cache with the sound key
     * 
     * @param {string} soundKey - sound which should be played, 'coin', 'poison', 'heart'
     */
    playSound(soundKey){
        if (sound == 'ON') this.soundCache[soundKey].play();
    }


    /**
     * This function sets the setting of the sounds
     */
    setSoundSetting(){
        Object.keys(this.soundCache).forEach(key => {
            this.soundCache[key].volume = gameSoundVolume;
        });
    }
}