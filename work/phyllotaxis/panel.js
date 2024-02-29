const inputWinc = document.querySelector(".wInc");
const inputWinitial = document.querySelector(".wBegin");
const inputRend = document.querySelector(".rFinal");
const inputRInc = document.querySelector(".rInc");
const inputRinitial = document.querySelector(".rBegin");
const perlinConf = document.querySelector(".perlinConf");
const perlinConfInputs = document.querySelectorAll(".perlinConf > input");
const inputColor2 = document.querySelector(".vColor2");
const inputColor1 = document.querySelector(".vColor1");
const gRbtn = document.querySelector(".gR");
const inputAngle = document.querySelector(".vAngle");
const looper = document.querySelector(".loop");
const pause = document.querySelector(".pause");
const bgn = document.querySelector(".bgn");
const offsetInput = document.querySelector("input[name='offset'");
const offsetScalerInput = document.querySelector("input[name='offsetScaler'");
const offsetPrint = document.querySelectorAll(".inputValue");
const goldenRatio = (1 + Math.sqrt(5))/2 - 1;


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














offset = offsetInput.value;
offsetInput.addEventListener("change",()=>{
  offset = offsetInput.value;
  offsetPrint[0].innerText = offset;
})
offsetScaler = offsetScalerInput.value;
offsetScalerInput.addEventListener("change",()=>{
  offsetScaler = offsetScalerInput.value;
  offsetPrint[1].innerText = offsetScaler;
})


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

bgn.addEventListener("click",()=>{
  rst();
  array = [];
  angle = 0;
  done = false;
  if (pause.innerText === "resume") pause.click();
});

pause.addEventListener("click",()=>{
  if (pause.innerText === "resume") {
    loop();
    pause.innerText = "pause";
  } else {
    noLoop();
    pause.innerText = "resume";
  }
})
looper.addEventListener("click",()=>{
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
inputAngle.addEventListener("input",()=>{
  ratio = inputAngle.value;
  angle = 0;
})
gRbtn.addEventListener("click",()=>{
  inputAngle.value = goldenRatio;
  ratio = goldenRatio;
  angle = 0;
})

initialColor = hexToRgb(inputColor1.value);
inputColor1.addEventListener("change",()=>{
  initialColor = hexToRgb(inputColor1.value);
})
finalColor = hexToRgb(inputColor2.value);
inputColor2.addEventListener("change",()=>{
  finalColor = hexToRgb(inputColor2.value);
})


const colorLabel = document.querySelector(".color");
const perlinCheck = document.querySelector("input[name='perlin']");
perlinCheck.addEventListener("change",()=>{
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
inputRinitial.addEventListener("input",()=>{
  rInitial = inputRinitial.value * 1;
})
inputRInc.value = rIncrement;
inputRInc.addEventListener("input",()=>{
  rIncrement = inputRInc.value * 1;
})
inputRend.value = rFinal;
inputRend.addEventListener("input",()=>{
  rFinal = inputRend.value * 1;
})
inputWinitial.value = widthInitial;
inputWinitial.addEventListener("input",()=>{
  widthInitial = inputWinitial.value * 1;
})
inputWinc.value = widthIncrement;
inputWinc.addEventListener("input",()=>{
  widthIncrement = inputWinc.value * 1;
})
