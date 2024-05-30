function reducer(state, action) {
    switch (action.type) {
        case 'SET_QUESTIONS':
            return { ...state, questions: action.payload };
        case 'INCREMENT_INDEX':
            return { ...state, questionIndex: state.questionIndex + 1 };
        case 'INCREMENT_SCORE':
            return { ...state, score: state.score + 1 };
        case 'END_GAME':
            return { ...state, isEnded: true };
        default:
            return state;
    }
}

export default reducer