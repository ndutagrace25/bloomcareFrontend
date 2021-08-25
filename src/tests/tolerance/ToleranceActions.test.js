import moxios from 'moxios';
import {
    testStore
} from '../../utils';

import {
    fetchTolerance,
    createTolerance,
    updateTolerance,
    deleteTolerance
} from '../../actions/toleranceActions';

describe('Tolerance actions', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    describe('fetchTolerance action', () => {

        it('Tolerance store is updated correctly', () => {

            const expectedState = [{
                name: 'Tolerance 1',
                tolerance_type: {},
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

            return store.dispatch(fetchTolerance())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.tolerance.tolerance).toBe(expectedState);
                });
        });

        it('Tolerance fetch errors', () => {

            const expectedState = {
                error: 'Tolerance not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(fetchTolerance())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.tolerance.toleranceErrors).toBe(expectedState.error);
                });
        });
    });

    // test for post request
    describe('createTolerance action', () => {

        it('Create Tolerance store is updated correctly', () => {

            const expectedState = [{
                name: 'Issue 1',
                tolerance_type: {},
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

            return store.dispatch(createTolerance())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.tolerance.toleranceCreated).toBe(expectedState);
                });
        });

        it('Create Tolerance store is updated correctly', () => {

            const expectedState = {
                error: 'Create Tolerance not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(createTolerance())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.tolerance.toleranceErrors).toBe(expectedState.error);
                });
        });
    });

    // test for update request
    describe('updateTolerance action', () => {

        it('Update Tolerance store is updated correctly', () => {

            const expectedState = [{
                name: 'Tolerance 1',
                tolerance_type: {},
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

            return store.dispatch(updateTolerance())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.tolerance.toleranceUpdated).toBe(expectedState);
                });
        });

        it('Update Tolerance store is updated correctly', () => {

            const expectedState = {
                error: 'Update Tolerance not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(updateTolerance())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.tolerance.toleranceErrors).toBe(expectedState.error);
                });
        });
    });

    // test for delete request
    describe('deleteTolerance action', () => {

        it('Delete Tolerance store is updated correctly', () => {

            const expectedState = [{
                name: 'Tolerance 1',
                tolerance_type: {},
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

            return store.dispatch(deleteTolerance())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.tolerance.toleranceDeleted).toBe(expectedState);
                });
        });

        it('Delete Tolerance store is updated correctly', () => {

            const expectedState = {
                error: 'Delete Tolerance not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(deleteTolerance())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.tolerance.toleranceErrors).toBe(expectedState.error);
                });
        });
    });
});