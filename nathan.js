const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

let mouseX = 0;
let mouseY = 0;

function drawCircle(x, y, r) {
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.fill(); 
}

function drawEllipse(x, y, rx, ry) {
    context.beginPath();
    context.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
    context.fill();
}

function setFillRGB(r, g, b) {
    context.fillStyle = `rgb(${r}, ${g}, ${b})`;
}

function setFillColorByName(name) {
    context.fillStyle = name;
}

canvas.addEventListener("mousemove", function(event) {
    mouseX = event.clientX - this.offsetLeft;
    mouseY = event.clientY - this.offsetTop;
});