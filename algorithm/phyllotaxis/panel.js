const d = document
	, qs = (e) => d.querySelector(e)
	, qsAll = (e) => d.querySelectorAll(e);


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
	go = qs(".go"),
	download = qs(".download"),
	offsetInput = qs("input[name='offset'"),
	offsetScalerInput = qs("input[name='offsetScaler'"),
	offsetPrint = qsAll(".inputValue"),
	ael = "addEventListener",
	goldenRatio = (1 + Math.sqrt(5)) / 2 - 1;


let ratio = 0.125;
let rInitial = 0;
let rIncrement = 0.5;
let rFinal = 200;
let widthInitial = 10;
let widthIncrement = 0.05;
let widthFinal = 0;
let again = false;
let initialColor = { r: 255, g: 255, b: 255 };
let finalColor = { r: 255, g: 255, b: 255 };
let isPerlinNoise = false;
let offset = 4;
let offsetScaler = 80;
let angle = 0;
let done = false;
let array = [];



function begin() {
	tempRed = initialColor.r;
	tempGreen = initialColor.g;
	tempBlue = initialColor.b;
	tempWidth = widthInitial;
	tempRadius = rInitial;
	offset = perlinConfInputs[0].value;
	offsetScaler = perlinConfInputs[1].value;
}
function rst() {
	clear();
	background(0);
	begin();
}



offset = offsetInput.value;
offsetInput[ael]("input", () => {
	offset = offsetInput.value;
	offsetPrint[0].innerText = offset;
})
offsetScaler = offsetScalerInput.value;
offsetScalerInput[ael]("input", () => {
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

go[ael]("click", () => {
	rst();
	array = [];
	angle = 0;
	done = false;
	if (pause.innerText === "Resume") pause.click();
});

pause[ael]("click", () => {
	if (pause.innerText === "Resume") {
		loop();
		pause.innerText = "Pause";
	} else {
		noLoop();
		pause.innerText = "Resume";
	}
})

looper[ael]("click", () => {
	if (!again) {
		looper.innerText = "Looping: ON";
	} else {
		looper.innerText = "Looping: OFF";
	}
	again = !again;
	if (pause.innerText === "Resume" || (isPerlinNoise && done)) {
		go.click();
	}
})


inputAngle.value = ratio;
inputAngle[ael]("input", () => {
	ratio = inputAngle.value;
	angle = 0;
})
gRbtn[ael]("click", () => {
	inputAngle.value = goldenRatio;
	ratio = goldenRatio;
	angle = 0;
})

initialColor = hexToRgb(inputColor1.value);
inputColor1[ael]("change", () => {
	initialColor = hexToRgb(inputColor1.value);
})
finalColor = hexToRgb(inputColor2.value);
inputColor2[ael]("change", () => {
	finalColor = hexToRgb(inputColor2.value);
})


const colorLabel = qs(".color");
const perlinCheck = qs(".perlinCheck > button");
perlinCheck[ael]("click", () => {
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
		perlinCheck.innerText = "Perlin noise: ON";
	} else {
		colorLabel.classList.remove("disabledColor");
		perlinConf.classList.add("disabledColor");
		perlinCheck.innerText = "Perlin noise: OFF";
	}
	if (pause.innerText === "Resume") pause.click();
})






inputRinitial.value = rInitial;
inputRinitial[ael]("input", () => {
	rInitial = inputRinitial.value * 1;
})
inputRInc.value = rIncrement;
inputRInc[ael]("input", () => {
	rIncrement = inputRInc.value * 1;
})
inputRend.value = rFinal;
inputRend[ael]("input", () => {
	rFinal = inputRend.value * 1;
})
inputWinitial.value = widthInitial;
inputWinitial[ael]("input", () => {
	widthInitial = inputWinitial.value * 1;
})
inputWinc.value = widthIncrement;
inputWinc[ael]("input", () => {
	widthIncrement = inputWinc.value * 1;
})
