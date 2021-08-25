import {
    FETCH_PLANT,
    PLANT_ERRORS,
    CREATE_PLANT,
    UPDATE_PLANT,
    DELETE_PLANT,
    FETCH_BLOCK,
    FETCH_BED,
    FETCH_FLOWER
} from "./types";
import {
    axios,
    createError
} from '../utils';

//Fetch Plant
export const fetchPlant = (page, limit, plant_date, expected_pick_date, status, block, bed, flower) => dispatch => {

    let url = `/plant`;
    url += `?page=${page}&limit=${limit}`;
    if (plant_date !== '') {
        url += `&plant_date=${plant_date}`;
    }
    if (expected_pick_date !== '') {
        url += `&expected_pick_date=${expected_pick_date}`;
    }

    if (status !== '') {
        url += `&status=${status}`;
    }

    if (block !== '') {
        url += `&block=${block}`;
    }

    if (bed !== '') {
        url += `&bed=${bed}`;
    }

    if (flower !== '') {
        url += `&flower=${flower}`;
    }
    return axios
        .get(url)
        .then(plant => {
            dispatch({
                type: FETCH_PLANT,
                payload: plant.data
            })
        })
        .catch(err => {
            dispatch(createError(err, PLANT_ERRORS));
        })
}

//Create Plant
export const createPlant = (plantDetails) => dispatch => {
    let url = `plant`;
    return axios
        .post(url, plantDetails)
        .then(plant => {
            dispatch({
                type: CREATE_PLANT,
                payload: plant.data
            })
        })
        .catch(err => {
            dispatch(createError(err, PLANT_ERRORS));
        })
}

//Edit Plant
export const updatePlant = (_id, plantDetails) => dispatch => {
    let url = `plant/${_id}`;
    return axios
        .patch(url, plantDetails)
        .then(plant => {
            dispatch({
                type: UPDATE_PLANT,
                payload: plant.data
            })
        })
        .catch(err => {
            dispatch(createError(err, PLANT_ERRORS));
        })
}

//Delete Plant
export const deletePlant = (_id) => dispatch => {
    let url = `plant/${_id}`;
    return axios
        .delete(url)
        .then(plant => {
            dispatch({
                type: DELETE_PLANT,
                payload: plant.data
            })
        })
        .catch(err => {
            dispatch(createError(err, PLANT_ERRORS));
        })
}

//Fetch Block
export const fetchBlock = () => dispatch => {

    let url = `/block/all`;
    return axios
        .get(url)
        .then(block => {
            dispatch({
                type: FETCH_BLOCK,
                payload: block.data
            })
        })
        .catch(err => {
            dispatch(createError(err, PLANT_ERRORS));
        })
}

//Fetch Bed
export const fetchBed = () => dispatch => {

    let url = `/bed/all`;
    return axios
        .get(url)
        .then(bed => {
            dispatch({
                type: FETCH_BED,
                payload: bed.data
            })
        })
        .catch(err => {
            dispatch(createError(err, PLANT_ERRORS));
        })
}

//Fetch Flower
export const fetchFlower = () => dispatch => {

    let url = `/flower/all`;
    return axios
        .get(url)
        .then(plant => {
            dispatch({
                type: FETCH_FLOWER,
                payload: plant.data
            })
        })
        .catch(err => {
            dispatch(createError(err, PLANT_ERRORS));
        })
}