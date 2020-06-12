export function timeStamp(){
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

export function drawText(text, w, h, color, type, font, align, context){
  context.font = font;
  context.textAlign = align;
  switch(type){
    case "stroke":
      context.strokeStyle = color;
      context.strokeText(text, w, h);
      break;
    case "fill":
      context.fillStyle = color;
      context.fillText(text, w, h);
      break;
    default:
      console.log("Unknown type.");
      break;
  }
}

