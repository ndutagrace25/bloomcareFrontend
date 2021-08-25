import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import SearchIssue from "../../components/issue/SearchIssue";

const setUp = (props = {}) => {
    const component = shallow(<SearchIssue {...props} />);
    return component;
};

describe("Create IssueCategory tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                handleSearch: () => { },
                handleCloseSearch: () => { },
                search_issue_name: '',
                search_issue_type: '',
                search_tolerance_type: '',
                search_score: '',
                issueType: [],
                toleranceType: [],
                scoreList: []
            };

            const propsErr = checkProps(SearchIssue, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                handleSearch: '',
                handleCloseSearch: '',
                search_issue_name: [],
                search_issue_type: [],
                search_tolerance_type: [],
                search_score: [],
                issueType: {},
                toleranceType: {},
                scoreList: {}
            };

            const propsErr = checkProps(SearchIssue, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleSearch: () => { },
                    handleCloseSearch: () => { },
                    search_issue_name: '',
                    search_issue_type: '',
                    search_tolerance_type: '',
                    search_score: '',
                    issueType: [],
                    toleranceType: [],
                    scoreList: []
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "SearchIssueComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleSearch: () => { },
                    handleCloseSearch: () => { },
                    search_issue_name: 'asdf',
                    search_issue_type: 'asdf',
                    search_tolerance_type: 'asdf',
                    search_score: 'asdf',
                    issueType: [{ name: 'asdfd', _id: 'asdf' }],
                    toleranceType: [{ name: 'asdfd', _id: 'asdf' }],
                    scoreList: [{ name: 'asdfd', _id: 'asdf' }]

                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "SearchIssueComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
