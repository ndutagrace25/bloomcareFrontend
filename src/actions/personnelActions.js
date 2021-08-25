import {
    FETCH_PERSONNEL,
    PERSONNEL_ERRORS,
    CREATE_PERSONNEL,
    UPDATE_PERSONNEL,
    FETCH_PERSONNEL_TYPE,
    DELETE_PERSONNEL,
    FETCH_ALL_SCOUT_PERSONNEL,
    FETCH_ALL_PERSONNEL,
    FETCH_SCOUTS
} from "./types";
import {
    axios,
    createError
} from '../utils';

//Fetch Personnel
export const fetchPersonnel = (page, limit, first_name, last_name, phone, status, personnel_type_id) => dispatch => {

    let url = `/personnel`;
    url += `?page=${page}&limit=${limit}`;
    if (first_name !== '') {
        url += `&first_name=${first_name}`;
    }
    if (last_name !== '') {
        url += `&last_name=${last_name}`;
    }
    if (phone !== '') {
        url += `&phone=${phone}`;
    }
    if (status !== '') {
        url += `&status=${status}`;
    }

    if (personnel_type_id !== '') {
        url += `&personnel_type_id=${personnel_type_id}`;
    }

    return axios
        .get(url)
        .then(personnel => {
            dispatch({
                type: FETCH_PERSONNEL,
                payload: personnel.data
            })
        })
        .catch(err => {
            dispatch(createError(err, PERSONNEL_ERRORS));
        })
}


//Create Personnel
export const createPersonnel = (personnelDetails) => dispatch => {
    let url = `personnel`;
    return axios
        .post(url, personnelDetails)
        .then(personnel => {
            dispatch({
                type: CREATE_PERSONNEL,
                payload: personnel.data
            })
        })
        .catch(err => {
            console.log(err.response.data);
            dispatch(createError(err, PERSONNEL_ERRORS));
        })
}

//Edit Personnel
export const updatePersonnel = (_id, personnelDetails) => dispatch => {
    let url = `personnel/${_id}`;
    return axios
        .patch(url, personnelDetails)
        .then(personnel => {
            dispatch({
                type: UPDATE_PERSONNEL,
                payload: personnel.data
            })
        })
        .catch(err => {
            dispatch(createError(err, PERSONNEL_ERRORS));
        })
}

// Fetch personnel_type_id
export const fetchPesonnelType = () => dispatch => {
    let url = `personnel-type/all`;
    return axios
        .get(url)
        .then(personelType => {
            dispatch({
                type: FETCH_PERSONNEL_TYPE,
                payload: personelType.data
            })
        })
        .catch(err => {
            dispatch(createError(err, PERSONNEL_ERRORS));
        })
}

//Delete personnel
export const deletePersonnel = (_id) => dispatch => {
    let url = `personnel/${_id}`;
    return axios
        .delete(url)
        .then(personnel => {
            dispatch({
                type: DELETE_PERSONNEL,
                payload: personnel.data
            })
        })
        .catch(err => {
            dispatch(createError(err, PERSONNEL_ERRORS));
        })
}

// Fetch all personnel
export const fetchAllPersonnel = () => dispatch => {
    let url = `personnel/all`;
    return axios
        .get(url)
        .then(personel => {
            dispatch({
                type: FETCH_ALL_PERSONNEL,
                payload: personel.data
            })
        })
        .catch(err => {
            dispatch(createError(err, PERSONNEL_ERRORS));
        })
}

// Fetch scouts
export const fetchScouts = () => dispatch => {
    let url = `personnel/scouts`;
    return axios
        .get(url)
        .then(scouts => {
            dispatch({
                type: FETCH_SCOUTS,
                payload: scouts.data
            })
        })
        .catch(err => {
            dispatch(createError(err, PERSONNEL_ERRORS));
        })
}
