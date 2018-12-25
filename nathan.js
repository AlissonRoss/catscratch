function drawLine(context, width, x1, y1, ...to) {
    context.beginPath();
    context.lineWidth = width;
    context.moveTo(x1, y1);

    for (let i = 0; i < to.length; ++i) {
        const x = to[i * 2];
        const y = to[i * 2 + 1];
        context.lineTo(x, y);
    }

    context.stroke();
}

function mouseEnter(event) {
    if (this.mouseDown) {
        this.x = event.clientX - this.offsetLeft;
        this.y = event.clientY - this.offsetTop;
        
        this.prevX = this.x;
        this.prevY = this.y;
    }
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
        mouseEnter.call(this, event);
    });
    canvas.addEventListener("mouseenter", mouseEnter);
    
    canvas.addEventListener("mousemove", function(event) {
        if (this.mouseDown) {
            this.prevX = this.x;
            this.prevY = this.y;
            this.x = event.clientX - this.offsetLeft;
            this.y = event.clientY - this.offsetTop;
            this.oncursormove.call(this, this.x, this.y, this.prevX, this.prevY);
        }
    });
    
    //these two handlers treat the most recent touch as if it was a mouse cursor
    canvas.addEventListener("touchstart", function(event) {
        event.preventDefault();
    
        const firstTouch = event.changedTouches[0];
        this.primaryTouch = firstTouch.identifier;
    
        this.x = firstTouch.pageX - this.offsetLeft;
        this.y = firstTouch.pageY - this.offsetTop;
        this.prevX = x;
        this.prevY = y;
    });
    
    canvas.addEventListener("touchmove", function(event) {    
        for (const touch of event.changedTouches) {
            if (touch.identifier === this.primaryTouch) {
                this.prevX = this.x;
                this.prevY = this.y;
                this.x = touch.pageX - this.offsetLeft;
                this.y = touch.pageY - this.offsetTop;
                this.oncursormove.call(this, this.x, this.y, this.prevX, this.prevY);
                break;
            }
        }
    });
}