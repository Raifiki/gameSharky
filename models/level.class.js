class Level {
    //fields
    backgroundImgs;
    background = [];
    obstacles;
    enemeis;
    collectables;
    length;
    height;

    //methodes
    constructor(bg, obcls, en, coll, lvllen, lvlhe){
        this.backgroundImgs = bg;
        this.obstacles = obcls;
        this.enemeis = en;
        this. collectables = coll;
        this.length = lvllen;
        this.height = lvlhe;

        this.setBgImgs();
    }

    setBgImgs(){
        this.backgroundImgs.Img1.forEach(e => {
            this.background.push(e);
        });
        this.backgroundImgs.Img2.forEach(e => {
            this.background.push(e);
        });
        debugger
    }
}