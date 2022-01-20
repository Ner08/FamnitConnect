const majorGrade=(state = null, action) => {
    switch (action.type) {
        case 'SET_MAJOR_GRADE':
            return action.grade;
    
        default:
           return state;
    }
};
export default majorGrade;