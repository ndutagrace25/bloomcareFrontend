import {
    FETCH_ENTRY,
    ENTRY_ERRORS,
    CREATE_ENTRY,
    UPDATE_ENTRY,
    DELETE_ENTRY,
    FETCH_ALL_ENTRIES
} from "./types";
import {
    axios,
    createError
} from '../utils';

//Fetch Entry
export const fetchEntry = (page, limit, name) => dispatch => {

    let url = `/station`;
    url += `?page=${page}&limit=${limit}`;
    if (name !== '') {
        url += `&name=${name}`;
    }
    return axios
        .get(url)
        .then(entry => {
            dispatch({
                type: FETCH_ENTRY,
                payload: entry.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ENTRY_ERRORS));
        })
}

//Create Entry
export const createEntry = (entryDetails) => dispatch => {
    let url = `station`;
    return axios
        .post(url, entryDetails)
        .then(entry => {
            dispatch({
                type: CREATE_ENTRY,
                payload: entry.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ENTRY_ERRORS));
        })
}

//Edit Entry
export const updateEntry = (_id, entryDetails) => dispatch => {
    let url = `station/${_id}`;
    return axios
        .patch(url, entryDetails)
        .then(entry => {
            dispatch({
                type: UPDATE_ENTRY,
                payload: entry.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ENTRY_ERRORS));
        })
}

//Delete Entry
export const deleteEntry = (_id) => dispatch => {
    let url = `station/${_id}`;
    return axios
        .delete(url)
        .then(entry => {
            dispatch({
                type: DELETE_ENTRY,
                payload: entry.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ENTRY_ERRORS));
        })
}

//Fetch All Entry
export const fetchAllEntries = () => dispatch => {
    let url = `/station/all`;
    axios
        .get(url)
        .then(entry => {
            dispatch({
                type: FETCH_ALL_ENTRIES,
                payload: entry.data
            });
        })
        .catch(err => {
            dispatch(createError(err, ENTRY_ERRORS));
        });
};