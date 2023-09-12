// Varibles
let world;
let canvas;
let canvas_w = 1200;
let canvas_h = 600;
let gameState = 'IDLE';

let keyListener = new KeyListener();

// functions
document.addEventListener('keydown',(event) => {
    if (event.key == 'ArrowRight'){
        keyListener.RIGHT = true;
    }
    if (event.key == 'ArrowLeft'){
        keyListener.LEFT = true;
    }
    if (event.key == 'ArrowUp'){
        keyListener.UP = true;
    }
    if (event.key =='ArrowDown'){
        keyListener.DOWN = true;
    }          
    if (event.key == ' '){ // Space
        keyListener.SLAP = true;
    }
    if (event.key == 's'){
        keyListener.BUBBLESHOT = true;
    }
    if (event.key == 'd'){
        keyListener.CHANGEBUBBLE = true;
    }
    if (event.key == 'Escape'){
        (gameState == 'PAUSED')? resumeGame():pauseGame();
    }               
});

document.addEventListener('keyup',(event) => {
    if (event.key == 'ArrowRight'){
        keyListener.RIGHT = false;
    }
    if (event.key == 'ArrowLeft'){
        keyListener.LEFT = false;
    }
    if (event.key == 'ArrowUp'){
        keyListener.UP = false;
    }
    if (event.key =='ArrowDown'){
        keyListener.DOWN = false;
    }          
    if (event.key == ' '){ // Space
        keyListener.SLAP = false;
    }          
    if (event.key == 's'){
        keyListener.BUBBLESHOT = false;
    }  
    if (event.key == 'd'){
        keyListener.CHANGEBUBBLE = false;
    }      
});


function registerEventListeners(){
    registerSlapAttackBtn();
    registerBubbleShotAttackBtn();
    registerBubbleChangeBtn();
}


function registerSlapAttackBtn(){
    document.getElementById('slapAttackBtn').addEventListener('mousedown',event =>{
        keyListener.SLAP = true;
    });
    
    document.getElementById('slapAttackBtn').addEventListener('mouseup',event =>{
        keyListener.SLAP = false;
    });
}

function registerBubbleShotAttackBtn(){
    document.getElementById('bubbleShotAttackBtn').addEventListener('mousedown',event =>{
        keyListener.BUBBLESHOT = true;
    });
    
    document.getElementById('bubbleShotAttackBtn').addEventListener('mouseup',event =>{
        keyListener.BUBBLESHOT = false;
    });
}

function registerBubbleChangeBtn(){
    document.getElementById('bubbleChangeBtn').addEventListener('mousedown',event =>{
        keyListener.CHANGEBUBBLE = true;
    });
    
    document.getElementById('bubbleChangeBtn').addEventListener('mouseup',event =>{
        keyListener.CHANGEBUBBLE = false;
    });
}
