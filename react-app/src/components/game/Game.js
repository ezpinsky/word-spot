import React from 'react';
import LetterBoard from './letterboard/LetterBoard';
import './game.css';

export default function Game() {
	return (
		<>
			<h1 id='title'>Word Spot</h1>
			<LetterBoard />
		</>
	);
}
