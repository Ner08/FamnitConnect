const forceReloadreducer=(state = false, action) => {
    switch (action.type) {
        case 'SET_RELOAD':
            return !state;
    
        default:
           return state;
    }
};
export default forceReloadreducer;