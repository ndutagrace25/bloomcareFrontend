import {
    FETCH_ENTRY,
    CREATE_ENTRY,
    UPDATE_ENTRY,
    DELETE_ENTRY
} from '../../actions/types';

import entryReducer from '../../reducers/entryReducer';

describe('Entry Reducer', () => {
    it('Should return default state', () => {
        const newState = entryReducer(undefined, {});

        expect(newState).toEqual({
            entry: {},
            entryError: {},
            entryCreated: {},
            entryUpdated: {},
            entryDeleted: {}
        })
    });

    it('Should return a new entry state if receiving an entry', () => {
        const entries = {
            rows: 1,
            items: [{
                name: 'Station 1',
                _id: '1234'
            }]
        };

        const newState = entryReducer(undefined, {
            type: FETCH_ENTRY,
            payload: entries
        });

        expect(newState.entry).toEqual(entries);
    });

    // test for entryCreated
    it('Should return a new entry state if created an entry', () => {
        const entries = {
            rows: 1,
            items: [{
                name: 'Station 1',
                _id: '1234'
            }]
        };

        const newState = entryReducer(undefined, {
            type: CREATE_ENTRY,
            payload: entries
        });

        expect(newState.entryCreated).toEqual(entries);
    });

    // test for entryUpdated
    it('Should return a new entry state if updated an entry', () => {
        const entries = {
            rows: 1,
            items: [{
                name: 'Station 1',
                _id: '1234'
            }]
        };

        const newState = entryReducer(undefined, {
            type: UPDATE_ENTRY,
            payload: entries
        });

        expect(newState.entryUpdated).toEqual(entries);
    });

    // test for Entry deleted
    it('Should return a new entry state if deleted an entry', () => {
        const entries = {
            rows: 1,
            items: [{
                name: 'Station 1',
                _id: '123456'
            }]
        };

        const newState = entryReducer(undefined, {
            type: DELETE_ENTRY,
            payload: entries
        });

        expect(newState.entryDeleted).toEqual(entries);
    });
})