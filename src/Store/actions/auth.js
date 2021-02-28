import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    };
};

export const authSuccess = (token,id) => {
    return {
        type: actionTypes.AUTH_SUCCES,
        idToken:token,
        localId: id
    };
};

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    };
};

export const auth = (email,password) => {
    return dispatch => {
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5K8bODFilTQFI30nM5C91fxuaZMFtMlg',authData)
        .then( response => {
            dispatch(authSuccess(response.data.idToken,response.data.localId));
        })
        .catch( error => {
            dispatch(authFail(error));
        }
        );
        
    }
}