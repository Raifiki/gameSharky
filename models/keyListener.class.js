/**
 * Class representing the key listener
 */
class KeyListener {
    // fields
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SLAP = false;
    BUBBLESHOT = false;
    CHANGEBUBBLE = false;

    //methodes
    constructor(){
        this.registerKeyDownEvent();
        this.registerKeyUpEvent();
        this.registerEventListeners();
        this.addJosystick();
    }

    registerKeyDownEvent(){
        document.addEventListener('keydown',(event) => {
            if (event.key == 'ArrowRight'){
                this.RIGHT = true;
            }
            if (event.key == 'ArrowLeft'){
                this.LEFT = true;
            }
            if (event.key == 'ArrowUp'){
                this.UP = true;
            }
            if (event.key =='ArrowDown'){
                this.DOWN = true;
            }          
            if (event.key == ' '){ // Space
                this.SLAP = true;
            }
            if (event.key == 's'){
                this.BUBBLESHOT = true;
            }
            if (event.key == 'd'){
                this.CHANGEBUBBLE = true;
            }
            if (event.key == 'Escape'){
                (gameState == 'PAUSED')? resumeGame():pauseGame();
            }               
        });
    }


    registerKeyUpEvent(){
        document.addEventListener('keyup',(event) => {
            if (event.key == 'ArrowRight'){
                this.RIGHT = false;
            }
            if (event.key == 'ArrowLeft'){
                this.LEFT = false;
            }
            if (event.key == 'ArrowUp'){
                this.UP = false;
            }
            if (event.key =='ArrowDown'){
                this.DOWN = false;
            }          
            if (event.key == ' '){ // Space
                this.SLAP = false;
            }          
            if (event.key == 's'){
                this.BUBBLESHOT = false;
            }  
            if (event.key == 'd'){
                this.CHANGEBUBBLE = false;
            }      
        });
    }


    registerEventListeners(){
        this.registerSlapAttackBtn();
        this.registerBubbleShotAttackBtn();
        this.registerBubbleChangeBtn();
    }
    
    
    registerSlapAttackBtn(){
        document.getElementById('slapAttackBtn').addEventListener('mousedown',event =>{
            this.SLAP = true;
        });
        
        document.getElementById('slapAttackBtn').addEventListener('mouseup',event =>{
            this.SLAP = false;
        });

        document.getElementById('slapAttackBtn').addEventListener('touchstart',event =>{
            this.SLAP = true;
        });

        document.getElementById('slapAttackBtn').addEventListener('touchend',event =>{
            this.SLAP = false;
        });
    }
    
    registerBubbleShotAttackBtn(){
        document.getElementById('bubbleShotAttackBtn').addEventListener('mousedown',event =>{
            this.BUBBLESHOT = true;
        });
        
        document.getElementById('bubbleShotAttackBtn').addEventListener('mouseup',event =>{
            this.BUBBLESHOT = false;
        });

        document.getElementById('bubbleShotAttackBtn').addEventListener('touchstart',event =>{
            this.BUBBLESHOT = true;
        });
        
        document.getElementById('bubbleShotAttackBtn').addEventListener('touchend',event =>{
            this.BUBBLESHOT = false;
        });
    }
    
    registerBubbleChangeBtn(){
        document.getElementById('bubbleChangeBtn').addEventListener('mousedown',event =>{
            this.CHANGEBUBBLE = true;
        });
        
        document.getElementById('bubbleChangeBtn').addEventListener('mouseup',event =>{
            this.CHANGEBUBBLE = false;
        });

        document.getElementById('bubbleChangeBtn').addEventListener('touchstart',event =>{
            this.CHANGEBUBBLE = true;
        });
        
        document.getElementById('bubbleChangeBtn').addEventListener('touchend',event =>{
            this.CHANGEBUBBLE = false;
        });
    }

    addJosystick(){
        let JSstyle = `
                width: 150px;
                height: 150px;
                background-color: rgba(0, 0, 0, 0.3);
                border-radius: 30%;
                border: 1px solid var(--accClr);
               `;
    
        let stickSty = `        
              width: 50px;
              height:50px;
              border-radius:100%;
              background-color: var(--accClr);`;
    
        new Joystick('joystick', JSstyle, stickSty,this);
    }

    clearDirection(){
        this.RIGHT = false;
        this.LEFT = false;
        this.UP = false;
        this.DOWN = false;
    }
}