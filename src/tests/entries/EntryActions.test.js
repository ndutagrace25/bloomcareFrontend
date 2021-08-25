import moxios from 'moxios';
import {
    testStore
} from '../../utils';

import {
    fetchEntry,
    createEntry,
    updateEntry,
    deleteEntry
} from '../../actions/entryActions';

describe('Entry actions', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    describe('fetchEntry action', () => {

        it('Entry store is updated correctly', () => {

            const expectedState = [{
                name: 'Station 1',
                _id: '123456'
            }, {
                name: 'Station 1',
                _id: '123456'
            }, {
                name: 'Station 1',
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

            return store.dispatch(fetchEntry())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.entry.entry).toBe(expectedState);
                });
        });

        it('EntryErrors store is updated correctly', () => {

            const expectedState = {
                error: 'Entry not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(fetchEntry())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.entry.entryError).toBe(expectedState.error);
                });
        });
    });

    // test for post request
    describe('createEntry action', () => {

        it('Create Entry store is updated correctly', () => {

            const expectedState = [{
                name: 'Station 1',
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

            return store.dispatch(createEntry())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.entry.entryCreated).toBe(expectedState);
                });
        });

        it('Create Entry store is updated correctly', () => {

            const expectedState = {
                error: 'Create Entry not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(createEntry())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.entry.entryError).toBe(expectedState.error);
                });
        });
    });

    // test for update request
    describe('updateEntry action', () => {

        it('Update Entry store is updated correctly', () => {

            const expectedState = [{
                name: 'Station 1',
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

            return store.dispatch(updateEntry())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.entry.entryUpdated).toBe(expectedState);
                });
        });

        it('Update Entry store is updated correctly', () => {

            const expectedState = {
                error: 'Update Entry not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(updateEntry())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.entry.entryError).toBe(expectedState.error);
                });
        });
    });

    // test for delete request
    describe('deleteEntry action', () => {

        it('Delete Entry store is updated correctly', () => {

            const expectedState = [{
                name: 'Station 1',
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

            return store.dispatch(deleteEntry())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.entry.entryDeleted).toBe(expectedState);
                });
        });

        it('Delete Entry store is updated correctly', () => {

            const expectedState = {
                error: 'Delete Entry not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(deleteEntry())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.entry.entryError).toBe(expectedState.error);
                });
        });
    });
});