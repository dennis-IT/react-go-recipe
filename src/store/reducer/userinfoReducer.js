import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userInfo: null,
    error: null
};

const getUserSuccess = (state, action) => {
    return updateObject(state, {
        userInfo: action.userInfo,
        error: null
    });
};

const getUserFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USERSUCCESS: return getUserSuccess(state, action);
        case actionTypes.GET_USERFAIL: return getUserFail(state, action);
        default: return state;
    }
};

export default reducer;