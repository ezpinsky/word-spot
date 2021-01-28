import React, { useEffect, useRef } from 'react';
import './landingpage.css';
import SignUpForm from '../auth/SignUpForm';
import LoginForm from '../auth/LoginForm';
import Footer from '../footer/Footer';

export default function LandingPage({ authType, authenticated, setAuthenticated }) {
	return (
		<>
			<div id='pageContainer'>
				<div id='infoContainer'>This is the info</div>
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
