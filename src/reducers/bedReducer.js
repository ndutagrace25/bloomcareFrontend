import {
    FETCH_BED,
    CREATE_BED,
    UPDATE_BED,
    DELETE_BED,
    FETCH_BLOCK,
    FETCH_FLOWER,
    BED_ERRORS
} from '../actions/types';

const initialState = {
    bed: {},
    bedCreated: {},
    bedUpdated: {},
    bedDeleted: {},
    blockList: [],
    varietyList: [],
    parentBlockList: [],
    bedErrors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_BED:
            return {
                ...state,
                bed: action.payload
            }
        case CREATE_BED:
            return {
                ...state,
                bedCreated: action.payload
            }
        case UPDATE_BED:
            return {
                ...state,
                bedUpdated: action.payload
            }
        case DELETE_BED:
            return {
                ...state,
                bedDeleted: action.payload
            }
        case FETCH_BLOCK:
            return {
                ...state,
                blockList: action.payload
            }
        case FETCH_FLOWER:
            return {
                ...state,
                varietyList: action.payload
            }
        case BED_ERRORS:
            return {
                ...state,
                bedErrors: action.payload
            }
        default:
            return state;
    }
}