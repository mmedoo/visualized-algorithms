var wid,hei;
if (innerWidth < innerHeight) {
  wid = innerWidth;
} else {
  wid = innerWidth/2 - 10;
}
hei = wid;
function setup(){
  createCanvas(wid,hei);
  background(0);
  rectMode(CENTER);
  angleMode(DEGREES);
}
var angle = 0;
var tempWidth = widthInitial;
var tempRadius = rInitial;
var tempRed = initialColor.r;
var tempGreen = initialColor.g;
var tempBlue = initialColor.b;
function begin(){
  angle = 0;
  tempRed = initialColor.r;
  tempGreen = initialColor.g;
  tempBlue = initialColor.b;
  tempWidth = widthInitial;
  tempRadius = rInitial;
}
function rst(){
  clear();
  background(0);
  begin();
}
function draw(){
  angle += ratio * 360;
  let x = cos(angle) * tempRadius;
  let y = sin(angle) * tempRadius;

  translate(x + wid/2 , hei/2 - y);
  rotate(45-angle);
  fill(tempRed,tempGreen,tempBlue);
  rect(0,0,tempWidth,tempWidth);

  // deviation
  tempRed += rIncrement*(finalColor.r - initialColor.r)/(rFinal-rInitial);
  tempGreen += rIncrement*(finalColor.g - initialColor.g)/(rFinal-rInitial);
  tempBlue += rIncrement*(finalColor.b - initialColor.b)/(rFinal-rInitial);
  // directed deviation
  // tempRed = map(noise(tempRadius/200),0,1,initialColor.r,finalColor.r)
  // tempGreen = map(noise(tempRadius*2/200),0,1,initialColor.g,finalColor.g)
  // tempBlue = map(noise(tempRadius*3/200),0,1,initialColor.b,finalColor.b)
  // perlin noise deviation
  // let newX = map(x,-rFinal,rFinal,0,rFinal);
  // let newY = map(y,-rFinal,rFinal,0,rFinal);
  // tempRed = map(noise(newX/100,newY/100),0,1,0,255);
  // tempGreen = map(noise((newX/100)+50,newY/100),0,1,0,255);
  // tempBlue = map(noise((newX/100)+100,newY/100),0,1,0,255);


  tempWidth += widthIncrement;
  tempRadius += rIncrement;

  if (rInitial <= rFinal) {
    if (Math.abs(tempRadius) >= rFinal){
      if (again) rst();
      else pause.click();
    }
  } else if (tempRadius < rFinal){
    if (again) rst();
    else pause.click();
  }
}
