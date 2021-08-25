import moxios from 'moxios';
import {
    testStore
} from '../../utils';

import {
    fetchBlock,
    createBlock,
    updateBlock,
    deleteBlock
} from '../../actions/blockActions';

describe('Block actions', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    describe('fetchBlock action', () => {

        it('Block store is updated correctly', () => {

            const expectedState = [{
                name: 'Block 1',
                number: '1',
                _id: '123456'
            }];

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedState
                });
            });

            return store.dispatch(fetchBlock())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.block.block).toBe(expectedState);
                });
        });

        it('Block fetch errors', () => {

            const expectedState = {
                error: 'Block not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(fetchBlock())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.block.blockErrors).toBe(expectedState.error);
                });
        });
    });

    // test for post request
    describe('createBlock action', () => {

        it('Create Block store is updated correctly', () => {

            const expectedState = [{
                name: 'Block 1',
                number: '1',
                _id: '123456'
            }];

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedState
                });
            });

            return store.dispatch(createBlock())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.block.blockCreated).toBe(expectedState);
                });
        });

        it('Create Block errors', () => {

            const expectedState = {
                error: 'Create Block not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(createBlock())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.block.blockErrors).toBe(expectedState.error);
                });
        });
    });

    // test for update request
    describe('updateBlock action', () => {

        it('Update Block', () => {

            const expectedState = [{
                name: 'Block 1',
                number: '1',
                _id: '123456'
            }];

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedState
                });
            });

            return store.dispatch(updateBlock())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.block.blockUpdated).toBe(expectedState);
                });
        });

        it('Block update errors', () => {

            const expectedState = {
                error: 'Update Block not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(updateBlock())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.block.blockErrors).toBe(expectedState.error);
                });
        });
    });

    // test for delete request
    describe('deleteBlock action', () => {

        it('Delete Issue store is updated correctly', () => {

            const expectedState = [{
                name: 'Block 1',
                number: '1',
                _id: '123456'
            }];

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedState
                });
            });

            return store.dispatch(deleteBlock())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.block.blockDeleted).toBe(expectedState);
                });
        });

        it('Delete Block errors', () => {

            const expectedState = {
                error: 'Delete Block not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(deleteBlock())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.block.blockErrors).toBe(expectedState.error);
                });
        });
    });
});