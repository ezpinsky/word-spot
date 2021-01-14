import React from 'react';
import LetterBoard from './letterboard/LetterBoard';
import './game.css';

export default function Game() {
	return (
		<>
			<div id='background'>
				<h1 id='title'>Logo Goes Here</h1>
				<LetterBoard />
			</div>
		</>
	);
}
