import React from 'react';
import { randomWord } from './words';

import AlphaButtons from './AlphaButtons';
import useGuessedState from './hooks/useGuessedState';
import './WordShark.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';

function WordShark(props) {
  const { guessed, answer, nWrong, guessedWord, handleGuess, restart } = useGuessedState(randomWord);


  const generateButtons = (alphabet) => {
    return alphabet.split("").map(letter => (
        <button
          key={letter}
          value={letter}
          onClick={handleGuess}
          disabled={guessed.has(letter)}
        >
          {letter}
        </button>
      ));
  }

  const gameOver = nWrong >= props.maxWrong;
  const isWinner = guessedWord().join('') === answer;
  const altText = ` ${nWrong} wrong guess${nWrong > 1 ? 'es' : ''}, ${props.maxWrong - nWrong} guess${props.maxWrong - nWrong > 1 ? 'es' : ''} left`;
  const loseMsg = `You lose! The correct word is: ${answer}`;
  const winMsg = 'You win!';
  let gameState = <AlphaButtons letters={props.letters} generateButtons={generateButtons} />;
  if (isWinner) gameState = <div className="Hangman-msg-win">{winMsg}</div>;
  if (gameOver) gameState = <div className="Hangman-msg-lose">{loseMsg}</div>;

  
  return (
    <div className='Hangman'>
      <h1 className="Hangman-header">Hangman</h1>

      <img src={props.images[nWrong]} alt={altText} />

      <div className="Hangman-ltrContainer">
        <p className="Hangman-wrongGuesses">{`Incorrect guesses: ${nWrong}`}</p>
        <p className='Hangman-word'>{guessedWord()}</p>
        {gameState}
      </div>
      <button className="Hangman-restartBtn" onClick={restart}>Restart</button>
    </div>
  );
}

WordShark.defaultProps = {
  // maxWrong: 6,
  images: [img0, img1, img2, img3, img4, img5, img6],
  letters: "abcdefghijklmnopqrstuvwxyz"
}

export default WordShark;
