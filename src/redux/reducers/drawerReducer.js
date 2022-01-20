const drawerStatusReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_DRAWER':
            return !state;
    
        default:
           return state;
    }
};
export default drawerStatusReducer;