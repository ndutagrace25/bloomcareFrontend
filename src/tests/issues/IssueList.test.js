import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import IssueList from "../../components/issue/IssueList";

const setUp = (props = {}) => {
    const component = shallow(<IssueList {...props} />);
    return component;
};

describe("Create IssueCategory tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                updateIssue: () => { },
                handlePreloaderStyle: () => { },
                deleteIssue: () => { },
                issueCount: 0,
                issue: [],
                issueType: [],
                toleranceType: [],
                scoreList: [],
                errors: {},
                successMessage: ''
            };

            const propsErr = checkProps(IssueList, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                updateIssue: '',
                handlePreloaderStyle: '',
                deleteIssue: '',
                issueCount: '',
                issue: '',
                issueType: '',
                toleranceType: '',
                scoreList: '',
                errors: '',
                successMessage: []
            };

            const propsErr = checkProps(IssueList, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateIssue: () => { },
                    handlePreloaderStyle: () => { },
                    deleteIssue: () => { },
                    issueCount: 0,
                    issue: [],
                    issueType: [],
                    toleranceType: [],
                    scoreList: [],
                    errors: {},
                    successMessage: ''
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "IssueListComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateIssue: () => { },
                    handlePreloaderStyle: () => { },
                    deleteIssue: () => { },
                    issueCount: 0,
                    issue: [{ issue_name: 'asdfd', _id: 'asdf', issue_type: { name: 'asdfd', _id: 'asdf' }, tolerance_type: { name: 'asdfd', _id: 'asdf' } }],
                    issueType: [{ name: 'asdfd', _id: 'asdf' }],
                    toleranceType: [{ name: 'asdfd', _id: 'asdf' }],
                    scoreList: [{ name: 'asdfd', _id: 'asdf' }],
                    errors: { name: 'asdfd', _id: 'asdf' },
                    successMessage: 'asdf'
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "IssueListComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
