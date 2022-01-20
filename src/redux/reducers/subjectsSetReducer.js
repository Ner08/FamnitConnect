const subjectsSetReducer=(state = [], action) => {
    switch (action.type) {
        case 'SET_SUBJECTS_SET':
            return action.subjects;
    
        default:
           return state;
    }
};
export default subjectsSetReducer;