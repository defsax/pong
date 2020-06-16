import * as utils from './utils.js';
import Paddle from './paddle.js';
import Ball from './ball.js';

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

function ObjectManager(){
  var objects = [];
  this.gWIDTH = WIDTH;
  this.gHEIGHT = HEIGHT;
  this.rScore = 0;
  this.lScore = 0;
  
  this.ball = new Ball(this, WIDTH / 2, HEIGHT / 2, 5, 10);
  this.paddleR = new Paddle(this, WIDTH - 15, HEIGHT / 2, 10, 50, 0.75); 
  this.paddleL = new Paddle(this, 15, HEIGHT / 2, 10, 50, 0.75);

  objects.push(this.ball);
  objects.push(this.paddleR);
  objects.push(this.paddleL);
  
  this.update = function(dt){
    objects.forEach(object => object.update(dt));
  }
  this.draw = function(ctx){
    objects.forEach(object => object.draw(ctx));
    
    utils.drawText(this.lScore, this.gWIDTH / 2 - 10, 30, "black", "fill", "25px Arial", "right", ctx);
    utils.drawText(this.rScore, this.gWIDTH / 2 + 10, 30, "black", "fill", "25px Arial", "left", ctx);
  }  
}

var objManager = new ObjectManager();

//timing
var now;
var dt = 0;
var last = utils.timeStamp();

function gameLoop(){
  now = utils.timeStamp();
  dt = (now - last) / 1000;
  
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  
  drawLines();
  
  objManager.update(dt);
  objManager.draw(ctx);
  
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
//   if(ballX - ballR < lPaddleX + lPaddleW &&
//     ballY > lPaddleY &&
//     ballY < lPaddleY + lPaddleH){
//     ballDX = -ballDX;
//     ballX = lPaddleX + lPaddleW + ballR;
//   }
  
//   if(ballX + ballR > rPaddleX &&
//     ballY > rPaddleY &&
//     ballY < rPaddleY + rPaddleH){
//     ballDX = -ballDX;
//     ballX = rPaddleX - ballR;
//   }
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

