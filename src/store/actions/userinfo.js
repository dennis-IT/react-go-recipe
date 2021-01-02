import Axios from 'axios';
import * as actionTypes from './actionTypes';

const DB_URL = process.env.REACT_APP_FIREBASE_DATABASEURL;

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

export const getUser = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

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