import {
    FETCH_TOLERANCE_TYPE,
    TOLERANCE_TYPE_ERRORS,
    CREATE_TOLERANCE_TYPE,
    UPDATE_TOLERANCE_TYPE,
    DELETE_TOLERANCE_TYPE
} from "./types";
import {
    axios,
    createError
} from '../utils';

//Fetch Tolerance Type
export const fetchToleranceType = (page, limit, name) => dispatch => {

    let url = `/tolerance-type`;
    url += `?page=${page}&limit=${limit}`;
    if (name !== '') {
        url += `&name=${name}`;
    }

    return axios
        .get(url)
        .then(toleranceType => {
            dispatch({
                type: FETCH_TOLERANCE_TYPE,
                payload: toleranceType.data
            })
        })
        .catch(err => {
            dispatch(createError(err, TOLERANCE_TYPE_ERRORS));
        })
}

//Create Tolerance Type
export const createToleranceType = (toleranceTypeDetails) => dispatch => {
    let url = `tolerance-type`;
    return axios
        .post(url, toleranceTypeDetails)
        .then(toleranceType => {
            dispatch({
                type: CREATE_TOLERANCE_TYPE,
                payload: toleranceType.data
            })
        })
        .catch(err => {
            dispatch(createError(err, TOLERANCE_TYPE_ERRORS));
        })
}

//Edit Tolerance Type
export const updateToleranceType = (_id, toleranceTypeDetails) => dispatch => {
    let url = `tolerance-type/${_id}`;
    return axios
        .patch(url, toleranceTypeDetails)
        .then(toleranceTypeDetails => {
            dispatch({
                type: UPDATE_TOLERANCE_TYPE,
                payload: toleranceTypeDetails.data
            })
        })
        .catch(err => {
            dispatch(createError(err, TOLERANCE_TYPE_ERRORS));
        })
}

//Delete Tolerance Type
export const deleteToleranceType = (_id) => dispatch => {
    let url = `tolerance-type/${_id}`;
    return axios
        .delete(url)
        .then(toleranceTypeDetails => {
            dispatch({
                type: DELETE_TOLERANCE_TYPE,
                payload: toleranceTypeDetails.data
            })
        })
        .catch(err => {
            dispatch(createError(err, TOLERANCE_TYPE_ERRORS));
        })
}