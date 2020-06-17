import * as utils from './utils.js';

export default function Paddle(gameHandle, x, y, w, h, s){
  var dir = -1;
  var speed = s;
  
  this.width = w;
  this.height = h;
  this.position = { x: x, y: y };
  
  
  this.calculateNewAngle = function(){
    let paddleCentre = this.position.y + (this.height / 2);
    let distanceFromCentre = paddleCentre - gameHandle.ball.position.x;
    
    let normalizeIntersect = distanceFromCentre / (this.height / 2);
    let newBounceAngle = normalizeIntersect * (5 * Math.PI / 12);
    
    gameHandle.ball.direction.x = -Math.sin(newBounceAngle);
    gameHandle.ball.direction.y = -Math.cos(newBounceAngle);
    //gameHandle.ball.direction.x = -gameHandle.ball.direction.x;
  }
  
  
  

  
  this.draw = function(ctx){
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }
  
  this.update = function(dt){
    //if ball is higher on the y axis, move paddle in pos direction
    if(gameHandle.ball.position.y >= (this.position.y + this.height / 2)){
      dir = 1;
    } //else move in neg direction (up)
    else if(gameHandle.ball.position.y <= (this.position.y + this.height / 2)){
      dir = -1;
    }
    
    //modify actual y position by direction times speed
    if(this.position.x > gameHandle.gWIDTH / 2){
      //paddle is on the right
      if(gameHandle.ball.position.x > (gameHandle.gWIDTH / 3))
        this.position.y += dir * speed;
    }
    else{
      //paddle is on the left
      if(gameHandle.ball.position.x < (gameHandle.gWIDTH - gameHandle.gWIDTH / 3))
        this.position.y += dir * speed;
    }
    //prevent from going off the screen
    if(this.position.y < 0)
      this.position.y = 0;
    else if(this.position.y + this.height > gameHandle.gHEIGHT)
      this.position.y = gameHandle.gHEIGHT - this.height;
    
    
    //check collisions with ball
    if(utils.isCollision(gameHandle.ball, this)){      
      if(gameHandle.ball.position.y > this.position.y + this.height){
        console.log("Paddle collision bottom.");
        gameHandle.ball.direction.y = -gameHandle.ball.direction.y;
        gameHandle.ball.position.y = this.position.y + this.height + gameHandle.ball.radius;
      }
      if(gameHandle.ball.position.y < this.position.y){
        console.log("Paddle collision top.");
        gameHandle.ball.direction.y = -gameHandle.ball.direction.y;
        gameHandle.ball.position.y = this.position.y - gameHandle.ball.radius;
      }
      else{
        console.log("Paddle collision left or right.");
        //this.calculateNewAngle();
        gameHandle.ball.direction.x = -gameHandle.ball.direction.x;
      }
    }
  }
}
