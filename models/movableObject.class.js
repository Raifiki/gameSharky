class MoveableObject extends AnmiatedObject {
    //field
    speedX = 0;
    speedY = 0;

    //method
    constructor(x,y,w,h){
        super(x,y,w,h);
    }

    moveRight(){
        if (!this.checkBarrier('right') && !this.checklvlBorder('right')) {
            this.x += this.speedX;
            this.calcCenter();    
        }   
    }
    
    moveLeft(){
        if (!this.checkBarrier('left') && !this.checklvlBorder('left')) {
            this.x -= this.speedX;
            this.calcCenter();
        }
    }

    moveUp(){
        if (!this.checkBarrier('top') && !this.checklvlBorder('top')) {
            this.y -= this.speedY;
            this.calcCenter();    
        } 
    }

    moveDown(){
        if (!this.checkBarrier('bottom') && !this.checklvlBorder('bottom')) {
            this.y += this.speedY;
            this.calcCenter();    
        }   
    }

    isBarrierRight(obj2Box){
        let obj1Box = this.hitBox;
        let [x1,y1,w1,h1]= [obj1Box.x,obj1Box.y,obj1Box.w,obj1Box.h];
        let [x2,y2,w2,h2]= [obj2Box.x,obj2Box.y,obj2Box.w,obj2Box.h];
        let frame = 10;
        y2 += frame;
        h2 -= 2*frame;
        return (x2 <= x1+w1 && x1+w1 <= x2+w2) && 
               ((y2 <= y1 && y1 <= y2+h2) ||(y2 <= y1+h1 && y1+h1 <= y2+h2) ||  (y1<y2 && y1+h1 > y2+h2));
    }


    isBarrierLeft(obj2Box){
        let obj1Box = this.hitBox;
        let [x1,y1,w1,h1]= [obj1Box.x,obj1Box.y,obj1Box.w,obj1Box.h];
        let [x2,y2,w2,h2]= [obj2Box.x,obj2Box.y,obj2Box.w,obj2Box.h];
        let frame = 10;
        y2 += frame;
        h2 -= 2*frame;
        return (x2 <= x1 && x1 <= x2+w2) && 
               ((y2 <= y1 && y1 <= y2+h2) ||(y2 <= y1+h1 && y1+h1 <= y2+h2) ||  (y1<y2 && y1+h1 > y2+h2));
    }


    isBarrierTop(obj2Box){
        let obj1Box = this.hitBox;
        let [x1,y1,w1,h1]= [obj1Box.x,obj1Box.y,obj1Box.w,obj1Box.h];
        let [x2,y2,w2,h2]= [obj2Box.x,obj2Box.y,obj2Box.w,obj2Box.h];
        let frame = 15;
        x2 += frame;
        w2 -= 2*frame;
        return ((x2 <= x1 && x1 <= x2+w2) || (x2 <= x1+w1 && x1+w1 <= x2+w2) || (x1<x2 && x1+w1 > x2+w2)) && 
                (y2 <= y1 && y1 <= y2+h2);
    }


    isBarrierBottom(obj2Box){
        let obj1Box = this.hitBox;
        let [x1,y1,w1,h1]= [obj1Box.x,obj1Box.y,obj1Box.w,obj1Box.h];
        let [x2,y2,w2,h2]= [obj2Box.x,obj2Box.y,obj2Box.w,obj2Box.h];
        let frame = 15;
        x2 += frame;
        w2 -= 2*frame;
        return ((x2 <= x1 && x1 <= x2+w2) || (x2 <= x1+w1 && x1+w1 <= x2+w2) || (x1<x2 && x1+w1 > x2+w2)) && 
                (y2 <= y1+h1 && y1+h1 <= y2+h2);
    }

    checkBarrier(direction){
        let barrier = false;
        world.level.barrier.forEach(b => {
            b.hitBox.forEach(hB =>{
                switch (direction) {
                    case 'right':   
                        barrier = barrier || this.isBarrierRight(hB)? true : false;
                        break;
                    case 'left':   
                        barrier = barrier || this.isBarrierLeft(hB)? true : false;
                        break;
                    case 'top': 
                        barrier = barrier || this.isBarrierTop(hB)? true : false;
                        break;
                    case 'bottom':
                        barrier = barrier || this.isBarrierBottom(hB)? true : false;
                        break;
                }
            })
        });
        return barrier;
    }

    checklvlBorder(direction){
        switch (direction) {
            case 'right':   
                return this.hitBox.x + this.hitBox.w > world.level.length - this.speedX/2;
            case 'left':   
                return this.hitBox.x < this.speedX/2;;
            case 'top': 
                return this.hitBox.y < this.speedY/2;   
            case 'bottom': 
                return this.hitBox.y + this.hitBox.h > world.level.height - this.speedY/2 - 25;
        }
    }
}