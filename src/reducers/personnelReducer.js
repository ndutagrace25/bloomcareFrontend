import {
    FETCH_PERSONNEL,
    CREATE_PERSONNEL,
    UPDATE_PERSONNEL,
    FETCH_PERSONNEL_TYPE,
    DELETE_PERSONNEL,
    PERSONNEL_ERRORS,
    FETCH_ALL_SCOUT_PERSONNEL,
    FETCH_ALL_PERSONNEL,
    FETCH_SCOUTS
} from '../actions/types';

const initialState = {
    personnel: {},
    personnelCreated: {},
    personnelUpdated: {},
    personnelDeleted: {},
    personnelType: [],
    personnelErrors: {},
    allScoutPersonnel: [],
    allPersonnel: [],
    allScouts: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PERSONNEL:
            return {
                ...state,
                personnel: action.payload
            }
            case FETCH_SCOUTS:
                return {
                    ...state,
                    allScouts: action.payload
                }
            case CREATE_PERSONNEL:
                return {
                    ...state,
                    personnelCreated: action.payload
                }
                case UPDATE_PERSONNEL:
                    return {
                        ...state,
                        personnelUpdated: action.payload
                    }
                    case FETCH_PERSONNEL_TYPE:
                        return {
                            ...state,
                            personnelType: action.payload
                        }
                        case DELETE_PERSONNEL:
                            return {
                                ...state,
                                personnelDeleted: action.payload
                            }
                            case PERSONNEL_ERRORS:
                                return {
                                    ...state,
                                    personnelErrors: action.payload
                                }
                                 case FETCH_ALL_SCOUT_PERSONNEL:
                                    return {
                                        ...state,
                                        allScoutPersonnel: action.payload
                                    }
                                    case FETCH_ALL_PERSONNEL:
                                        return {
                                            ...state,
                                            allPersonnel: action.payload
                                        }
                                default:
                                    return state;
    }
}