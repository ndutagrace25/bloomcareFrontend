import {
    FETCH_POINT,
    CREATE_POINT,
    UPDATE_POINT,
    DELETE_POINT
} from '../../actions/types';

import pointReducer from '../../reducers/pointReducer';

describe('pointReducer Reducer', () => {
    it('Should return default state', () => {
        const newState = pointReducer(undefined, {});

        expect(newState).toEqual({
            point: {},
            pointCreated: {},
            pointUpdated: {},
            pointDeleted: {},
            pointErrors: {}
        })
    });

    it('Should return a new point state if receiving a point', () => {
        const points = {
            rows: 1,
            items: [{
                name: 'pointReducer 1',
                _id: '123456'
            }]
        };

        const newState = pointReducer(undefined, {
            type: FETCH_POINT,
            payload: points
        });

        expect(newState.point).toEqual(points);
    });

    // test for pointCreated
    it('Should return a new point state if created a point', () => {
        const points = {
            rows: 1,
            items: [{
                name: 'pointReducer 1',
                _id: '123456'
            }]
        };

        const newState = pointReducer(undefined, {
            type: CREATE_POINT,
            payload: points
        });

        expect(newState.pointCreated).toEqual(points);
    });

    // test for pointUpdated
    it('Should return a new point state if updated a point', () => {
        const points = {
            rows: 1,
            items: [{
                name: 'pointReducer 1',
                _id: '123456'
            }]
        };

        const newState = pointReducer(undefined, {
            type: UPDATE_POINT,
            payload: points
        });

        expect(newState.pointUpdated).toEqual(points);
    });

    // test for Point deleted
    it('Should return a new point state if deleted an point', () => {
        const points = {
            rows: 1,
            items: [{
                name: 'pointReducer 1',
                point_type: {},
                _id: '123456'
            }]
        };

        const newState = pointReducer(undefined, {
            type: DELETE_POINT,
            payload: points
        });

        expect(newState.pointDeleted).toEqual(points);
    });
})