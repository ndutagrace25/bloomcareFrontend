import {
    FETCH_PRINT_REPORT,
    PRINT_ERRORS
} from "./types"
import {
    axios,
    createError
} from "../utils";

export const fetchtPrintReport = (block, variety, created_by, created, issue) => dispatch => {

    axios.interceptors.request.use(request => {
        console.log('Starting Request', request)
        return request
    })

    axios.interceptors.response.use(response => {
        console.log('Response:', response)
        return response
    })

    let url = `/scout/bed/entry/report`;
    if (block !== "") {
        url += `?block=${block}`;
    }
    if (variety !== "") {
        url += `&variety=${variety}`;
    }
    if (created_by !== "") {
        url += `&created_by=${created_by}`;
    }
    if (created !== "") {
        url += `&created=${created}`;
    }
    if (issue !== "") {
        url += `&issue=${issue}`;
    }

    axios
        .get(url)
        .then(printReport => {
            dispatch({
                type: FETCH_PRINT_REPORT,
                payload: printReport.data
            })
        })
        .catch(error => {
            dispatch(createError(error, PRINT_ERRORS))
        })
}