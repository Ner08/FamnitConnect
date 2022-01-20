const forceReloadreducer4=(state = false, action) => {
    switch (action.type) {
        case 'SET_RELOAD4':
            return !state;
    
        default:
           return state;
    }
};
export default forceReloadreducer4;