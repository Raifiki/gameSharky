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
        let nrSector = Math.ceil(Math.ceil(this.length/canvas_w));
        for (let i = 0; i < nrSector; i++) {
            this.backgroundImgs.Img1.forEach((e,idx) => {
                let [x,y,w,h]=this.setBgCoordinates(i,1,idx);
                let newBg = new BackgroundObject(e,x,y,w,h);
                this.background.push(newBg);
            });
            this.backgroundImgs.Img2.forEach((e,idx) => {
                let [x,y,w,h]=this.setBgCoordinates(i,2,idx);
                let newBg = new BackgroundObject(e,x,y,w,h);
                this.background.push(newBg);
            });
        }
    }

    setBgCoordinates(sector,img,layer){
        let x;
        if (img == 1) {
            let t;
            (sector==0)?t=0:t=1;
            x = sector * 2 * canvas_w/2-t;
        } else {
            x = (sector * 2 + 1) * canvas_w/2-1;
        }
        let y = 0;
        let w = canvas_w/2;
        let h = canvas_h;
        if (layer == 1 || layer == 2) {
            y = 0.2*canvas_h;
            h = 0.8*canvas_h;
        } else if (layer == 3){
            y = 0.5*canvas_h;
            h = 0.5*canvas_h;
        }        
        return [x,y,w,h];
    }
}