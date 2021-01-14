import './letterboard.css';
import React, { useEffect, useState } from 'react';

export default function LetterBoard() {
	const [boardLetters, setBoardLetters] = useState(['aaao', 'bbcb', 'cccc', 'dddd']);
	const [loaded, setLoaded] = useState(false);
	const [selectedLetters, setSelectedLetters] = useState([]);

	const findArrIdxInArr = (array, item) => {
		let idx;
		array.forEach((el, i) => {
			if (el[0] === item[0] && el[1] === item[1]) {
				idx = i;
			}
		});
		return idx || false;
	};

	useEffect(() => {
		console.log('this useeffect logged the letters', selectedLetters);
	}, [selectedLetters]);
	// why does it run here but not latter on

	const isValidMove = newMove => {
		if (!selectedLetters.length) return true;
		const lastMove = selectedLetters[selectedLetters.length - 1];
		const startX = Math.max(0, lastMove[0] - 1);
		const endX = Math.min(lastMove[0] + 2, 4);
		const startY = Math.max(0, lastMove[1] - 1);
		const endY = Math.min(lastMove[1] + 2, 4);
		const validMoves = [];
		for (let x = startX; x < endX; x++) {
			for (let y = startY; y < endY; y++) {
				// this if statement gets around javascript drawback where two objects can only be equal if they point to same object in memory
				if (!(lastMove[0] === x && lastMove[1] === y)) {
					validMoves.push([x, y]);
				}
			}
		}
		console.log('selectedLetters are: ', selectedLetters);
		console.log('valid moves are: ', validMoves);
		return findArrIdxInArr(validMoves, newMove) ? true : false;
	};

	// sudo code for algo to determine where to put a line connecting lines
	// e.target.getBoundingClientRect())
	// get x,y range of letter clicked on
	// get x,y range of last letter
	// set directino based on copmarison of x,y values of click
	// add child element that is absolutley positioned to the letter box
	// <div>style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: 'rotate(45deg')}}</div>

	const handleLetterClick = e => {
		const newMove = e.target // parses the location numbers
			.getAttribute('data-location')
			.split(',')
			.map(strNum => parseInt(strNum, 10));
		//check if move was already made
		let moveIdxIfInSelected = findArrIdxInArr(selectedLetters, newMove);
		if (moveIdxIfInSelected) {
			let deselectedLetterIndex = moveIdxIfInSelected;
			const deselectedLetters = selectedLetters.slice(
				deselectedLetterIndex,
				selectedLetters.length
			);
			setSelectedLetters(selectedLetters.slice(0, deselectedLetterIndex));

			deselectedLetters.forEach(deselectedLetter => {
				let deselected = document.getElementById(deselectedLetter.toString());
				deselected.classList.remove('selectedLetter');
			});
			return;
		}

		if (isValidMove(newMove)) {
			setSelectedLetters(selectedLetters.push(newMove));
			e.target.classList.add('selectedLetter');
		} else {
			return;
		}

		console.log(e.target.getAttribute('value'));
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
									data-location={[colNum, rowNum]}
									key={[colNum, rowNum]}
									className='letterContainer'
									value={letter}
									id={[colNum, rowNum]}
									onClick={handleLetterClick}
								>
									<div className='letter' value={letter} key={[colNum, rowNum, 'letter']}>
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
				<>
					<div id='lost' value='you found me'></div>
					<div id='letterGridContainer'>
						<div id='letterGrid'>{boardLetters}</div>
					</div>
				</>
			)}
		</>
	);
}
