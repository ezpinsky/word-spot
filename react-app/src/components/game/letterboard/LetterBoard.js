import './letterboard.css';
import React, { useEffect, useState } from 'react';

export default function LetterBoard() {
	const [boardLetters, setBoardLetters] = useState(['aaao', 'bbcb', 'cccc', 'dddd']);
	const [loaded, setLoaded] = useState(false);
	const [selectedLetters, setSelectedLetters] = useState([]);
	let selectedStyle;
	const isValidMove = letterLocation => {
		if (!selectedLetters.length) {
		} // if no selected letters make any move valid

		if (!selectedLetters.indexOf(letterLocation)) return false;
		let lastMove = selectedLetters.pop();
		let startX;
		let startY;
		lastMove[0] ? (startX = lastMove[0] - 1) : (startX = lastMove[0]);
		lastMove[1] ? (startY = lastMove[1] - 1) : (startY = lastMove[1]);

		let validMoves = [];
		for (let x = startX; x < 4; x + 1) {}
	};

	// for nx in range(max(0, x - 1), min(x + 2, 4)):
	//     for ny in range(max(0, y - 1), min(y + 2, 4)):

	// sudo code for algo to determine where to put a line connecting lines
	// e.target.getBoundingClientRect())
	// get x,y range of letter clicked on
	// get x,y range of last letter
	// set directino based on copmarison of x,y values of click
	// add child element that is absolutley positioned to the letter box
	// <div>style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: 'rotate(45deg')}}</div>

	const handleLetterClick = e => {
		// if (isValidMove(e.target.getAttribute('location'))) {
		// 	setSelectedLetters(setSelectedLetters.push(e.target.key));
		// 	e.target.className = 'letter selectedLetter';
		// } else {
		// }

		console.log(e.target.getAttribute('value'));
		console.log(e.target.getAttribute('location'));
		e.target.classList.add('selectedLetter');
		console.log(e.target.getBoundingClientRect());
	};

	if (!loaded) {
		setBoardLetters(
			boardLetters.map((row, rowNum) => {
				return (
					<div key={`row${rowNum}`} className='gridRow'>
						{row.split('').map((letter, colNum) => {
							return (
								<div
									location={[colNum, rowNum]}
									key={[colNum, rowNum]}
									className='letterContainer'
									value={letter}
									onClick={handleLetterClick}
									styles={selectedStyle}
								>
									<div
										className='letter'
										value={letter}
										location={[colNum, rowNum]}
										key={[colNum, rowNum, 'letter']}
									>
										{letter.toUpperCase()}
									</div>
								</div>
							);
						})}
					</div>
				);
			})
		);
		setLoaded(true);
	}
	// useEffect(() => {}, [boardLetters]);

	return (
		<>
			{loaded && (
				<div id='letterGridContainer'>
					<div id='letterGrid'>{boardLetters}</div>
				</div>
			)}
		</>
	);
}
