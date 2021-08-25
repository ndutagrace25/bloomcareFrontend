import {
    FETCH_POINT,
    CREATE_POINT,
    UPDATE_POINT,
    DELETE_POINT,
    POINT_ERRORS
} from '../actions/types';

const initialState = {
    point: {},
    pointCreated: {},
    pointUpdated: {},
    pointDeleted: {},
    pointErrors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_POINT:
            return {
                ...state,
                point: action.payload
            }
            case CREATE_POINT:
                return {
                    ...state,
                    pointCreated: action.payload
                }
                case UPDATE_POINT:
                    return {
                        ...state,
                        pointUpdated: action.payload
                    }
                    case DELETE_POINT:
                        return {
                            ...state,
                            pointDeleted: action.payload
                        }
                        case POINT_ERRORS:
                        return {
                            ...state,
                            pointErrors: action.payload
                        }
                        default:
                            return state;
    }
}