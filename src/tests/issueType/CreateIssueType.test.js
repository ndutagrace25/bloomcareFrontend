import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import CreateIssueType from "../../components/issueType/CreateIssueType";

const setUp = (props = {}) => {
        const component = shallow( < CreateIssueType {
                ...props
            }
            />);
            return component;
        };

        describe("Create CreateIssueType tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        handleCreateIssueType: () => {},
                        errors: {}
                    };

                    const propsErr = checkProps(CreateIssueType, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        handleCreateIssueType: '',
                        errors: []
                    };

                    const propsErr = checkProps(CreateIssueType, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            handleCreateIssueType: () => {},
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "CreateIssueTypeComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            handleCreateIssueType: () => {},
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "CreateIssueTypeComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });