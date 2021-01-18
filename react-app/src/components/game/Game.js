import React from 'react';
import LetterBoard from './letterboard/LetterBoard';
import './game.css';

export default function Game() {
	return (
		<>
			<div id='background'>
				<div id='logoContainer'>
					<div id='logoBackground'>
						<div id='logo'></div>
					</div>
				</div>
				<LetterBoard />
			</div>
			<div id='footer'>
				<div>
					<i class='fab fa-github'></i>
				</div>
			</div>
		</>
	);
}
