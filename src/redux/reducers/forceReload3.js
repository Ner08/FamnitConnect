const forceReloadreducer3=(state = false, action) => {
    switch (action.type) {
        case 'SET_RELOAD3':
            return !state;
    
        default:
           return state;
    }
};
export default forceReloadreducer3;