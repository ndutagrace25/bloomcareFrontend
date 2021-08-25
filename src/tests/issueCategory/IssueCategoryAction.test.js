import moxios from 'moxios';
import {
    testStore
} from '../../utils';

import {
    fetchIssueCategory,
    createIssueCategory,
    updateIssueCategory,
    deleteIssueCategory
} from '../../actions/issueCategoryActions';

describe('IssueCategory actions', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    describe('fetchIssueCategory action', () => {

        it('IssueCategory store is updated correctly', () => {

            const expectedState = [{
                name: 'IssueCategory 1',
                issue: {},
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

            return store.dispatch(fetchIssueCategory())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueCategory.issueCategory).toBe(expectedState);
                });
        });

        it('IssueCategory fetch errors', () => {

            const expectedState = {
                error: 'IssueCategory not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(fetchIssueCategory())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueCategory.issueCategoryErrors).toBe(expectedState.error);
                });
        });
    });

    // test for post request
    describe('createIssueCategory action', () => {

        it('Create IssueCategory store is updated correctly', () => {

            const expectedState = [{
                name: 'IssueCategory 1',
                issue: {},
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

            return store.dispatch(createIssueCategory())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueCategory.issueCategoryCreated).toBe(expectedState);
                });
        });

        it('Create issueCategory store is updated correctly', () => {

            const expectedState = {
                error: 'Create issueCategory not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(createIssueCategory())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueCategory.issueCategoryErrors).toBe(expectedState.error);
                });
        });
    });

    // test for update request
    describe('updateIssueCategory action', () => {

        it('Update issueCategory store is updated correctly', () => {

            const expectedState = [{
                name: 'IssueCategory 1',
                issue: {},
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

            return store.dispatch(updateIssueCategory())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueCategory.issueCategoryUpdated).toBe(expectedState);
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

            return store.dispatch(updateIssueCategory())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueCategory.issueCategoryErrors).toBe(expectedState.error);
                });
        });
    });

    // test for delete request
    describe('deleteIssueCategory action', () => {

        it('Delete issueCategory store is updated correctly', () => {

            const expectedState = [{
                name: 'IssueCategory 1',
                issue: {},
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

            return store.dispatch(deleteIssueCategory())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueCategory.issueCategoryDeleted).toBe(expectedState);
                });
        });

        it('Delete issueCategory store is updated correctly', () => {

            const expectedState = {
                error: 'Delete issueCategory not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(deleteIssueCategory())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.issueCategory.issueCategoryErrors).toBe(expectedState.error);
                });
        });
    });
});