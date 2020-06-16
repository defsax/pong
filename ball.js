import * as utils from './utils.js';

export default function Ball(gameHandle, x, y, r, s){
  var direction = { x: 0.1, y: -0.1 };
  var speed = s;
  
  this.radius = r;
  this.position = { x: x, y: y };
  
  this.draw = function(ctx){
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.closePath();
  }
  
  this.update = function(dt){
    this.position.x += direction.x * speed;
    this.position.y += direction.y * speed;
    
    if(this.position.x - this.radius < 0){
      direction.x = -direction.x;
      gameHandle.rScore++;
    }
    if(this.position.x + this.radius > gameHandle.gWIDTH){
      direction.x = -direction.x;
      gameHandle.lScore++;
    }
    if(this.position.y - this.radius < 0)
      direction.y = -direction.y;
    if(this.position.y + this.radius > gameHandle.gHEIGHT)
      direction.y = -direction.y;
    
    //check collisions with paddles
    if(utils.isCollision(this, gameHandle.paddleR)){
      console.log("Right paddle collision.");
      
      if(this.position.y > gameHandle.paddleR.position.y + gameHandle.paddleR.height){
        direction.y = -direction.y;
        this.position.y = gameHandle.paddleR.position.y + gameHandle.paddleR.height + this.radius;
      }
      if(this.position.y < gameHandle.paddleR.position.y){
        direction.y = -direction.y;
        this.position.y = gameHandle.paddleR.position.y - this.radius;
      }
      else
        direction.x = -direction.x;
    }
    if(utils.isCollision(this, gameHandle.paddleL)){
      console.log("Left paddle collision.");
      if(this.position.y > gameHandle.paddleL.position.y + gameHandle.paddleL.height){
        direction.y = -direction.y;
        this.position.y = gameHandle.paddleL.position.y + gameHandle.paddleL.height + this.radius;
      }
      if(this.position.y < gameHandle.paddleL.position.y){
        direction.y = -direction.y;
        this.position.y = gameHandle.paddleL.position.y - this.radius;
      }
      else
        direction.x = -direction.x;
    }
    
  }
}
