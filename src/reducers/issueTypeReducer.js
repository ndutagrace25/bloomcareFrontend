import {
    FETCH_ISSUE_TYPE,
    CREATE_ISSUE_TYPE,
    UPDATE_ISSUE_TYPE,
    DELETE_ISSUE_TYPE,
    ISSUE_TYPE_ERRORS
} from '../actions/types';

const initialState = {
    issueType: {},
    issueTypeCreated: {},
    issueTypeUpdated: {},
    issueTypeDeleted: {},
    issueTypeErrors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ISSUE_TYPE:
            return {
                ...state,
                issueType: action.payload
            }
            case CREATE_ISSUE_TYPE:
                return {
                    ...state,
                    issueTypeCreated: action.payload
                }
                case UPDATE_ISSUE_TYPE:
                    return {
                        ...state,
                        issueTypeUpdated: action.payload
                    }
                    case DELETE_ISSUE_TYPE:
                        return {
                            ...state,
                            issueTypeDeleted: action.payload
                        }
                        case ISSUE_TYPE_ERRORS:
                                return {
                                    ...state,
                                    issueTypeErrors: action.payload
                                }
                        default:
                            return state;
    }
}