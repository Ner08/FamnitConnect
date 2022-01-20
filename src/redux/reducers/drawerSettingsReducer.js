const drawerSettingsStatusReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_DRAWER_SETTINGS':
            return !state;
    
        default:
           return state;
    }
};
export default drawerSettingsStatusReducer;