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
                let [x,y,w,h]=this.setBgCoordinates(i,1);
                let newBg = new BackgroundObject(e,x,y,w,h);
                this.background.push(newBg);
            });
            this.backgroundImgs.Img2.forEach(e => {
                let [x,y,w,h]=this.setBgCoordinates(i,2);
                let newBg = new BackgroundObject(e,x,y,w,h);
                this.background.push(newBg);
            });
        }
    }

    setBgCoordinates(sector,img){
        let x;
        if (img == 1) {
            let t;
            (sector==0)?t=0:t=0.5;
            x = sector * 2 * canvas_w-t;
        } else {
            x = (sector * 2 + 1) * canvas_w-0.5;
        }
        let y = 0;
        let w = canvas_w;
        let h = canvas_h;
        return [x,y,w,h];
    }
}