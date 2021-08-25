import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import CreateIssue from "../../components/issue/CreateIssue";

const setUp = (props = {}) => {
    const component = shallow(<CreateIssue {...props} />);
    return component;
};

describe("Create IssueCategory tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                handleCreateIssue: () => { },
                issueType: [],
                toleranceType: [],
                scoreList: [],
                errors: {}
            };

            const propsErr = checkProps(CreateIssue, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                handleCreateIssue: '',
                issueType: '',
                toleranceType: '',
                scoreList: '',
                errors: ''
            };

            const propsErr = checkProps(CreateIssue, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleCreateIssue: () => { },
                    issueType: [],
                    toleranceType: [],
                    scoreList: [],
                    errors: {}
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "CreateIssueComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleCreateIssue: () => { },
                    issueType: [{ name: 'asdfd', _id: 'asdf' }],
                    toleranceType: [{ name: 'asdfd', _id: 'asdf' }],
                    scoreList: [{ name: 'asdfd', _id: 'asdf' }],
                    errors: { name: 'Name is required' }
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "CreateIssueComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
