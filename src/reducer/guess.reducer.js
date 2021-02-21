function randomWordPreventDuplicate(answer, randomWord) {
    const oldRandomWord = answer;
    let newRandomWord = randomWord();
    if (newRandomWord !== oldRandomWord) {
        console.log('/% aa', 'color:red');
        console.log(newRandomWord);
        return newRandomWord;
    } else {
        console.log('bb');
        randomWordPreventDuplicate(answer, randomWord);
    }
}


function reducer(state, action){ 
    const { type, guessed, answer, nWrong, letter, randomWord } = action;

    switch(type) {
        case "HANDLE_GUESS": 
            // dnt change mutable data types directly
            const newSet = new Set(guessed.add(letter));              
            return { ...state, guessed: newSet, nWrong: nWrong + (answer.includes(letter) ? 0 : 1) }
        case "RESTART":
            console.log('RESTART ');
            return {
                answer: randomWordPreventDuplicate(answer, randomWord),
                // answer: randomWord(),
                guessed: new Set(),
                nWrong: 0,
            };
        default:
            return state;
    }
}

export default reducer;

