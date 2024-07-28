import { useEffect, useRef } from "react";
import "./welcome.css";

function Welcome() {
	
	const infoRef = useRef(null);

	async function display(){
		await new Promise(res => {
			setTimeout(()=>{
				res();
			}, 500);
		});
		infoRef.current.classList.add("loaded");
	}	
	
	useEffect(()=>{
		display();
	},[]);
	
	return (
		<div ref={infoRef} className="welcome_message">
			<br/>
			Done with 🖤
			<br/>
			by Mohamed Ibrahim
			<p
				style={{
					font: "lighter 25px 'Google Sans'"
				}}
			>
				Visualizations in this page are implemented using p5.js library
				<br/>
				which is so efficient for graphics and animations needs.
			</p>
			<br/>
		</div>
	);
}

export default Welcome;