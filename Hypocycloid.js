const canvas = document.getElementById("canvas");
const graphics = canvas.getContext("2d");
const speedSlider = document.getElementById("speed");
const smallerRadiusSlider = document.getElementById("smallerRadius");
const largerRadiusSlider = document.getElementById("largerRadius");

let paused = false;

const width = canvas.width;
const height = canvas.height;

let angle = 0;
let smallerRadius = parseFloat(smallerRadiusSlider.value);
let largerRadius = parseFloat(largerRadiusSlider.value);

let points = [];

function draw() {
    if (!paused) {
        let speed = parseFloat(speedSlider.value);

        angle += speed;

        let xCoord = (largerRadius-smallerRadius)*Math.cos(angle)+smallerRadius*Math.cos((largerRadius-smallerRadius)/smallerRadius*angle)+width/2;
        let yCoord = (largerRadius-smallerRadius)*Math.sin(angle)-smallerRadius*Math.sin((largerRadius-smallerRadius)/smallerRadius*angle)+height/2;

        points.push({x:xCoord, y:yCoord});

        graphics.clearRect(0, 0, width, height);

        //Larger circle
        graphics.fillStyle = "green";
        graphics.beginPath();
        graphics.arc(width/2, height/2, largerRadius, 0, Math.PI*2);
        graphics.closePath();
        graphics.fill();

        //Smaller Circle
        graphics.fillStyle = "white";
        graphics.beginPath();
        graphics.arc(width/2+(largerRadius-smallerRadius)*Math.cos(angle), height/2+(largerRadius-smallerRadius)*Math.sin(angle), smallerRadius, 0, Math.PI*2);
        graphics.closePath();
        graphics.fill();

        graphics.strokeStyle = "red";
        graphics.lineWidth = 2;
        graphics.beginPath();
        graphics.moveTo((width/2)+((largerRadius-smallerRadius)*Math.cos(angle)), (height/2)+((largerRadius-smallerRadius)*Math.sin(angle)));
        graphics.lineTo(xCoord, yCoord);

        graphics.stroke();

        for (let i = 0; i < points.length-1; i++) {
            graphics.strokeStyle = "cyan";
            graphics.beginPath();
            graphics.moveTo(points[i].x, points[i].y);
            graphics.lineTo(points[i+1].x, points[i+1].y);
            graphics.stroke();
        }
    }
}

function update() {
    draw();

    requestAnimationFrame(update);
}

update();