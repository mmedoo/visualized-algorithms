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



const offsetPrint = document.querySelectorAll(".inputValue");
const offsetInput = document.querySelector("input[name='offset'");
offsetInput.addEventListener("change",()=>{
  offset = offsetInput.value;
  offsetPrint[0].innerText = offset;
})
const offsetScalerInput = document.querySelector("input[name='offsetScaler'");
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

const bgn = document.querySelector(".bgn");
bgn.addEventListener("click",()=>{
  rst();
  array = [];
  angle = 0;
  done = false;
  if (pause.innerText === "resume") pause.click();
});

const pause = document.querySelector(".pause");
pause.addEventListener("click",()=>{
  if (pause.innerText === "resume") {
    loop();
    pause.innerText = "pause";
  } else {
    noLoop();
    pause.innerText = "resume";
  }
})
const looper = document.querySelector(".loop");
looper.addEventListener("click",()=>{
  if (looper.innerText === "not looping") {
    looper.innerText = "looping";
  } else {
    looper.innerText = "not looping";
  }
  again = !again;
})

const inputAngle = document.querySelector(".vAngle");
inputAngle.addEventListener("input",()=>{
  ratio = inputAngle.value;
})
const gRbtn = document.querySelector(".gR");
gRbtn.addEventListener("click",()=>{
  inputAngle.value = goldenRatio;
  ratio = goldenRatio;
})

const inputColor1 = document.querySelector(".vColor1");
inputColor1.addEventListener("change",()=>{
  initialColor = hexToRgb(inputColor1.value);
})
const inputColor2 = document.querySelector(".vColor2");
inputColor2.addEventListener("change",()=>{
  finalColor = hexToRgb(inputColor2.value);
})

const perlinConfInputs = document.querySelectorAll(".perlinConf > input");

const perlinConf = document.querySelector(".perlinConf");
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






const inputRinitial = document.querySelector(".rBegin");
inputRinitial.addEventListener("input",()=>{
  rInitial = inputRinitial.value * 1;
})
const inputRInc = document.querySelector(".rInc");
inputRInc.addEventListener("input",()=>{
  rIncrement = inputRInc.value * 1;
})
const inputRend = document.querySelector(".rFinal");
inputRend.addEventListener("input",()=>{
  rFinal = inputRend.value * 1;
})
const inputWinitial = document.querySelector(".wBegin");
inputWinitial.addEventListener("input",()=>{
  widthInitial = inputWinitial.value * 1;
})
const inputWinc = document.querySelector(".wInc");
inputWinc.addEventListener("input",()=>{
  widthIncrement = inputWinc.value * 1;
})
