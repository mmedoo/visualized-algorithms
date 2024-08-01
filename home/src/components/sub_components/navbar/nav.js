import "./nav.css"
import ToggleTheme from "./theme/toggle"

export default function Nav(){
	return (
		<div className="nav_cont">
			<ToggleTheme
				size={40}
				style={{
					// position: "absolute",
					// right: "2rem",
					// top: "50%",
					// transform: "translate(-50%, -50%)"
				}}
			/>
		</div>
	)
}