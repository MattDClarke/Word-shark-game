import { useState } from 'react';

function useGuessedState(randomWord) {
    const [guessed, setGuessed] = useState(new Set());
    const [answer, setAnswer] = useState(randomWord());
    const [nWrong, setNWrong] = useState(0);


    return {    
        guessed, 
        answer,
        nWrong, 

        guessedWord: () => {
            return answer
                .split("")
                .map(letter => (guessed.has(letter) ? letter : "_"));
        },

        /** handle a guessed letter:
          - add to guessed letters
          - if not in answer, increase number-wrong guesses
        */
        handleGuess: (e) => {
            const letter = e.target.value;
            // dnt change mutable state directly
            const newSet = new Set(guessed.add(letter));
            setGuessed(newSet);
            setNWrong(nWrong + (answer.includes(letter) ? 0 : 1));
        },

        restart: () => {
            setGuessed(new Set());
            setAnswer(randomWord());
            setNWrong(0);
        }
    };
};

export default useGuessedState;