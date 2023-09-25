
/**
 * This functions generates the HTML for the introducion overlay
 * 
 * @returns {string} - HTML code
 */
function getIntroductionHTMLTemplate(){
    return /*html*/`
    <button id="ovlyCloseBtn" class="gameBtn" onclick="hideOverlay()"></button>
        <div id="wrapperIntroduction">
            <nav id="navIntroduction">
                <button id="tabSharky" class="tabIntroduction active" onclick="setActiveTabIntroduction('tabSharky')">
                    <img src="./img/01_Sharkie/1_Idle/1.png" alt="sharky">
                </button>
                <button id="tabPufferfish" class="tabIntroduction" onclick="setActiveTabIntroduction('tabPufferfish')">
                    <img src="./img/02_Enemy/1_Pufferfish/2_Transition/r5.png" alt="pufferfish">
                </button>
                <button id="tabJellyfish" class="tabIntroduction" onclick="setActiveTabIntroduction('tabJellyfish')">
                    <img src="./img/02_Enemy/2_Jellyfish/1_Swim/normal/p4.png" alt="jellyfish">
                </button>
                <button id="tabWhale" class="tabIntroduction" onclick="setActiveTabIntroduction('tabWhale')">
                    <img src="./img/02_Enemy/3_FinalEnemy/2_Swim/1.png" alt="whale">
                </button>
                <button id="tabCoin" class="tabIntroduction" onclick="setActiveTabIntroduction('tabCoin')">
                    <img src="./img/04_Collectables/Coins/1.png" alt="coin">
                </button>
                <button id="tabPoison" class="tabIntroduction" onclick="setActiveTabIntroduction('tabPoison')">
                    <img src="./img/04_Collectables/Poison/1.png" alt="poison">
                </button>
                <button id="tabHeart" class="tabIntroduction" onclick="setActiveTabIntroduction('tabHeart')">
                    <img src="./img/04_Collectables/heart.png" alt="heart">
                </button>
            </nav>
            <div id="separateLine"></div>
            <div id="contentIntroductionSharky" class=" tabContentIntroduciton">
                <h2>sharky</h2>
                <span>Sharky is an <span class="highlight-text">agile</span> and skillful little shark, effortlessly navigating through the ocean. His fins carry him gracefully through the deep blue water, giving him remarkable <span class="highlight-text">maneuverability</span>. <br><br>
                    In <span class="highlight-text">combat</span>, Sharky employs a variety of <span class="highlight-text">attacks</span> that make him a formidable adversary:</span>
                <table id="attackTableSharky">
                    <tr>
                        <td>attack</td>
                        <td>damage</td>
                        <td>range</td>
                    </tr>
                    <tr>
                        <td>slap</td>
                        <td><img class="starImg" src="" alt=""><img class="starImg" src="" alt=""><img class="starImg" src="" alt=""></td>
                        <td><img class="starImg" src="" alt=""></td>
                    </tr>
                    <tr>
                        <td>bubble trap normal</td>
                        <td><img class="starImg" src="" alt=""></td>
                        <td><img class="starImg" src="" alt=""><img class="starImg" src="" alt=""></td>
                    </tr>
                    <tr>
                        <td>bubble trap poison</td>
                        <td><img class="starImg" src="" alt=""><img class="starImg" src="" alt=""></td>
                        <td><img class="starImg" src="" alt=""><img class="starImg" src="" alt=""><img class="starImg" src="" alt=""></td>
                    </tr>
                </table>
            </div>
            <div id="contentIntroductionPufferfish" class="d-none tabContentIntroduciton">
                <h2>Peacful Pufferfish</h2>
                <span>The Pufferfish is more of a <span class="highlight-text">peaceful</span> adversary, appearing in <span class="highlight-text">three different color variations</span>: Green, Orange, and Red. Each type is characterized by its unique features of <span class="highlight-text">speed and item</span>.</span>
                <table>
                    <tr>
                        <td>type</td>
                        <td>speed</td>
                        <td>damge</td>
                        <td>health</td>
                        <td>item</td>
                    </tr>
                    <tr>
                        <td><img class="gameImg" src="./img/02_Enemy/1_Pufferfish/1_Swim/g1.png" alt="green"></td>
                        <td><img class="starImg" src="" alt=""></td>
                        <td><img class="starImg" src="" alt=""></td>
                        <td><img class="starImg" src="" alt=""></td>
                        <td><img class="gameImgCoin" src="./img/04_Collectables/Coins/1.png" alt="coin"></td>
                    </tr>
                    <tr>
                        <td><img class="gameImg" src="./img/02_Enemy/1_Pufferfish/1_Swim/o1.png" alt="orange"></td>
                        <td><img class="starImg" src="" alt=""><img class="starImg" src="" alt=""></td>
                        <td><img class="starImg" src="" alt=""></td>
                        <td><img class="starImg" src="" alt=""></td>
                        <td><img class="gameImgCoin" src="./img/04_Collectables/Coins/1.png" alt="coin"></td>
                    </tr>
                    <tr>
                        <td><img class="gameImg" src="./img/02_Enemy/1_Pufferfish/1_Swim/r1.png" alt="red"></td>
                        <td><img class="starImg" src="" alt=""><img class="starImg" src="" alt=""><img class="starImg" src="" alt=""></td>
                        <td><img class="starImg" src="" alt=""></td>
                        <td><img class="starImg" src="" alt=""></td>
                        <td><img class="gameImg" src="./img/04_Collectables/heart.png" alt="heart"></td>
                    </tr>
                </table>
            </div>
            <div id="contentIntroductionJellyfish" class="d-none tabContentIntroduciton">
                <h2>Aggressive Jellyfish</h2>
                <span>The jellyfish is more of an <span class="highlight-text">aggressive adversary</span>, that switches to an <span class="highlight-text">attack mode</span> if approached too closely or when provoked, indicated by a change in its <span class="highlight-text">color</span>. <br> There are <span class="highlight-text">two different types</span> of jellyfish, the regular and the toxic, each with distinct <span class="highlight-text">attack patterns</span>.</span>
                <table>
                    <tr>
                        <td>type</td>
                        <td>speed</td>
                        <td>damge</td>
                        <td>health</td>
                        <td>item</td>
                    </tr>
                    <tr>
                        <td><img class="gameImg" src="./img/02_Enemy/2_Jellyfish/1_Swim/normal/p1.png" alt="regular"></td>
                        <td><img class="starImg" src="" alt=""><img class="starImg" src="" alt=""></td>
                        <td><img class="starImg" src="" alt=""><img class="starImg" src="" alt=""></td>
                        <td><img class="starImg" src="" alt=""></td>
                        <td><img class="gameImgCoin" src="./img/04_Collectables/Coins/1.png" alt="coin"><img class="gameImgCoin" src="./img/04_Collectables/Coins/1.png" alt="coin"><img class="gameImgCoin" src="./img/04_Collectables/Coins/1.png" alt="coin"></td>
                    </tr>
                    <tr>
                        <td><img class="gameImg" src="./img/02_Enemy/2_Jellyfish/1_Swim/toxic/g1.png" alt="toxic"></td>
                        <td><img class="starImg" src="" alt=""><img class="starImg" src="" alt=""><img class="starImg" src="" alt=""></td>
                        <td><img class="starImg" src="" alt=""><img class="starImg" src="" alt=""><img class="starImg" src="" alt=""></td>
                        <td><img class="starImg" src="" alt=""></td>
                        <td><img class="gameImg" src="./img/04_Collectables/Poison/1.png" alt="poison"></td>
                    </tr>
                </table>
            </div>
            <div id="contentIntroductionWhale" class="d-none tabContentIntroduciton">
                <h2>The Giant Whale</h2>
                <span>The Giant Whale is an <span class="highlight-text">impressive and aggressive</span> adversary in Sharky's adventure. With its powerful attacks, it inflicts <span class="highlight-text">immense damage</span>. It can <span class="highlight-text">detect Sharky</span> and, after a short period, launches into an <span class="highlight-text">attack</span>—a rapid "smash" towards the <span class="highlight-text">last seen position</span> of Sharky. <br><br>
                        This whale is highly intelligent and can even <span class="highlight-text">evade regular bubbles</span>, adding an extra layer of challenge for Sharky. To defeat the Giant Whale, it requires the utmost skill and strategy. Sharky must act wisely to <span class="highlight-text">dodge the assault and then counter at the opportune moment</span>. Only then can he overcome this ultimate underwater duel challenge.</span>
            </div>
            <div id="contentIntroductionCoin" class="d-none tabContentIntroduciton">
                <h2>Shimmering Sea Coins</h2>
                <span>The shimmering sea coins are <span class="highlight-text">precious treasures</span> in Sharky's Adventure. <span class="highlight-text">Collect</span> as many coins as possible to <span class="highlight-text">boost</span> your score at the end. Don't forget, some <span class="highlight-text">enemies also drop coins</span>, allowing you to further increase your score.</span>
            </div>
            <div id="contentIntroductionPoison" class="d-none tabContentIntroduciton">
                <h2>The Poison Bottles</h2>
                <span>The poison bottles are <span class="highlight-text">valuable resources</span> that can be <span class="highlight-text">collected or obtained</span> from defeated enemies. They can be used to <span class="highlight-text">generate an toxic bubble</span>. These toxic supplies are a crucial part of your arsenal, offering new <span class="highlight-text">strategic possibilities</span> in the battle against your foes. Use them wisely, as they could <span class="highlight-text">make the crucial difference between victory and defeat</span>.</span>
            </div>
            <div id="contentIntroductionHeart" class="d-none tabContentIntroduciton">
                <h2>Life Heart</h2>
                <span>The Life Heart is a precious item that can <span class="highlight-text">restore Sharky's vitality</span>. The heart can be <span class="highlight-text">collected or obtained from defeated enemies</span>. <br><br>
                    Keep an eye out for these valuable hearts, as they could be the <span class="highlight-text">difference between victory and defeat</span>. Use them wisely to ensure that Sharky conquers the challenge!</span>
            </div>
        </div>
    `
}


/**
 * This functions generates the HTML for the settings overlay
 * 
 * @returns {string} - HTML code
 */
function getSettingsHTMLTemplate(){
    return /*html*/ `
        <button id="ovlyCloseBtn" class="gameBtn" onclick="hideOverlay()"></button>
        <div class="wrapperSettings">
            <span>difficulty</span>
            <div id="wrapperChoices">
                <img id="difficultyEASY" class="setttingsImg difficultyChoice" onclick="setDifficulty('EASY'), setDifficultySettingStyle()" src="./img/07_icons/difficulty-easy.svg" alt="easy">
                <img id="difficultyNORMAL" class="setttingsImg difficultyChoice" onclick="setDifficulty('NORMAL'), setDifficultySettingStyle()" src="./img/07_icons/difficulty-normal.svg" alt="normal">
                <img id="difficultyHARD" class="setttingsImg difficultyChoice" onclick="setDifficulty('HARD'), setDifficultySettingStyle()" src="./img/07_icons/difficulty-hard.svg" alt="hard">
                <img id="difficultyEXTREME" class="setttingsImg difficultyChoice" onclick="setDifficulty('EXTREME'), setDifficultySettingStyle()" src="./img/07_icons/difficulty-extreme.svg" alt="extreme">
            </div>
        </div>
        <div class="wrapperSettings">
            <span>sound</span>
            <div id="wrapperChoices">
                <img id="soundON" class="setttingsImg soundChoice" onclick="setSound('ON'), setSoundSettingStyle()" src="./img/07_icons/sound-on.svg" alt="ON">
                <img id="soundMUTE" class="setttingsImg soundChoice" onclick="setSound('MUTE'), setSoundSettingStyle()" src="./img/07_icons/sound-off.svg" alt="MUTE">
            </div>
        </div>
        <div class="wrapperSettings">
            <span>mobile control</span>
            <div id="wrapperChoices">
                <img id="mobileCtrlON" class="setttingsImg mobileCtrlChoice" onclick="setMobileCtrl('ON'), setMobileCtrlSettingStyle()" src="./img/07_icons/mobileCtrl-on.svg" alt="ON">
                <img id="mobileCtrlOFF" class="setttingsImg mobileCtrlChoice" onclick="setMobileCtrl('OFF'), setMobileCtrlSettingStyle()" src="./img/07_icons/mobileCtrl-off.svg" alt="MUTE">
            </div>
        </div>
    `
}


/**
 * This functions generates the HTML for the control overlay
 * 
 * @returns {string} - HTML code
 */
function getControlHTMLTemplate(){
    return /*html*/ `
    <button id="ovlyCloseBtn" class="gameBtn" onclick="hideOverlay()"></button>
    <table id="controlTable">
        <tr>
            <td>
                <img class="ctrlKeyImg" src="./img/07_icons/KeyArrow-up.svg" alt="Up">
                <div>
                    <img class="ctrlKeyImg" src="./img/07_icons/KeyArrow-left.svg" alt="Left">
                    <img class="ctrlKeyImg" src="./img/07_icons/KeyArrow-down.svg" alt="Down">
                    <img class="ctrlKeyImg" src="./img/07_icons/KeyArrow-right.svg" alt="Right">
                </div>
            </td>
            <td>move shark</td>
            <td>
                <img id="ctrlMobileCtrlImg" src="./img/07_icons/Joystick.svg" alt="Joystick">
            </td>
        </tr>
        <tr>
            <td>
                <img class="ctrlKeyImg" src="./img/07_icons/KeyArrow-space.svg" alt="space">
            </td>
            <td>slap attack</td>
            <td>
                <img class="ctrlMobileBtnImg" src="./img/01_Sharkie/4_Attack/FinSlap/5.png" alt="SlapAttack">
            </td>
        </tr>
        <tr>
            <td>
                <img class="ctrlKeyImg" src="./img/07_icons/KeyArrow-S.svg" alt="S">
            </td>
            <td>bubble trap</td>
            <td>
                <img class="ctrlMobileBtnImg" src="./img/01_Sharkie/4_Attack/BubbleTrap/op1_normalBubble/7.png" alt="bubbleTrap">
            </td>
        </tr>
        <tr>
            <td>
                <img class="ctrlKeyImg" src="./img/07_icons/KeyArrow-D.svg" alt="D">
            </td>
            <td>change bubble type</td>
            <td>
                <img class="ctrlMobileBtnImg" src="./img/01_Sharkie/4_Attack/BubbleTrap/PoisonedBubble.png" alt="changeBubble">
            </td>
        </tr>
    </table>
    `
}


/**
 * This functions generates the HTML for the loosing overlay
 * 
 * @param {number} lvlProgress - level progress in percentage
 * @param {number} nrCoins - collected coins
 * @returns {string} - HTML code
 */
function getLooseScreenHTMLTemplate(nrCoins,lvlProgress){
    return /*html*/`
    <div id="wrapperLooseScreen">
        <div class="wrapperResult">
            <div class="wrapperResultElement">
                <span>level progress:</span>
                <span class="highlight-text">${lvlProgress}%</span>
            </div>
            <div class="wrapperResultElement">
                <img src="" alt="Coins">
                <span class="highlight-text">${nrCoins}</span>
            </div>
        </div>
        <div class="wrapperBtnGroup">
            <button class="menuBtn" onclick="loadGame()">try again</button>
            <button class="menuBtn" onclick="exitGame()">menu</button>
        </div>
    </div>
    `
}


/**
 * This functions generates the HTML for the winning overlay
 * 
 * @param {number} lvlProgress - level progress in percentage
 * @param {number} nrCoins - collected coins
 * @returns {string} - HTML code
 */
function getWinScreenHTMLTemplate(nrCoins,lvlProgress){
    return /*html*/`
    <div id="wrapperWinScreen">
        <div class="wrapperResult">
            <div class="wrapperResultElement">
                <span>level progress:</span>
                <span class="highlight-text">${lvlProgress}%</span>
            </div>
            <div class="wrapperResultElement">
                <img src="" alt="Coins">
                <span class="highlight-text">${nrCoins}</span>
            </div>
        </div>
        <div class="wrapperBtnGroup">
            <button class="menuBtn" onclick="loadGame()">play again</button>
            <button class="menuBtn" onclick="exitGame()">menu</button>
        </div>
    </div>
    `
}


/**
 * This functions generates the HTML for the next level overlay
 * 
 * @returns {string} - HTML code
 */
function getNextLvlScreenHTMLTemplate(){
    return /*html*/`
        <h2>level completed</h2>
        <div>
            <div>
                <span>level progress:</span>
                <span>0%</span>
            </div>
            <div>
                <img src="" alt="Coins">
                <span>0</span>
            </div>
        </div>
        <div>
            <button class="menuBtn" onclick="loadGame()">play again</button>
            <button class="menuBtn" onclick="exitGame()">menu</button>
        </div>
    `
}


/**
 * This functions generates the HTML for the loading screen overlay
 * 
 * @returns {string} - HTML code
 */
function getLoadingScreenHTMLTemplate(){
    return /*html*/ `
    <table id="controlTable">
        <tr>
            <td>
                <img class="ctrlKeyImg" src="./img/07_icons/KeyArrow-up.svg" alt="Up">
                <div>
                    <img class="ctrlKeyImg" src="./img/07_icons/KeyArrow-left.svg" alt="Left">
                    <img class="ctrlKeyImg" src="./img/07_icons/KeyArrow-down.svg" alt="Down">
                    <img class="ctrlKeyImg" src="./img/07_icons/KeyArrow-right.svg" alt="Right">
                </div>
            </td>
            <td>move shark</td>
            <td>
                <img id="ctrlMobileCtrlImg" src="./img/07_icons/Joystick.svg" alt="Joystick">
            </td>
        </tr>
        <tr>
            <td>
                <img class="ctrlKeyImg" src="./img/07_icons/KeyArrow-space.svg" alt="space">
            </td>
            <td>slap attack</td>
            <td>
                <img class="ctrlMobileBtnImg" src="./img/01_Sharkie/4_Attack/FinSlap/5.png" alt="SlapAttack">
            </td>
        </tr>
        <tr>
            <td>
                <img class="ctrlKeyImg" src="./img/07_icons/KeyArrow-S.svg" alt="S">
            </td>
            <td>bubble trap</td>
            <td>
                <img class="ctrlMobileBtnImg" src="./img/01_Sharkie/4_Attack/BubbleTrap/op1_normalBubble/7.png" alt="bubbleTrap">
            </td>
        </tr>
        <tr>
            <td>
                <img class="ctrlKeyImg" src="./img/07_icons/KeyArrow-D.svg" alt="D">
            </td>
            <td>change bubble type</td>
            <td>
                <img class="ctrlMobileBtnImg" src="./img/01_Sharkie/4_Attack/BubbleTrap/PoisonedBubble.png" alt="changeBubble">
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <div id="loadingBarFrame">
                    <div id="loadingBar"></div>
                    <span id="loadingBarText">0%</span>
                </div>
            </td>
        </tr>
    </table>
    `
}

/**
 * This functions generates the HTML for the turn device screen overlay
 * 
 * @returns {string} - HTML code
 */
function getTurnDeviceHTML(){
return /*html*/ `
    <h2>turn your device</h2>
    <img id="imgTurnDevice" src="./img/07_icons/turn-device.svg" alt="turn-device">
`
}