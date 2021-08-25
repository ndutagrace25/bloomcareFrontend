import {
    FETCH_SUB_BLOCK,
    GET_ERRORS,
    CREATE_SUB_BLOCK,
    UPDATE_SUB_BLOCK,
    DELETE_SUB_BLOCK,
} from "./types";
import {
    axios,
    createError
} from '../utils';

//Fetch Sub-Block
export const fetchSubBlock = (page, limit, name, block) => dispatch => {

    let url = `/sub-block`;
    url += `?page=${page}&limit=${limit}`;
    if (name !== '') {
        url += `&name=${name}`;
    }

    if (block !== '') {
        url += `&block=${block}`;
    }
    axios
        .get(url)
        .then(subBlock => {
            console.log(subBlock.data);
            dispatch({
                type: FETCH_SUB_BLOCK,
                payload: subBlock.data
            })
        })
        .catch(err => {
            dispatch(createError(err, GET_ERRORS));
        })
}

//Create Sub-Block
export const createSubBlock = (subBlockDetails) => dispatch => {
    let url = `sub-block`;
    axios
        .post(url, subBlockDetails)
        .then(subBlock => {
            dispatch({
                type: CREATE_SUB_BLOCK,
                payload: subBlock.data
            })
        })
        .catch(err => {
            dispatch(createError(err, GET_ERRORS));
        })
}

//Edit Sub-Block
  export const updateSubBlock = (_id, subBlockDetails) => dispatch => {
    let url = `sub-block/${_id}`;
    axios
        .patch(url, subBlockDetails)
        .then(subBlock => {
            dispatch({
                type: UPDATE_SUB_BLOCK,
                payload: subBlock.data
            })
        })
        .catch(err => {
            dispatch(createError(err, GET_ERRORS));
        })
}

//Delete Sub-Block
export const deleteSubBlock = (_id) => dispatch => {
    let url = `sub-block/${_id}`;
    axios
        .delete(url)
        .then(subBlock => {
            dispatch({
                type: DELETE_SUB_BLOCK,
                payload: subBlock.data
            })
        })
        .catch(err => {
            dispatch(createError(err, GET_ERRORS));
        })
}
