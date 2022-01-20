const majorId=(state = null, action) => {
    switch (action.type) {
        case 'SET_MAJORS':
            return action.majors;
    
        default:
           return state;
    }
};
export default majorId;