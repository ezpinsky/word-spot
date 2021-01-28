import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../services/auth';

const SignUpForm = ({ authenticated, setAuthenticated }) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const history = useHistory();

	const onSignUp = async e => {
		e.preventDefault();
		if (password === confirmPassword) {
			const user = await signUp(username, email, password);
			if (!user.errors) {
				setAuthenticated(true);
			} else {
				setErrors(user.errors);
			}
		}
	};

	const updateUsername = e => {
		setUsername(e.target.value);
	};

	const updateEmail = e => {
		setEmail(e.target.value);
	};

	const updatePassword = e => {
		setPassword(e.target.value);
	};

	const updateConfirmPassword = e => {
		setConfirmPassword(e.target.value);
	};

	if (authenticated) {
		return <Redirect to='/' />;
	}

	return (
		<form onSubmit={onSignUp}>
			<div className='authFormContainer lightFont'>
				<div>
					{errors.map(error => (
						<div id='authErrorContainer'>{error}</div>
					))}
				</div>
				<div className='authLabelInputWrapper'>
					<div className='authLabelContainer'>
						<label htmlFor='username' className='authLabel'>
							User Name
						</label>
						<label htmlFor='email' className='authLabel'>
							Email
						</label>
						<label htmlFor='password' className='authLabel'>
							Password
						</label>
						<label htmlFor='confirmPassword' className='authLabel'>
							Confirm Password
						</label>
					</div>
					<div className='authInputContainer'>
						<div>
							<input
								type='text'
								name='username'
								onChange={updateUsername}
								placeholder='Username. . .'
								value={username}
								className='lightBkgrnd authInput'
							/>
						</div>
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
						<div>
							<input
								type='password'
								name='confirmPassword'
								onChange={updateConfirmPassword}
								value={confirmPassword}
								placeholder='Confirm Password. . .'
								required={true}
								className='lightBkgrnd authInput'
							></input>
						</div>
					</div>
				</div>
				<div className='authBtnContainer'>
					<button type='submit' className='btn authBtn lightFont'>
						Sign Up
					</button>
				</div>
				<div className='authSwitchLink' onClick={() => history.push('/login')}>
					Already have an account? <br></br>Sign in here!
				</div>
			</div>
		</form>
	);
};

export default SignUpForm;
