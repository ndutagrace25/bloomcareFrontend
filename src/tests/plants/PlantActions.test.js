import moxios from 'moxios';
import {
    testStore
} from '../../utils';

import {
    fetchPlant,
    createPlant,
    updatePlant,
    deletePlant,
} from '../../actions/plantActions';

describe('Plant actions', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    describe('fetchPlant action', () => {

        it('Plant store is updated correctly', () => {

            const expectedState = [{
                name: 'plant 1',
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

            return store.dispatch(fetchPlant())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.plant.plant).toBe(expectedState);
                });
        });

        it('Plant fetch errors', () => {

            const expectedState = {
                error: 'Plant not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(fetchPlant())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.plant.plantErrors).toBe(expectedState.error);
                });
        });
    });

    // test for post request
    describe('createPlant action', () => {

        it('Create Plant store is updated correctly', () => {

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

            return store.dispatch(createPlant())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.plant.plantCreated).toBe(expectedState);
                });
        });

        it('Create Plant store is updated correctly', () => {

            const expectedState = {
                error: 'Create Plant not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(createPlant())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.plant.plantErrors).toBe(expectedState.error);
                });
        });
    });

    // test for update request
    describe('updatePlant action', () => {

        it('Update Plant store is updated correctly', () => {

            const expectedState = [{
                name: 'Plant 1',
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

            return store.dispatch(updatePlant())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.plant.plantUpdated).toBe(expectedState);
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

            return store.dispatch(updatePlant())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.plant.plantErrors).toBe(expectedState.error);
                });
        });
    });

    // test for delete request
    describe('deletePlant action', () => {

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

            return store.dispatch(deletePlant())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.plant.plantDeleted).toBe(expectedState);
                });
        });

        it('Delete Plant store is updated correctly', () => {

            const expectedState = {
                error: 'Delete Plant not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(deletePlant())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.plant.plantErrors).toBe(expectedState.error);
                });
        });
    });
});