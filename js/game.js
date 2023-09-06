// Varibles
let world;
let canvas;
let canvas_w = 1200;
let canvas_h = 600;
let gameState = 'IDLE';

let keyListener = new KeyListener();

// functions

function init(){
    canvas = document.getElementById('canvas');
    let level = generateLvlDev();
    world = new World(canvas,keyListener,level);
}


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