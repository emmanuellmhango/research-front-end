const initialState = {
    singleJob: [],
    error: null,
  };
  
  const singleJobSlice = (state = initialState, action) => {
    switch (action.type) {
      case 'SINGLE_JOB_SUCCESS':
        return {
          ...state,
          singleJob: action.payload,
          error: null,
        };
      case 'SINGLE_JOB_ERROR':
        return {
          ...state,
          singleJob: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default singleJobSlice;
  