import React from 'react';
import './footer.css';

export default function Footer() {
	return (
		<div id='footer'>
			<a
				href='https://github.com/ezpinsky/word-spot/blob/master/README.md'
				target='_blank'
				rel='noreferrer'
				className='lightFont darkHover2'
			>
				<div className='footerLink githubFooter'>
					<i className='fab fa-github'></i>
					<b>Github</b>
				</div>
			</a>
			<a
				href='https://www.linkedin.com/in/ezra-pinsky/'
				target='_blank'
				rel='noreferrer'
				className='lightFont darkHover2'
			>
				<div className='footerLink linkedInFooter'>
					<i className='fab fa-linkedin-in'></i>
					<b>LinkedIn</b>
				</div>
			</a>
			<div className='footerTitle lightFont darkHover2'>
				<b id='developedByFooter'>Developed By Ezra Pinsky</b>
			</div>
			<a
				href='mailto:ezpinsky@gmail.com'
				target='_blank'
				rel='noreferrer'
				className='lightFont darkHover2'
			>
				<div className='footerLink emailFooter'>
					<i className='far fa-envelope'></i>
					<b>Email</b>
				</div>
			</a>
			<a
				href='https://angel.co/u/ezra-pinsky'
				target='_blank'
				rel='noreferrer'
				className='lightFont darkHover2'
			>
				<div className='footerLink emailFooter'>
					<i className='fab fa-angellist'></i>
					<b>AngelList</b>
				</div>
			</a>
		</div>
	);
}
