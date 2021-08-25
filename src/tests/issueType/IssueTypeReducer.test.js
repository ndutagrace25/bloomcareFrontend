import {
    FETCH_ISSUE_TYPE,
    CREATE_ISSUE_TYPE,
    UPDATE_ISSUE_TYPE,
    DELETE_ISSUE_TYPE
} from '../../actions/types';

import issueTypeReducer from '../../reducers/issueTypeReducer';

describe('IssueTypeReducer Reducer', () => {
    it('Should return default state', () => {
        const newState = issueTypeReducer(undefined, {});

        expect(newState).toEqual({
            issueType: {},
            issueTypeCreated: {},
            issueTypeUpdated: {},
            issueTypeDeleted: {},
            issueTypeErrors: {}
        })
    });

    it('Should return a new issueTypeReducer state if receiving a issueTypeReducer', () => {
        const issueTypes = {
            rows: 1,
            items: [{
                name: 'IssueType 1',
                _id: '123456'
            }]
        };

        const newState = issueTypeReducer(undefined, {
            type: FETCH_ISSUE_TYPE,
            payload: issueTypes
        });

        expect(newState.issueType).toEqual(issueTypes);
    });

    // test for issueTypeCreated
    it('Should return a new issueType state if created an issueType', () => {
        const issueTypes = {
            rows: 1,
            items: [{
                name: 'issueType 1',
                _id: '123456'
            }]
        };

        const newState = issueTypeReducer(undefined, {
            type: CREATE_ISSUE_TYPE,
            payload: issueTypes
        });

        expect(newState.issueTypeCreated).toEqual(issueTypes);
    });

    // test for issueTypeUpdated
    it('Should return a new IssueType state if updated a tolerance', () => {
        const issueTypes = {
            rows: 1,
            items: [{
                name: 'IssueType 1',
                _id: '123456'
            }]
        };

        const newState = issueTypeReducer(undefined, {
            type: UPDATE_ISSUE_TYPE,
            payload: issueTypes
        });

        expect(newState.issueTypeUpdated).toEqual(issueTypes);
    });

    // test for Entry deleted
    it('Should return a new entry state if deleted an entry', () => {
        const issueTypes = {
            rows: 1,
            items: [{
                name: 'IssueType 1',
                _id: '123456'
            }]
        };

        const newState = issueTypeReducer(undefined, {
            type: DELETE_ISSUE_TYPE,
            payload: issueTypes
        });
        expect(newState.issueTypeDeleted).toEqual(issueTypes);
    });
})