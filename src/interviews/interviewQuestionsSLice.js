const initialState = {
    questions: [],
    error: null,
};
  
const interviewQuestionsSlice = (state = initialState, action) => {
    switch (action.type) {
        case 'QUESTIONS_SUCCESS':
        return {
            ...state,
            questions: action.payload,
            error: null,
        };
        case 'QUESTIONS_ERROR':
        return {
            ...state,
            questions: [],
            error: action.payload,
        };
        default:
        return state;
    }
};

export default interviewQuestionsSlice;
