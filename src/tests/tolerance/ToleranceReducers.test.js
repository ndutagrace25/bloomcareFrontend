import {
    FETCH_TOLERANCE,
    CREATE_TOLERANCE,
    UPDATE_TOLERANCE,
    DELETE_TOLERANCE
} from '../../actions/types';

import toleranceReducer from '../../reducers/toleranceReducer';

describe('Tolerance Reducer', () => {
    it('Should return default state', () => {
        const newState = toleranceReducer(undefined, {});

        expect(newState).toEqual({
            tolerance: {},
            toleranceCreated: {},
            toleranceUpdated: {},
            toleranceDeleted: {},
            toleranceType: [],
            toleranceErrors: {}
        })
    });

    it('Should return a new tolerance state if receiving a tolerance', () => {
        const tolerances = {
            rows: 1,
            items: [{
                name: 'Tolerance 1',
                tolerance_type: {},
                _id: '123456'
            }]
        };

        const newState = toleranceReducer(undefined, {
            type: FETCH_TOLERANCE,
            payload: tolerances
        });

        expect(newState.tolerance).toEqual(tolerances);
    });

    // test for toleranceCreated
    it('Should return a new tolerance state if created a tolerance', () => {
        const tolerances = {
            rows: 1,
            items: [{
                name: 'Tolerance 1',
                tolerance_type: {},
                _id: '123456'
            }]
        };

        const newState = toleranceReducer(undefined, {
            type: CREATE_TOLERANCE,
            payload: tolerances
        });

        expect(newState.toleranceCreated).toEqual(tolerances);
    });

    // test for entryUpdated
    it('Should return a new entry state if updated a tolerance', () => {
        const tolerances = {
            rows: 1,
            items: [{
                name: 'Tolerance 1',
                tolerance_type: {},
                _id: '123456'
            }]
        };

        const newState = toleranceReducer(undefined, {
            type: UPDATE_TOLERANCE,
            payload: tolerances
        });

        expect(newState.toleranceUpdated).toEqual(tolerances);
    });

    // test for Entry deleted
    it('Should return a new entry state if deleted an entry', () => {
        const tolerances = {
            rows: 1,
            items: [{
                name: 'Tolerance 1',
                tolerance_type: {},
                _id: '123456'
            }]
        };

        const newState = toleranceReducer(undefined, {
            type: DELETE_TOLERANCE,
            payload: tolerances
        });

        expect(newState.toleranceDeleted).toEqual(tolerances);
    });
})