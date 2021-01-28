import React from 'react';
import './landingpage.css';
import SignUpForm from '../auth/SignUpForm';
import LoginForm from '../auth/LoginForm';
import Footer from '../footer/Footer';

export default function LandingPage({ authType, authenticated, setAuthenticated }) {
	return (
		<>
			<div id='pageContainer'>
				<div id='infoWrapper'>
					<div id='infoContainer' className='rounded'>
						<h2>What is WordSpot?</h2>
						<p>
							WordSpot is a timed word-finding game similar to boggle but with a powerful
							depth-first search algorithm used to generate new letter boards based on user input.
							Find as many words as you can by connecting adjacent letters in a 4 x 4 letter grid.
						</p>
					</div>
				</div>
				<div id='authContainer'>
					<div id='logoBackground'>
						<div id='logo' className='landingLogo'></div>
					</div>
					<div id='authForm'>
						{authType === 'login' ? (
							<>
								<h1 className='lightFont authTitle'>Login</h1>
								<LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
							</>
						) : (
							<>
								<h1 className='lightFont'>Sign Up</h1>
								<SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
							</>
						)}
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}
