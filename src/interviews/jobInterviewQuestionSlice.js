const initialState = {
    jobQuestions: [],
    error: null,
};

  
const jobInterviewQuestionSlice = (state = initialState, action) => {
    switch (action.type) {
      case 'JOB_INT_QUES_SUCCESS':
        return {
          ...state,
          jobQuestions: action.payload,
          error: null,
        };
      case 'JOB_INT_QUES__ERROR':
        return {
          ...state,
          jobQuestions: null,
          error: action.payload,
        };
      default:
        return state;
    }
};
  
export default jobInterviewQuestionSlice;
  