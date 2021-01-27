import React from 'react';
import LetterBoard from './letterboard/LetterBoard';
import './game.css';

export default function Game({ setAuthenticated }) {
	return (
		<>
			<div id='background'>
				<LetterBoard setAuthenticated={setAuthenticated} />
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
				<a href='https://www.linkedin.com/in/ezra-pinsky/' target='_blank' rel='noreferrer'>
					<div className='footerLink linkedInFooter'>
						<i className='fab fa-linkedin-in'></i>
						<b>LinkedIn</b>
					</div>
				</a>
				<div className='footerTitle'>
					<b id='developedByFooter'>Developed By Ezra Pinsky</b>
				</div>
				<a href='mailto:ezpinsky@gmail.com' target='_blank' rel='noreferrer'>
					<div className='footerLink emailFooter'>
						<i className='far fa-envelope'></i>
						<b>Email</b>
					</div>
				</a>
				<a href='https://angel.co/u/ezra-pinsky' target='_blank' rel='noreferrer'>
					<div className='footerLink emailFooter'>
						<i className='fab fa-angellist'></i>
						<b>AngelList</b>
					</div>
				</a>
			</div>
		</>
	);
}
