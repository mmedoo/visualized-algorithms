import { useMemo } from "react";

function factorial(n) {
	if (n === 0) {
		return 1;
	} else {
		return n * factorial(n - 1);
	}
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function choose(n, k) {
	return numberWithCommas(Math.floor(factorial(n) / (factorial(k) * factorial(n - k))));
}

function permute(n, k) {
	return numberWithCommas(Math.floor(factorial(n) / factorial(n - k)));
}


function Combine({ n, k, repeat }) {

	const nFormula = repeat ? 'n + k - 1' : 'n';
	const nSubs = repeat ? `${n} + ${k} - 1` : n;
	const result = repeat ? choose(n + k - 1, k) : choose(n, k);

	return (
		<>
			<math xmlns="http://www.w3.org/1998/Math/MathML"><mmultiscripts><mmultiscripts><mn>C</mn><mprescripts /><none /><mi>{nFormula}</mi></mmultiscripts><mi>k</mi><none /></mmultiscripts><mo>=</mo><mo>&#xa0;</mo><mfrac><mrow><mi>({nFormula})</mi><mo>!</mo></mrow><mrow><mi>k</mi><mo>!</mo><mrow><mo>(</mo><mrow><mi>{repeat ? "n" : nFormula}</mi><mo>-</mo><mi>{repeat ? "1" : "k"}</mi></mrow><mo>)</mo></mrow><mo>!</mo></mrow></mfrac><mrow /></math>
			<math xmlns="http://www.w3.org/1998/Math/MathML"><mmultiscripts><mmultiscripts><mn>C</mn><mprescripts /><none /><mi className="n-dis">{nSubs}</mi></mmultiscripts><mi className="k-dis">{k}</mi><none /></mmultiscripts><mo>=</mo><mo>&#xa0;</mo><mfrac><mrow><mi className="n-dis">({nSubs})</mi><mo>!</mo></mrow><mrow><mi className="k-dis">{k}</mi><mo>!</mo><mrow><mo>(</mo><mrow><mi className="n-dis">{n}</mi><mo>-</mo><mi className="k-dis">{repeat ? "1" : k}</mi></mrow><mo>)</mo></mrow><mo>!</mo></mrow></mfrac><mrow /></math>
			<math xmlns="http://www.w3.org/1998/Math/MathML"><mo>=</mo><mn id="nCk">{result}</mn></math>
		</>
	)
}

function PermuteWithRept({ n, k }) {
	return (
		<math xmlns="http://www.w3.org/1998/Math/MathML"><msup><mi>n</mi><mi>k</mi></msup><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo><msup><mi>{n}</mi><mi>{k}</mi></msup><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo><mi>{numberWithCommas(n ** k)}</mi></math>
	)
}

function PermuteWithoutRept({ n, k }) {
	return (
		<>
			<math xmlns="http://www.w3.org/1998/Math/MathML"><mmultiscripts><mmultiscripts><mi>P</mi><mprescripts /><none /><mi>n</mi></mmultiscripts><mi>k</mi><none /></mmultiscripts><mo>=</mo><mo>&#xa0;</mo><mfrac><mrow><mi>n</mi><mo>!</mo></mrow><mrow><mrow><mo>(</mo><mrow><mi>n</mi><mo>-</mo><mi>k</mi></mrow><mo>)</mo></mrow><mo>!</mo></mrow></mfrac><mo>&#xA0;</mo><mo>=</mo><mo>&#xA0;</mo><mfrac><mrow><mi>{n}</mi><mo>!</mo></mrow><mrow><mrow><mo>(</mo><mrow><mi>{n}</mi><mo>-</mo><mi>{k}</mi></mrow><mo>)</mo></mrow><mo>!</mo></mrow></mfrac></math>
			<math xmlns="http://www.w3.org/1998/Math/MathML"><mo>=</mo><mn id="nCk">{permute(n, k)}</mn></math>
		</>
	)
}


export function Laws({ n, k, repeat, operation }) {

	const law = useMemo(() => {
		if (operation === 'c') {

			return <Combine repeat={repeat} n={n} k={k} />

		} else if (repeat) {

			return <PermuteWithRept n={n} k={k} />

		} else {

			return <PermuteWithoutRept n={n} k={k} />
		}


	}, [n, k, repeat, operation]);

	return (
		<div className="equ-cont">
			{law}
		</div>
	);
}
