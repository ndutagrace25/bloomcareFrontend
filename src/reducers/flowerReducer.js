import {
    FETCH_FLOWER,
    CREATE_FLOWER,
    UPDATE_FLOWER,
    DELETE_FLOWER,
    FLOWER_ERRORS
} from '../actions/types';

const initialState = {
    flower: {},
    flowerCreated: {},
    flowerUpdated: {},
    flowerDeleted: {},
    flowerErrors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_FLOWER:
            return {
                ...state,
                flower: action.payload
            }
        case CREATE_FLOWER:
            return {
                ...state,
                flowerCreated: action.payload
            }
        case UPDATE_FLOWER:
            return {
                ...state,
                flowerUpdated: action.payload
            }
        case DELETE_FLOWER:
            return {
                ...state,
                flowerDeleted: action.payload
            }
        case FLOWER_ERRORS:
            return {
                ...state,
                flowerErrors: action.payload
            }
        default:
            return state;
    }
}