const repliesReducer=(state = [], action) => {
    switch (action.type) {
        case 'SET_REPLIES':
            return action.replies;
    
        default:
           return state;
    }
};
export default repliesReducer;