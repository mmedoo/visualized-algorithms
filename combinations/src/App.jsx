import Canvas from './components/canvas/canvas';
import Inputs from './components/inputs';
import React from 'react'
import { useEffect, useMemo, useRef, useState } from "react";
import { Laws } from './components/laws';
import { N, K, FPS, Repeat, Op, Words } from './context';
import { FixedSizeList, VariableSizeList } from 'react-window';

function App() {
	const [k, setk] = useState(5);
	const [n, setn] = useState(10);
	const [fps, setfps] = useState(20);
	const [words, setWords] = useState([]);
	const [repeat, setRepeat] = useState(false);
	const [operation, setOp] = useState('c');
	const [resetState, setResetState] = useState(true);
	const listRef = useRef(null);

	const wordRef = useRef(null);

	const law = useMemo(() => {
		return <Laws n={n} k={k} repeat={repeat} operation={operation} />
	}, [n, k, repeat, operation]);

	useEffect(() => {
		// if (words.length > 50) {
			// setWords(words.slice(1));
		// }
		// wordRef.current.scrollTop = wordRef.current.scrollHeight;
		listRef.current?.scrollToItem(words.length-1);
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
									<Canvas reset={resetState} />
								</div>
								<div className="control">

									<Inputs setResetState={setResetState} />

									<div ref={wordRef} style={{ width: k*35 + 60 + "px" }} className="words">
										<FixedSizeList
											itemSize={33}
											width={"100%"}
											itemCount={words.length}
											height={Math.min(words.length * 33, 380)}
											ref={listRef}
										>
											{({ index, style }) => 
												<div style={style} className='word' key={index}>
													<span>
														{words[index].word}
													</span>
													<span>
														{words[index].no}
													</span>
												</div>
											}
										</FixedSizeList>

									</div>

								</div>
								{law}
								<div className='reset-cont'>

									<button
										onClick={() => setResetState(prev => !prev)}
										className='reset'
									>
										Stop and Reset
									</button>
								</div>

							</Repeat.Provider>
						</Op.Provider>
					</Words.Provider>
				</FPS.Provider>
			</K.Provider>
		</N.Provider>
	);
}

export default App;
