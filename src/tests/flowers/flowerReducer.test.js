import {
    FETCH_FLOWER, CREATE_FLOWER, UPDATE_FLOWER, DELETE_FLOWER
} from '../../actions/types';
import flowerReducer from '../../reducers/flowerReducer';

describe('Flower Reducer', () => {
    it('Should return default state', () => {
        const newState = flowerReducer(undefined, {});
        expect(newState).toEqual({
            flower: {},
            flowerCreated: {},
            flowerUpdated: {},
            flowerDeleted: {},
            flowerErrors: {}
        });
    })
    it('Should return new flower state if recieving type', () => {
        const flowers = {
            rows: 2,
            items: [{
                name: 'Test Flower',
                _id: 'ghgh'
            }]
        }

        const newState = flowerReducer(undefined, {
            type: FETCH_FLOWER,
            payload: flowers
        })
        expect(newState.flower).toEqual(flowers);
    })

    // test for flowerCreated
    it('Should return new flower state if created', () => {
        const flowers = {
            rows: 2,
            items: [{
                name: 'Test Flower',
                _id: 'ghgh'
            }]
        }

        const newState = flowerReducer(undefined, {
            type: CREATE_FLOWER,
            payload: flowers
        })
        expect(newState.flowerCreated).toEqual(flowers);
    })

    // test for flowerUpdated
    it('Should return new flower state if updated', () => {
        const flowers = {
            rows: 2,
            items: [{
                name: 'Test Flower',
                _id: 'ghgh'
            }]
        }

        const newState = flowerReducer(undefined, {
            type: UPDATE_FLOWER,
            payload: flowers
        })
        expect(newState.flowerUpdated).toEqual(flowers);
    })

    // test for flowerDeleted
    it('Should return new flower state if deleted', () => {
        const flowers = {
            rows: 2,
            items: [{
                name: 'Test Flower',
                _id: 'ghgh'
            }]
        }

        const newState = flowerReducer(undefined, {
            type: DELETE_FLOWER,
            payload: flowers
        })
        expect(newState.flowerDeleted).toEqual(flowers);
    })
})