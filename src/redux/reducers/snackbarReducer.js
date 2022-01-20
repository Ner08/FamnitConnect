const snackbarReducer=(state = true, action) => {
    switch (action.type) {
        case 'SET_SNACKBAR_OPENED':
            return !state;
    
        default:
           return state;
    }
};
export default snackbarReducer;