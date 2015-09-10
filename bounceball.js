var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 12;
var x = canvas.width/2;
var y = canvas.height-50;
var x1 = canvas.width/12;
var y1 = canvas.height-10;
var x2 = canvas.width/19;
var y2 = canvas.height-87;
var dx = 2;
var dy = -2;
var dx1 = 2;
var dy1 = -2;
var dx2 = 2;
var dy2 = -2;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;
var color = "#7171C6";
var color1 = "#4EEE94";
var color2 = "#71C671";
var status1 = 0;
var status2 =0;
var status3 = 0;


function beginDrawCircle(a,b,color,status){
 	
    ctx.beginPath();
    ctx.arc(a, b, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(status1==0)
    beginDrawCircle(x,y,color,status1);
    if(status2==0)
    beginDrawCircle(x1,y1,color1,status2);
    if(status3==0)
    beginDrawCircle(x2,y2,color2,status3);
 }

canvas.addEventListener('mousedown', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    var mouseX = mousePos.p;
    var mouseY = mousePos.q;
   
    // if the mouse is inside the circle
      if (mouseIsInsideCircle(mouseX, mouseY, x, y, ballRadius)) {
        status1 = 1;
          score++;
      }
    else if (mouseIsInsideCircle(mouseX, mouseY, x1, y1, ballRadius)) {
        status2 = 1;
          score++;
      }
   else if (mouseIsInsideCircle(mouseX, mouseY, x2, y2, ballRadius)) {
        status3 = 1;
          score++;
      }else{
       lives--;  
      }   
    if(lives==0){
      status1=1;
       status2=1;
       status3=1;
     alert("You Lose.....");   
    }
    
    if(score == 3){alert("You WIN...!!!!");}
     drawBall();
}, false);

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        p: evt.clientX - rect.left,
        q: evt.clientY - rect.top
    };
}

// hit-test the circle
// this method does not use "expensive" Math.sqrt
function mouseIsInsideCircle(mouseX, mouseY, v, b, radius) {
    var dxp = mouseX - v;
    var dyp = mouseY - b;
    return (dxp * dxp + dyp * dyp <= radius * radius);
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
   	drawScore();
    drawLives();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius || y + dy > canvas.height-ballRadius) {
        dy = -dy;
    }
   	if(x1 + dx1 > canvas.width-ballRadius || x1 + dx1 < ballRadius) {
        dx1 = -dx1;
    }
    if(y1 + dy1 < ballRadius || y1 + dy1 > canvas.height-ballRadius) {
        dy1 = -dy1;
    }
        if(x2 + dx2 > canvas.width-ballRadius || x2 + dx2 < ballRadius) {
        dx2 = -dx2;
    }
    if(y2 + dy2 < ballRadius || y2 + dy2 > canvas.height-ballRadius) {
        dy2 = -dy2;
    }
   
    x += dx;
    y += dy;
    x1 += dx1;
    y1 += dy1;
    x2 += dx2;
    y2 += dy2;
    requestAnimationFrame(draw);
}
draw(); 