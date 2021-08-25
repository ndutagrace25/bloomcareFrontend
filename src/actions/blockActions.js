import {
    FETCH_BLOCK,
    BLOCK_ERRORS,
    CREATE_BLOCK,
    UPDATE_BLOCK,
    DELETE_BLOCK,
    CREATE_PARENT_BLOCK,
    FETCH_PARENT_BLOCK,
    FETCH_SCOUT_BLOCKS
} from "./types";
import {
    axios,
    createError
} from '../utils';

//Fetch Block
export const fetchBlock = (page, limit, name, parent) => dispatch => {

    let url = `/block`;
    url += `?page=${page}&limit=${limit}`;
    if (name !== '') {
        url += `&name=${name}`;
    }
    if (parent !== '') {
        url += `&parent=${parent}`;
    }

    return axios
        .get(url)
        .then(block => {
            dispatch({
                type: FETCH_BLOCK,
                payload: block.data
            })
        })
        .catch(err => {
            dispatch(createError(err, BLOCK_ERRORS));
        })
}

//Fetch Parent Block
export const fetchParentBlock = () => dispatch => {
    let url = `block/parent-block`
    return axios
        .get(url)
        .then(parentBlock => {

            dispatch({
                type: FETCH_PARENT_BLOCK,
                payload: parentBlock.data
            })
        })
        .catch(err => {
            dispatch(createError(err, BLOCK_ERRORS));
        })
}
//Create block
export const createBlock = (blockDetails) => dispatch => {
    let url = `block`;
    return axios
        .post(url, blockDetails)
        .then(block => {
            dispatch({
                type: CREATE_BLOCK,
                payload: block.data
            })
        })
        .catch(err => {
            dispatch(createError(err, BLOCK_ERRORS));
        })
}

//Create parent block
export const createParentBlock = (blockDetails) => dispatch => {
    let url = `block`;
    blockDetails["parent"] = "";
    return axios
        .post(url, blockDetails)
        .then(parentBlock => {
            dispatch({
                type: CREATE_PARENT_BLOCK,
                payload: parentBlock.data
            })
        })
        .catch(err => {
            dispatch(createError(err, BLOCK_ERRORS));
        })
}

//Edit Block
export const updateBlock = (_id, blockDetails) => dispatch => {
    let url = `block/${_id}`;
    return axios
        .patch(url, blockDetails)
        .then(block => {
            dispatch({
                type: UPDATE_BLOCK,
                payload: block.data
            })
        })

        .catch(err => {
            dispatch(createError(err, BLOCK_ERRORS));
        })
}

//Delete Block
export const deleteBlock = (_id) => dispatch => {
    let url = `block/${_id}`;
    return axios
        .delete(url)
        .then(block => {
            dispatch({
                type: DELETE_BLOCK,
                payload: block.data
            })
        })
        .catch(err => {
            dispatch(createError(err, BLOCK_ERRORS));
        })
}

//Fetch All Blocks
export const fetchAllBlocks = () => dispatch => {
    let url = `/block/all`;
    axios
      .get(url)
      .then(block => {
        dispatch({
          type: FETCH_SCOUT_BLOCKS,
          payload: block.data
        });
      })
      .catch(err => {
        // console.log(err);
        dispatch(createError(err, BLOCK_ERRORS));
      });
  };