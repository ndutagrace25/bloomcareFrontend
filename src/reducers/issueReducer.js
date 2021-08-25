import {
    FETCH_ISSUE,
    CREATE_ISSUE,
    UPDATE_ISSUE,
    DELETE_ISSUE,
    FETCH_ISSUE_TYPE,
    FETCH_TOLERANCE_TYPE,
    FETCH_SCORE,
    ISSUE_ERRORS,
    FETCH_ALL_ISSUE
} from '../actions/types';

const initialState = {
    issue: {},
    issueCreated: {},
    issueUpdated: {},
    issueDeleted: {},
    issueType: [],
    toleranceType: [],
    scoreList: [],
    IssueErrors: {},
    allIssue: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ISSUE:
            return {
                ...state,
                issue: action.payload
            }
            case CREATE_ISSUE:
                return {
                    ...state,
                    issueCreated: action.payload
                }
                case UPDATE_ISSUE:
                    return {
                        ...state,
                        issueUpdated: action.payload
                    }
                    case DELETE_ISSUE:
                        return {
                            ...state,
                            issueDeleted: action.payload
                        }
                        case FETCH_ISSUE_TYPE:
                            return {
                                ...state,
                                issueType: action.payload
                            }
                            case FETCH_TOLERANCE_TYPE:
                                return {
                                    ...state,
                                    toleranceType: action.payload
                                }
                                case FETCH_SCORE:
                                    return {
                                        ...state,
                                        scoreList: action.payload
                                    }
                                    case ISSUE_ERRORS:
                                        return {
                                            ...state,
                                            IssueErrors: action.payload
                                        }
                                        case FETCH_ALL_ISSUE:
                                            return {
                                              ...state,
                                              allIssue: action.payload
                                            }
                                            default:
                                                return state;
    }
}