import React from 'react';
import LetterBoard from './letterboard/LetterBoard';
import './game.css';

export default function Game() {
	return (
		<>
			<div id='background'>
				<div id='logo'>Logo Goes Here</div>
				<LetterBoard />
			</div>
		</>
	);
}
