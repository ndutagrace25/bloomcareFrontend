import {
    FETCH_ENTRY,
    CREATE_ENTRY,
    UPDATE_ENTRY,
    DELETE_ENTRY,
    ENTRY_ERRORS
} from '../actions/types';

const initialState = {
    entry: {},
    entryCreated: {},
    entryUpdated: {},
    entryDeleted: {},
    entryError: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ENTRY:
            return {
                ...state,
                entry: action.payload
            }
            case CREATE_ENTRY:
                return {
                    ...state,
                    entryCreated: action.payload
                }
                case UPDATE_ENTRY:
                    return {
                        ...state,
                        entryUpdated: action.payload
                    }
                    case DELETE_ENTRY:
                        return {
                            ...state,
                            entryDeleted: action.payload
                        }
                        case ENTRY_ERRORS:
                            return {
                                ...state,
                                entryError: action.payload
                            }
                            default:
                                return state;
    }
}