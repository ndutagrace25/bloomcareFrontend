import moxios from 'moxios';
import {
    testStore
} from '../../utils';
import {
    fetchToleranceType,
    createToleranceType,
    updateToleranceType,
    deleteToleranceType
} from '../../actions/toleranceTypeActions';

describe('ToleranceType actions', () => {
    beforeEach(() => {
        moxios.install();
    })
    afterEach(() => {
        moxios.uninstall();
    })
    describe('Fetch toleranceType action', () => {
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
            }]
            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedState
                })
            });
            return store.dispatch(fetchToleranceType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.toleranceType.toleranceType).toBe(expectedState)
                })
        })
        it('ToleranceType store is updated correctly', () => {

            const expectedState = {
                error: 'ToleranceType not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(fetchToleranceType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.toleranceType.toleranceTypeErrors).toBe(expectedState.error);
                });
        });

    })

    // test for post request
    describe('createToleranceType action', () => {

        it('Create ToleranceType store is updated correctly', () => {

            const expectedState = [{
                name: 'Test ToleranceType',
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

            return store.dispatch(createToleranceType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.toleranceType.toleranceTypeCreated).toBe(expectedState);
                });
        });

        it('Create ToleranceType errors', () => {

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

            return store.dispatch(createToleranceType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.toleranceType.toleranceTypeErrors).toBe(expectedState.error);
                });
        });
    });

    // test for update request
    describe('updateToleranceType action', () => {

        it('Update ToleranceType store is updated correctly', () => {

            const expectedState = {
                name: 'Test Rose ToleranceType 1',
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedState
                });
            });

            return store.dispatch(updateToleranceType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.toleranceType.toleranceTypeUpdated).toBe(expectedState);
                });
        });

        it('Update ToleranceType store is updated correctly', () => {

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

            return store.dispatch(updateToleranceType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.toleranceType.toleranceTypeErrors).toBe(expectedState.error);
                });
        });
    });

    // test for delete request
    describe('deleteToleranceType action', () => {

        it('Delete ToleranceType store is updated correctly', () => {

            const expectedState = [{
                name: 'Test Rose ToleranceType',
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

            return store.dispatch(deleteToleranceType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.toleranceType.toleranceTypeDeleted).toBe(expectedState);
                });
        });

        it('Delete ToleranceType store is updated correctly', () => {

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

            return store.dispatch(deleteToleranceType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.toleranceType.toleranceTypeErrors).toBe(expectedState.error);
                });
        });
    });
});