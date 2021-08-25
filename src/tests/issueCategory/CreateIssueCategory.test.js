import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import CreateIssueCategory from "../../components/issueCategory/CreateIssueCategory";

const setUp = (props = {}) => {
    const component = shallow(<CreateIssueCategory {...props} />);
    return component;
};

describe("Create IssueCategory tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                handleCreateIssueCategory: () => { },
                issueList: [],
                errors: {}
            };

            const propsErr = checkProps(CreateIssueCategory, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                handleCreateIssueCategory: '',
                issueList: '',
                errors: ''
            };

            const propsErr = checkProps(CreateIssueCategory, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleCreateIssueCategory: () => { },
                    issueList: [],
                    errors: {}
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "CreateIssueCategoryComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleCreateIssueCategory: () => { },
                    issueList: [{ name: 'asdfd', _id: 'asdf' }],
                    errors: { name: 'Name is required' }
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "CreateIssueCategoryComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
