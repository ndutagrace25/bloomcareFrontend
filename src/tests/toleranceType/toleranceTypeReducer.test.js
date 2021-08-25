import {
    FETCH_TOLERANCE_TYPE,
    CREATE_TOLERANCE_TYPE,
    UPDATE_TOLERANCE_TYPE,
    DELETE_TOLERANCE_TYPE
} from '../../actions/types';
import toleranceTypeReducer from '../../reducers/toleranceTypeReducer';

describe('ToleranceType Reducer', () => {
    it('Should return default state', () => {
        const newState = toleranceTypeReducer(undefined, {});
        expect(newState).toEqual({
            toleranceType: {},
            toleranceTypeCreated: {},
            toleranceTypeUpdated: {},
            toleranceTypeDeleted: {},
            toleranceTypeErrors: {},
        });
    })
    it('Should return new toleranceType state if recieving type', () => {
        const toleranceTypes = {
            rows: 2,
            items: [{
                name: 'Test ToleranceType',
                _id: 'ghgh'
            }]
        }

        const newState = toleranceTypeReducer(undefined, {
            type: FETCH_TOLERANCE_TYPE,
            payload: toleranceTypes
        })
        expect(newState.toleranceType).toEqual(toleranceTypes);
    })

    // test for toleranceTypeCreated
    it('Should return new toleranceType state if created', () => {
        const toleranceTypes = {
            rows: 2,
            items: [{
                name: 'Test ToleranceType',
                _id: 'ghgh'
            }]
        }

        const newState = toleranceTypeReducer(undefined, {
            type: CREATE_TOLERANCE_TYPE,
            payload: toleranceTypes
        })
        expect(newState.toleranceTypeCreated).toEqual(toleranceTypes);
    })

    // test for toleranceTypeUpdated
    it('Should return new toleranceType state if updated', () => {
        const toleranceTypes = {
            rows: 2,
            items: [{
                name: 'Test ToleranceType',
                _id: 'ghgh'
            }]
        }

        const newState = toleranceTypeReducer(undefined, {
            type: UPDATE_TOLERANCE_TYPE,
            payload: toleranceTypes
        })
        expect(newState.toleranceTypeUpdated).toEqual(toleranceTypes);
    })

    // test for toleranceTypeDeleted
    it('Should return new toleranceType state if deleted', () => {
        const toleranceTypes = {
            rows: 2,
            items: [{
                name: 'Test ToleranceType',
                _id: 'ghgh'
            }]
        }

        const newState = toleranceTypeReducer(undefined, {
            type: DELETE_TOLERANCE_TYPE,
            payload: toleranceTypes
        })
        expect(newState.toleranceTypeDeleted).toEqual(toleranceTypes);
    })
})