import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import EditIssueCategory from "../../components/issueCategory/EditIssueCategory";

const setUp = (props = {}) => {
    const component = shallow(<EditIssueCategory {...props} />);
    return component;
};

describe("Create IssueCategory tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                updateIssueCategory: () => { },
                _id: '',
                name: '',
                issue: '',
                errors: {},
                issueList: []
            };

            const propsErr = checkProps(EditIssueCategory, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                updateIssueCategory: '',
                _id: [],
                name: [],
                issue: [],
                errors: [],
                issueList: ''
            };

            const propsErr = checkProps(EditIssueCategory, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateIssueCategory: () => { },
                    _id: '',
                    name: '',
                    issue: '',
                    errors: {},
                    issueList: []
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "EditIssueCategoryComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateIssueCategory: () => { },
                    _id: 'asdf',
                    name: 'asdf',
                    issue: 'asdf',
                    errors: { name: 'Name is required' },
                    issueList: [{ name: 'asdfd', _id: 'asdf' }]
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "EditIssueCategoryComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
