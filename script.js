import * as utils from './utils.js';
import Paddle from './paddle.js';
import Ball from './ball.js';
import InputHandler from './input.js';

const WIDTH = 400;
const HEIGHT = 400;

var speedslider = document.getElementById("speedslider");
var speeddisplay = document.getElementById("ballspeed");
var leftslider = document.getElementById("leftslider");
var leftdisplay = document.getElementById("leftspeed");
var rightslider = document.getElementById("rightslider");
var rightdisplay = document.getElementById("rightspeed");
var canvas = document.getElementById("pongCanvas");
var ctx = canvas.getContext("2d");

speeddisplay.innerHTML = speedslider.value;
leftdisplay.innerHTML = leftslider.value;
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

function ObjectManager(){
  var objects = [];
  this.gWIDTH = WIDTH;
  this.gHEIGHT = HEIGHT;
  this.rScore = 0;
  this.lScore = 0;
  
  this.ball = new Ball(this, WIDTH / 2, HEIGHT / 2, 5, speedslider.value);
  this.ball.calculateStartAngle();
  this.paddleR = new Paddle(this, WIDTH - 25, HEIGHT / 2, 10, 50, rightslider.value); 
  this.paddleL = new Paddle(this, 15, HEIGHT / 2, 10, 50, leftslider.value);

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
var inputHandler = new InputHandler(objManager);
inputHandler.initialize();

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

