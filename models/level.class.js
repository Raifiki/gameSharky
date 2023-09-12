/**
 * Class representing a level
 */
class Level {
    //fields
    backgroundImgs;
    background = [];
    barrier;
    enemies;
    collectables;
    length;
    height;

    //methodes
    /**
     * This function initialize a level object
     * 
     * @param {json} bg - JSON array with 2 key Img1 and Img2 and each with paths to the images for all layers
     * @param {json} bar - JSON with all berriers of the level
     * @param {json} en - JSON with all enemies of the level except the endbos
     * @param {json} coll - JSON with all colelctables of the level
     * @param {number} lvllen - length of the level
     * @param {number} lvlhe - hieght if the level
     */
    constructor(bg, bar, en, coll, lvllen, lvlhe){
        this.backgroundImgs = bg;
        this.barrier = bar;
        this.enemies = en;
        this. collectables = coll;
        this.length = lvllen;
        this.height = lvlhe;

        this.setBgImgs();
    }

    /**
     * This function separats the level in sectors and set for each sector the bachground image
     */
    setBgImgs(){
        let nrSector = Math.ceil(Math.ceil(this.length/canvas_w));
        for (let i = 0; i < nrSector; i++) this.setBgIMgForSector(i);
    }

    /**
     * This function set the background image for one sector
     * 
     * @param {number} sector - sector for which the background image is set
     */
    setBgIMgForSector(sector){
        let keys = ['Img1','Img2'];
        keys.forEach((key,idxKey)=>this.loadImgToBackground(key,idxKey,sector))
    }


    /**
     * This function load the background image to the background cache for one sector
     * 
     * @param {string} key - json key for the background image, 'Img1' or 'Img2'
     * @param {number} idxKey - index of the json key 0='Img1' or 1='Img2'
     * @param {number} sector - sector for which the background image is set
     */
    loadImgToBackground(key,idxKey,sector){
        this.backgroundImgs[key].forEach((pathLayer,idxLayer) => {
            let [x,y,w,h]=this.calcBgCoordinates(sector,idxKey+1,idxLayer);
            let newBg = new BackgroundObject(pathLayer,x,y,w,h);
            this.background.push(newBg);
        });
    }

    /**
     * This function calculates the x,y - coordinate and the height and width for the sector
     * 
     * @param {number} sector - sector for which the background image is set
     * @param {number} imgNr - iamge number of the background , [1,2]
     * @param {number} layer - layer number for the iamage, [1,2,3,4,5]
     * @returns {array} - array width x-coordinate, y-coordinate, width and hieght for this image, [x,y,w,h]
     */
    calcBgCoordinates(sector,imgNr,layer){
        let x = (imgNr == 1)? this.xCoordinateIMG1(sector): this.xCoordinateIMG2(sector);
        let w = canvas_w/2;
        let y,h;
        if (layer == 1 || layer == 2) {
            y = 0.2*canvas_h;
            h = 0.8*canvas_h;
        } else if (layer == 3){
            y = 0.5*canvas_h;
            h = 0.5*canvas_h;
        } else{
            y = 0;
            h = canvas_h;
        } 
        return [x,y,w,h];
    }


    /**
     * This function calculates the x coordinate of the first image of the background for one sector
     * 
     * @param {number} sector - sector for which the background image is set
     * @returns {number} - x coordinate first image
     */
    xCoordinateIMG1(sector){
        let t;
        (sector==0)?t=0:t=1;
        return sector * 2 * canvas_w/2-t;
    }


    /**
     * This function calculates the x coordinate of the second image of the background for one sector
     * 
     * @param {number} sector - sector for which the background image is set
     * @returns {number} - x coordinate second image
     */
    xCoordinateIMG2(sector){
        return (sector * 2 + 1) * canvas_w/2-1;
    }

    /**
     * This function clear this level
     */
    clearLevel(){
        this.clearEnemies();
        this.clearCollectables();
        this.barrier = [];
        this.background = [];
    }


    /**
     * This function clears all enemies in the level
     */
    clearEnemies(){
        this.enemies.forEach(e => {
            e.clearRunIntervalls();
            e.state = 'REMOVE';
        });
    }


    clearCollectables(){
        this.collectables.forEach(c => c.clearRunIntervalls());
        this.collectables = [];
    }
}