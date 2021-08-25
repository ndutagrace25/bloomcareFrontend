import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import SearchIssueCategory from "../../components/issueCategory/SearchIssueCategory";

const setUp = (props = {}) => {
    const component = shallow(<SearchIssueCategory {...props} />);
    return component;
};

describe("Create IssueCategory tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                handleSearch: () => { },
                handleCloseSearch: () => { },
                onChange: () => { },
                issueList: [],
                search_name: '',
                search_issue: ''
            };

            const propsErr = checkProps(SearchIssueCategory, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                handleSearch: '',
                handleCloseSearch: '',
                onChange: '',
                issueList: '',
                search_name: [],
                search_issue: []
            };

            const propsErr = checkProps(SearchIssueCategory, expectedProps);
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
                    onChange: () => { },
                    issueList: [],
                    search_name: '',
                    search_issue: ''
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "SearchIssueCategoryComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleSearch: () => { },
                    handleCloseSearch: () => { },
                    onChange: () => { },
                    issueList: [{ name: 'asdfd', _id: 'asdf' }],
                    search_name: 'asdf',
                    search_issue: 'asdf'
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "SearchIssueCategoryComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
