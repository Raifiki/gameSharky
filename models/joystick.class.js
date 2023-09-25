/**
 * Class representing a joystick
 */
class Joystick {
    //fields
    keyListener;
    elementIDHTML;
    stick;
    areaJS;

    leftclick;
    direction;
    //mthodes
    /**
     * This function initilize a joystick
     * 
     * @param {string} elementIDHTML - HTML ID of the joystick in the webpage
     * @param {string} areaJSStyle - string with css settings of the joystick area, css separted by ;, exsmple: 'width:50px;height:50px;border-radius: 30%;'
     * @param {string} stickStyle - string with css settings of the joystick stick, css separted by ;, exsmple: 'width:50px;height:50px;border-radius: 30%;'
     * @param {KeyListener} keyListener - keylistener to set the direction 
     */
    constructor(elementIDHTML, areaJSStyle, stickStyle,keyListener) {
        this.keyListener = keyListener;
        this.elementIDHTML = elementIDHTML;
        this.generateJoystickHTML(areaJSStyle, stickStyle);
        this.addEvents();
    }


    /**
     * This function generates the joystick html in the webpage
     * 
     * @param {string} areaJSStyle - string with css settings of the joystick area, css separted by ;, exsmple: 'width:50px;height:50px;border-radius: 30%;'
     * @param {string} stickStyle - string with css settings of the joystick stick, css separted by ;, exsmple: 'width:50px;height:50px;border-radius: 30%;'
     */
    generateJoystickHTML(areaJSStyle, stickStyle) {
        this.setJSareaStyle(areaJSStyle);
        this.updateJSarea();

        this.addStickToJSarea();
        this.setStickStyle(stickStyle);
        this.updateStick();
    }


    /**
     * This function sets the joystick area style of the joystick
     * 
     * @param {string} JSareaStyle - string with css settings of the joystick area, css separted by ;, exsmple: 'width:50px;height:50px;border-radius: 30%;'
     */
    setJSareaStyle(JSareaStyle) {
        let areaJS = document.getElementById(this.elementIDHTML);
        areaJS.style.cssText = `
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            ${JSareaStyle}
           `;
    }


    /**
     * This function add an joystick stick to the joystick HTML element
     */
    addStickToJSarea() {
        let areaJS = document.getElementById(this.elementIDHTML);
        areaJS.innerHTML = `<div id="${this.elementIDHTML}-stick"><div>`;
    }


    /**
     * This function sets the joystick stick style of the joystick
     * 
     * @param {string} stickStyle - string with css settings of the joystick stick, css separted by ;, exsmple: 'width:50px;height:50px;border-radius: 30%;'
     */
    setStickStyle(stickStyle) {
        let stick = document.getElementById(`${this.elementIDHTML}-stick`);
        stick.style.cssText = `
          position:absolute;
          ${stickStyle}
      `;
    }


    /**
     * This funtion updates the joystick stick position, width and height related to the overall webpage
     */
    updateStick() {
        let element = document.getElementById(`${this.elementIDHTML}-stick`);
        this.stick = {
            HTMLelement: element,
            x: element.getBoundingClientRect().x,
            y: element.getBoundingClientRect().y,
            w: element.getBoundingClientRect().width,
            h: element.getBoundingClientRect().height,
        }
    };


    /**
     * This funtion updates the joystick area position, width and height related to the overall webpage
     */
    updateJSarea() {
        let element = document.getElementById(this.elementIDHTML);
        this.areaJS = {
            HTMLelement: element,
            x: element.getBoundingClientRect().x,
            y: element.getBoundingClientRect().y,
            w: element.getBoundingClientRect().width,
            h: element.getBoundingClientRect().height,
        }
    };


    /**
     * This function add all neccessary events for the joystick, touch and cklick events
     */
    addEvents() {
        this.areaJS.HTMLelement.addEventListener("mousedown", (event) => { this.mouseDown(event) });
        addEventListener("mouseup", (event) => { this.mouseUp(event) });
        addEventListener("mousemove", (event) => { this.mouseMove(event) });

        this.areaJS.HTMLelement.addEventListener("touchstart", (event) => { this.touchStart(event) });
        this.areaJS.HTMLelement.addEventListener("touchend", (event) => { this.touchEnd(event) });
        this.areaJS.HTMLelement.addEventListener("touchmove", (event) => { this.touchMove(event) });
    }


    /**
     * This function will be executed at the mousdown event. It takes the click position and updates the joystick stick position and color. 
     * 
     * @param {event} e - mousedown event
     */
    mouseDown(e) {
        this.updateJSarea();
        let xMouse = e.clientX;
        let yMouse = e.clientY;
        let [x, y] = this.calcRelativClickPosition(xMouse, yMouse);
        this.updateStickPosition(x, y);
        this.leftclick = true;
        document.getElementById(`${this.elementIDHTML}-stick`).style.backgroundColor = `var(--accClr)`;
    }


    /**
     * This function will be executed at the mousdmove event. It takes the click position and updates the joystick stick position. 
     * 
     * @param {event} e - mousemove event
     */
    mouseMove(e) {
        if (this.leftclick) {
            let xMouse = e.clientX;
            let yMouse = e.clientY;
            let [x, y] = this.calcRelativClickPosition(xMouse, yMouse);
            this.updateStickPosition(x, y);
        }
    }


    /**
     * This function will be executed at the mousup event. It resets the joystick stick position to center and change the color. 
     * 
     * @param {event} e - mouseup event
     */
        mouseUp(e) {
            let [cx, cy] = [this.areaJS.x + this.areaJS.w / 2, this.areaJS.y + this.areaJS.h / 2]
            let [x, y] = this.calcRelativClickPosition(cx, cy);
            this.updateStickPosition(x, y);
            this.leftclick = false;
            document.getElementById(`${this.elementIDHTML}-stick`).style.backgroundColor = `var(--primClr)`;
        }


    /**
     * This function will be executed at the touch event. It takes the click position and updates the joystick stick position and color. 
     * 
     * @param {event} e - touchstart event
     */
    touchStart(e){
        e.preventDefault();
        this.updateJSarea();
        let xMouse = e.touches[0].clientX;
        let yMouse = e.touches[0].clientY;
        let [x, y] = this.calcRelativClickPosition(xMouse, yMouse);
        this.updateStickPosition(x, y);
        this.leftclick = true;
        document.getElementById(`${this.elementIDHTML}-stick`).style.backgroundColor = `var(--accClr)`;
    }


    /**
     * This function will be executed at the touchmove event. It takes the click position and updates the joystick stick position. 
     * 
     * @param {event} e - touchmove event
     */
    touchMove(e){
        e.preventDefault();
        if (this.leftclick) {
            let xMouse = e.touches[0].clientX;
            let yMouse = e.touches[0].clientY;
            let [x, y] = this.calcRelativClickPosition(xMouse, yMouse);
            this.updateStickPosition(x, y);
        }
    }


    /**
     * This function will be executed at the touchend event. It resets the joystick stick position to center and change the color. 
     * 
     * @param {event} e - touchend event
     */
    touchEnd(e){
        e.preventDefault();
        if (this.leftclick) {
            let [cx, cy] = [this.areaJS.x + this.areaJS.w / 2, this.areaJS.y + this.areaJS.h / 2]
            let [x, y] = this.calcRelativClickPosition(cx, cy);
            this.updateStickPosition(x, y);
            this.leftclick = false;
            document.getElementById(`${this.elementIDHTML}-stick`).style.backgroundColor = `var(--primClr)`;
        }
    }


    /**
     * This function calculates the click position relative to the left upper corner of the joystick area
     * 
     * @param {number} xMouse - x value of click position related to the webpage
     * @param {number} yMouse - y value of click position related to the webpage
     * @returns {Array} - array with the relative position to the joaystick area left upper corner in x and y coordinates, [x,y]
     */
    calcRelativClickPosition(xMouse, yMouse) {
        let relX = xMouse - this.areaJS.x - this.stick.w / 2;
        let relY = yMouse - this.areaJS.y - this.stick.h / 2;
        [relX, relY] = this.limitStickPosition2Area(relX, relY);
        return [relX, relY];
    }


    /**
     * This function limits the stick position to the joystick area
     * 
     * @param {number} relX - x value realtive to the joystick area left upper corner
     * @param {number} relY - y value realtive to the joystick area left upper corner
     * @returns {Array} - array with the limited relative position to the joaystick area left upper corner in x and y coordinates, [x,y]
     */
    limitStickPosition2Area(relX, relY) {
        let xlim = Math.min(Math.max(relX, 0), this.areaJS.w - this.stick.w);
        let ylim = Math.min(Math.max(relY, 0), this.areaJS.h - this.stick.h);
        return [xlim, ylim];
    }


    /**
     * This function updates the joystick stick position on the webpage
     * 
     * @param {number} x - the x coordinate of the stick ralted to the left upper corner of the joystick area
     * @param {number} y - the y coordinate of the stick ralted to the left upper corner of the joystick area
     */
    updateStickPosition(x, y) {
        this.stick.HTMLelement.style.left = x + 'px';
        this.stick.HTMLelement.style.top = y + 'px';
        this.direction = this.getDirection(x, y);
    }


    /**
     * This function calculates the click position relative to the joystick center and sets the key listener settings. The area is seperated in 9 section: Center, North, East, South, West, South-East, North-East, South-West, North-West
     * 
     * @param {number} x - x coordinate ot the limited click position relative to the left upper corner of the joystick area
     * @param {number} y - y coordinate ot the limited click position relative to the left upper corner of the joystick area
     * @returns 
     */
    getDirection(x, y) {
        this.keyListener.clearDirection();
        let [cx, cy] = [x - this.areaJS.w / 2 + this.stick.w / 2, y - this.areaJS.h / 2 + this.stick.h / 2];
        if (Math.abs(cx) <= 5 && Math.abs(cy) <= 5) {
            return 'C';
        } else if (cx > 5 && Math.abs(cy) <= cx / 2) {
            this.keyListener.RIGHT = true;
            return 'E';
        } else if (cy > 5 && Math.abs(cx) <= cy / 2) {
            this.keyListener.DOWN = true;
            return 'S';
        } else if (cx < -5 && Math.abs(cy) <= -cx / 2) {
            this.keyListener.LEFT = true;
            return 'W';
        } else if (cy < -5 && Math.abs(cx) <= -cy / 2) {
            this.keyListener.UP = true;
            return 'N';
        } else if (cx > 5 && cy > cx / 2 && cy < cx * 2) {
            this.keyListener.RIGHT = true;
            this.keyListener.DOWN = true;
            return 'SE';
        } else if (cy < -5 && cx > -cy / 2 && cx < -cy * 2) {
            this.keyListener.RIGHT = true;
            this.keyListener.UP = true;
            return 'NE';
        } else if (cx < -5 && cy > -cx / 2 && cy < -cx * 2) {
            this.keyListener.LEFT = true;
            this.keyListener.DOWN = true;
            return 'SW';
        } else if (cy < -5 && cx < cy / 2 && cx > cy * 2) {
            this.keyListener.LEFT = true;
            this.keyListener.UP = true;
            return 'NW';
        }
    }
}

