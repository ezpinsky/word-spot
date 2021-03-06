import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../services/auth';

const LoginForm = ({ authenticated, setAuthenticated }) => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	let history = useHistory();

	const onLogin = async e => {
		e.preventDefault();
		const user = await login(email, password);
		if (!user.errors) {
			setAuthenticated(true);
		} else {
			setErrors(user.errors);
		}
	};

	const demoLogin = async e => {
		e.preventDefault();
		const user = await login('demo@email.com', 'password');
		if (!user.errors) {
			setAuthenticated(true);
		} else {
			setErrors(user.errors);
		}
	};

	const updateEmail = e => {
		setEmail(e.target.value);
	};

	const updatePassword = e => {
		setPassword(e.target.value);
	};

	if (authenticated) {
		return <Redirect to='/' />;
	}

	return (
		<>
			<form onSubmit={onLogin}>
				<div className='authFormContainer lightFont'>
					<div>
						{errors.map(error => (
							<div id='authErrorContainer'>{error}</div>
						))}
					</div>
					<div className='authLabelInputWrapper'>
						<div className='authLabelContainer'>
							<label htmlFor='email' className='authLabel'>
								Email
							</label>
							<label htmlFor='password'>Password</label>
						</div>
						<div className='authInputContainer'>
							<div>
								<input
									name='email'
									type='text'
									placeholder='Email. . .'
									value={email}
									onChange={updateEmail}
									className='lightBkgrnd rounded authInput'
								/>
							</div>
							<div>
								<input
									name='password'
									type='password'
									placeholder='Password. . .'
									value={password}
									onChange={updatePassword}
									className='lightBkgrnd rounded authInput'
								/>
							</div>
						</div>
					</div>
					<div className='authBtnContainer'>
						<button onClick={demoLogin} type='submit' className='btn authBtn lightFont darkHover'>
							Demo
						</button>
						<button type='submit' className='btn authBtn lightFont darkHover'>
							Login
						</button>
					</div>
					<div className='authSwitchLink' onClick={() => history.push('/sign-up')}>
						Don't have an account? Sign up here!
					</div>
				</div>
			</form>
		</>
	);
};

export default LoginForm;
