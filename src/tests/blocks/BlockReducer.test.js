import {
    FETCH_BLOCK,
    CREATE_BLOCK,
    UPDATE_BLOCK,
    DELETE_BLOCK
} from '../../actions/types';

import blockReducer from '../../reducers/blockReducer';

describe('Block Reducer', () => {
    it('Should return default state', () => {
        const newState = blockReducer(undefined, {});

        expect(newState).toEqual({
            block: {},
            blockCreated: {},
            blockUpdated: {},
            blockDeleted: {},
            parentBlockCreated: {},
            parentBlockList: [],
            blockErrors: {}
        })
    });

    it('Should return a new block state if receiving a block', () => {
        const blocks = {
            rows: 1,
            items: [{
                name: 'Block 1',
                number: '1',
                _id: '123456'
            }]
        };

        const newState = blockReducer(undefined, {
            type: FETCH_BLOCK,
            payload: blocks
        });

        expect(newState.block).toEqual(blocks);
    });

    // test for blockCreated
    it('Should return a new block state if created a block', () => {
        const blocks = {
            rows: 1,
            items: [{
                name: 'Block 1',
                number: '1',
                _id: '123456'
            }]
        };

        const newState = blockReducer(undefined, {
            type: CREATE_BLOCK,
            payload: blocks
        });

        expect(newState.blockCreated).toEqual(blocks);
    });

    // test for entryUpdated
    it('Should return a new entry state if updated a block', () => {
        const blocks = {
            rows: 1,
            items: [{
                name: 'Block 1',
                number: '1',
                _id: '123456'
            }]
        };

        const newState = blockReducer(undefined, {
            type: UPDATE_BLOCK,
            payload: blocks
        });

        expect(newState.blockUpdated).toEqual(blocks);
    });

    // test for Entry deleted
    it('Should return a new entry state if deleted an entry', () => {
        const blocks = {
            rows: 1,
            items: [{
                name: 'Block 1',
                number: '1',
                _id: '123456'
            }]
        };

        const newState = blockReducer(undefined, {
            type: DELETE_BLOCK,
            payload: blocks
        });

        expect(newState.blockDeleted).toEqual(blocks);
    });
})