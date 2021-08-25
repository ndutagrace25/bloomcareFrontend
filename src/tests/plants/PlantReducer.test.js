import {
    FETCH_PLANT,
    CREATE_PLANT,
    UPDATE_PLANT,
    DELETE_PLANT
} from '../../actions/types';

import plantReducer from '../../reducers/plantReducer';

describe('plantReducer Reducer', () => {
    it('Should return default state', () => {
        const newState = plantReducer(undefined, {});

        expect(newState).toEqual({
            plant: {},
            plantCreated: {},
            plantUpdated: {},
            plantDeleted: {},
            blockList: [],
            bedList: [],
            flowerList: [],
            plantErrors: {}
        })
    });

    it('Should return a new plant state if receiving a plant', () => {
        const plants = {
            rows: 1,
            items: [{
                name: 'plantReducer 1',
                _id: '123456'
            }]
        };

        const newState = plantReducer(undefined, {
            type: FETCH_PLANT,
            payload: plants
        });

        expect(newState.plant).toEqual(plants);
    });

    // test for plantCreated
    it('Should return a new plant state if created a plant', () => {
        const plants = {
            rows: 1,
            items: [{
                name: 'plantReducer 1',
                _id: '123456'
            }]
        };

        const newState = plantReducer(undefined, {
            type: CREATE_PLANT,
            payload: plants
        });

        expect(newState.plantCreated).toEqual(plants);
    });

    // test for plantUpdated
    it('Should return a new plant state if updated a plant', () => {
        const plants = {
            rows: 1,
            items: [{
                name: 'plantReducer 1',
                _id: '123456'
            }]
        };

        const newState = plantReducer(undefined, {
            type: UPDATE_PLANT,
            payload: plants
        });

        expect(newState.plantUpdated).toEqual(plants);
    });

    // test for Point deleted
    it('Should return a new plant state if deleted an plant', () => {
        const plants = {
            rows: 1,
            items: [{
                name: 'plantReducer 1',
                plant_type: {},
                _id: '123456'
            }]
        };

        const newState = plantReducer(undefined, {
            type: DELETE_PLANT,
            payload: plants
        });

        expect(newState.plantDeleted).toEqual(plants);
    });
})