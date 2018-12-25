/**
 *  Alisson Leiva Salazar
 *  Created 12/15/18
 */

for (const canvas of document.querySelectorAll("canvas")) {
    const context = canvas.getContext("2d");

    //drawing commands to perform when a mouse or finger movies
    canvas.oncursormove = function(x, y, prevX, prevY) {
        const context = this.getContext("2d");
        drawLine(context, 30, prevX, prevY, x, y);
    }

    //completely fill canvas with a solid color
    context.fillStyle = "white";
    context.rect(0, 0, canvas.width, canvas.height);
    context.fill();
    
    //draw text to suggest desired behavior
    context.fillStyle = "black";
    context.font = "30px sans";
    context.textAlign = "center";
    context.fillText("Scratch me!", canvas.width / 2, canvas.height / 2);

    //lines are rounded at each end
    context.lineCap = "round"; //"butt", "round", "square"

    //further drawing actions will erase the solid coloring from the canvas
    context.globalCompositeOperation = 'destination-out'; //erase instead of drawing

}