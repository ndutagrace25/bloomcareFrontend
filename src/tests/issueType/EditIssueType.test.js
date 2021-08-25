import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import EditIssueType from "../../components/issueType/EditIssueType";

const setUp = (props = {}) => {
        const component = shallow( < EditIssueType {
                ...props
            }
            />);
            return component;
        };

        describe("EditIssueType tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        updateIssueType: () => {},
                        _id: '',
                        name: '',
                        errors: {}
                    };

                    const propsErr = checkProps(EditIssueType, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        updateIssueType: [],
                        _id: {},
                        name: {},
                        errors: ''
                    };

                    const propsErr = checkProps(EditIssueType, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updateIssueType: () => {},
                            _id: '',
                            name: '',
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "EditIssueTypeComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updateIssueType: () => {},
                            _id: '',
                            name: '',
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "EditIssueTypeComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });