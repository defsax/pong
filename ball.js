import * as utils from './utils.js';

export default function Ball(gameHandle, x, y, r, s){
  var speed = s;
  
  this.resetBall = function(){
    this.position.x = gameHandle.gWIDTH / 2;
    this.position.y = gameHandle.gHEIGHT / 2;
    this.calculateStartAngle();
  }
  
  this.radius = r;
  this.position = { x: x, y: y };
  this.direction = { x: 1.0, y: 0.3 };
  
  this.draw = function(ctx){
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.closePath();
  }
  
  this.update = function(dt){
    this.position.x += this.direction.x * speed;
    this.position.y += this.direction.y * speed;
    
    //if ball hits left side, increment right's score and reset pos
    if(this.position.x - this.radius < 0){
      gameHandle.rScore++;
      this.resetBall();
    }
    //if ball hits right side, increment left's score and reset pos
    else if(this.position.x + this.radius > gameHandle.gWIDTH){
      gameHandle.lScore++;
      this.resetBall();
    }
    //top or bottom
    else if(this.position.y - this.radius < 0){
      this.direction.y = -this.direction.y;
      
      //if ball is pushed out of bounds by the paddle
      if(this.position.y < 0){
        this.resetBall();
      }
    }
    else if(this.position.y + this.radius > gameHandle.gHEIGHT){
      this.direction.y = -this.direction.y;
      
      //if ball is pushed out of bounds by the paddle
      if(this.position.y > gameHandle.gHEIGHT){
        this.resetBall();
      }
    }
  }
  
  this.calculateStartAngle = function(){
    var newBounceAngle = utils.getRndFloat(-1.2, 1.2);
    while(newBounceAngle < 0.1 && newBounceAngle > -0.1){
      console.log(newBounceAngle);
      newBounceAngle = utils.getRndFloat(-1.2, 1.2);
    }
    //let normalizedNum = utils.getRndFloat(-1, 1);
      
    //newBounceAngle = 1.2;
    //var newBounceAngle = utils.getRndFloat(-1, 1) * (5 * Math.PI / 12);
    console.log("New bounce angle: " + newBounceAngle);
    this.direction.x = Math.sin(newBounceAngle);
    this.direction.y = -Math.cos(newBounceAngle);
    
    if(gameHandle.rScore % 2 == 1)
      this.direction.y = -this.direction.y;
  }
}
