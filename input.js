//import * as utils from './utilities.js';

export default function InputHandler(gameHandle){
  
  this.initialize = function(){
    //input event listeners
    
    //KEY LISTENERS
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
  
    console.log("Listeners enabled.");
  }
  
  //INPUT CONTROLS
  
  //KEYBOARD CONTROLS
  var keyDownHandler = function(e){
    if(e.key == "Up" || e.key == "ArrowUp"){
      gameHandle.paddleR.userDir = -1;
      console.log("up");
    }
    else if(e.key == "Down" || e.key == "ArrowDown"){
      gameHandle.paddleR.userDir = 1;
      console.log("down");
    }
    else if(e.keyCode == 27)
      console.log("Escape key pressed.");
  }
  var keyUpHandler = function(e){
    if(e.key == "Up" || e.key == "ArrowUp"){
      gameHandle.paddleR.userDir = 0;
      console.log("up release");
    }
    else if(e.key == "Down" || e.key == "ArrowDown"){
      gameHandle.paddleR.userDir = 0;
      console.log("down release");
    }
  }
}
