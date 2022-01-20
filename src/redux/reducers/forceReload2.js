const forceReloadreducer2=(state = false, action) => {
    switch (action.type) {
        case 'SET_RELOAD2':
            return !state;
    
        default:
           return state;
    }
};
export default forceReloadreducer2;