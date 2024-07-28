import { useMemo } from "react";
import "./algo.css";
import { algoData } from "./algoData";



function ALGO_CARD({ details }) {
	return (
		<div className="algo_container">
			<a target="_blank" href={details.link}>

				<div className="algo_inner_cont">

					<img
						src={details.img}
						alt={details.title} 
						className="algo_img"
					/>

					<div className="algo_title">
						{details.title}
					</div>

					<div className="algo_desc_cont">
						<text className="algo_desc">
							{details.description}
						</text>
					</div>

				</div>
			</a>
		</div>
	)
}


function Algo() {

	const algo_cards = useMemo(() => {
		return algoData.map(algo => 
			<ALGO_CARD key={algo.id} details={algo} />
		);
	}, []);
	
	return (
		<section>
			<div className="all_algos_cont">
				{algo_cards}
			</div>
		</section>
	)
}



export default Algo;