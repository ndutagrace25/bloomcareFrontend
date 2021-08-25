import {
    FETCH_ISSUE_TYPE,
    ISSUE_TYPE_ERRORS,
    CREATE_ISSUE_TYPE,
    UPDATE_ISSUE_TYPE,
    DELETE_ISSUE_TYPE
} from "./types";
import {
    axios,
    createError
} from '../utils';

//Fetch Issue Type
export const fetchIssueType = (page, limit, name) => dispatch => {

    let url = `/issue-type`;
    url += `?page=${page}&limit=${limit}`;
    if (name !== '') {
        url += `&name=${name}`;
    }
    return axios
        .get(url)
        .then(issueType => {
            dispatch({
                type: FETCH_ISSUE_TYPE,
                payload: issueType.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_TYPE_ERRORS));
        })
}

//Create Issue Type
export const createIssueType = (issueTypeDetails) => dispatch => {
    let url = `issue-type`;
    return axios
        .post(url, issueTypeDetails)
        .then(issueType => {
            dispatch({
                type: CREATE_ISSUE_TYPE,
                payload: issueType.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_TYPE_ERRORS));
        })
}

//Edit Issue Type
export const updateIssueType = (_id, issueTypeDetails) => dispatch => {
    let url = `issue-type/${_id}`;
    return axios
        .patch(url, issueTypeDetails)
        .then(issueType => {
            dispatch({
                type: UPDATE_ISSUE_TYPE,
                payload: issueType.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_TYPE_ERRORS));
        })
}

//Delete Issue Type
export const deleteIssueType = (_id) => dispatch => {
    let url = `issue-type/${_id}`;
    return axios
        .delete(url)
        .then(issueType => {
            dispatch({
                type: DELETE_ISSUE_TYPE,
                payload: issueType.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_TYPE_ERRORS));
        })
}