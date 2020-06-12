import * as utils from './utils.js';

var canvas = document.getElementById("pongCanvas");
var ctx = canvas.getContext("2d");

const WIDTH = 400;
const HEIGHT = 400;

var ballX = WIDTH / 2;
var ballY = 300;
var ballR = 5;
var ballDX = -1;
var ballDY = -1;
calculateStartAngle();

var rPaddleX = WIDTH - 15;
var rPaddleY = HEIGHT / 2;
var rPaddleW = 2;
var rPaddleH = 50;
var rPaddleDir = -1;
var rSpeed = 0.75;

var lPaddleX = 15;
var lPaddleY = HEIGHT / 2;
var lPaddleW = 2;
var lPaddleH = 50;
var lPaddleDir = -1;
var lSpeed = 0.75;

//scores
var leftScore = 0;
var rightScore = 0;

//timing
var now;
var dt = 0;
var last = utils.timeStamp();

function gameLoop(){
  now = utils.timeStamp();
  dt = (now - last) / 1000;
  
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  

  drawScores();
  drawBall();
  updateBall();
  drawLines();
  drawPaddle(rPaddleX, rPaddleY, rPaddleW, rPaddleH);
  drawPaddle(lPaddleX, lPaddleY, lPaddleW, lPaddleH);
  
  updatePaddleR(dt);
  updatePaddleL(dt);
  isCollision();
  
  requestAnimationFrame(gameLoop);
};
requestAnimationFrame(gameLoop);

function calculateStartAngle(){
  var newBounceAngle = utils.getRndFloat(-1, 1) * (5 * Math.PI / 10);
  ballDX = Math.sin(newBounceAngle);
  ballDY = -Math.cos(newBounceAngle);
  //this.direction.x = -this.direction.x;
}

function isCollision(){
  if(ballX - ballR < lPaddleX + lPaddleW &&
    ballY > lPaddleY &&
    ballY < lPaddleY + lPaddleH){
    ballDX = -ballDX;
    ballX = lPaddleX + lPaddleW + ballR;
  }
  
  if(ballX + ballR > rPaddleX &&
    ballY > rPaddleY &&
    ballY < rPaddleY + rPaddleH){
    ballDX = -ballDX;
    ballX = rPaddleX - ballR;
  }
}

function drawScores(){
  utils.drawText(leftScore, WIDTH / 2 - 10, 30, "black", "fill", "25px Arial", "right", ctx);
  utils.drawText(rightScore, WIDTH / 2 + 10, 30, "black", "fill", "25px Arial", "left", ctx);
}
function drawLines(){
  ctx.setLineDash([10, 5]);
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.moveTo(WIDTH / 2, 0);
  ctx.lineTo(WIDTH / 2, HEIGHT);
  ctx.stroke();
  ctx.closePath();
}

function drawPaddle(x, y, w, h){
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function updatePaddleR(deltaT){
  if(ballY >= (rPaddleY + rPaddleH / 2)){
    rPaddleDir = 1;
  }
  else if(ballY <= (rPaddleY + rPaddleH / 2)){
    rPaddleDir = -1;
  }
  
  if(ballX > (WIDTH / 2))
    rPaddleY += rPaddleDir * rSpeed;
  
  console.log(rPaddleY);
}

function updatePaddleL(deltaT){
  console.log("Ballx = " + ballX);
  if(ballY >= (lPaddleY + lPaddleH / 2)){
    lPaddleDir = 1;
  }
  else if(ballY <= (lPaddleY + lPaddleH / 2)){
    lPaddleDir = -1;
  }
  
  if(ballX < (WIDTH / 2))
    lPaddleY += lPaddleDir * lSpeed;
  
  console.log(lPaddleY);
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(ballX, ballY, 5, 0, Math.PI*2, false);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.closePath();
}

function updateBall(){
  ballX += ballDX;
  ballY += ballDY;
  
  if(ballX - ballR < 0){
    ballDX = -ballDX;
    rightScore++;
  }
  if(ballX + ballR > WIDTH){
    ballDX = -ballDX;
    leftScore++;
  }
  if(ballY - ballR < 0)
    ballDY = -ballDY;
  if(ballY + ballR > HEIGHT)
    ballDY = -ballDY;
  
}
