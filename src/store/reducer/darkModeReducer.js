import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    isDarkMode: true
};

const setDarkmode = (state, action) => {
    return updateObject(state, {
        isDarkMode: action.isDarkMode
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_DARKMODE: return setDarkmode(state, action);
        default: return state;
    }
};

export default reducer;