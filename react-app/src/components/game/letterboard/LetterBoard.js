import './letterboard.css';
import React, { useEffect, useState } from 'react';
import newLetterBoard from '../../../services/letterBoard';
import LogoutButton from '../../auth/LogoutButton';

export default function LetterBoard({ setAuthenticated }) {
	const [loaded, setLoaded] = useState(false);
	const [boardLoaded, setBoardLoaded] = useState(false);
	const [letterBoard, setLetterBoard] = useState([]);
	const [orientations, setOrientations] = useState([]);
	const [boardWords, setBoardWords] = useState([]);
	const [selection, setSelection] = useState(null);
	const [selectedLetters, setSelectedLetters] = useState([]);
	const [spotLetters, setSpotLetters] = useState([]);
	const [foundWords, setFoundWords] = useState([]);
	const [gameMessage, setGameMessage] = useState('Select Any Letter To Start!');
	const [errorMessages, setErrorMessages] = useState(null);
	const [newBoardInput, setNewBoardInput] = useState(false);
	const [score, setScore] = useState(0);

	const foundWordMessages = [
		"You're Doing Great!",
		'Great Job!',
		'You Found Another One!',
		"Wow! You're Really Good!",
		'That Was A Hard One!',
		'Nice Spot!',
	];

	const findArrIdxInArr = (array, item) => {
		let idx;
		array.forEach((el, i) => {
			if (el[0] === item[0] && el[1] === item[1]) {
				idx = i;
			}
		});
		return idx;
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
				// this if statement sidesteps javascript drawback where two objects can only be equal if they point to same object in memory
				if (!(lastMove[0] === x && lastMove[1] === y)) {
					validMoves.push([x, y]);
				}
			}
		}
		return findArrIdxInArr(validMoves, newMove) + 1 ? true : false; // add 1 to allow reuslt of 0 to be valid move but result -1 will still be invalid.
	};

	const deselectLetters = idx => {
		if (idx === 0) {
			selectedLetters.forEach(letter => {
				let letterEle = document.getElementById(letter.toString());
				letterEle.classList.remove('selectedLetter');
			});
			setSelectedLetters([]);
			setSpotLetters('');
			return;
		} else {
			const deselectedLetters = selectedLetters.slice(idx, selectedLetters.length);
			setSpotLetters(spotLetters.slice(0, idx));
			setSelectedLetters(selectedLetters.slice(0, idx));
			deselectedLetters.forEach(deselectedLetter => {
				let deselected = document.getElementById(deselectedLetter.toString());
				deselected.classList.remove('selectedLetter');
			});
			return;
		}
	};

	const clearBoard = () => {
		setSpotLetters();
		deselectLetters(0);
		//future feature to save score here
		setLetterBoard([]);
		setBoardWords([]);
		setFoundWords([]);
		setOrientations([]);
	};

	const setNewBoard = (res, startMessage) => {
		setGameMessage(startMessage);
		setLetterBoard(res.letters);
		setOrientations([...res.orientations, res.letters]);
		setBoardWords(res.words);
		setBoardLoaded(true);
	};

	const fetchLetterBoard = async id => {
		setLoaded(true);
		try {
			let res = await fetch('/api/letterboards/');
			if (!res.ok) throw res;
			res = await res.json();
			setNewBoard(res, 'Select Any Letter To Start!');
		} catch (err) {
			console.error(err);
		}
	};

	//scrolls to bottom of spotted words box when new word spotted
	const updateFoundWordsScroll = () => {
		const wordsDiv = document.getElementById('foundWords');
		wordsDiv.scrollTop = wordsDiv.scrollHeight;
	};

	/* Pseudocode for selected letters connecting lines */
	// e.target.getBoundingClientRect()) => returns the x, y location of the clicked letter
	// get x,y range of letter clicked on
	// get x,y range of last letter clicked on
	// set direction based on copmarison of x,y values of click
	// Option 1: add hidden lines behind board that can be displayed or hidden
	// Option 2: add child element that is absolutley positioned to the letter box
	// <div>style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: 'rotate(45deg')}}</div>

	const handleLetterClick = e => {
		const newMove = e.target // parses the location numbers
			.getAttribute('data-location')
			.split(',')
			.map(strNum => parseInt(strNum, 10));
		setSelection(newMove);
	};

	const handleRotateBoardClick = e => {
		deselectLetters(0);
		setSpotLetters('');
		const rotatedBoard = orientations.shift();
		setLetterBoard(rotatedBoard);
		setOrientations([...orientations, rotatedBoard]);
	};

	const handleWordSubmit = () => {
		let submittedWord = spotLetters.join('');
		let foundWordsIdx = foundWords.indexOf(submittedWord);
		let boardWordsIdx = boardWords.indexOf(submittedWord);
		if (foundWordsIdx >= 0) {
			setGameMessage("You've Already Found That Word! Try Again!");
		} else if (boardWordsIdx >= 0 && foundWordsIdx < 0) {
			let randomMessage = foundWordMessages[Math.floor(Math.random() * foundWordMessages.length)];
			setGameMessage(randomMessage);
			setFoundWords([...foundWords, submittedWord]);
		} else {
			setGameMessage("Sorry, But That's Not A Word. Please Try Again!");
		}

		deselectLetters(0);
		setSpotLetters([]);
		setSelectedLetters([]);
	};

	const handleNextBoardClick = async () => {
		// figure out score
		setNewBoardInput(false);
		setErrorMessages(false);
		setGameMessage('Select Any Letter To Start!');
		await fetchLetterBoard();
		setFoundWords([]);
	};

	const handleCreateNewClick = () => {
		clearBoard();
		setNewBoardInput(true);
		setGameMessage('Please type 16 letters below using at least 6 vowels.');
		setLetterBoard(['    ', '    ', '    ', '    ']);
	};

	const handleInputChange = e => {
		let letters = e.target.value;
		while (letters.length < 16) {
			letters += ' ';
		}
		let matrixedLetters = [];
		for (let i = 0; i < 13; i += 4) {
			matrixedLetters.push(letters.slice(i, i + 4));
		}
		setLetterBoard(matrixedLetters);
	};

	const handleCreateBoardClick = async () => {
		setErrorMessages(false);
		let letters = letterBoard.join('');
		setGameMessage('Checking over 40,000 orientations of your letters');
		// show letters and spaces in grid at rand locations with timer
		//show message tthat algo running etc.
		//when board comes back show message that new board created
		//.toLowerCase()
		let res = await newLetterBoard(letters);
		if (res.errors) {
			res.errors.forEach(error =>
				!errorMessages
					? setErrorMessages([error.slice(10)])
					: setErrorMessages([...errorMessages, error.slice(10)])
			);
		} else {
			setNewBoard(res, 'Suitable orientation found! Select a letter to play!');
			setNewBoardInput(false);
		}
	};
	const handleHintClick = () => {};

	//fetches first letterBoard
	useEffect(() => {
		fetchLetterBoard();
	}, []);

	//handles new move and deselection
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
			setSpotLetters([...spotLetters, newLetter]);
			newMoveEle.classList.add('selectedLetter');
		}
	}, [selection]);

	useEffect(() => {
		if (foundWords.length > 0) {
			updateFoundWordsScroll();
		}
	}, [foundWords]);

	return (
		<>
			{loaded && (
				<>
					<div id='gameContent'>
						<div id='leftSideBar'>
							<div id='foundWordsWrapper'>
								<div id='foundWordsContainer'>
									<div id='foundWordsTitle'>
										Spotted Words {`${foundWords.length}/${boardWords.length}`}
									</div>
									<div id='foundWords'>
										{foundWords.map(word => {
											return <p key={word}>{word}</p>;
										})}
									</div>
								</div>
							</div>
						</div>
						<div id='gameContainer'>
							<div id='logoContainer'>
								<div id='logoBackground'>
									<div id='logo'></div>
								</div>
							</div>
							<div id='messageContainer'>
								<p>{errorMessages || gameMessage}</p>
							</div>
							<div id='letterGridContainer'>
								<div id='letterGrid'>
									{letterBoard.map((row, rowNum) => {
										return (
											boardLoaded && (
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
																<div
																	className='letter'
																	value={letter}
																	key={[colNum, rowNum, 'letter']}
																>
																	{letter.toUpperCase()}
																</div>
															</div>
														);
													})}
												</div>
											)
										);
									})}
								</div>
							</div>
							<div id='buttonsContainer'>
								<div id='buttonsInnerContainer'>
									{(!newBoardInput && (
										<>
											<div id='btnSpacerDiv'>
												<div className='btn helpBtn' onClick={handleRotateBoardClick}>
													<i className='fas fa-sync-alt'></i>
												</div>
											</div>
											<div id='btnSpacerDiv'>
												<div className='btn helpBtn' onClick={handleHintClick}>
													<i className='fas fa-question'></i>
												</div>
											</div>
											<div id='selectedLettersContainer'>{spotLetters}</div>
											<div className='btn spotWordBtn' onClick={handleWordSubmit}>
												Spot
											</div>
										</>
									)) || (
										<>
											<input
												id='inputContainer'
												autoFocus
												maxLength='16'
												onChange={handleInputChange}
											/>
											<div className='btn createBoardBtn' onClick={handleCreateBoardClick}>
												Create
											</div>
										</>
									)}
								</div>
							</div>
						</div>
						<div id='rightSideBar'>
							<div id='profile'>
								<div>
									<p></p>
								</div>
								<div>
									<LogoutButton setAuthenticated={setAuthenticated} />
								</div>
							</div>
							<div id='rightSideBarBtnContainer'>
								<div className='btn rightSideBarBtn' onClick={handleNextBoardClick}>
									<p> Next Board</p>
									<i className='fas fa-long-arrow-alt-right arrowIcon'></i>
								</div>
								{!newBoardInput && (
									<div className='btn rightSideBarBtn' onClick={handleCreateNewClick}>
										<p> Create New</p>
										<i className='fas fa-puzzle-piece'></i>
									</div>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
