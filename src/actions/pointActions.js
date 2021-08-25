import {
    FETCH_POINT,
    POINT_ERRORS,
    CREATE_POINT,
    UPDATE_POINT,
    DELETE_POINT
} from "./types";
import {
    axios,
    createError
} from '../utils';

//Fetch Point
export const fetchPoint = (page, limit, name) => dispatch => {

    let url = `/point`;
    url += `?page=${page}&limit=${limit}`;
    if (name !== '') {
        url += `&name=${name}`;
    }
    return axios
        .get(url)
        .then(point => {
            dispatch({
                type: FETCH_POINT,
                payload: point.data
            })
        })
        .catch(err => {
            dispatch(createError(err, POINT_ERRORS));
        })
}

//Create Point
export const createPoint = (pointDetails) => dispatch => {
    let url = `point`;
    return axios
        .post(url, pointDetails)
        .then(point => {
            dispatch({
                type: CREATE_POINT,
                payload: point.data
            })
        })
        .catch(err => {
            dispatch(createError(err, POINT_ERRORS));
        })
}

//Edit Point
export const updatePoint = (_id, pointDetails) => dispatch => {
    let url = `point/${_id}`;
    return axios
        .patch(url, pointDetails)
        .then(point => {
            dispatch({
                type: UPDATE_POINT,
                payload: point.data
            })
        })
        .catch(err => {
            dispatch(createError(err, POINT_ERRORS));
        })
}

//Delete Point
export const deletePoint = (_id) => dispatch => {
    let url = `point/${_id}`;
    return axios
        .delete(url)
        .then(point => {
            dispatch({
                type: DELETE_POINT,
                payload: point.data
            })
        })
        .catch(err => {
            dispatch(createError(err, POINT_ERRORS));
        })
}