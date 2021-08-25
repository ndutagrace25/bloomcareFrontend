import {
    FETCH_TOLERANCE_TYPE,
    CREATE_TOLERANCE_TYPE,
    UPDATE_TOLERANCE_TYPE,
    DELETE_TOLERANCE_TYPE,
    TOLERANCE_TYPE_ERRORS
} from '../actions/types';

const initialState = {
    toleranceType: {},
    toleranceTypeCreated: {},
    toleranceTypeUpdated: {},
    toleranceTypeDeleted: {},
    toleranceTypeErrors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TOLERANCE_TYPE:
            return {
                ...state,
                toleranceType: action.payload
            }
            case CREATE_TOLERANCE_TYPE:
                return {
                    ...state,
                    toleranceTypeCreated: action.payload
                }
                case UPDATE_TOLERANCE_TYPE:
                    return {
                        ...state,
                        toleranceTypeUpdated: action.payload
                    }
                    case DELETE_TOLERANCE_TYPE:
                        return {
                            ...state,
                            toleranceTypeDeleted: action.payload
                        }
                        case TOLERANCE_TYPE_ERRORS:
                            return {
                                ...state,
                                toleranceTypeErrors: action.payload
                            }
                            default:
                                return state;
    }
}