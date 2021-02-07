import React from 'react';
import { randomWord } from './words';
import useGuessedState from './hooks/useGuessedState';
import './WordShark.css';
import img0 from './images/0.jpg';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';
import img6 from './images/6.jpg';
import img7 from './images/7.jpg';
import img8 from './images/8.jpg';

function WordShark({maxWrong, images, letters}) {
  const { guessed, answer, nWrong, guessedWord, handleGuess, restart } = useGuessedState(randomWord);


  const generateButtons = (alphabet) => {
    return alphabet.split("").map(letter => (
        <button
          key={letter}
          value={letter}
          onClick={handleGuess}
          disabled={guessed.has(letter)}
          className="ltrBtn"
        >
          {letter}
        </button>
      ));
  }

  const gameOver = nWrong >= maxWrong;
  const isWinner = guessedWord().join('') === answer;
  const altText = ` ${nWrong} wrong guess${nWrong !== 1 ? 'es' : ''}, ${maxWrong - nWrong} guess${maxWrong - nWrong !== 1 ? 'es' : ''} left`;
  const loseMsg = `You lose! The correct word is: ${answer}`;
  const winMsg = 'You win!';
  let gameState = <div className='AlphaButtons'>
    {generateButtons(letters)}
  </div>
  if (isWinner) gameState = <div className="Hangman-msg-win"><span>{winMsg}</span></div>;
  if (gameOver) gameState = <div className="Hangman-msg-lose"><span>{ loseMsg }</span ></div>;

  const fitText = 5.7108 * (answer.length ** -0.933);

  
  return (
    <div className='Hangman'>
      <img src={images[nWrong]} alt={altText} />
      <div className="Hangman-guessContainer">
        <p className="Hangman-guessesLeft">{`${maxWrong - nWrong} guess${(nWrong === (maxWrong - 1)) ? '' : 'es'} left`}</p>
        <p className='Hangman-word' style={{ transform: `scale(
        ${fitText})` }}>{guessedWord()}</p>
      </div>
      <div className="letter-buttons">
        {gameState}
        <button className="Hangman-restartBtn" onClick={restart}>Restart</button>
      </div>
    </div>
  );
}

WordShark.defaultProps = {
  // maxWrong: 8,
  images: [img0, img1, img2, img3, img4, img5, img6, img7, img8],
  letters: "abcdefghijklmnopqrstuvwxyz"
}

export default WordShark;
