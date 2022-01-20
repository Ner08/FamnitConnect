const uuid=(state = null, action) => {
    switch (action.type) {
        case 'SET_UUID':
            return action.uuid;
    
        default:
           return state;
    }
};
export default uuid;