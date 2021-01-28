import React from 'react';
import LetterBoard from './letterboard/LetterBoard';
import './game.css';
import Footer from '../footer/Footer';

export default function Game({ setAuthenticated, authenticated }) {
	return (
		<>
			<div id='background'>
				<LetterBoard authenticated={authenticated} setAuthenticated={setAuthenticated} />
			</div>
			<Footer />
		</>
	);
}
