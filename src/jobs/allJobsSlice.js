const initialState = {
  allJobs: [],
  error: null,
};

const allJobsSlice = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_JOBS_SUCCESS':
      return {
        ...state,
        allJobs: action.payload,
        error: null,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        allJobs: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default allJobsSlice;
