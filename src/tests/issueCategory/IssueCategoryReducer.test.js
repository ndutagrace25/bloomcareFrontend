import {
    FETCH_ISSUE_CATEGORY,
    CREATE_ISSUE_CATEGORY,
    UPDATE_ISSUE_CATEGORY,
    DELETE_ISSUE_CATEGORY,

} from '../../actions/types';

import issueCategoryReducer from '../../reducers/issueCategoryReducer';

describe('IssueCategory Reducer', () => {
    it('Should return default state', () => {
        const newState = issueCategoryReducer(undefined, {});

        expect(newState).toEqual({
            issueCategory: {},
            issueCategoryCreated: {},
            issueCategoryUpdated: {},
            issueCategoryDeleted: {},
            issueCategoryErrors: {},
            issueList: []
        })
    });

    it('Should return a new issueCategory state if receiving an issueCategory', () => {
        const issueCategories = {
            rows: 1,
            items: [{
                name: 'IssueCategory 1',
                issue: {},
                toletance_type: {},
                _id: '123456'
            }]
        };

        const newState = issueCategoryReducer(undefined, {
            type: FETCH_ISSUE_CATEGORY,
            payload: issueCategories
        });

        expect(newState.issueCategory).toEqual(issueCategories);
    });

    // test for issueCreated
    it('Should return a new IssueCategory state if created an IssueCategory', () => {
        const issueCategories = {
            rows: 1,
            items: [{
                name: 'IssueCategory 1',
                issue: {},
                _id: '123456'
            }]
        };

        const newState = issueCategoryReducer(undefined, {
            type: CREATE_ISSUE_CATEGORY,
            payload: issueCategories
        });

        expect(newState.issueCategoryCreated).toEqual(issueCategories);
    });

    // test for issueUpdated
    it('Should return a new IssueCategory state if updated an IssueCategory', () => {
        const issueCategories = {
            rows: 1,
            items: [{
                name: 'IssueCategory 1',
                issue: {},
                _id: '123456'
            }]
        };

        const newState = issueCategoryReducer(undefined, {
            type: UPDATE_ISSUE_CATEGORY,
            payload: issueCategories
        });

        expect(newState.issueCategoryUpdated).toEqual(issueCategories);
    });
    // test for issueDeleted
    it('Should return a new IssueCategory state if deleted an IssueCategory', () => {
        const issueCategories = {
            rows: 1,
            items: [{
                name: 'IssueCategory 1',
                issue: {},
                _id: '123456'
            }]
        };

        const newState = issueCategoryReducer(undefined, {
            type: DELETE_ISSUE_CATEGORY,
            payload: issueCategories
        });

        expect(newState.issueCategoryDeleted).toEqual(issueCategories);
    });
})