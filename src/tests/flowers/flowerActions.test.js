import moxios from 'moxios';
import {
    testStore
} from '../../utils';
import {
    fetchFlower,
    createFlower,
    updateFlower,
    deleteFlower
} from '../../actions/flowerActions';

describe('Flower actions', () => {
    beforeEach(() => {
        moxios.install();
    })
    afterEach(() => {
        moxios.uninstall();
    })
    describe('Fetch flower action', () => {
        it('Store is updated correctly', () => {
            const expectedState = [{
                title: 'Example title 1',
                body: 'Some text'
            }, {
                title: 'Example title 1',
                body: 'Some text'
            }, {
                title: 'Example title 1',
                body: 'Some text'
            }, ]
            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedState
                })
            });
            return store.dispatch(fetchFlower())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.flower.flower).toBe(expectedState)
                })
        })
        it('Flower store is updated correctly', () => {

            const expectedState = {
                error: 'Flower not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(fetchFlower())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.flower.flowerErrors).toBe(expectedState.error);
                });
        });

    })

    // test for post request
    describe('createFlower action', () => {

        it('Create Flower store is updated correctly', () => {

            const expectedState = [{
                name: 'Test Flower',
                _id: '6768'
            }];

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedState
                });
            });

            return store.dispatch(createFlower())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.flower.flowerCreated).toBe(expectedState);
                });
        });

        it('Create Flower errors', () => {

            const expectedState = {
                error: 'Oops something went wrong. Please try again.'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(createFlower())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.flower.flowerErrors).toBe(expectedState.error);
                });
        });
    });

    // test for update request
    describe('updateFlower action', () => {

        it('Update Flower store is updated correctly', () => {

            const expectedState = {
                name: 'Test Rose Flower 1',
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedState
                });
            });

            return store.dispatch(updateFlower())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.flower.flowerUpdated).toBe(expectedState);
                });
        });

        it('Update Flower store is updated correctly', () => {

            const expectedState = {
                error: 'Oops something went wrong. Please try again.'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(updateFlower())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.flower.flowerErrors).toBe(expectedState.error);
                });
        });
    });

    // test for delete request
    describe('deleteFlower action', () => {

        it('Delete Flower store is updated correctly', () => {

            const expectedState = [{
                name: 'Test Rose Flower',
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

            return store.dispatch(deleteFlower())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.flower.flowerDeleted).toBe(expectedState);
                });
        });

        it('Delete Flower store is updated correctly', () => {

            const expectedState = {
                error: 'Oops something went wrong. Please try again.'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(deleteFlower())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.flower.flowerErrors).toBe(expectedState.error);
                });
        });
    });
});