const initialState = {
    company: null,
    error: null,
  };
  
  const companySlice = (state = initialState, action) => {
    switch (action.type) {
      case 'SUCCESS_COMP_LOG':
        return {
          ...state,
          company: action.payload,
          error: null,
        };
      case 'ERROR_COMP_LOG':
        return {
          ...state,
          company: null,
          error: action.payload,
      };
      case 'COMP_LOGOUT':
        return {
          ...state,
          company: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default companySlice;
  