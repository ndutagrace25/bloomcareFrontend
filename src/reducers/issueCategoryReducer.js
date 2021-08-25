import {
    FETCH_ISSUE_CATEGORY,
    CREATE_ISSUE_CATEGORY,
    UPDATE_ISSUE_CATEGORY,
    DELETE_ISSUE_CATEGORY,
    FETCH_ISSUE,
    ISSUE_CATEGORY_ERRORS,
    FETCH_ALL_ISSUE_CATEGORY
} from '../actions/types';

const initialState = {
    issueCategory: {},
    issueCategoryCreated: {},
    issueCategoryUpdated: {},
    issueCategoryDeleted: {},
    issueCategoryErrors: {},
    issueList: [],
    allIssueCategory: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ISSUE_CATEGORY:
            return {
                ...state,
                issueCategory: action.payload
            }
        case CREATE_ISSUE_CATEGORY:
            return {
                ...state,
                issueCategoryCreated: action.payload
            }
        case UPDATE_ISSUE_CATEGORY:
            return {
                ...state,
                issueCategoryUpdated: action.payload
            }
        case DELETE_ISSUE_CATEGORY:
            return {
                ...state,
                issueCategoryDeleted: action.payload
            }
        case FETCH_ISSUE:
            return {
                ...state,
                issueList: action.payload
            }
        case ISSUE_CATEGORY_ERRORS:
            return {
                ...state,
                issueCategoryErrors: action.payload
            }
            case FETCH_ALL_ISSUE_CATEGORY:
            return {
                ...state,
                allIssueCategory: action.payload
            }
        default:
            return state;
    }
}