import Canvas from './components/canvas/canvas';
import Inputs from './components/inputs';
import React from 'react'
import { useEffect, useMemo, useRef, useState } from "react";
import { Laws } from './components/laws';
import { N, K, FPS, Repeat, Op, Words } from './context';

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

	useEffect(() => {
		window.onkeydown = (e) => {
			e.key === ' ' && e.preventDefault();
		}
	}, [])

	return (
		<N.Provider value={useMemo(() => [n, setn], [n])}>
		<K.Provider value={useMemo(() => [k, setk], [k])}>
		<FPS.Provider value={useMemo(() => [fps, setfps], [fps])}>
		<Words.Provider value={useMemo(() => [words, setWords], [words])}>
		<Op.Provider value={useMemo(() => [operation, setOp], [operation])}>
		<Repeat.Provider value={useMemo(() => [repeat, setRepeat], [repeat])}>

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
