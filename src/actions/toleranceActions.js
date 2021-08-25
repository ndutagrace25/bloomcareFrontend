import {
    FETCH_TOLERANCE,
    TOLERANCE_ERRORS,
    CREATE_TOLERANCE,
    UPDATE_TOLERANCE,
    DELETE_TOLERANCE,
    FETCH_TOLERANCE_TYPE,
    FETCH_ALL_TOLERANCE
} from "./types";
import {
    axios,
    createError
} from '../utils';

//Fetch Tolerance
export const fetchTolerance = (page, limit, name, tolerance_type) => dispatch => {

    let url = `/tolerance`;

    url += `?page=${page}&limit=${limit}`;
    if (name !== '') {
        url += `&name=${name}`;
    }

    if (tolerance_type !== '') {
        url += `&tolerance_type=${tolerance_type}`;
    }
    return axios
        .get(url)
        .then(tolerance => {
            // console.log(tolerance.data);
            dispatch({
                type: FETCH_TOLERANCE,
                payload: tolerance.data
            })
        })
        .catch(err => {
            dispatch(createError(err, TOLERANCE_ERRORS));
        })
}

//Create Tolerance
export const createTolerance = (toleranceDetails) => dispatch => {
    let url = `tolerance`;
    return axios
        .post(url, toleranceDetails)
        .then(tolerance => {
            dispatch({
                type: CREATE_TOLERANCE,
                payload: tolerance.data
            })
        })
        .catch(err => {
            dispatch(createError(err, TOLERANCE_ERRORS));
        })
}

//Edit Tolerance
export const updateTolerance = (_id, toleranceDetails) => dispatch => {
    let url = `tolerance/${_id}`;
    return axios
        .patch(url, toleranceDetails)
        .then(tolerance => {
            dispatch({
                type: UPDATE_TOLERANCE,
                payload: tolerance.data
            })
        })
        .catch(err => {
            dispatch(createError(err, TOLERANCE_ERRORS));
        })
}

//Delete Tolerance
export const deleteTolerance = (_id) => dispatch => {
    let url = `tolerance/${_id}`;
    return axios
        .delete(url)
        .then(tolerance => {
            dispatch({
                type: DELETE_TOLERANCE,
                payload: tolerance.data
            })
        })
        .catch(err => {
            dispatch(createError(err, TOLERANCE_ERRORS));
        })
}

//Fetch Tolerance Type
export const fetchToleranceType = () => dispatch => {

    let url = `/tolerance-type/all`;
    return axios
        .get(url)
        .then(toleranceType => {
            dispatch({
                type: FETCH_TOLERANCE_TYPE,
                payload: toleranceType.data
            })
        })
        .catch(err => {
            dispatch(createError(err, TOLERANCE_ERRORS));
        })
}

//Fetch all Tolerance
export const fetchAllTolerance = () => dispatch => {
    let url = `/tolerance/all`;
    return axios
        .get(url)
        .then(tolerance => {
            dispatch({
                type: FETCH_ALL_TOLERANCE,
                payload: tolerance.data
            })
        })
        .catch(err => {
            dispatch(createError(err, TOLERANCE_ERRORS))
        })
}

