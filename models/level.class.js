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
    constructor(bg, bar, en, coll, lvllen, lvlhe){
        this.backgroundImgs = bg;
        this.barrier = bar;
        this.enemies = en;
        this. collectables = coll;
        this.length = lvllen;
        this.height = lvlhe;

        this.setBgImgs();
    }

    setBgImgs(){
        let nrSector = Math.ceil(Math.ceil(this.length/canvas_w)/2);
        for (let i = 0; i < nrSector; i++) {
            this.backgroundImgs.Img1.forEach(e => {
                let x = i * 2 * canvas_w - 1;
                let newBg = new BackgroundObject(e,x,canvas_w,canvas_h);
                this.background.push(newBg);
            });
            this.backgroundImgs.Img2.forEach(e => {
                let x = (i * 2 + 1) * canvas_w - 1;
                let newBg = new BackgroundObject(e,x,canvas_w,canvas_h);
                this.background.push(newBg);
            });
        }
    }
}