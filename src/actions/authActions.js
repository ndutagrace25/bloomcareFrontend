import axios from '../utils/axios';
import jwt_decode from "jwt-decode";
import setAuthToken from "../utilities/setAuthToken";
import {
    GET_ERRORS,
    SET_CURRENT_PERSONNEL,
    SET_PASSWORD_RESET
} from "./types";

//login personnel
export const loginPersonnel = (userData, history) => dispatch => {
    axios
        .post("personnel/login", userData)
        .then(res => {
            const {
                accessToken
            } = res.data;

            //set token to local storage
            localStorage.setItem("jwtToken", accessToken);
            //set token to auth header
            setAuthToken(accessToken);
            //decode token to get user data
            const decoded = jwt_decode(accessToken);
            //set current user
            dispatch(setCurrentUser(decoded));

        })
        .catch(err => {
            if (err.response === undefined) {
                history.push('/');
                let errors = {
                    server: "Network Error: Kindly, contact the admin."
                }
                dispatch({
                    type: GET_ERRORS,
                    payload: errors
                })
            } else {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data.error
                })
            }
        })
}

//log out personnel
export const logoutPersonnel = () => dispatch => {
    //remove token from local storage
    localStorage.removeItem("jwtToken");
    //remove auth header for future requests
    setAuthToken(false);
    //set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}

//reset personnel password
export const resetPersonnelPassword = useData => dispatch => {
    axios
        .patch("personnel/reset_password", useData)
        .then(res => {
            dispatch(setPasswordReset());
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.error
            })
        })
}

//set current user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_PERSONNEL,
        payload: decoded
    }
}

//reset password
export const setPasswordReset = decoded => {
    return {
        type: SET_PASSWORD_RESET,
        payload: decoded
    }
}