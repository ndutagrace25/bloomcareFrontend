import {
    FETCH_PLANT,
    CREATE_PLANT,
    UPDATE_PLANT,
    DELETE_PLANT,
    FETCH_BLOCK,
    FETCH_BED,
    FETCH_FLOWER,
    PLANT_ERRORS
} from '../actions/types';

const initialState = {
    plant: {},
    plantCreated: {},
    plantUpdated: {},
    plantDeleted: {},
    blockList: [],
    bedList: [],
    flowerList: [],
    plantErrors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PLANT:
            return {
                ...state,
                plant: action.payload
            }
            case CREATE_PLANT:
                return {
                    ...state,
                    plantCreated: action.payload
                }
                case UPDATE_PLANT:
                    return {
                        ...state,
                        plantUpdated: action.payload
                    }
                    case DELETE_PLANT:
                        return {
                            ...state,
                            plantDeleted: action.payload
                        }
                        case FETCH_BLOCK:
                            return {
                                ...state,
                                blockList: action.payload
                            }
                            case FETCH_BED:
                                return {
                                    ...state,
                                    bedList: action.payload
                                }
                                case FETCH_FLOWER:
                                    return {
                                        ...state,
                                        flowerList: action.payload
                                    }
                                    case PLANT_ERRORS:
                                        return {
                                            ...state,
                                            plantErrors: action.payload
                                        }
                                        default:
                                            return state;
    }
}