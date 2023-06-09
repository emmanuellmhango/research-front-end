const initialState = {
    jobs: [],
    error: null,
  };
  
  const jobSlice = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_JOBS_SUCCESS':
        return {
          ...state,
          jobs: action.payload,
          error: null,
        };
      case 'LOGIN_ERROR':
        return {
          ...state,
          jobs: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default jobSlice;
  