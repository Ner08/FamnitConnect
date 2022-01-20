export const setSnackbarOpen=()=>{
    return {
        type: 'SET_SNACKBAR_OPENED'
    };
};
export const email=(mail)=>{
    return {
        type: 'NEW_EMAIL',
        email: mail
    }
}
export const nickname=(nickname)=>{
    return {
        type: 'SET_NICKNAME',
        nickname: nickname
    }
}
export const collection=(collection)=>{
    return {
        type: 'SET_COLLECTION',
        collection: collection
    }
}
export const replies=(replies)=>{
    return {
        type: 'SET_REPLIES',
        replies: replies
    }
}
export const setId=(uuid)=>{
    return {
        type: 'SET_UUID',
        uuid: uuid
    }
}
export const setSettingsOpen=()=>{
    return {
        type: 'SET_SETTINGS_OPENED'
    };
};
export const setSubjetsSet=(subjects)=>{
    return {
        type: 'SET_SUBJECTS_SET',
        subjects: subjects
    };
};
export const setMajors=(majors)=>{
    return {
        type: 'SET_MAJORS',
        majors: majors
    }
}
export const setMajorGrade=(grade)=>{
    return {
        type: 'SET_MAJOR_GRADE',
        grade: grade
    }
}
export const setforceReload=()=>{
    return {
        type: 'SET_RELOAD'
    };
};
export const setforceReload2=()=>{
    return {
        type: 'SET_RELOAD2'
    };
};
export const setforceReload3=()=>{
    return {
        type: 'SET_RELOAD3'
    };
};
export const setforceReload4=()=>{
    return {
        type: 'SET_RELOAD4'
    };
};
export const setLoading=(loading)=>{
    return {
        type: 'SET_LOADING',
        loading: loading
    };
};
export const setDrawerStatus=()=>{
    return {
        type: 'SET_DRAWER'
    };
};
export const setDrawerStatusSettings=()=>{
    return {
        type: 'SET_DRAWER_SETTINGS'
    };
};