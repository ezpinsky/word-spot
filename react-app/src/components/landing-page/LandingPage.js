import React from 'react';
import './landingpage.css';
import SignUpForm from '../auth/SignUpForm';
import LoginForm from '../auth/LoginForm';
import Footer from '../footer/Footer';
import newBoardGif from '../../gifs/new-board.gif';
import findWordsGif from '../../gifs/find-words.gif';
import rotateBoardGif from '../../gifs/rotate-board.gif';
import createBoardGif from '../../gifs/create-board.gif';

export default function LandingPage({ authType, authenticated, setAuthenticated }) {
	return (
		<>
			<div id='pageContainer'>
				<div id='infoWrapper' className='rounded darkFont'>
					<div id='infoContainer' className='rounded darkFont'>
						<h1 className='paraTitle'>Welcome To WordSpot!</h1>
						<p className='font-larger'>
							WordSpot is a word-finding game similar to boggle with a powerful Depth-First Search
							Algorithm used to generate new letter boards based on user input. The goal is to find
							as many words as you can by connecting adjacent letters in a 4 x 4 letter grid. Keep
							scrolling to find out more!
						</p>
						<br></br>
						<h1 className='paraTitle'>Gameplay</h1>
						<p className='font-larger'>
							To start playing just select any letter and try to connect adjacent letters to make a
							word with three letters or more. Once you you've found a word click the 'Spot' button
							to check. If you're correct, you'll see an encouraging message at the top as well as
							the word you spotted added to the 'Spotted Words' box on the left.
						</p>
						<img className='infoGif' src={findWordsGif} alt='Find Words Gif'></img>
						<h2 className='paraTitle'>Rotate Board</h2>
						<p className='font-larger'>
							Having a hard time finding any new words? Try out the 'Rotate' button on the bottom
							left. This will rotate the letters clockwise and might make some of the words you
							missed easier to spot!
						</p>
						<img className='infoGif' src={rotateBoardGif} alt='Rotate Board Gif'></img>
						<h2 className='paraTitle'>Hints (Not Yet Implemented) </h2>
						<p className='font-larger'>
							Getting stuck? Can't find any more words? Click the '?' button on the bottom left to
							generate a hint for one of the missing words. A hint will be in the form of a word's
							defintion or a few synonyms of the word.
						</p>
						{/* <img className='infoGif' src={''} alt='Word Hint Gif'></img> */}
						<h2 className='paraTitle'>New Board</h2>
						<p className='font-larger'>
							To play a new letter board simply click the 'New Board' button to start shuffling
							through the seeded and player-generated letter boards available!
						</p>
						<img className='infoGif' src={newBoardGif} alt='Word Hint Gif'></img>
						<h2 className='paraTitle'>Create Board</h2>
						<p className='font-larger'>
							If you've finished all the boards or just want to experience the awesome algorithm
							powered board generator, click the 'Create New' button on the right and type 16
							letters. be sure to include at least 6 vowels and only type letters! Click create and
							let the algorithm do its thing! This can take about 10 seconds or less to find a
							suitable orientation of those 16 letters. Once its done you're ready to start playing
							on your custom board!
						</p>
						<img className='infoGif' src={createBoardGif} alt='Word Hint Gif'></img>
					</div>
				</div>
				<div id='authContainer'>
					<div id='logo' className='landingLogo'></div>
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
