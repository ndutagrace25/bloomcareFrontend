import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import IssueCategoryList from "../../components/issueCategory/IssueCategoryList";

const setUp = (props = {}) => {
    const component = shallow(<IssueCategoryList {...props} />);
    return component;
};

describe("Create IssueCategory tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                updateIssueCategory: () => { },
                handlePreloaderStyle: () => { },
                deleteIssueCategory: () => { },
                issueCategory: [],
                issueList: [],
                errors: {},
                issueCategoryCount: 0,
                successMessage: ''
            };

            const propsErr = checkProps(IssueCategoryList, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                updateIssueCategory: '',
                handlePreloaderStyle: '',
                deleteIssueCategory: '',
                issueCategory: '',
                issueList: '',
                errors: '',
                issueCategoryCount: '',
                successMessage: []
            };

            const propsErr = checkProps(IssueCategoryList, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateIssueCategory: () => { },
                    handlePreloaderStyle: () => { },
                    deleteIssueCategory: () => { },
                    issueCategory: [],
                    issueList: [],
                    errors: {},
                    issueCategoryCount: 0,
                    successMessage: ''
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "IssueCategoryListComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateIssueCategory: () => { },
                    handlePreloaderStyle: () => { },
                    deleteIssueCategory: () => { },
                    issueCategory: [{ name: 'asdfd', _id: 'asdf', issue: { name: 'asdfd', _id: 'asdf' } }],
                    issueList: [{ name: 'asdfd', _id: 'asdf' }],
                    errors: { name: 'asdfd' },
                    issueCategoryCount: 0,
                    successMessage: 'asdf'
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "IssueCategoryListComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
