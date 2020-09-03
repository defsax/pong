import * as utils from './utils.js';

export default function Paddle(gameHandle, x, y, w, h, s){
  var dir = -1;
  var speed = s;
  //var setSpeed = s;
  
  this.width = w;
  this.height = h;
  this.position = { x: x, y: y };
  
  this.setSpeed = function(spd){
    speed = spd;
  }
  
  this.calculateNewAngle = function(){
    let paddleCentre = this.position.y + (this.height / 2);
    let distanceFromCentre = paddleCentre - gameHandle.ball.position.x;
    
    let normalizeIntersect = distanceFromCentre / (this.height / 2);
    let newBounceAngle = normalizeIntersect * (5 * Math.PI / 12);
    
    gameHandle.ball.direction.x = -Math.sin(newBounceAngle);
    gameHandle.ball.direction.y = -Math.cos(newBounceAngle);
  }
  
  this.draw = function(ctx){
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }
  
  this.update = function(dt){    
    if(gameHandle.ball.position.x > (gameHandle.gWIDTH / 8) && gameHandle.ball.position.x < (gameHandle.gWIDTH - gameHandle.gWIDTH / 8)){
      //if ball trajectory position is higher on the y axis, move paddle in that direction
      if(gameHandle.ball.trajectory.y >= (this.position.y + this.height / 2)){
        dir = 1;
      } //else move in neg direction (up)
      else if(gameHandle.ball.trajectory.y <= (this.position.y + this.height / 2)){
        dir = -1;
      }
    }
    else{
      if(gameHandle.ball.position.y >= (this.position.y + this.height / 2)){
        dir = 1;
      } //else move in neg direction (up)
      else if(gameHandle.ball.position.y <= (this.position.y + this.height / 2)){
        dir = -1;
      }
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
      if(gameHandle.ball.position.y > this.position.y + this.height && 
        gameHandle.ball.position.y - gameHandle.ball.radius < this.position.y + this.height &&
        gameHandle.ball.position.x < this.position.x + this.width &&
        gameHandle.ball.position.x > this.position.x &&
        Math.sign(gameHandle.ball.direction.y) == -1
      ){
        console.log("Paddle collision bottom.");
        //if(Math.sign(gameHandle.ball.direction.y) == 1)
          gameHandle.ball.direction.y = -gameHandle.ball.direction.y;
        //gameHandle.ball.position.y = this.position.y + this.height + gameHandle.ball.radius + 5;
      }
      else if(gameHandle.ball.position.y < this.position.y &&
        gameHandle.ball.position.y + gameHandle.ball.radius > this.position.y && 
        gameHandle.ball.position.x < this.position.x + this.width &&
        gameHandle.ball.position.x > this.position.x &&
        Math.sign(gameHandle.ball.direction.y) == 1
      ){
        console.log("Paddle collision top.");
        //if(Math.sign(gameHandle.ball.direction.y) == -1)
          gameHandle.ball.direction.y = -gameHandle.ball.direction.y;
        //gameHandle.ball.position.y = this.position.y - gameHandle.ball.radius - 5;
      }
      else if(gameHandle.ball.position.x - gameHandle.ball.radius < this.position.x + this.width 
        && gameHandle.ball.position.x < gameHandle.gWIDTH / 2
      ){
        console.log("Right collision");
        if(Math.sign(gameHandle.ball.direction.x) == -1){
          gameHandle.ball.direction.x = -gameHandle.ball.direction.x;
          //gameHandle.ball.position.x = this.position.x + this.width + gameHandle.ball.radius + 1;
        }
      }
      else if(gameHandle.ball.position.x + gameHandle.ball.radius > this.position.x && gameHandle.ball.position.y > this.position.y && gameHandle.ball.position.y < this.position.y + this.height && gameHandle.ball.position.x > gameHandle.gWIDTH / 2){
        console.log("Left collision.");
        if(Math.sign(gameHandle.ball.direction.x) == 1){
          gameHandle.ball.direction.x = -gameHandle.ball.direction.x;
          //gameHandle.ball.position.x = this.position.x - gameHandle.ball.radius - 1;
        }
      }
//       else{
//         console.log("Paddle collision left or right.");
//         //this.calculateNewAngle();
//         gameHandle.ball.direction.x = -gameHandle.ball.direction.x;
//         if(gameHandle.ball.position.x < gameHandle.gWIDTH / 2)
//           gameHandle.ball.position.x = this.position.x + this.width + gameHandle.ball.radius;
//         else
//           gameHandle.ball.position.x = this.position.x - gameHandle.ball.radius;
//       }
      gameHandle.ball.calculateTrajectory();
    }
  }
}
