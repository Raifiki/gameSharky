/**
 * This function will be executed if the browser loaded the page
 */
function init(){
    showGameWindow("startScreen");
    canvas = document.getElementById('gameCanvas');
    let level = generateLvlDev();
    world = new World(canvas,keyListener,level);
}


/**
 * This function add to an HTML element the class "d-none" to hide this element
 * 
 * @param {string} ID - HTML ID of the element
 */
function hideElement(ID){
    document.getElementById(ID).classList.add('d-none');
}


/**
 * This function remove the class "d-none" from an HTML element to show this element
 * 
 * @param {string} ID - HTML ID of the element
 */
function showElement(ID){
    document.getElementById(ID).classList.remove('d-none');
}


/**
 * This function shows the content of the HTML element with the ID "gameWindow"
 * 
 * @param {string} ID - HTML ID of the element which has to be visible, "gameScreen", "startScreen", "pauseScreen"
 */
function showGameWindow(ID){
    let contentElements = document.getElementsByClassName('contentGameWindow');
    for (let i = 0; i < contentElements.length; i++) {
        let HTMLelement = contentElements [i];
        hideElement(HTMLelement.id);
    }
    showElement(ID);
}


/**
 * This function show the overlay 
 * 
 * @param {string} HTMLTemplate - HTML tempalte/code that will be shown in the overlay card
 */
function showOverlay(HTMLTemplate){
    showElement('overlay');
    let card = document.getElementById('ovlyCard');
    card.innerHTML = HTMLTemplate;
}


/**
 * This function hide the overlay
 */
function hideOverlay(){
    hideElement('overlay');
}


/**
 * This function start the game
 */
function startGame(){
    resetGame();
}


function resetGame(){
    let level = generateLvl1();
    world.resetWorld(level);
    showGameWindow('gameScreen');
    gameState = 'RUN';
}



/**
 * This function exit the game
 */
function exitGame(){
    showGameWindow('startScreen');
}


/**
 * This function pause the game
 */
function pauseGame(){
    showGameWindow('pauseScreen');
    gameState = 'PAUSED';
}


/**
 * This function resume to the last game state
 */
function resumeGame(){
    showGameWindow('gameScreen');
    hideOverlay();
    gameState = 'RUN';
}