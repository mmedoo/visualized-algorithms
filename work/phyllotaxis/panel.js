const d = document
,qs = (e) => d.querySelector(e)
,qsAll = (e) => d.querySelectorAll(e);


const inputWinc = qs(".wInc"),
inputWinitial = qs(".wBegin"),
inputRend = qs(".rFinal"),
inputRInc = qs(".rInc"),
inputRinitial = qs(".rBegin"),
perlinConf = qs(".perlinConf"),
perlinConfInputs = qsAll(".perlinConf > input"),
inputColor2 = qs(".vColor2"),
inputColor1 = qs(".vColor1"),
gRbtn = qs(".gR"),
inputAngle = qs(".vAngle"),
looper = qs(".loop"),
pause = qs(".pause"),
bgn = qs(".bgn"),
offsetInput = qs("input[name='offset'"),
offsetScalerInput = qs("input[name='offsetScaler'"),
offsetPrint = qsAll(".inputValue"),
ael = "addEventListener",
goldenRatio = (1 + Math.sqrt(5))/2 - 1;


var ratio = 0.125;
var rInitial = 0;
var rIncrement = 0.5;
var rFinal = 200;
var widthInitial = 10;
var widthIncrement = 0.05;
var widthFinal = 0;
var again = false;
var initialColor = {r:255,g:255,b:255};
var finalColor = {r:255,g:255,b:255};
var isPerlinNoise = false;
var offset = 4;
var offsetScaler = 80;
var angle = 0;
var done = false;
var array = [];




function begin(){
  tempRed = initialColor.r;
  tempGreen = initialColor.g;
  tempBlue = initialColor.b;
  tempWidth = widthInitial;
  tempRadius = rInitial;
  offset = perlinConfInputs[0].value;
  offsetScaler = perlinConfInputs[1].value;
}
function rst(){
  clear();
  background(0);
  begin();
}







offset = offsetInput.value;
offsetInput[ael]("input",()=>{
  offset = offsetInput.value;
  offsetPrint[0].innerText = offset;
})
offsetScaler = offsetScalerInput.value;
offsetScalerInput[ael]("input",()=>{
  offsetScaler = offsetScalerInput.value;
  offsetPrint[1].innerText = offsetScaler;
})


function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

bgn[ael]("click",()=>{
  rst();
  array = [];
  angle = 0;
  done = false;
  if (pause.innerText === "resume") pause.click();
});

pause[ael]("click",()=>{
  if (pause.innerText === "resume") {
    loop();
    pause.innerText = "pause";
  } else {
    noLoop();
    pause.innerText = "resume";
  }
})
looper[ael]("click",()=>{
  if (looper.innerText === "not looping") {
    looper.innerText = "looping";
  } else {
    looper.innerText = "not looping";
  }
  again = !again;
  if (pause.innerText === "resume" || (isPerlinNoise && done)) {
    bgn.click();
  }
})

inputAngle.value = ratio;
inputAngle[ael]("input",()=>{
  ratio = inputAngle.value;
  angle = 0;
})
gRbtn[ael]("click",()=>{
  inputAngle.value = goldenRatio;
  ratio = goldenRatio;
  angle = 0;
})

initialColor = hexToRgb(inputColor1.value);
inputColor1[ael]("change",()=>{
  initialColor = hexToRgb(inputColor1.value);
})
finalColor = hexToRgb(inputColor2.value);
inputColor2[ael]("change",()=>{
  finalColor = hexToRgb(inputColor2.value);
})


const colorLabel = qs(".color");
const perlinCheck = qs("input[name='perlin']");
perlinCheck[ael]("change",()=>{
  rst();
  array = [];
  angle = 0;
  done = false;
  inputColor1.disabled = !inputColor1.disabled;
  inputColor2.disabled = !inputColor2.disabled;
  for (let i of perlinConfInputs) i.disabled = !i.disabled;
  isPerlinNoise = !isPerlinNoise;
  if (isPerlinNoise) {
    colorLabel.classList.add("disabledColor");
    perlinConf.classList.remove("disabledColor");
  } else {
    colorLabel.classList.remove("disabledColor");
    perlinConf.classList.add("disabledColor");
  }
  if (pause.innerText === "resume") pause.click();
})






inputRinitial.value = rInitial;
inputRinitial[ael]("input",()=>{
  rInitial = inputRinitial.value * 1;
})
inputRInc.value = rIncrement;
inputRInc[ael]("input",()=>{
  rIncrement = inputRInc.value * 1;
})
inputRend.value = rFinal;
inputRend[ael]("input",()=>{
  rFinal = inputRend.value * 1;
})
inputWinitial.value = widthInitial;
inputWinitial[ael]("input",()=>{
  widthInitial = inputWinitial.value * 1;
})
inputWinc.value = widthIncrement;
inputWinc[ael]("input",()=>{
  widthIncrement = inputWinc.value * 1;
})
