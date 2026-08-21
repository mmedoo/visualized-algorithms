import React from "react"
import { useMemo, memo } from "react";
import RadioBox from "./RadioBox";
import "./radio.css"

export default memo(function Radio({
	options,
	label,
	value,
	setFunction,
}) {
	const radios = useMemo(() => {
		const value_index = options.findIndex((o) => o.value === value);
		return options.map((option, index) =>
			<RadioBox
				key={index}
				option={option}
				value_index={value_index}
				setFunction={setFunction}
				i={index}
			/>
		)
	}, [value]);

	return (
		<div>
			<div className="label">{label}</div>
			<div className="radio-cont">
				{radios}
			</div>
		</div>
	)
})


