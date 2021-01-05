import * as actionTypes from './actionTypes';

export const darkMode = (status) => {
    return {
        type: actionTypes.SET_DARKMODE,
        isDarkMode: status
    };
};

export const setDarkMode = (status) => {
    return dispatch => {
        localStorage.setItem('darkMode', status);
        dispatch(darkMode(status));
    };
};

export const verifyDarkMode = () => {
    return dispatch => {
        const darkModeStatus = localStorage.getItem('darkMode');
        if (darkModeStatus === 'false') {
            dispatch(darkMode(false));
        } else {
            dispatch(darkMode(true));
        }
    };
};