import "./style.css";
import Welcome from "./sub_components/welcome/welcome"
import Algorithms from "./sub_components/algorithms/algo"
import Nav from "./sub_components/navbar/nav"

function App(){
	return (
		<>
			<Nav/>
			<Welcome/>
			<Algorithms/>
		</>
	)
}

export default App;