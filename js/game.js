// Varibles
let world;
let canvas;
let canvas_w = 720;
let canvas_h = 480;
let gameState = 'IDLE';

let keyListener = new KeyListener();

// functions

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas,keyListener);
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
        keyListener.SPACE = true;
    }
    if (event.key == 's'){
        keyListener.S = true;
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
        keyListener.SPACE = false;
    }          
    if (event.key == 's'){
        keyListener.S = false;
    }      
}); 