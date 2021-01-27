import React, { useEffect, useRef } from 'react';
import SignUpForm from '../auth/SignUpForm';
import LoginForm from '../auth/LoginForm';

export default function LandingPage({ authType, authenticated, setAuthenticated }) {
	return (
		<>
			<div id='pageContainer'>
				<div id='infoContainer'>This is the info</div>
				<div id='authFormContainer'>
					{authType === 'login' ? (
						<LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
					) : (
						<SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
					)}
				</div>
			</div>
		</>
	);
}
