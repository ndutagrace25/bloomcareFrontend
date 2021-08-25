import moxios from 'moxios';
import {
    testStore
} from '../../utils';

import {
    fetchIssueType,
    createIssueType,
    updateIssueType,
    deleteIssueType
} from '../../actions/issueTypeActions';

describe('IssueType actions', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    describe('fetchIssueType action', () => {

        it('IssueType store is updated correctly', () => {

            const expectedState = [{
                name: 'IssueType 1',
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

            return store.dispatch(fetchIssueType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueType.issueType).toBe(expectedState);
                });
        });

        it('Issue fetch errors', () => {

            const expectedState = {
                error: 'Issue not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(fetchIssueType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueType.issueTypeErrors).toBe(expectedState.error);
                });
        });
    });

    // test for post request
    describe('createIssueType action', () => {

        it('Create issueType store is updated correctly', () => {

            const expectedState = [{
                name: 'issueType 1',
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

            return store.dispatch(createIssueType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueType.issueTypeCreated).toBe(expectedState);
                });
        });

        it('Create IssueType store is updated correctly', () => {

            const expectedState = {
                error: 'Create IssueType not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(createIssueType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueType.issueTypeErrors).toBe(expectedState.error);
                });
        });
    });

    // test for update request
    describe('updateIssueType action', () => {

        it('Update IssueType store is updated correctly', () => {

            const expectedState = [{
                name: 'IssueType 1',
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

            return store.dispatch(updateIssueType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueType.issueTypeUpdated).toBe(expectedState);
                });
        });

        it('Update IssueType store is updated correctly', () => {

            const expectedState = {
                error: 'Update IssueType not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(updateIssueType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueType.issueTypeErrors).toBe(expectedState.error);
                });
        });
    });

    // test for delete request
    describe('deleteIssueType action', () => {

        it('Delete IssueType store is updated correctly', () => {

            const expectedState = [{
                name: 'Issue 1',
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

            return store.dispatch(deleteIssueType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueType.issueTypeDeleted).toBe(expectedState);
                });
        });

        it('Delete IssueType store is updated correctly', () => {

            const expectedState = {
                error: 'Delete IssueType not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(deleteIssueType())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueType.issueTypeErrors).toBe(expectedState.error);
                });
        });
    });
});