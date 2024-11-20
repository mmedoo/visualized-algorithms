import Canvas from './components/canvas/canvas';
import Inputs from './components/inputs';
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { Laws } from './components/laws';

const N = createContext();
const K = createContext();
const Op = createContext();
const FPS = createContext();
const Words = createContext();
const Repeat = createContext();

export { N, K, FPS, Words, Op, Repeat };

function App() {
	const [k, setk] = useState(5);
	const [n, setn] = useState(10);
	const [fps, setfps] = useState(20);
	const [words, setWords] = useState([]);
	const [repeat, setRepeat] = useState(false);
	const [operation, setOp] = useState('c');

	const wordRef = useRef(null);

	const law = useMemo(() => {
		return <Laws n={n} k={k} repeat={repeat} operation={operation} />
	}, [n, k, repeat, operation]);


	useEffect(() => {
		if (words.length > 50) {
			setWords(words.slice(1));
		}
		wordRef.current.scrollTop = wordRef.current.scrollHeight;
	}, [words]);

	return (
		<N.Provider value={[n, setn]}>
		<K.Provider value={[k, setk]}>
		<FPS.Provider value={[fps, setfps]}>
		<Words.Provider value={[words, setWords]}>
		<Op.Provider value={[operation, setOp]}>
		<Repeat.Provider value={[repeat, setRepeat]}>

			<div className='draw'>
				<Canvas />
			</div>
			<div className="control">

				<Inputs />

				<div ref={wordRef} className="words">
					{words.map((word, index) => (
						<div key={index}>
							<span>
								{word.word}
							</span>
							<span>
								{word.no}
							</span>
						</div>
					))}
				</div>
				
			</div>
			{law}
			

		</Repeat.Provider>
		</Op.Provider>
		</Words.Provider>
		</FPS.Provider>
		</K.Provider>
		</N.Provider>
	);
}

export default App;
