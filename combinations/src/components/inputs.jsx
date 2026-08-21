import React from 'react';
import { memo, useContext, useEffect, useMemo, useRef } from "react";
import { N, K, FPS, Repeat, Op } from "../context"
import Input_radio from "./elements/input_radio";
import Toggle from "./elements/toggle";

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

export default memo(function Inputs() {
	const [n, setn] = useContext(N);
	const [k, setk] = useContext(K);
	const [fps, setfps] = useContext(FPS);

	const [repeat, setRepeat] = useContext(Repeat);
	const [op, setOp] = useContext(Op);
	
	const nRef = useRef(null)
	const kRef = useRef(null)
	const fpsRef = useRef(null)

	useEffect(() => {

		const controller = new AbortController();
		
		const updateComp = () => {
			const n_newValue = Math.min(Math.max(nRef.current?.value, 1), 26);
			const k_newValue = Math.min(Math.max(kRef.current?.value, 1), n_newValue);
			nRef.current.value = n_newValue;
			kRef.current.value = k_newValue;
			setn(Number(n_newValue));
			setk(Number(k_newValue));
		}

		const updateFPS = () => {
			setfps(fpsRef.current?.value)
		}

		nRef.current?.addEventListener("input", updateComp, controller);
		kRef.current?.addEventListener("input", updateComp, controller);
		fpsRef.current?.addEventListener("input", updateFPS, controller);

		return () => {
			controller.abort();
		}
	}, []);

	return (
		<div className="mess">
			Press SPACE or click the canvas
			<br/>
			above to start combining.

			<div>
				<label htmlFor="fps">fps</label>
				<input ref={fpsRef} defaultValue={fps} min="1" max="60" type="range" id="fps"></input>
				<span>{fps}</span>
			</div>

			<div>
				<label htmlFor="n">n</label>
				<input ref={nRef} defaultValue={useMemo(() => n, [])} min="1" max="26" type="number" id="n"></input>
				<label htmlFor="k">k</label>
				<input ref={kRef} defaultValue={useMemo(() => k, [])} min="1" max={n} type="number" id="k"></input>
			</div>

			<Input_radio value={op} label={"Operation"} options={options} setFunction={setOp} />

			<Toggle label={"Allow Repition"} defaultValue={useMemo(() => repeat, [])} setFunction={setRepeat} />

			{/* {law} */}

		</div>
	)
})