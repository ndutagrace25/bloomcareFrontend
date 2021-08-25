import {
    FETCH_TOLERANCE,
    CREATE_TOLERANCE,
    UPDATE_TOLERANCE,
    DELETE_TOLERANCE,
    FETCH_TOLERANCE_TYPE,
    TOLERANCE_ERRORS,
    FETCH_ALL_TOLERANCE

} from '../actions/types';

const initialState = {
    tolerance: {},
    toleranceCreated: {},
    toleranceUpdated: {},
    toleranceDeleted: {},
    toleranceType: [],
    toleranceErrors: {},
    allTolerance: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TOLERANCE:
            return {
                ...state,
                tolerance: action.payload
            }
            case CREATE_TOLERANCE:
                return {
                    ...state,
                    toleranceCreated: action.payload
                }
                case UPDATE_TOLERANCE:
                    return {
                        ...state,
                        toleranceUpdated: action.payload
                    }
                    case DELETE_TOLERANCE:
                        return {
                            ...state,
                            toleranceDeleted: action.payload
                        }
                        case FETCH_TOLERANCE_TYPE:
                            return {
                                ...state,
                                toleranceType: action.payload
                            }
                            case FETCH_ALL_TOLERANCE:
                                return {
                                    ...state,
                                    allTolerance: action.payload
                                }
                                case TOLERANCE_ERRORS:
                                    return {
                                        ...state,
                                        toleranceErrors: action.payload
                                    }
                                    default:
                                        return state;
    }
}