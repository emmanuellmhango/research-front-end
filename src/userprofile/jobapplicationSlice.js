const initialState = {
    applications: [],
    error: null,
};
  
const MyJobApplicationsSlice = (state = initialState, action) => {
    switch (action.type) {
        case 'MY_JOB_APPS_SUCCESS':
        return {
            ...state,
            applications: action.payload,
            error: null,
        };
        case 'MY_JOB_APPS_ERROR':
        return {
            ...state,
            applications: [],
            error: action.payload,
        };
        default:
        return state;
    }
};

export default MyJobApplicationsSlice;
