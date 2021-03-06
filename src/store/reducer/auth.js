import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    userInfo: null,
    userFavorite: null
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        userInfo: null,
        userFavorite: null
    });
};

const getUserSuccess = (state, action) => {
    return updateObject(state, {
        userInfo: action.userInfo
    });
};

const getUserFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const getFavoriteSuccess = (state, action) => {
    return updateObject(state, {
        userFavorite: action.userFavorite
    });
};

const getFavoriteFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.GET_USERSUCCESS: return getUserSuccess(state, action);
        case actionTypes.GET_USERFAIL: return getUserFail(state, action);
        case actionTypes.GET_FAVORITESUCCESS: return getFavoriteSuccess(state, action);
        case actionTypes.GET_FAVORITEFAIL: return getFavoriteFail(state, action);
        default: return state;
    }
};

export default reducer;