import React from 'react';
import LetterBoard from './letterboard/LetterBoard';
import './game.css';
import Footer from '../footer/Footer';

export default function Game({ setAuthenticated }) {
	return (
		<>
			<div id='background'>
				<LetterBoard setAuthenticated={setAuthenticated} />
			</div>
			<Footer />
		</>
	);
}
