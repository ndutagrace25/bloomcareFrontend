import {
    FETCH_ISSUE_CATEGORY,
    ISSUE_CATEGORY_ERRORS,
    CREATE_ISSUE_CATEGORY,
    UPDATE_ISSUE_CATEGORY,
    DELETE_ISSUE_CATEGORY,
    FETCH_ISSUE,
    FETCH_ALL_ISSUE_CATEGORY
} from "./types";
import {
    axios,
    createError
} from '../utils';

//Fetch IssueCategory
export const fetchIssueCategory = (page, limit, name, issue) => dispatch => {

    let url = `/issue-category`;
    url += `?page=${page}&limit=${limit}`;
    if (name !== '') {
        url += `&name=${name}`;
    }
    if (issue !== '') {
        url += `&issue=${issue}`;
    }

    return axios
        .get(url)
        .then(issueCategory => {
            dispatch({
                type: FETCH_ISSUE_CATEGORY,
                payload: issueCategory.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_CATEGORY_ERRORS));
        })
}

//Create IssueCategory
export const createIssueCategory = (issueCategoryDetails) => dispatch => {
    let url = `issue-category`;
    return axios
        .post(url, issueCategoryDetails)
        .then(issueCategory => {
            dispatch({
                type: CREATE_ISSUE_CATEGORY,
                payload: issueCategory.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_CATEGORY_ERRORS));
        })
}

//Edit IssueCategory
export const updateIssueCategory = (_id, issueCategoryDetails) => dispatch => {
    let url = `issue-category/${_id}`;
    return axios
        .patch(url, issueCategoryDetails)
        .then(issueCategory => {
            dispatch({
                type: UPDATE_ISSUE_CATEGORY,
                payload: issueCategory.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_CATEGORY_ERRORS));
        })
}

//Delete Issue Category
export const deleteIssueCategory = (_id) => dispatch => {
    let url = `issue-category/${_id}`;
    return axios
        .delete(url)
        .then(issueCategory => {
            dispatch({
                type: DELETE_ISSUE_CATEGORY,
                payload: issueCategory.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_CATEGORY_ERRORS));
        })
}

//Fetch Issue
export const fetchIssue = () => dispatch => {

    let url = `/issue/all`;
    return axios
        .get(url)
        .then(issue => {
            dispatch({
                type: FETCH_ISSUE,
                payload: issue.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_CATEGORY_ERRORS));
        })
}

//Fetch all Issuecategories
export const fetchAllIssueCategory = () => dispatch => {

    let url = `/issue-category/all`;
    return axios
        .get(url)
        .then(issueCategory => {
            dispatch({
                type: FETCH_ALL_ISSUE_CATEGORY,
                payload: issueCategory.data
            })
        })
        .catch(err => {
            dispatch(createError(err, ISSUE_CATEGORY_ERRORS));
        })
}