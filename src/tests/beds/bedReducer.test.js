import {
    FETCH_BED,
    CREATE_BED,
    UPDATE_BED,
    DELETE_BED,
} from '../../actions/types';
import bedReducer from '../../reducers/bedReducer';

describe('Bed Reducer', () => {
    it('Should return default state', () => {
        const newState = bedReducer(undefined, {});
        expect(newState).toEqual({
            bed: {},
            bedCreated: {},
            bedUpdated: {},
            bedDeleted: {},
            blockList: [],
            parentBlockList: [],
            varietyList: [],
            bedErrors: {}
        });
    })
    it('Should return new bed state if recieving type', () => {
        const beds = {
            rows: 2,
            items: [{
                name: 'Test Bed',
                _id: 'ghgh'
            }]
        }

        const newState = bedReducer(undefined, {
            type: FETCH_BED,
            payload: beds
        })
        expect(newState.bed).toEqual(beds);
    })

    // test for bedCreated
    it('Should return new bed state if created', () => {
        const beds = {
            rows: 2,
            items: [{
                name: 'Test Bed',
                _id: 'ghgh'
            }]
        }

        const newState = bedReducer(undefined, {
            type: CREATE_BED,
            payload: beds
        })
        expect(newState.bedCreated).toEqual(beds);
    })

    // test for bedUpdated
    it('Should return new bed state if updated', () => {
        const beds = {
            rows: 2,
            items: [{
                name: 'Test Bed',
                _id: 'ghgh'
            }]
        }

        const newState = bedReducer(undefined, {
            type: UPDATE_BED,
            payload: beds
        })
        expect(newState.bedUpdated).toEqual(beds);
    })

    // test for bedDeleted
    it('Should return new bed state if deleted', () => {
        const beds = {
            rows: 2,
            items: [{
                name: 'Test Bed',
                _id: 'ghgh'
            }]
        }

        const newState = bedReducer(undefined, {
            type: DELETE_BED,
            payload: beds
        })
        expect(newState.bedDeleted).toEqual(beds);
    })
})