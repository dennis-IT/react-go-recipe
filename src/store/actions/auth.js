import Axios from 'axios';
import * as actionTypes from './actionTypes';
// import firebase from "../../firebase";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const DB_URL = process.env.REACT_APP_FIREBASE_DATABASEURL;

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
    //Clean localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

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

export const getUserSuccess = (userInfo) => {
    return {
        type: actionTypes.GET_USERSUCCESS,
        userInfo: userInfo
    };
};

export const getUserFail = (error) => {
    return {
        type: actionTypes.GET_USERFAIL,
        error: error
    };
};

export const getUser = (token, userId) => {
    return dispatch => {
        Axios.get(`${DB_URL}/users/${userId}.json?auth=${token}`)
            .then(response => {
                const { data } = response;
                dispatch(getUserSuccess(data));
            })
            .catch(error => {
                dispatch(getUserFail(error.response.data.error));
            });
    };
};

export const getFavoriteSuccess = (userFavorite) => {
    return {
        type: actionTypes.GET_FAVORITESUCCESS,
        userFavorite: userFavorite
    };
};

export const getFavoriteFail = (error) => {
    return {
        type: actionTypes.GET_FAVORITEFAIL,
        error: error
    };
};

export const getFavorite = (token, userId) => {
    return dispatch => {
        Axios.get(`${DB_URL}/favorites/${userId}.json?auth=${token}`)
            .then(response => {
                const { data } = response;
                const fetchedFavorites = [];
                for (let key in data) {
                    fetchedFavorites.push({
                        ...data[key]
                    });
                }
                dispatch(getFavoriteSuccess(fetchedFavorites));
            })
            .catch(error => {
                dispatch(getFavoriteFail(error.response.data.error));
            });
    };
};

export const addUserToDB = (isSignup, firstName, lastName, email, userId, token) => {
    return dispatch => {
        if (isSignup) {
            const user = {
                'firstName': `${firstName}`,
                'lastName': `${lastName}`,
                'email': `${email}`,
                'userId': `${userId}`
            };
            // const dbRef = firebase.database().ref(`users/${userId}?auth=${token}`);
            // dbRef.set(user);

            Axios.patch(`${DB_URL}/users/${userId}.json?auth=${token}`, user)
                .then(response => {
                    dispatch(getUser(token, userId));
                    dispatch(getFavorite(token, userId));
                });
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
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(addUserToDB(isSignup, firstName, lastName, email, response.data.localId, response.data.idToken));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    };
};

//!TODO: create an action to check logged state of user when the page is reloaded
export const authCheckState = () => {
    //!NOTE: if you want to run asynchronous code or multiple dispatch action then you need
    //! to return dispatch => ....

    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate')); //!TODO: convert a string from localStorage to date
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};