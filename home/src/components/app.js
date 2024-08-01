import "./style.css";
import Canvas from "./sub_components/p5_back/background"
import Welcome from "./sub_components/welcome/welcome"
import Algorithms from "./sub_components/algorithms/algo"
import Nav from "./sub_components/navbar/nav"

import {IsDarkPreferedContext, SetDarkPreferedContext} from "./sub_components/context"
import { useState } from "react";
function App(){

	const [isDarkPreferred, setPreferDark] = useState(window.matchMedia("(prefers-color-scheme: dark)"))
	
	return (
		<IsDarkPreferedContext.Provider value={isDarkPreferred}>
			
			<Canvas />

			<SetDarkPreferedContext.Provider value={setPreferDark}>
				<Nav/>
			</SetDarkPreferedContext.Provider>
			
			<Welcome/>
			<Algorithms/>
			
		</IsDarkPreferedContext.Provider>
	)
}

export default App;