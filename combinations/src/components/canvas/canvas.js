import React, { useRef, useEffect, useContext } from 'react';
import { N, K, FPS, Words, Repeat, Op } from '../../App';
import { Char, queue, qStack, Node } from './datatypes';
import p5 from 'p5';
let wid = document.documentElement.clientWidth;
let hei = 100;
let localN = 10;
let localK = 5;
let localFPS = 20;
let localOp = 'c';
let localRepeat = false;

function createCharMap() {
	// let sideLength = Math.ceil(Math.sqrt(arr.length));
	// let horzLength = arr.length / sideLength;
	letterMap = {};
	arr = letters.slice(0, Number(localN));

	for (let i = 0; i < arr.length; i++) {
		// let x = (wid / (sideLength + 1)) * (i % sideLength + 1);
		// let y = (hei / (horzLength + 1)) * (Math.floor(i / horzLength) + 1);
		let x = (wid / (arr.length + 1)) * (i + 1);
		let y = (hei + 7) / 2;
		// let y = 50;
		letterMap[arr[i]] = new Char(arr[i], x, y);
	}
}

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let arr = letters.slice(0, Number(localN));
let letterMap = {};
createCharMap();

let no = 0;
let st, q, node;

let stop = true;
let reset, resetComb;

const BasicSketch = (p, setwords) => {
	
	resetComb = () => {
		no = 0;
		st = new qStack();
		q = new queue();
		node = new Node(localK, 0, "", null);
		q.enqNode(node);
		setwords([]);
	}

	resetComb();

	reset = () => {
		p.background(0);
		createCharMap();
		for (let l in letterMap) {
			letterMap[l].show(p);
		}
	}

	function combineWithoutRept(node, st) {
		const { index, k, word } = node;
		if (k === 0) {
			reset();
			for (let l of word) letterMap[l].show(p, true);
			setwords((prev) => [...prev, { word, no }]);
			no++;
			return;
		}
		let q = new queue();
		for (let i = index; i < arr.length - k + 1; i++)
			q.enq(k - 1, i + 1, word + arr[i]);
		st.push(q);
	}

	const combineWithRept = (node, st) => {
		const { index, k, word } = node;
		if (k === 0) {
			reset();
			for (let l of word) letterMap[l].show(p, true);
			setwords((prev) => [...prev, { word, no }]);
			no++;
			return;
		}
		let q = new queue();
		for (let i = index; i < arr.length; i++)
			q.enq(k - 1, i, word + arr[i]);
		st.push(q);
	}

	function permuteWithRept(node, st) {
		const { k, word } = node;
		if (k === 0) {
			reset();
			for (let l of word) letterMap[l].show(p, true);
			setwords((prev) => [...prev, { word, no }]);
			no++;
			return;
		}
		let q = new queue();
		for (let i = 0; i < arr.length; i++)
			q.enq(k - 1, i, word + arr[i]);
		st.push(q);
	}

	function permuteWithoutRept(node, st) {
		const { k, word } = node;
		if (k === 0) {
			reset();
			for (let l of word) letterMap[l].show(p, true);
			setwords((prev) => [...prev, { word, no }]);
			no++;
			return;
		}
		let q = new queue();
		for (let i = 0; i < arr.length; i++) {
			if (word.includes(arr[i])) continue;
			q.enq(k - 1, i + 1, word + arr[i]);
		}
		st.push(q);
	}

	p.setup = () => {
		p.createCanvas(wid, hei);
		p.background(0);
		p.rectMode(p.CENTER);
		p.textAlign(p.CENTER, p.CENTER);
		p.textSize(22);
		reset();
		// if (stop)
		// p.noLoop();
	};

	p.draw = () => {
		if (stop) return;

		// reset();
		p.frameRate(Number(localFPS));

		node = q.deq();
		st.push(q);

		if (localOp === 'c') {
			localRepeat ? combineWithRept(node, st) : combineWithoutRept(node, st);
		} else {
			localRepeat ? permuteWithRept(node, st) : permuteWithoutRept(node, st);
		}

		q = st.pop();
		while (q.head == null && st.head != null) q = st.pop();

		if (st.head == null && q.head == null) {
			stop = true;
			// p.noLoop();
			return;
		}
	};

	p.mousePressed = () => {
		if (p.mouseX >= 0 && p.mouseX <= wid && p.mouseY >= 0 && p.mouseY <= hei) {
			reset();
			resetComb();
			stop = false;
		}
	}

	p.keyPressed = () => {
		if (p.key === " ") {
			reset();
			resetComb();
			stop = false;
		}
	}

	p.windowResized = () => {
		wid = document.documentElement.clientWidth;
		p.resizeCanvas(wid, hei);
		reset();
	};
};

let loaded = false;

const P5Wrapper = () => {
	const canvasRef = useRef();
	const setWords = useContext(Words)[1];

	const n = useContext(N)[0];
	const k = useContext(K)[0];
	const fps = useContext(FPS)[0];
	const repeat = useContext(Repeat)[0];
	const operation = useContext(Op)[0];

	useEffect(() => {
		const sketch = (p) => BasicSketch(p, setWords);
		const p5Instance = new p5(sketch, canvasRef.current);

		return () => {
			p5Instance.remove();
		};
	}, []);

	useEffect(() => {
		if (!loaded) return;
		localN = n;
		localK = k;
		localOp = operation;
		localRepeat = repeat;
		resetComb();
		reset();
		stop = true;

		return () => {
			loaded = true;
		}
	}, [n, k, repeat, operation]);

	useEffect(() => {
		localFPS = fps;
	}, [fps]);


	return (
		<div
			ref={canvasRef}
			style={{
				width: '100%',
				backgroundColor: "black"
			}}
		>
		</div>
	);
};

export { BasicSketch };
export default P5Wrapper;