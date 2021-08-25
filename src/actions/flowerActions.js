import {
    FETCH_FLOWER,
    FLOWER_ERRORS,
    CREATE_FLOWER,
    UPDATE_FLOWER,
    DELETE_FLOWER,
    FETCH_ALL_VARIETY
} from "./types";
import {
    axios,
    createError
} from "../utils";

//Fetch Flower
export const fetchFlower = (page, limit, name) => dispatch => {
    let url = `/variety`;
    url += `?page=${page}&limit=${limit}`;
    if (name !== "") {
        url += `&name=${name}`;
    }
    return axios
        .get(url)
        .then(flower => {
            dispatch({
                type: FETCH_FLOWER,
                payload: flower.data
            });
        })
        .catch(err => {
            dispatch(createError(err, FLOWER_ERRORS));
        });
};

//Create Flower
export const createFlower = flowerDetails => dispatch => {
    let url = `variety`;

    return axios
        .post(url, flowerDetails)
        .then(flower => {
            dispatch({
                type: CREATE_FLOWER,
                payload: flower.data
            });
        })
        .catch(err => {
            dispatch(createError(err, FLOWER_ERRORS));
        });
};

//Edit Flower
export const updateFlower = (_id, flowerDetails) => dispatch => {
    let url = `variety/${_id}`;
    return axios
        .patch(url, flowerDetails)
        .then(flower => {
            dispatch({
                type: UPDATE_FLOWER,
                payload: flower.data
            });
        })
        .catch(err => {
            dispatch(createError(err, FLOWER_ERRORS));
        });
};

//Delete Flower
export const deleteFlower = _id => dispatch => {
    let url = `variety/${_id}`;
    return axios
        .delete(url)
        .then(flower => {
            dispatch({
                type: DELETE_FLOWER,
                payload: flower.data
            });
        })
        .catch(err => {
            dispatch(createError(err, FLOWER_ERRORS));
        });
};
//Fetch All Variety
export const fetchAllVariety = () => dispatch => {
    let url = `/variety/all`;
    axios
      .get(url)
      .then(variety => {
        dispatch({
          type: FETCH_ALL_VARIETY,
          payload: variety.data
        });
      })
      .catch(err => {
        dispatch(createError(err, FLOWER_ERRORS));
      });
  };