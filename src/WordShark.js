import React, { useReducer } from 'react';
import { randomWord } from './words';
import guessReducer from './reducer/guess.reducer';
import './WordShark.css';
import background from './images/word-shark_background.jpg';
import img0 from './images/0.svg';
import img1 from './images/1.svg';
import img2 from './images/2.svg';
import img3 from './images/3.svg';
import img4 from './images/4.svg';
import img5 from './images/5.svg';
import img6 from './images/6.svg';
import img7 from './images/7.svg';
import img8 from './images/8.svg';


// set initial state
export const init = randomWord => ({
  guessed: new Set(),
  answer: randomWord,
  nWrong: 0,
});


function WordShark({ maxWrong, images, letters }) {
  const [state, dispatch] = useReducer(guessReducer, randomWord(), init);
  const { guessed, answer, nWrong } = state; 
  
  const generateButtons = (alphabet) => {
    console.log('genBtns funct');
    return alphabet.split("").map(letter => (
        <button
          key={letter}
          value={letter}
          onClick={() => dispatch({ type: "HANDLE_GUESS", letter, guessed, nWrong, answer })}
          disabled={guessed.has(letter)}
          className="ltrBtn"
        >
          {letter}
        </button>
      ));
  }

  function guessedWord() {
    console.log("guessedWord");
      return answer
          .split("")
        .map(letter => (guessed.has(letter) ? letter : "_"));
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
      <div className="Hangman-imgContainer">
        <img className="Hangman-WordSharkBackgroundImg" src={background} alt="background for Word Shark, showing stickman and shark"/>
        <img className="Hangman-WordSharkOverlayImgs" src={images[nWrong]} alt={altText} />
      </div>
      <div className="Hangman-guessContainer">
        <p className="Hangman-guessesLeft">{`${maxWrong - nWrong} guess${(nWrong === (maxWrong - 1)) ? '' : 'es'} left`}</p>
        <p className='Hangman-word' style={{ transform: `scale(
        ${fitText})` }}>{guessedWord()}</p>
      </div>
      <div className="letter-buttons">
        {gameState}
        <button className="Hangman-restartBtn" onClick={() => dispatch({ type: "RESTART", randomWord: randomWord()})}>Restart</button>
      </div>
    </div>
  );
}

WordShark.defaultProps = {
  maxWrong: 8,
  images: [img0, img1, img2, img3, img4, img5, img6, img7, img8],
  letters: "abcdefghijklmnopqrstuvwxyz"
}

export default WordShark;
