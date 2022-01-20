const settingsReducer=(state = false, action) => {
    switch (action.type) {
        case 'SET_SETTINGS_OPENED':
            return !state;
    
        default:
           return state;
    }
};
export default settingsReducer;