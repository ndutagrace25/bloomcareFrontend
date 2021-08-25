import moxios from 'moxios';
import {
    testStore
} from '../../utils';

import {
    fetchIssue,
    createIssue,
    updateIssue,
    deleteIssue
} from '../../actions/issueActions';

describe('Issue actions', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    describe('fetchIssue action', () => {

        it('Issue store is updated correctly', () => {

            const expectedState = [{
                issue_name: 'Issue 1',
                issue_type: {},
                toletance_type: {},
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

            return store.dispatch(fetchIssue())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issue.issue).toBe(expectedState);
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

            return store.dispatch(fetchIssue())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issue.IssueErrors).toBe(expectedState.error);
                });
        });
    });

    // test for post request
    describe('createIssue action', () => {

        it('Create Issue store is updated correctly', () => {

            const expectedState = [{
                issue_name: 'Issue 1',
                issue_type: {},
                toletance_type: {},
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

            return store.dispatch(createIssue())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issue.issueCreated).toBe(expectedState);
                });
        });

        it('Create Issue store is updated correctly', () => {

            const expectedState = {
                error: 'Create Issue not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(createIssue())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issue.IssueErrors).toBe(expectedState.error);
                });
        });
    });

    // test for update request
    describe('updateIssue action', () => {

        it('Update Issue store is updated correctly', () => {

            const expectedState = [{
                issue_name: 'Issue 1',
                issue_type: {},
                toletance_type: {},
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

            return store.dispatch(updateIssue())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issue.issueUpdated).toBe(expectedState);
                });
        });

        it('Update Issue store is updated correctly', () => {

            const expectedState = {
                error: 'Update Issue not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(updateIssue())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issue.IssueErrors).toBe(expectedState.error);
                });
        });
    });

    // test for delete request
    describe('deleteIssue action', () => {

        it('Delete Issue store is updated correctly', () => {

            const expectedState = [{
                issue_name: 'Issue 1',
                issue_type: {},
                toletance_type: {},
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

            return store.dispatch(deleteIssue())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issue.issueDeleted).toBe(expectedState);
                });
        });

        it('Delete Issue store is updated correctly', () => {

            const expectedState = {
                error: 'Delete Issue not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(deleteIssue())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issue.IssueErrors).toBe(expectedState.error);
                });
        });
    });
});