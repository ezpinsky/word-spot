import React from 'react';
import LetterBoard from './letterboard/LetterBoard';
import './game.css';

export default function Game() {
	return (
		<>
			<div id='background'>
				<LetterBoard />
			</div>
			<div id='footer'>
				<a
					href='https://github.com/ezpinsky/word-spot/blob/master/README.md'
					target='_blank'
					rel='noreferrer'
				>
					<div className='footerLink githubFooter'>
						<i className='fab fa-github'></i>
						<b>Github</b>
					</div>
				</a>
				<div className='footerTitle'>
					<b id='developedByFooter'>Developed By Ezra Pinsky</b>
				</div>
				<a href='https://www.linkedin.com/in/ezra-pinsky/' target='_blank' rel='noreferrer'>
					<div className='footerLink linkedInFooter'>
						<i className='fab fa-linkedin-in'></i>
						<b>LinkedIn</b>
					</div>
				</a>
			</div>
		</>
	);
}
