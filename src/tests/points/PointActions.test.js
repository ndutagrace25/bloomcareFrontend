import moxios from 'moxios';
import {
    testStore
} from '../../utils';

import {
    fetchPoint,
    createPoint,
    updatePoint,
    deletePoint,
} from '../../actions/pointActions';

describe('Point actions', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    describe('fetchPoint action', () => {

        it('Point store is updated correctly', () => {

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

            return store.dispatch(fetchPoint())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.point.point).toBe(expectedState);
                });
        });

        it('Point fetch errors', () => {

            const expectedState = {
                error: 'Point not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(fetchPoint())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.point.pointErrors).toBe(expectedState.error);
                });
        });
    });

    // test for post request
    describe('createPoint action', () => {

        it('Create Point store is updated correctly', () => {

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

            return store.dispatch(createPoint())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.point.pointCreated).toBe(expectedState);
                });
        });

        it('Create Point store is updated correctly', () => {

            const expectedState = {
                error: 'Create Point not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(createPoint())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.point.pointErrors).toBe(expectedState.error);
                });
        });
    });

    // test for update request
    describe('updatePoint action', () => {

        it('Update Point store is updated correctly', () => {

            const expectedState = [{
                name: 'Point 1',
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

            return store.dispatch(updatePoint())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.point.pointUpdated).toBe(expectedState);
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

            return store.dispatch(updatePoint())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.point.pointErrors).toBe(expectedState.error);
                });
        });
    });

    // test for delete request
    describe('deletePoint action', () => {

        it('Delete Tolerance store is updated correctly', () => {

            const expectedState = [{
                name: 'Tolerance 1',
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

            return store.dispatch(deletePoint())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.point.pointDeleted).toBe(expectedState);
                });
        });

        it('Delete Point store is updated correctly', () => {

            const expectedState = {
                error: 'Delete Point not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(deletePoint())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.point.pointErrors).toBe(expectedState.error);
                });
        });
    });
});