import {
    FETCH_SUB_BLOCK,
    CREATE_SUB_BLOCK,
    UPDATE_SUB_BLOCK,
    DELETE_SUB_BLOCK,
    FETCH_BLOCK
} from '../actions/types';

const initialState = {
    subBlock: {},
    subBlockCreated: {},
    subBlockUpdated: {},
    subBlockDeleted: {},
    blockList: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SUB_BLOCK:
            return {
                ...state,
                subBlock: action.payload
            }
            case CREATE_SUB_BLOCK:
                return {
                    ...state,
                    subBlockCreated: action.payload
                }
                case UPDATE_SUB_BLOCK:
                    return {
                        ...state,
                        subBlockUpdated: action.payload
                    }
                    case DELETE_SUB_BLOCK:
                        return {
                            ...state,
                            subBlockDeleted: action.payload
                        }
                        case FETCH_BLOCK:
                            return {
                                ...state,
                                blockList: action.payload
                            }
                        default:
                            return state;
    }
}