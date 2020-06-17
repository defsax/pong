import * as utils from './utils.js';

export default function Ball(gameHandle, x, y, r, s){
  var speed = s;
  
  this.radius = r;
  this.position = { x: x, y: y };
  this.direction = { x: 1.0, y: -1.0 };
  
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
    
    if(this.position.x - this.radius < 0){
      this.direction.x = -this.direction.x;
      gameHandle.rScore++;
      this.position.x = gameHandle.gWIDTH / 2;
      this.position.y = gameHandle.gHEIGHT / 0.5;
    }
    if(this.position.x + this.radius > gameHandle.gWIDTH){
      this.direction.x = -this.direction.x;
      gameHandle.lScore++;
      this.position.x = gameHandle.gWIDTH / 2;
      this.position.y = gameHandle.gHEIGHT / 3;
    }
    if(this.position.y - this.radius < 0)
      this.direction.y = -this.direction.y;
    if(this.position.y + this.radius > gameHandle.gHEIGHT)
      this.direction.y = -this.direction.y;
    
//     //check collisions with paddles
//     if(utils.isCollision(this, gameHandle.paddleR)){
//       console.log("Right paddle collision.");
//       
//       if(this.position.y > gameHandle.paddleR.position.y + gameHandle.paddleR.height){
//         direction.y = -direction.y;
//         this.position.y = gameHandle.paddleR.position.y + gameHandle.paddleR.height + this.radius;
//       }
//       if(this.position.y < gameHandle.paddleR.position.y){
//         direction.y = -direction.y;
//         this.position.y = gameHandle.paddleR.position.y - this.radius;
//       }
//       else
//         direction.x = -direction.x;
//     }
//     if(utils.isCollision(this, gameHandle.paddleL)){
//       console.log("Left paddle collision.");
//       if(this.position.y > gameHandle.paddleL.position.y + gameHandle.paddleL.height){
//         direction.y = -direction.y;
//         this.position.y = gameHandle.paddleL.position.y + gameHandle.paddleL.height + this.radius;
//       }
//       if(this.position.y < gameHandle.paddleL.position.y){
//         direction.y = -direction.y;
//         this.position.y = gameHandle.paddleL.position.y - this.radius;
//       }
//       else
//         direction.x = -direction.x;
//     }
    
  }
}
