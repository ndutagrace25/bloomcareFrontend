import {
    FETCH_BLOCK,
    CREATE_BLOCK,
    UPDATE_BLOCK,
    DELETE_BLOCK,
    CREATE_PARENT_BLOCK,
    FETCH_PARENT_BLOCK,
    BLOCK_ERRORS
} from '../actions/types';

const initialState = {
    block: {},
    blockCreated: {},
    blockUpdated: {},
    blockDeleted: {},
    parentBlockCreated: {},
    parentBlockList: [],
    blockErrors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_BLOCK:
            return {
                ...state,
                block: action.payload
            }
        case CREATE_BLOCK:
            return {
                ...state,
                blockCreated: action.payload
            }
        case UPDATE_BLOCK:
            return {
                ...state,
                blockUpdated: action.payload
            }
        case DELETE_BLOCK:
            return {
                ...state,
                blockDeleted: action.payload
            }
        case CREATE_PARENT_BLOCK:
            return {
                ...state,
                parentBlockCreated: action.payload
            }
        case FETCH_PARENT_BLOCK:
            return {
                ...state,
                parentBlockList: action.payload
            }
        case BLOCK_ERRORS:
            return {
                ...state,
                blockErrors: action.payload
            }
        default:
            return state;
    }
}