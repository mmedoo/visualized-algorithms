import { useContext, useEffect, useRef } from "react";
import { N, K, FPS, Repeat, Op } from "../App"
import React from 'react';
import { Radio, Switch } from 'antd';

const options = [
	{
		label: 'Combine',
		value: 'c',
	},
	{
		label: 'Permute',
		value: 'p',
	},
]

export default function Inputs() {
	const [n, setn] = useContext(N);
	const [k, setk] = useContext(K);
	const [fps, setfps] = useContext(FPS);

	const setRepeat = useContext(Repeat)[1];
	const setOp = useContext(Op)[1];
	
	const nRef = useRef(null)
	const kRef = useRef(null)
	const fpsRef = useRef(null)

	useEffect(() => {
		const updateComp = () => {
			nRef.current.value = Math.min(Math.max(nRef.current?.value, 1), 26);
			kRef.current.value = Math.min(Math.max(kRef.current?.value, 1), nRef.current?.value);
			setn(Number(nRef.current?.value))
			setk(Number(kRef.current?.value))
		}

		const updateFPS = () => {
			setfps(fpsRef.current?.value)
		}

		nRef.current?.addEventListener("change", updateComp);
		nRef.current?.addEventListener("input", updateComp);
		kRef.current?.addEventListener("change", updateComp);
		kRef.current?.addEventListener("input", updateComp);
		fpsRef.current?.addEventListener("input", updateFPS);

		return () => {
			nRef.current?.removeEventListener("input", updateComp);
			nRef.current?.removeEventListener("change", updateComp);
			kRef.current?.removeEventListener("change", updateComp);
			kRef.current?.removeEventListener("input", updateComp);
			fpsRef.current?.removeEventListener("change", updateFPS);
		}
	}, []);

	return (
		<div className="mess">
			Press SPACE or click the canvas
			<br/>
			above to start combining.

			<div>
				<label htmlFor="fps">fps</label>
				<input ref={fpsRef} defaultValue={fps} min="0" max="60" type="range" id="fps"></input>
				<span>{fps}</span>
			</div>

			<div>
				<label htmlFor="n">n</label>
				<input ref={nRef} defaultValue={n} min="1" max="26" type="number" id="n"></input>
				<label htmlFor="k">k</label>
				<input ref={kRef} defaultValue={k} min="1" max={n} type="number" id="k"></input>
			</div>

			<div>
				<label htmlFor=''>Operation</label>
				<Radio.Group onChange={(e) => setOp(e.target.value)} size='large' buttonStyle='solid' options={options} defaultValue="c" optionType="button" />
			</div>

			<div>
				<label htmlFor="">Allow Repitition</label>
				<Switch onChange={(checked) => setRepeat(checked)}/>
			</div>

			{/* {law} */}

		</div>
	)
}