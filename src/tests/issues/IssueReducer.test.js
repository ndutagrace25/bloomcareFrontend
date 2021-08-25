import {
    FETCH_ISSUE,
    CREATE_ISSUE,
    UPDATE_ISSUE,
    DELETE_ISSUE,

} from '../../actions/types';

import issueReducer from '../../reducers/issueReducer';

describe('Issue Reducer', () => {
    it('Should return default state', () => {
        const newState = issueReducer(undefined, {});

        expect(newState).toEqual({
            issue: {},
            issueCreated: {},
            issueUpdated: {},
            issueDeleted: {},
            issueType: [],
            toleranceType: [],
            scoreList: [],
            IssueErrors: {}
        })
    });

    it('Should return a new issue state if receiving an issue', () => {
        const issues = {
            rows: 1,
            items: [{
                issue_name: 'Issue 1',
                issue_type: {},
                toletance_type: {},
                _id: '123456'
            }]
        };

        const newState = issueReducer(undefined, {
            type: FETCH_ISSUE,
            payload: issues
        });

        expect(newState.issue).toEqual(issues);
    });

    // test for issueCreated
    it('Should return a new issue state if created an issue', () => {
        const issues = {
            rows: 1,
            items: [{
                issue_name: 'Issue 1',
                issue_type: {},
                toletance_type: {},
                _id: '123456'
            }]
        };

        const newState = issueReducer(undefined, {
            type: CREATE_ISSUE,
            payload: issues
        });

        expect(newState.issueCreated).toEqual(issues);
    });

    // test for issueUpdated
    it('Should return a new issue state if updated an issue', () => {
        const issues = {
            rows: 1,
            items: [{
                issue_name: 'Issue 1',
                issue_type: {},
                toletance_type: {},
                _id: '123456'
            }]
        };

        const newState = issueReducer(undefined, {
            type: UPDATE_ISSUE,
            payload: issues
        });

        expect(newState.issueUpdated).toEqual(issues);
    });
    // test for issueDeleted
    it('Should return a new issue state if deleted an issue', () => {
        const issues = {
            rows: 1,
            items: [{
                issue_name: 'Issue 1',
                issue_type: {},
                toletance_type: {},
                _id: '123456'
            }]
        };

        const newState = issueReducer(undefined, {
            type: DELETE_ISSUE,
            payload: issues
        });

        expect(newState.issueDeleted).toEqual(issues);
    });
})