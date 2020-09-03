import * as utils from './utils.js';

export default function Ball(gameHandle, x, y, r, s){
  var speed = s;
  
  this.resetBall = function(){
    this.position.x = gameHandle.gWIDTH / 2;
    this.position.y = gameHandle.gHEIGHT / 2;
    this.calculateStartAngle();
  }
  
  this.setSpeed = function(spd){
    speed = spd;
  }
  
  this.radius = r;
  this.position = { x: x, y: y };
  this.direction = { x: 1.0, y: 0.3 };
  this.trajectory = { x: 0.0, y: 0.0 };
  
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
    if(this.position.x + this.radius < 0){
      
      console.log("X: " + this.position.x);
      console.log("Y: " + this.position.y);
      
      gameHandle.rScore++;
      this.resetBall();
    }
    //if ball hits right side, increment left's score and reset pos
    else if(this.position.x - this.radius > gameHandle.gWIDTH){
      
      console.log("X: " + this.position.x);
      console.log("Y: " + this.position.y);
      
      gameHandle.lScore++;
      this.resetBall();
    }
    //top or bottom
    else if(this.position.y - this.radius < 0){
      this.direction.y = -this.direction.y;
      this.calculateTrajectory();
      //if ball is pushed out of bounds by the paddle
      if(this.position.y < 0){
        this.resetBall();
      }
    }
    else if(this.position.y + this.radius > gameHandle.gHEIGHT){
      this.direction.y = -this.direction.y;
      this.calculateTrajectory();
      //if ball is pushed out of bounds by the paddle
      if(this.position.y > gameHandle.gHEIGHT){
        this.resetBall();
      }
    }
  }
  
  this.calculateStartAngle = function(){
    var newBounceAngle = utils.getRndFloat(-1.2, 1.2);
    
    //loop until no angles too close to straight up or down
    while(newBounceAngle < 0.1 && newBounceAngle > -0.1){
      console.log(newBounceAngle);
      newBounceAngle = utils.getRndFloat(-1.2, 1.2);
    }
 
    this.direction.x = Math.sin(newBounceAngle);
    this.direction.y = -Math.cos(newBounceAngle);
    
    if(gameHandle.rScore % 2 == 1)
      this.direction.y = -this.direction.y;
    
    this.calculateTrajectory();
  }
  
  this.calculateTrajectory = function(){
    //get dest height of ball
    var atan = Math.atan(this.direction.y /this.direction.x);
    var tan = Math.tan(atan);
    
    if(Math.sign(this.direction.x) == -1){
      //moving left
      this.trajectory.y = tan * this.position.x;
    }
    else{
      //moving right
      this.trajectory.y = tan * (gameHandle.gWIDTH - this.position.x);
    }
    
    this.trajectory.y = Math.abs(this.trajectory.y);
    
    if(Math.sign(this.direction.y) == -1){
      //if moving up, subtract trajectory from ball y position
      this.trajectory.y = this.position.y - this.trajectory.y;
    }
    else{
      //if moving down, add trajectory
      this.trajectory.y = this.position.y + this.trajectory.y;
    }
  }
}
