import './letterboard.css';
import React, { useEffect, useState } from 'react';

export default function LetterBoard() {
	const [letterBoard, setLetterBoard] = useState(['aako', 'bncb', 'cilc', 'dood']);
	const [loaded, setLoaded] = useState(false);
	const [boardLoaded, setboardLoaded] = useState(false);
	const [selection, setSelection] = useState(null);
	const [selectedLetters, setSelectedLetters] = useState([]);
	const [letters, setLetters] = useState([]);
	const [gridWords, setGridWords] = useState(['coo', 'bank', 'ban', 'coil']);
	const [foundWords, setFoundWords] = useState([]);
	const [gameMessage, setGameMessage] = useState('Select Any Letter To Start Spotting!');
	const [score, setScore] = useState(0);

	const foundWordMessages = [
		"You're Doing Great!",
		'Great Job!',
		'You Found Another One!',
		"Wow! You're Really Good!",
		'That Was A Hard One!',
		'Nice Spot!',
	];

	const fetchLetterBoard = async () => {
		let res = await fetch('/api/letterboards');
		res = await res.json();
		setLetterBoard(res.letterBoard);
	};

	const findArrIdxInArr = (array, item) => {
		let idx;
		array.forEach((el, i) => {
			if (el[0] === item[0] && el[1] === item[1]) {
				idx = i;
			}
		});
		return idx;
	};

	const handleLetterClick = e => {
		const newMove = e.target // parses the location numbers
			.getAttribute('data-location')
			.split(',')
			.map(strNum => parseInt(strNum, 10));
		setSelection(newMove);
	};

	const deselectLetters = idx => {
		if (idx === 0) {
			selectedLetters.forEach(letter => {
				let letterEle = document.getElementById(letter.toString());
				letterEle.classList.remove('selectedLetter');
			});
			setSelectedLetters([]);
			return;
		} else {
			const deselectedLetters = selectedLetters.slice(idx, selectedLetters.length);
			setSelectedLetters(selectedLetters.slice(0, idx));
			deselectedLetters.forEach(deselectedLetter => {
				let deselected = document.getElementById(deselectedLetter.toString());
				deselected.classList.remove('selectedLetter');
			});
			return;
		}
	};

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
		return findArrIdxInArr(validMoves, newMove) + 1 ? true : false; // add 1 to allow reuslt of 0 to be valid move but result -1 will still be invalid.
	};

	useEffect(() => {
		if (!selection) return;
		const newMove = selection;
		const newMoveEle = document.getElementById(newMove.toString());
		const newLetter = newMoveEle.getAttribute('value');
		// checks if deselecting
		let deselectedLetterIndex = findArrIdxInArr(selectedLetters, newMove);
		// takes care of exception when deselcting first selection at 0 index
		if (deselectedLetterIndex >= 0) {
			deselectLetters(deselectedLetterIndex);
		} else if (isValidMove(newMove)) {
			setSelectedLetters([...selectedLetters, newMove]);
			setLetters([...letters, newLetter]);
			newMoveEle.classList.add('selectedLetter');
		}
		console.log(newMoveEle.getBoundingClientRect());
	}, [selection]);

	// sudo code for algo to determine where to put a line connecting lines
	// e.target.getBoundingClientRect())
	// get x,y range of letter clicked on
	// get x,y range of last letter
	// set directino based on copmarison of x,y values of click
	// add child element that is absolutley positioned to the letter box
	// <div>style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: 'rotate(45deg')}}</div>

	const handleWordSubmit = () => {
		let submittedWord = letters.join('');
		// if already found word then unselect and play different noise
		// change gameplay message above board to You already spotted that word!
		if (foundWords.indexOf(submittedWord) >= 0) {
			console.log('found words are: ', foundWords);
			console.log('submitted word is: ', submittedWord);
			console.log(foundWords.indexOf(submittedWord));
			setGameMessage("You've Already Found That Word! Try Again!");
		} else if (gridWords.indexOf(submittedWord) >= 0 && foundWords.indexOf(submittedWord) < 0) {
			let randomMessage = foundWordMessages[Math.floor(Math.random() * foundWordMessages.length)];
			setGameMessage(randomMessage);
			setFoundWords([...foundWords, submittedWord]);
		} else {
			setGameMessage("Sorry, But That's Not A Word. Please Try Again!");
		}

		deselectLetters(0);
		setLetters([]);
		setSelectedLetters([]);
	};

	if (!loaded) {
		setLoaded(true);
		setLetterBoard(
			letterBoard.map((row, rowNum) => {
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
	}

	return (
		<>
			{loaded && (
				<>
					<div id='messageContainer'>
						<p>{gameMessage}</p>
					</div>
					<div id='letterGridContainer'>
						<div id='letterGrid'>{letterBoard}</div>
					</div>
					<div id='buttonContainer'>
						<button className='spotWordBtn' onClick={handleWordSubmit}>
							Spot
						</button>
					</div>
				</>
			)}
		</>
	);
}
