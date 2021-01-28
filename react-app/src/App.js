import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/game/UsersList';
import User from './components/game/User';
import Game from './components/game/Game';
import LandingPage from './components/landing-page/LandingPage';
import { authenticate } from './services/auth';

function App() {
	const [authenticated, setAuthenticated] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			const user = await authenticate();
			if (!user.errors) {
				setAuthenticated(true);
			}
			setLoaded(true);
		})();
	}, []);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<Switch>
				<Route path='/login' exact={true}>
					<LandingPage
						authType='login'
						authenticated={authenticated}
						setAuthenticated={setAuthenticated}
					/>
				</Route>
				<Route path='/sign-up' exact={true}>
					<LandingPage
						authType='sign-up'
						authenticated={authenticated}
						setAuthenticated={setAuthenticated}
					/>
				</Route>
				<ProtectedRoute path='/users' exact={true} authenticated={authenticated}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path='/users/:userId' exact={true} authenticated={authenticated}>
					<User />
				</ProtectedRoute>
				<ProtectedRoute path='/' exact={true} authenticated={authenticated}>
					<Game authenticated={authenticated} setAuthenticated={setAuthenticated} />
				</ProtectedRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
