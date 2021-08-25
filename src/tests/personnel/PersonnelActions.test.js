import moxios from 'moxios';
import {
    testStore
} from '../../utils';

import {
    fetchPersonnel,
    createPersonnel,
    updatePersonnel,
    deletePersonnel,
} from '../../actions/personnelActions';

describe('Personnel actions', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    describe('fetchPersonnel action', () => {

        it('Personnel store is updated correctly', () => {

            const expectedState = [{
                name: 'personnel 1',
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

            return store.dispatch(fetchPersonnel())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.personnel.personnel).toBe(expectedState);
                });
        });

        it('Personnel fetch errors', () => {

            const expectedState = {
                error: 'Personnel not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(fetchPersonnel())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.personnel.personnelErrors).toBe(expectedState.error);
                });
        });
    });

    // test for post request
    describe('createPersonnel action', () => {

        it('Create Personnel store is updated correctly', () => {

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

            return store.dispatch(createPersonnel())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.personnel.personnelCreated).toBe(expectedState);
                });
        });

        it('Create Personnel store is updated correctly', () => {

            const expectedState = {
                error: 'Create Personnel not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(createPersonnel())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.personnel.personnelErrors).toBe(expectedState.error);
                });
        });
    });

    // test for update request
    describe('updatePersonnel action', () => {

        it('Update Personnel store is updated correctly', () => {

            const expectedState = [{
                name: 'Personnel 1',
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

            return store.dispatch(updatePersonnel())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.personnel.personnelUpdated).toBe(expectedState);
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

            return store.dispatch(updatePersonnel())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.personnel.personnelErrors).toBe(expectedState.error);
                });
        });
    });

    // test for delete request
    describe('deletePersonnel action', () => {

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

            return store.dispatch(deletePersonnel())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.personnel.personnelDeleted).toBe(expectedState);
                });
        });

        it('Delete Personnel store is updated correctly', () => {

            const expectedState = {
                error: 'Delete Personnel not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(deletePersonnel())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.personnel.personnelErrors).toBe(expectedState.error);
                });
        });
    });
});