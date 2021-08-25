import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import EditIssue from "../../components/issue/EditIssue";

const setUp = (props = {}) => {
    const component = shallow(<EditIssue {...props} />);
    return component;
};

describe("Create IssueCategory tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                updateIssue: () => { },
                _id: '',
                issue_name: '',
                issueType: [],
                toleranceType: [],
                scoreList: [],
                errors: {}
            };

            const propsErr = checkProps(EditIssue, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                updateIssue: '',
                _id: [],
                issue_name: [],
                issueType: '',
                toleranceType: '',
                scoreList: '',
                errors: ''
            };

            const propsErr = checkProps(EditIssue, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateIssue: () => { },
                    _id: '',
                    issue_name: '',
                    issueType: [],
                    toleranceType: [],
                    scoreList: [],
                    errors: {}
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "EditIssueComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateIssue: () => { },
                    issueType: [{ name: 'asdfd', _id: 'asdf' }],
                    toleranceType: [{ name: 'asdfd', _id: 'asdf' }],
                    scoreList: [{ name: 'asdfd', _id: 'asdf' }],
                    errors: { name: 'Name is required' },
                    _id: 'asdf',
                    issue_name: 'asdf',
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "EditIssueComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
