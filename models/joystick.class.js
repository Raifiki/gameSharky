class Joystick {
    //fields
    keyListener;
    elementIDHTML;
    stick;
    areaJS;

    leftclick;
    direction;
    //mthodes
    constructor(elementIDHTML, areaJSStyle, stickStyle,keyListener) {
        this.keyListener = keyListener;
        this.elementIDHTML = elementIDHTML;
        this.generateJoystickHTML(areaJSStyle, stickStyle);
        this.addEvents();
    }

    generateJoystickHTML(areaJSStyle, stickStyle) {
        this.setJSareaStyle(areaJSStyle);
        this.saveJSareaProperties();

        this.addStickToJSarea();
        this.setStickStyle(stickStyle);
        this.saveStickProperties();
    }

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
    addStickToJSarea() {
        let areaJS = document.getElementById(this.elementIDHTML);
        areaJS.innerHTML = `<div id="${this.elementIDHTML}-stick"><div>`;
    }
    setStickStyle(stickStyle) {
        let stick = document.getElementById(`${this.elementIDHTML}-stick`);
        stick.style.cssText = `
          position:absolute;
          ${stickStyle}
      `;
    }
    saveStickProperties() {
        let element = document.getElementById(`${this.elementIDHTML}-stick`);
        this.stick = {
            HTMLelement: element,
            x: element.getBoundingClientRect().x,
            y: element.getBoundingClientRect().y,
            w: element.getBoundingClientRect().width,
            h: element.getBoundingClientRect().height,
        }
    };
    saveJSareaProperties() {
        let element = document.getElementById(this.elementIDHTML);
        this.areaJS = {
            HTMLelement: element,
            x: element.getBoundingClientRect().x,
            y: element.getBoundingClientRect().y,
            w: element.getBoundingClientRect().width,
            h: element.getBoundingClientRect().height,
        }
    };

    addEvents() {
        //addEventListener("mousedown", (event) => { this.mouseDown(event) });
        //addEventListener("mouseup", (event) => { this.mouseUp(event) });
        //addEventListener("mousemove", (event) => { this.mouseMove(event) });

        addEventListener("touchstart", (event) => { this.touchStart(event) });
        addEventListener("touchend", (event) => { this.touchEnd(event) });
        addEventListener("touchmove", (event) => { this.touchMove(event) });
    }

    mouseDown(e) {
        let xMouse = e.clientX;
        let yMouse = e.clientY;
        console.log(e)
        console.log(xMouse,yMouse)
        
        if (this.isMousClickInJSArea(xMouse, yMouse)) {
            let [x, y] = this.calcRelativClickPosition(xMouse, yMouse);
            this.updateStickPosition(x, y);
            this.leftclick = true;
        }
    }

    touchStart(e){
        console.log(e)
        let xMouse = e.touches[0].clientX;
        let yMouse = e.touches[0].clientY;
        if (this.isMousClickInJSArea(xMouse, yMouse)) {
            let [x, y] = this.calcRelativClickPosition(xMouse, yMouse);
            this.updateStickPosition(x, y);
            this.leftclick = true;
        } 
    }

    touchMove(e){
        console.log(e.touches.length)
        console.log(e)
        if (this.leftclick) {
            let xMouse = e.touches[0].clientX;
            let yMouse = e.touches[0].clientY;
            let [x, y] = this.calcRelativClickPosition(xMouse, yMouse);
            this.updateStickPosition(x, y);
        }
    }

    touchEnd(e){
        console.log(e.touches.length)
        if (this.leftclick && e.touches.length == 0) {
            let [cx, cy] = [this.areaJS.x + this.areaJS.w / 2, this.areaJS.y + this.areaJS.h / 2]
            let [x, y] = this.calcRelativClickPosition(cx, cy);
            this.updateStickPosition(x, y);
            this.leftclick = false;
        }
    }

    mouseUp(e) {
        let [cx, cy] = [this.areaJS.x + this.areaJS.w / 2, this.areaJS.y + this.areaJS.h / 2]
        let [x, y] = this.calcRelativClickPosition(cx, cy);
        this.updateStickPosition(x, y);
        this.leftclick = false;
    }

    mouseMove(e) {
        if (this.leftclick) {
            let xMouse = e.clientX;
            let yMouse = e.clientY;
            let [x, y] = this.calcRelativClickPosition(xMouse, yMouse);
            this.updateStickPosition(x, y);
        }
    }

    isMousClickInJSArea(xMouse, yMouse) {
        return (xMouse > this.areaJS.x && xMouse < this.areaJS.x + this.areaJS.w) &&
            (yMouse > this.areaJS.y && yMouse < this.areaJS.y + this.areaJS.h);
    }

    calcRelativClickPosition(xMouse, yMouse) {
        let relX = xMouse - this.areaJS.x - this.stick.w / 2;
        let relY = yMouse - this.areaJS.y - this.stick.w / 2;
        [relX, relY] = this.limitStickPosition2Area(relX, relY);
        return [relX, relY];
    }

    limitStickPosition2Area(relX, relY) {
        let xlim = Math.min(Math.max(relX, 0), this.areaJS.w - this.stick.w);
        let ylim = Math.min(Math.max(relY, 0), this.areaJS.h - this.stick.h);
        return [xlim, ylim];
    }

    updateStickPosition(x, y) {
        this.stick.HTMLelement.style.left = x + 'px';
        this.stick.HTMLelement.style.top = y + 'px';
        this.stick.HTMLelement.style.backgroundColor = 'blue';
        this.direction = this.getDirection(x, y);
    }

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

