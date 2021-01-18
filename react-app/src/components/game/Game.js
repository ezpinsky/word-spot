import React from 'react';
import LetterBoard from './letterboard/LetterBoard';
import './game.css';

export default function Game() {
	return (
		<>
			<div id='background'>
				<div id='locoContainer'>
					<div id='logoBackground'>
						<div id='logo'></div>
					</div>
				</div>
				<LetterBoard />
			</div>
		</>
	);
}
