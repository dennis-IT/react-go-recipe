import Axios from 'axios';
import * as actionTypes from './actionTypes';
import firebase from "../../firebase";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const addUserToDB = (isSignup, firstName, lastName, email, userId) => {
    return dispatch => {
        if (isSignup) {
            const dbRef = firebase.database().ref(`users/${userId}`);
            const user = {
                'firstName': `${firstName}`,
                'lastName': `${lastName}`,
                'email': `${email}`,
                'userId': `${userId}`
            };
            dbRef.set(user);
        }
    };
};

export const auth = (email, password, isSignup, firstName, lastName) => {
    //Authenticate user | Asynchronous code
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = '';
        if (isSignup) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        }

        Axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(addUserToDB(isSignup, firstName, lastName, email, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    };
};