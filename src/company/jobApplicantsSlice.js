const initialState = {
    jobApplicants: [],
    error: null,
  };
  
  const jobApplicantsSlice = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_JOBS_SUCCESS':
        return {
          ...state,
          jobApplicants: action.payload,
          error: null,
        };
      case 'LOGIN_ERROR':
        return {
          ...state,
          jobApplicants: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default jobApplicantsSlice;
  