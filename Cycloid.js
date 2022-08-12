const canvas = document.getElementById("canvas");
const graphics = canvas.getContext("2d");
const speedSlider = document.getElementById("speed");
const type1 = document.getElementById("type1");
const type2 = document.getElementById("type2");
const radiusSlider = document.getElementById("radius");

let paused = false;

const width = canvas.width;
const height = canvas.height;

let angle = 0;
let ballRadius = parseFloat(radiusSlider.value);
let ballX = ballRadius;

let points = [];

function draw() {
    if (!paused) {
        if (type1.checked) {
            let speed = parseFloat(speedSlider.value);

            angle += speed;

            points.push({x:(width/2)+(ballRadius*Math.cos(angle)), y:(height/2)+(ballRadius*Math.sin(angle))});

            graphics.clearRect(0, 0, width, height);

            graphics.strokeStyle = "white";
            graphics.beginPath();
            graphics.moveTo(0, height/2+ballRadius);
            graphics.lineTo(width, height/2+ballRadius);
            graphics.stroke();

            graphics.fillStyle = "green";
            graphics.beginPath();
            graphics.arc(width/2, height/2, ballRadius, 0, Math.PI*2);
            graphics.closePath();
            graphics.fill();

            graphics.strokeStyle = "red";
            graphics.lineWidth = 2;
            graphics.beginPath();
            graphics.moveTo(width/2, height/2);
            graphics.lineTo((width/2)+(ballRadius*Math.cos(angle)), (height/2)+(ballRadius*Math.sin(angle)));
            graphics.stroke();

            for (let i = 0; i < points.length-1; i++) {
                graphics.strokeStyle = "cyan";
                graphics.beginPath();
                graphics.moveTo(points[i].x, points[i].y);
                graphics.lineTo(points[i+1].x, points[i+1].y);
                graphics.stroke();

                points[i].x-=speed*ballRadius;

                if (points[i].x < -30) {
                    points.splice(i, 1);
                }
            }
        } else if (ballX < width+ballRadius) {
            let speed = parseFloat(speedSlider.value);

            angle += speed;
            ballX += speed*ballRadius;

            points.push({x:ballX+(ballRadius*Math.cos(angle)), y:(height/2)+(ballRadius*Math.sin(angle))});
            graphics.clearRect(0, 0, width, height);

            graphics.strokeStyle = "white";
            graphics.beginPath();
            graphics.moveTo(0, height/2+ballRadius);
            graphics.lineTo(width, height/2+ballRadius);
            graphics.stroke();

            graphics.fillStyle = "green";
            graphics.beginPath();
            graphics.arc(ballX, height/2, ballRadius, 0, Math.PI*2);
            graphics.closePath();
            graphics.fill();

            graphics.strokeStyle = "red";
            graphics.lineWidth = 2;
            graphics.beginPath();
            graphics.moveTo(ballX, height/2);
            graphics.lineTo(ballX+(ballRadius*Math.cos(angle)), (height/2)+(ballRadius*Math.sin(angle)));
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
}

function update() {
    draw();

    requestAnimationFrame(update);
}

update();