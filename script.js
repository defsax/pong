import * as utils from './utils.js';
import Paddle from './paddle.js';
import Ball from './ball.js';

var speedslider = document.getElementById("speedslider");
var speeddisplay = document.getElementById("ballspeed");
speeddisplay.innerHTML = speedslider.value;

var leftslider = document.getElementById("leftslider");
var leftdisplay = document.getElementById("leftspeed");
leftdisplay.innerHTML = leftslider.value;

var rightslider = document.getElementById("rightslider");
var rightdisplay = document.getElementById("rightspeed");
rightdisplay.innerHTML = rightslider.value;

leftslider.oninput = function(){
  leftdisplay.innerHTML = this.value;
  objManager.paddleL.setSpeed(this.value);
}
rightslider.oninput = function(){
  rightdisplay.innerHTML = this.value;
  objManager.paddleR.setSpeed(this.value);
}
speedslider.oninput = function(){
  speeddisplay.innerHTML = this.value;
  objManager.ball.setSpeed(this.value);
}

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
  
  this.ball = new Ball(this, WIDTH / 2, HEIGHT / 2, 5, speedslider.value);
  this.ball.calculateStartAngle();
  this.paddleR = new Paddle(this, WIDTH - 25, HEIGHT / 2, 10, 50, 1); 
  this.paddleL = new Paddle(this, 15, HEIGHT / 2, 10, 50, 1);

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
  
  requestAnimationFrame(gameLoop);
};
requestAnimationFrame(gameLoop);

function calculateStartAngle(){
  var newBounceAngle = utils.getRndFloat(-1, 1) * (5 * Math.PI / 10);
  ballDX = Math.sin(newBounceAngle);
  ballDY = -Math.cos(newBounceAngle);
  //this.direction.x = -this.direction.x;
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

