import {
    FETCH_ISSUE,
    ISSUE_ERRORS,
    CREATE_ISSUE,
    UPDATE_ISSUE,
    DELETE_ISSUE,
    FETCH_ISSUE_TYPE,
    FETCH_TOLERANCE_TYPE,
    FETCH_SCORE,
    FETCH_ALL_ISSUE
} from "./types";
import {
    axios,
    createError
} from '../utils';

//Fetch Issue
export const fetchIssue = (page, limit, issue_name, issue_type, tolerance_type, score) => dispatch => {

    let url = `/issue`;
    url += `?page=${page}&limit=${limit}`;
    if (issue_name !== '') {
        url += `&issue_name=${issue_name}`;
    }

    if (issue_type !== '') {
        url += `&issue_type=${issue_type}`;
    }

    if (tolerance_type !== '') {
        url += `&tolerance_type=${tolerance_type}`;
    }

    if (score !== '') {
        url += `&score=${score}`;
    }
    return axios
        .get(url)
        .then(issue => {
            dispatch({
                type: FETCH_ISSUE,
                payload: issue.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_ERRORS));
        })
}

//Create Issue
export const createIssue = (issueDetails) => dispatch => {
    let url = `issue`;
    return axios
        .post(url, issueDetails)
        .then(issue => {
            dispatch({
                type: CREATE_ISSUE,
                payload: issue.data
            })
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch(createError(err, ISSUE_ERRORS));
        })
}

//Edit Issue
export const updateIssue = (_id, issueDetails) => dispatch => {
    let url = `issue/${_id}`;
    return axios
        .patch(url, issueDetails)
        .then(issue => {
            dispatch({
                type: UPDATE_ISSUE,
                payload: issue.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_ERRORS));
        })
}

//Delete Issue
export const deleteIssue = (_id) => dispatch => {
    let url = `issue/${_id}`;
    return axios
        .delete(url)
        .then(issue => {
            dispatch({
                type: DELETE_ISSUE,
                payload: issue.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_ERRORS));
        })
}

//Fetch Issue Type
export const fetchIssueType = () => dispatch => {

    let url = `/issue-type/all`;
    axios
        .get(url)
        .then(issueType => {
            dispatch({
                type: FETCH_ISSUE_TYPE,
                payload: issueType.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_ERRORS));
        })
}

//Fetch Tolerance Type
export const fetchToleranceType = () => dispatch => {

    let url = `/tolerance-type/all`;
    axios
        .get(url)
        .then(toleranceType => {
            dispatch({
                type: FETCH_TOLERANCE_TYPE,
                payload: toleranceType.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_ERRORS));
        })
}

//Fetch Score 
export const fetchScore = () => dispatch => {

    let url = `/score/all`;
    axios
        .get(url)
        .then(score => {
            dispatch({
                type: FETCH_SCORE,
                payload: score.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_ERRORS));
        })
}

//fetch all issue 
export const fetchAllIssue = () => dispatch => {

    let url = `/issue/all`;
    return axios
        .get(url)
        .then(issue => {
            dispatch({
                type: FETCH_ALL_ISSUE,
                payload: issue.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_ERRORS));
        })
}