import { memo, useRef, useEffect } from "react";
import React from "react"

export default memo(function RadioBox({ option, ...props }) {

	const divRef = useRef(null);

	useEffect(() => {
		const controller = new AbortController();

		divRef.current?.addEventListener("click", () => {
			props.setFunction(option.value);
		}, controller);

		return () => {
			controller.abort();
		}
	}, []);

	return (
		<div
			ref={divRef}
			className={`radio-box hoverable ${(props.value_index - props.i === 0) ? "selected" : ""}`}
		>
			{option.icon}
			{option.label}
			<div
				className="radio-box-bg"
				style={{
					transform: `translateX(calc( ${props.value_index - props.i} * (100% + 12px) ))`
				}}
			></div>
		</div>
	);
});
