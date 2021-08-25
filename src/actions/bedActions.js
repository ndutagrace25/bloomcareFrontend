import {
    FETCH_BED,
    BED_ERRORS,
    CREATE_BED,
    UPDATE_BED,
    DELETE_BED,
    FETCH_BLOCK,
    FETCH_FLOWER,
    FETCH_ALL_BEDS
} from "./types";
import {
    axios,
    createError
} from '../utils';

//Fetch Bed
export const fetchBed = (page, limit, bed_name, bed_number, block, sub_block_name, variety, plant_date, expected_pick_date, status) => dispatch => {

    let url = `/bed`;
    url += `?page=${page}&limit=${limit}`;
    if (bed_name !== '') {
        url += `&bed_name=${bed_name}`;
    }
    if (bed_number !== '') {
        url += `&bed_number=${bed_number}`;
    }

    if (block !== '') {
        url += `&block=${block}`;
    }
    if (block !== '') {
        url += `&block=${block}`;
    }
    if (sub_block_name !== '') {
        url += `&sub_block_name=${sub_block_name}`;
    }
    if (variety !== '') {
        url += `&variety=${variety}`;
    }
    if (plant_date !== '') {
        url += `&plant_date=${plant_date}`;
    }
    if (expected_pick_date !== '') {
        url += `&expected_pick_date=${expected_pick_date}`;
    }
    if (status !== '') {
        url += `&status=${status}`;
    }
    return axios
        .get(url)
        .then(bed => {
            dispatch({
                type: FETCH_BED,
                payload: bed.data
            })
        })
        .catch(err => {
            dispatch(createError(err, BED_ERRORS));
        })
}

//Create Bed
export const createBed = (bedDetails) => dispatch => {
    console.log(bedDetails);
    let url = `bed`;
    return axios
        .post(url, bedDetails)
        .then(bed => {
            dispatch({
                type: CREATE_BED,
                payload: bed.data
            })
        })
        .catch(err => {
            dispatch(createError(err, BED_ERRORS));
        })
}

//Edit Bed
export const updateBed = (bedId, bedDetails) => dispatch => {
    let url = `bed/${bedId}`;
    return axios
        .patch(url, bedDetails)
        .then(bed => {
            dispatch({
                type: UPDATE_BED,
                payload: bed.data
            })
        })
        .catch(err => {
            dispatch(createError(err, BED_ERRORS));
        })
}

//Delete Bed
export const deleteBed = (_id) => dispatch => {
    let url = `bed/${_id}`;
    return axios
        .delete(url)
        .then(bed => {
            dispatch({
                type: DELETE_BED,
                payload: bed.data
            })
        })
        .catch(err => {
            dispatch(createError(err, BED_ERRORS));
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
            dispatch(createError(err, BED_ERRORS));
        })
}

//Fetch Variety
export const fetchVariety = () => dispatch => {

    let url = `/variety/all`;
    return axios
        .get(url)
        .then(plant => {
            dispatch({
                type: FETCH_FLOWER,
                payload: plant.data
            })
        })
        .catch(err => {
            dispatch(createError(err, BED_ERRORS));
        })
}

//Fetch All Beds
export const fetchAllBeds = () => dispatch => {
    let url = `/bed/all`;
    axios
      .get(url)
      .then(bed => {
        dispatch({
          type: FETCH_ALL_BEDS,
          payload: bed.data
        });
      })
      .catch(err => {
        dispatch(createError(err, BED_ERRORS));
      });
  };