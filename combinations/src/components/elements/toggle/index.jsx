import React from "react"
import { memo, useRef } from "react"
import "./toggle.css"

export default memo(function Toggle({
	label,
	setFunction,
	defaultValue
}) {

	const toggleRef = useRef(null);

	React.useEffect(() => {
		const toggleNode = toggleRef.current;
		if (!toggleNode) return;

		const handleClick = () => {
			let checked = toggleNode.dataset.checked;
			checked = Boolean(Number(checked));
			setFunction(!checked);
			toggleNode.classList.toggle("active", !checked);
			toggleNode.dataset.checked = checked ? "0" : "1";
		};

		toggleNode.addEventListener("click", handleClick);

		return () => {
			toggleNode.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<div className="toggle-cont">
			<div className="label">{label}</div>
			<div
				ref={toggleRef}
				data-checked={defaultValue ? "1" : "0"}
				className={`toggle-container hovered ${defaultValue ? "active" : ""}`}
			>
				<div id="circle-container">
					<div id="circle"></div>
				</div>
			</div>
		</div>
	)
})