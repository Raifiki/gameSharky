// Varibles
let world;
let canvas;
let canvas_w = 1200;
let canvas_h = 600;

let gameState = 'IDLE';
let sound = 'ON';
let difficulty = 'NORMAL';
let mobileControl = 'OFF';

let keyListener;

let laodingCounter = 0;
let loadingInterval;


/**
 * This function will be executed if the browser loaded the page
 */
function init(){
    canvas = document.getElementById('gameCanvas');
    keyListener = new KeyListener();
    showGameWindow("startScreen");
    addEventListeners();
    hideMobileCtrl();
}

/**
 * This function add event listener which are neccassery for page control
 */
function addEventListeners(){
    addEventListener("fullscreenchange", e => {
        changeFullscreenSetting();
    });
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
    hideOverlay();
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
 * This function sets the style according the game settings for the settings overlay
 */
function setOverlaySettings(){
    setMobileCtrlSettingStyle();
    setSoundSettingStyle();
    setDifficultySettingStyle();
}


/**
 * This function hide the overlay
 */
function hideOverlay(){
    hideElement('overlay');
}


/**
 * This function sets the loading bar style according the procentage
 * 
 * @param {number} percentage - loading progress in precent
 */
function updateLoadingBarStyle(percentage){
    document.getElementById('loadingBar').style.width = `${percentage}%`;
    let text = document.getElementById('loadingBarText');
    (percentage>=50)?text.style.color = 'var(--accClr)':'black';
    text.innerHTML=`${Math.round(percentage)}%`;
}


/**
 * This function load the game data and shows the loadingscreen for 3 seconds
 */
function loadGame(){
    showOverlay(getLoadingScreenHTMLTemplate());
    (typeof world === 'undefined')? initWorld():resetGame();
    loadingInterval = setInterval(checkLoadingTime, 10);
}


/**
 * This function checks if the loading time is over and starts the game afterwards
 */
function checkLoadingTime(){
    let loadingTime = laodingCounter * 10;
    if (loadingTime <= 1000) {
        let percentage = loadingTime/1000*100;
        updateLoadingBarStyle(percentage);
        laodingCounter++;
    } else {
        startGame();
        resetLoadingProcedure();
    }
}


/**
 * This function resets the loading procedure
 */
function resetLoadingProcedure(){
    clearInterval(loadingInterval);
    laodingCounter = 0;
}



/**
 * This function start the game
 */
function startGame(){
    showGameWindow('gameScreen');
    gameState = 'RUN';
}


/**
 * This function initialize the world
 */
function initWorld(){
    let level = generateLvl1();
    world = new World(canvas,keyListener,level);
}


/**
 * This function reset the world with the actual level
 */
function resetGame(){
    let level = generateLvl1();
    world.resetWorld(level);
}



/**
 * This function exit the game
 */
function exitGame(){
    showGameWindow('startScreen');
    gameState = 'IDLE';
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




/**
 * Enter fullscreen
 */
function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
}


/**
 * End fullscreen
 */
function exitFullscreen() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Add animation to play button
 */

function playAnimationPlayBtn(elementID){
    document.getElementById(elementID).classList.add('playAnimation');
    setTimeout(()=>document.getElementById(elementID).classList.remove('playAnimation'),700);
}

/**
 * This function toggles the sound between on and off
 */
function changeSoundSetting(){
    (sound=='MUTE')?soundOn():soundMuted();
}


/**
 * This function sets the sound setting
 * 
 * @param {string} state - state for the sound setting, 'ON', 'MUTE'
 */
function setSound(state){
    (state=='MUTE')?soundMuted():soundOn();
}


/**
 * This function sets the sound setting to ON
 */
function soundOn(){
    sound = 'ON';
    document.getElementById('muteBtn').style.maskImage = 'url("./img/07_icons/sound-on.svg")';
}


/**
 * This function sets the sound setting to MUTE
 */
function soundMuted(){
    sound = 'MUTE';
    document.getElementById('muteBtn').style.maskImage = 'url("./img/07_icons/sound-off.svg")';
}


/**
 * This function toggles the mobile control between hide and show control elements
 */
function changeMobileControlSetting(){
    (mobileControl == 'ON')?hideMobileCtrl():showMobileCtrl();
}


/**
 * This function sets the mobile control setting
 * 
 * @param {string} state - state for the mobile control setting, 'ON', 'OFF'
 */
function setMobileCtrl(state){
    (state == 'OFF')?hideMobileCtrl():showMobileCtrl();
}


/**
 * This function hides the mobile control elements
 */
function hideMobileCtrl(){
    mobileControl = 'OFF';
    document.getElementById('mobileCtrlBtn').style.maskImage = `url("./img/07_icons/mobileCtrl-off.svg")`;
    hideElement('joystick');
    hideElement('gameBtnGroupCtrl');
}


/**
 * This function shows the mobile control element
 */
function showMobileCtrl() {
    mobileControl = 'ON';
    document.getElementById('mobileCtrlBtn').style.maskImage = `url("./img/07_icons/mobileCtrl-on.svg")`;
    showElement('joystick');
    showElement('gameBtnGroupCtrl');
}


/**
 * This function sets settings for fullscreen and normal screen
 */
function changeFullscreenSetting(){
    if (document.fullscreenElement){
        document.getElementById('fullscreenBtn').style.maskImage = 'url("./img/07_icons/fullscreen-exit.svg")';
    } else {
        document.getElementById('fullscreenBtn').style.maskImage = 'url("./img/07_icons/fullscreen-on.svg")';
    }
}

/**
 * This function toggles between fullscreen and normal screen
 */
function toggleFullscreen(){
    if (document.fullscreenElement){
        exitFullscreen();
    } else {
        let element = document.getElementById('gameWindow');
        enterFullscreen(element);
    }
}


/**
 * This function sets the style in the settings overlay
 * 
 */
function setDifficultySettingStyle(){
    clearActiveSettingStyle('difficultyChoice');
    document.getElementById('difficulty'+difficulty).classList.add('set-active');
}


/**
 * This function sets the difficulty of the game
 * 
 * @param {string} difclty - difficulty to set, 'EASY', 'NORMAL', 'HARD', 'EXTREME'
 */
function setDifficulty(difclty){
    difficulty = difclty;
}

/**
 * This function sets the sound of the game and the style in the settings overlay
 * 
 * @param {string} snd - sound setting to set, 'ON', 'MUTE'
 */
function setSoundSettingStyle(){
    clearActiveSettingStyle('soundChoice');
    document.getElementById('sound'+sound).classList.add('set-active');
}


/**
 * This function sets the visability of the mobile control buttons and joystick of the game and the style in the settings overlay
 * 
 * @param {string} state - set visability, 'ON', 'OFF'
 */
function setMobileCtrlSettingStyle(){
    clearActiveSettingStyle('mobileCtrlChoice');
    document.getElementById('mobileCtrl'+mobileControl).classList.add('set-active');
}


/**
 * This function clears the active style of a setting group
 * 
 * @param {string} settingGroup - classname of the setting group
 */
function clearActiveSettingStyle(settingGroup){
    let diffChoices = document.getElementsByClassName(settingGroup);
    for (let i = 0; i < diffChoices.length; i++) {
        diffChoices[i].classList.remove('set-active');
    }
}



/**
 * This function set the active style of a tab in the introduction overlay
 * 
 * @param {string} id - id of the HTML element which refers to the tab
 */
function setActiveTabIntroduction(id){
    clearActiveStyleIntroduction();
    document.getElementById(id).classList.add('active');
    showTabContent(id);
}


/**
 * This function set all tab to not active style in the introduction overlay
 */
function clearActiveStyleIntroduction(){
    let tabs = document.getElementsByClassName('tabIntroduction');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
}


function showTabContent(id){
    let tabCotnents = document.getElementsByClassName('tabContentIntroduciton');
    for (let i = 0; i < tabCotnents.length; i++) {
        hideElement(tabCotnents[i].id);
    }
    let idContent = "contentIntroduction" + id.slice(3);
    showElement(idContent);
}


