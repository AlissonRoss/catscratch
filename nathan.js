function calculateCursorPos(x, y) {
    this.prevX = this.x;
    this.prevY = this.y;
    this.x = (x - this.offsetLeft) / this.offsetWidth * this.width;
    this.y = (y - this.offsetTop) / this.offsetHeight * this.height;
}

function resetMousePos(event) {
    calculateCursorPos.call(this, event.clientX, event.clientY);
    this.prevX = this.x;
    this.prevY = this.y;
}

document.addEventListener("mouseup", function(event) {
    for (const canvas of document.querySelectorAll("canvas")) {
        canvas.mouseDown = false;
    }
});

for (const canvas of document.querySelectorAll("canvas")) {
    canvas.x = -100;
    canvas.y = -100;
    canvas.prevX = -100;
    canvas.prevY = -100;
    canvas.primaryTouch = -1;
    canvas.mouseDown = false;

    canvas.addEventListener("mousedown", function(event) {
        this.mouseDown = true;
        resetMousePos.call(this, event);
        this.oncursormove.call(this, this.x, this.y, this.prevX, this.prevY);
    });
    canvas.addEventListener("mouseenter", resetMousePos);
    canvas.addEventListener("mousemove", function(event) {
        if (this.mouseDown) {
            calculateCursorPos.call(this, event.clientX, event.clientY);
            this.oncursormove.call(this, this.x, this.y, this.prevX, this.prevY);
        }
    });
    
    //these two handlers treat the most recent touch as if it was a mouse cursor
    canvas.addEventListener("touchstart", function(event) {
        event.preventDefault();
    
        const firstTouch = event.changedTouches[0];
        this.primaryTouch = firstTouch.identifier;
        calculateCursorPos.call(this, firstTouch.pageX, firstTouch.pageY);
    });
    
    canvas.addEventListener("touchmove", function(event) {    
        for (const touch of event.changedTouches) {
            if (touch.identifier === this.primaryTouch) {
                calculateCursorPos.call(this, touch.pageX, touch.pageY);
                this.oncursormove.call(this, this.x, this.y, this.prevX, this.prevY);
                break;
            }
        }
    });
}