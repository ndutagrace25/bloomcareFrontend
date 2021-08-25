import moxios from 'moxios';
import {
    testStore
} from '../../utils';
import {
    fetchBed,
    createBed,
    updateBed,
    deleteBed
} from '../../actions/bedActions';

describe('Bed actions', () => {
    beforeEach(() => {
        moxios.install();
    })
    afterEach(() => {
        moxios.uninstall();
    })
    describe('Fetch bed action', () => {
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
            return store.dispatch(fetchBed())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.bed.bed).toBe(expectedState)
                })
        })
        it('Bed store is updated correctly', () => {

            const expectedState = {
                error: 'Bed not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(fetchBed())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.bed.bedErrors).toBe(expectedState.error);
                });
        });

    })

    // test for post request
    describe('createBed action', () => {

        it('Create Bed store is updated correctly', () => {

            const expectedState = [{
                name: 'Test Bed',
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

            return store.dispatch(createBed())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.bed.bedCreated).toBe(expectedState);
                });
        });

        it('Create Bed errors', () => {

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

            return store.dispatch(createBed())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.bed.bedErrors).toBe(expectedState.error);
                });
        });
    });

    // test for update request
    describe('updateBed action', () => {

        it('Update Bed store is updated correctly', () => {

            const expectedState = {
                name: 'Test Rose Bed 1',
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedState
                });
            });

            return store.dispatch(updateBed())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.bed.bedUpdated).toBe(expectedState);
                });
        });

        it('Update Bed store is updated correctly', () => {

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

            return store.dispatch(updateBed())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.bed.bedErrors).toBe(expectedState.error);
                });
        });
    });

    // test for delete request
    describe('deleteBed action', () => {

        it('Delete Bed store is updated correctly', () => {

            const expectedState = [{
                name: 'Test Rose Bed',
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

            return store.dispatch(deleteBed())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.bed.bedDeleted).toBe(expectedState);
                });
        });

        it('Delete Bed store is updated correctly', () => {

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

            return store.dispatch(deleteBed())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.bed.bedErrors).toBe(expectedState.error);
                });
        });
    });
});