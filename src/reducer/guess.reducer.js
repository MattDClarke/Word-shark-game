

function reducer(state, action){ 
    const { type, guessed, answer, nWrong, letter } = action;


    switch(type) {
        case "HANDLE_GUESS": 
            // dnt change mutable data types directly
            const newSet = new Set(guessed.add(letter));              
            return { ...state, guessed: newSet, nWrong: nWrong + (answer.includes(letter) ? 0 : 1) }
        case "RESTART":
            return {
                answer,
                guessed: new Set(),
                nWrong: 0,
            };
        default:
            return state;
    }
}

export default reducer;

