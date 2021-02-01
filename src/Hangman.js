import React, { Component } from "react";
import AlphaButtons from "./AlphaButtons";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";


class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
    letters: "abcdefghijklmnopqrstuvwxyz"
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, nCorrect: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.generateButtons = this.generateButtons.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
      nCorrect: st.nCorrect + (st.answer.includes(ltr) ? 1 : 0)
    }));

  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons(alphabet) {
    return alphabet.split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  // dnt need a callback function... prev state does not matter... just resetting
  handleRestart() {
    this.setState({
      guessed: new Set(),
      nWrong: 0,
      nCorrect: 0,
      answer: randomWord()
    });    
  }

  /** render: render game */
  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const isWinner = this.guessedWord().join('') === this.state.answer;
    const altText = ` ${this.state.nWrong} wrong guess${this.state.nWrong > 1 ? 'es' : ''}, ${this.props.maxWrong - this.state.nWrong} guess${this.props.maxWrong - this.state.nWrong > 1 ? 'es' : ''} left`;
    const loseMsg = `You lose! The correct word is: ${this.state.answer}`;
    const winMsg = 'You win!';
    let gameState = <AlphaButtons letters={this.props.letters} generateButtons={this.generateButtons} />;
    if (isWinner) gameState = <div className="Hangman-msg-win">{winMsg}</div>;
    if (gameOver) gameState = <div class="Hangman-msg-lose">{loseMsg}</div>;

    return (
      <div className='Hangman'>
        <h1 className="Hangman-header">Hangman</h1>
        
        <img src={this.props.images[this.state.nWrong]} alt={altText} />

        <div className="Hangman-ltrContainer">
          <p className="Hangman-wrongGuesses">{`Incorrect guesses: ${this.state.nWrong}`}</p>
          <p className='Hangman-word'>{this.guessedWord()}</p>
            { gameState }
        </div>
        <button className="Hangman-restartBtn" onClick={this.handleRestart}>Restart</button>

      </div>
    );
  }
}

export default Hangman;
