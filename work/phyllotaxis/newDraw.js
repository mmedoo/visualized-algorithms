const cnvsCont = document.querySelector(".cnvsCont");
const bigCont = document.querySelector(".bigCont");
var tempWidth = widthInitial;
var tempRadius = rInitial;
var tempRed , tempGreen , tempBlue;
var hei,wid;



if (innerWidth < 1000){
    hei = wid = innerWidth - 17;
    bigCont.style.flexDirection = "column";
}
else {
    wid = innerWidth/2;
    hei = innerHeight - 7;
}

function setup(){
    let cnvs = createCanvas(wid,hei);
    cnvs.parent(cnvsCont);
    background(0);
    angleMode(DEGREES);
    rectMode(CENTER);
}




var addX = Number(Math.random());
function perlinNoisey(){
    if (!done) {
        angle += ratio * 360;
        let x = cos(angle) * tempRadius;
        let y = sin(angle) * tempRadius;
        array.push([x,y,angle]);
    }
    rst();
    for (var i = 0; i < array.length; i++) {
        let x = array[i][0];
        let y = array[i][1];
        let localAngle = array[i][2];
        let r = noise((-tempRadius+addX)/offsetScaler) * 255;
        let b = noise((-tempRadius+addX+500)/offsetScaler) * 255;
        let g = noise((-tempRadius+addX+1000)/offsetScaler) * 255;
        translate(x + wid/2 , hei/2 - y);
        rotate(45-localAngle);
        fill(r,g,b);
        stroke(r-40,g-40,b-40);
        rect(0,0,tempWidth,tempWidth);
        rotate(localAngle-45);
        translate(-(x + wid/2) ,y - hei/2);
        tempWidth += widthIncrement;
        tempRadius += rIncrement;
        if (Math.abs(tempRadius) >= rFinal) break;
    }
    addX += Number(offset);
    
    if (Math.abs(tempRadius) >= rFinal){
        if (again) {
            array = [];
            rst();
        }
        else done = true;
    }
}

function nonPerlinNoisey(){
  angle += ratio * 360;
  let x = cos(angle) * tempRadius;
  let y = sin(angle) * tempRadius;
  
  
  // deviation
  tempRed = map(tempRadius , rInitial , rFinal , initialColor.r , finalColor.r);
  tempGreen = map(tempRadius , rInitial , rFinal , initialColor.g , finalColor.g);
  tempBlue = map(tempRadius , rInitial , rFinal , initialColor.b , finalColor.b);
  // 2D perlin noise deviation
  // let newX = map(x,-rFinal,rFinal,0,rFinal);
  // let newY = map(y,-rFinal,rFinal,0,rFinal);
  // tempRed = map(noise(newX/100,newY/100),0,1,0,255);
  // tempGreen = map(noise((newX/100)+50,newY/100),0,1,0,255);
  // tempBlue = map(noise((newX/100)+100,newY/100),0,1,0,255);
  
  stroke(tempRed-100,tempGreen-100,tempBlue-100);
  translate(x + wid/2 , hei/2 - y);
  rotate(45-angle);
  fill(tempRed,tempGreen,tempBlue);
  rect(0,0,tempWidth,tempWidth);

  tempWidth += widthIncrement;
  tempRadius += rIncrement;

  if (Math.abs(tempRadius) >= rFinal){
    if (again) rst();
    else pause.click();
  } 
}


function draw(){
    if (isPerlinNoise) perlinNoisey();
    else nonPerlinNoisey();
}