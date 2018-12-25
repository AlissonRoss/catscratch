/**
 *  Alisson Leiva Salazar
 *  Created 12/15/18
 */

const scoreBoard = document.getElementById("score-board");
const playAgainBtn = document.getElementById("play-again");

const images = [
    "ali.jpg",
    "flower.jpg",
    "liz.jpg",
    "me.jpg",
    "pizza.jpg",
    "rosquillas.jpg",
    "tem.jpg",
    "tux.jpg",
];

const scratchedImages = [];
let score = 0;

function addScore(increment) {
    score += increment;
    scoreBoard.innerText = "Score: " + score;
}
addScore(50);

function refreshBoard() {
    for (const canvas of document.querySelectorAll("canvas")) {
        const context = canvas.getContext("2d");
        canvas.segmentsErased = 0;
    
        //randomly select a background image
        canvas.imageIndex = Math.floor(Math.random() * images.length);
        const imageUrl = images[canvas.imageIndex];
        canvas.style.backgroundImage = `url("${imageUrl}")`;
    
        context.globalCompositeOperation = "source-over";
    
        //completely fill canvas with a solid color
        context.fillStyle = "white";
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();
        
        //draw text to suggest desired behavior
        context.fillStyle = "black";
        context.font = "30px sans";
        context.textAlign = "center";
        context.fillText("Scratch me!", canvas.width / 2, canvas.height / 2);
    
        //lines are rounded at each end and 50px wide
        context.lineCap = "round"; //"butt", "round", "square"
        context.lineWidth = 30;
    
        //further drawing actions will erase the solid coloring from the canvas
        context.globalCompositeOperation = "destination-out"; //erase instead of drawing
    }
}
refreshBoard();

for (const canvas of document.querySelectorAll("canvas")) {
    //drawing commands to perform when a mouse or finger moves
    canvas.oncursormove = function(x, y, prevX, prevY) {
        const context = this.getContext("2d");
        context.beginPath();
        context.moveTo(prevX, prevY);
        context.lineTo(x, y);
        context.stroke();

        ++canvas.segmentsErased;
        if (canvas.segmentsErased == 20) {
            let matches = 0;
            for (const imageIndex of scratchedImages) {
                if (imageIndex === canvas.imageIndex) {
                    ++matches;
                }
            }

            if (matches > 0) {
                addScore(Math.pow(10, matches));
            }

            if (scratchedImages.length === 3) {
                if (score < 10) {
                    scoreBoard.innerText = "You lost";
                } else {
                    playAgainBtn.disabled = false;
                }
            } else {
                scratchedImages.push(this.imageIndex);
            }
        }
    }
}

playAgainBtn.addEventListener("click", function(event) {
    addScore(-10);
    playAgainBtn.disabled = true;  
    scratchedImages.length = 0;
    refreshBoard();
});
playAgainBtn.disabled = true;