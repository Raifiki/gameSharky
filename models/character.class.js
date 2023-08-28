class Character extends FightableObject{
    //field
    keyListener;

    poison = 0;
    bubbleShots = 2;

    xOfst = 100;
    //method
    constructor(x,y,w,h){
        super(x,y,w,h);
        this.loadImg('../img/01_Sharkie/1_IDLE/1.png');

        this.speedX = 15;
        this.speedY = 5;

        this.health = 100;
        this.damage = 20;

        this.hitBox.w = 0.7*this.width;
        this.hitBox.h = 0.35*this.width;
        this.attackBox.w = 0.8*this.width;
        this.attackBox.h = 0.4*this.width;
        this.detectBox.w = 0*this.width;
        this.detectBox.h = 0*this.width;

        this.move();
        this.run100();
        this.loadBubbleShot();
    }

    run100(){
        setInterval(() => {
            this.attack();
        },100);
    }

    move(){
        setInterval(() =>{
            this.setState('idle');
            if (this.keyListener.RIGHT && !this.borderRight()) {
                this.moveRight();
                this.setDirection('right');
                this.setState('move');
            }
            if (this.keyListener.LEFT && !this.borderLeft()) {
                this.moveLeft();
                this.setDirection('left');
                this.setState('move');
            }
            if (this.keyListener.UP && !this.borderTop()) {
                this.moveUp();
                this.setState('move');
            }
            if (this.keyListener.DOWN && !this.borderBottom()) {
                this.moveDown();
                this.setState('move');
            }
            this.setBoxes(0,15);
            this.setCameraOfst();
        },10)
    }

    borderRight(){
        let lvlBorder = this.hitBox.x + this.hitBox.w > world.level.length - this.speedX/2;
        let barrierBorder = false;
        world.level.barrier.forEach(b => {
            b.hitBox.forEach(hB =>{
                barrierBorder = barrierBorder || this.barrierRight(this.hitBox,hB);
            })
        });
        return barrierBorder || lvlBorder;
    }

    barrierRight(obj1Box,obj2Box){
        let [x1,y1,w1,h1]= [obj1Box.x,obj1Box.y,obj1Box.w,obj1Box.h];
        let [x2,y2,w2,h2]= [obj2Box.x,obj2Box.y,obj2Box.w,obj2Box.h];
        let frame = 10;
        y2 += frame;
        h2 -= 2*frame;
        return (x2 <= x1+w1 && x1+w1 <= x2+w2) && 
               ((y2 <= y1 && y1 <= y2+h2) ||(y2 <= y1+h1 && y1+h1 <= y2+h2) ||  (y1<y2 && y1+h1 > y2+h2));
    }

    borderLeft(){
        let lvlBorder = this.hitBox.x < this.speedX/2;
        let barrierBorder = false;
        world.level.barrier.forEach(b => {
            b.hitBox.forEach(hB =>{
                barrierBorder = barrierBorder || this.barrierLeft(this.hitBox,hB);
            })
        });
        return barrierBorder || lvlBorder;
    }

    barrierLeft(obj1Box,obj2Box){
        let [x1,y1,w1,h1]= [obj1Box.x,obj1Box.y,obj1Box.w,obj1Box.h];
        let [x2,y2,w2,h2]= [obj2Box.x,obj2Box.y,obj2Box.w,obj2Box.h];
        let frame = 10;
        y2 += frame;
        h2 -= 2*frame;
        return (x2 <= x1 && x1 <= x2+w2) && 
               ((y2 <= y1 && y1 <= y2+h2) ||(y2 <= y1+h1 && y1+h1 <= y2+h2) ||  (y1<y2 && y1+h1 > y2+h2));
    }

    borderBottom(){
        let lvlBorder = this.hitBox.y + this.hitBox.h > world.level.height - this.speedY/2 - 25;
        let barrierBorder = false;
        world.level.barrier.forEach(b => {
            b.hitBox.forEach(hB =>{
                barrierBorder = barrierBorder || this.barrierBottom(this.hitBox,hB);
            })
        });
        return barrierBorder || lvlBorder;
    }

    barrierBottom(obj1Box,obj2Box){
        let [x1,y1,w1,h1]= [obj1Box.x,obj1Box.y,obj1Box.w,obj1Box.h];
        let [x2,y2,w2,h2]= [obj2Box.x,obj2Box.y,obj2Box.w,obj2Box.h];
        let frame = 15;
        x2 += frame;
        w2 -= 2*frame;
        return ((x2 <= x1 && x1 <= x2+w2) || (x2 <= x1+w1 && x1+w1 <= x2+w2) || (x1<x2 && x1+w1 > x2+w2)) && 
                (y2 <= y1+h1 && y1+h1 <= y2+h2);
    }

    borderTop(){
        let lvlBorder = this.hitBox.y < this.speedY/2;
        let barrierBorder = false;
        world.level.barrier.forEach(b => {
            b.hitBox.forEach(hB =>{
                barrierBorder = barrierBorder || this.barrierTop(this.hitBox,hB);
            })
        });
        return barrierBorder || lvlBorder;
    }
    barrierTop(obj1Box,obj2Box){
        let [x1,y1,w1,h1]= [obj1Box.x,obj1Box.y,obj1Box.w,obj1Box.h];
        let [x2,y2,w2,h2]= [obj2Box.x,obj2Box.y,obj2Box.w,obj2Box.h];
        let frame = 15;
        x2 += frame;
        w2 -= 2*frame;
        return ((x2 <= x1 && x1 <= x2+w2) || (x2 <= x1+w1 && x1+w1 <= x2+w2) || (x1<x2 && x1+w1 > x2+w2)) && 
                (y2 <= y1 && y1 <= y2+h2);
    }

    setCameraOfst(){
        let newOfst = this.hitBox.x - this.xOfst;
            if (newOfst>= 0 && newOfst <= world.level.length - world.canvas.width){
                world.cameraOfst = newOfst;
            } else if(newOfst<0){
                world.cameraOfst = 0;
            } else if (newOfst>world.level.length - world.canvas.width){
                world.cameraOfst = world.level.length - world.canvas.width;
            }
    }

    setDirection(dir){
        if (dir == 'right') {
            this.directionX = true;
            this.xOfst = Math.max(this.xOfst - 10,100);
        } else {
            this.directionX = false;
            this.xOfst = Math.min(this.xOfst + 10,canvas_w - this.width - 100);
        }        
    }


    attack(){
        if (this.state == 'IDLE' || this.state == 'MOVE' ) {
            if (this.keyListener.SPACE) {
                this.setState('attack');
                this.attackBubbleTrap();
            }
            if (this.keyListener.S) {
                this.setState('attack');
            }
        }
    }

    attackBubbleTrap(){
            let x;
            if (this.directionX) {
                x = this.x + this.width;
            } else {
                x = this.x - 30;
            }
            let y = this.y + this.height/2;
            let type = this.chooseBubbleType();
            if (type != 'noShots') {
                world.bubbles.push(new Bubble(x,y,30,30,type, this.directionX));
            } else {
                
            }
    }


    chooseBubbleType(){
        if (this.bubbleShots > 0) {
            this.bubbleShots--;
            return 'normal'
        } else {
            return 'noShots'
        }
    }

    loadBubbleShot(){
        setInterval(() =>{
            if (this.bubbleShots < 5) {
                this.bubbleShots++;
            }
        },3000);
    }
}

