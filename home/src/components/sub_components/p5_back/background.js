import React, { useRef, useEffect, useContext } from 'react';
import {IsDarkPreferedContext} from "../../sub_components/context"
import p5 from 'p5';



const particlesNo = 100;

const mouseCircum = 120;


var bgColor = window.matchMedia("(prefers-color-scheme: dark)").matches ? 30 : 230;

const basicSketch = (p) => {

	function Particle() {
		
		this.x = p.random(0 + window.innerWidth);
		
		this.y = p.random(0 + window.innerHeight);
	}
	

	function Pool() {
		
		this.particles = [];
		
		for (let i = 1; i <= particlesNo; i++) {
			this.particles.push(new Particle());
		}
	}
	

	var sects;
	

	function gradientLine(x1, y1, x2, y2,color2,color3) {

		var grad = p.drawingContext.createLinearGradient(x1, y1, x2, y2);

		grad.addColorStop(0.8, "transparent");
		grad.addColorStop(0.5, color2);
		grad.addColorStop(0, color3);

		p.strokeWeight(1)
		p.drawingContext.strokeStyle = grad;

		p.line(x1, y1, x2, y2);
	}
	

	Particle.prototype.connectMouse = function (mouseX, mouseY) {
		
		if (p.dist(mouseX, mouseY, this.x, this.y) > mouseCircum)
			return;

		p.stroke(255)
		if (bgColor > 200){

			gradientLine(this.x, this.y, mouseX, mouseY, 'rgba(150,150,150,0.5)', "rgb(200,200,200)");
		} else {
			gradientLine(this.x, this.y, mouseX, mouseY, `rgba(150,150,150,0.5)`, "rgb(55,55,55)");
		}

	}
	

	Pool.prototype.connectMouse = function (mouseX, mouseY) {
		for (const p of this.particles) {
			p.connectMouse(mouseX, mouseY);
		}
	}
	

	p.setup = () => {
		p.createCanvas(window.innerWidth, window.innerHeight);
		p.background(bgColor);
		sects = new Pool(particlesNo);
	};
	

	p.draw = () => {
		p.background(bgColor);
		if (p.mouseX < 0)
			return;
		if (p.mouseY < 0)
			return;
		if (p.mouseX > window.innerWidth)
			return;
		if (p.mouseY > window.innerHeight)
			return;

		sects.connectMouse(p.mouseX, p.mouseY);
	};
	
	
	p.windowResized = () => {
		p.resizeCanvas(window.innerWidth, window.innerHeight);
		p.background(bgColor);
		sects = new Pool(particlesNo);
	};
};








































const P5Wrapper = () => {
	const canvasRef = useRef();

	useEffect(() => {
		const p5Instance = new p5(basicSketch, canvasRef.current);

		return () => {
			p5Instance.remove();
		};
	}, []);

	const isDarkPreferred = useContext(IsDarkPreferedContext);

	bgColor = isDarkPreferred ? 30 : 230;

	return (
		<div
			ref={canvasRef}
			style={{
				"position": 'fixed',
				"zIndex": "-1000",
				"left": "0",
				"right": "0",
				"top": "0",
				"bottom": "0"
			}}
		>
		</div>
	);
};


export default P5Wrapper;
