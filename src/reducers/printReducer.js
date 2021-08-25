import {FETCH_PRINT_REPORT, PRINT_ERRORS} from '../actions/types'

const initialState = {
    printReport: [],
    printErrors: {}
}

export default function (state = initialState, action) {
    switch(action.type) {
        case FETCH_PRINT_REPORT: 
        return {
            ...state,
            printReport: action.payload
        }
        case PRINT_ERRORS:
            return{
                ...state,
                printErrors: action.payload
            }
            default:
                return state;
    }
}