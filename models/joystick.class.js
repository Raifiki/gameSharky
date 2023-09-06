class Joystick {
    //fields
    elementIDHTML;
    stick;
    areaJS;

    leftclick;
    direction;
    //mthodes
    constructor(elementIDHTML, areaJSStyle, stickStyle) {
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
            position: relative;
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
        addEventListener("mousedown", (event) => { this.mouseDown(event) });
        addEventListener("mouseup", (event) => { this.mouseUp(event) });
        addEventListener("mousemove", (event) => { this.mouseMove(event) });
    }

    mouseDown(e) {
        let xMouse = e.clientX;
        let yMouse = e.clientY;
        if (this.isMousClickInJSArea(xMouse, yMouse)) {
            let [x, y] = this.calcRelativClickPosition(xMouse, yMouse);
            this.updateStickPosition(x, y);
            this.leftclick = true;
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
        let [cx, cy] = [x - this.areaJS.w / 2 + this.stick.w / 2, y - this.areaJS.h / 2 + this.stick.h / 2];
        if (Math.abs(cx) <= 5 && Math.abs(cy) <= 5) {
            return 'C';
        } else if (cx > 5 && Math.abs(cy) <= cx / 2) {
            return 'E';
        } else if (cy > 5 && Math.abs(cx) <= cy / 2) {
            return 'S';
        } else if (cx < -5 && Math.abs(cy) <= -cx / 2) {
            return 'W';
        } else if (cy < -5 && Math.abs(cx) <= -cy / 2) {
            return 'N';
        } else if (cx > 5 && cy > cx / 2 && cy < cx * 2) {
            return 'SE';
        } else if (cy < -5 && cx > -cy / 2 && cx < -cy * 2) {
            return 'NE';
        } else if (cx < -5 && cy > -cx / 2 && cy < -cx * 2) {
            return 'SW';
        } else if (cy < -5 && cx < cy / 2 && cx > cy * 2) {
            return 'NW';
        }
    }

}

// am Ende löschen
let JSstyle = `
            width: 100px;
            height: 100px;
            background-color: red;
            border-radius: 20%;
           `;

let stickSty = `        
          width: 40px;
          height:40px;
          border-radius:100%;
          background-color: green;`;

let JS = new Joystick('joystick', JSstyle, stickSty);
let JS1 = new Joystick('joystick1', JSstyle, stickSty);

    // am Ende löschen