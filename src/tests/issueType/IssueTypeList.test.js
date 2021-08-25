import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import IssueTypeList from "../../components/issueType/IssueTypeList";

const setUp = (props = {}) => {
        const component = shallow( < IssueTypeList {
                ...props
            }
            />);
            return component;
        };

        describe("Create IssueTypeList tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        updateIssueType: () => {},
                        handlePreloaderStyle: () => {},
                        deleteIssueType: () => {},
                        issueType: {},
                        errors: {},
                        issueTypeCount: 1
                    };

                    const propsErr = checkProps(IssueTypeList, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        updateIssueType: [],
                        handlePreloaderStyle: [],
                        deleteIssueType: [],
                        issueType: '',
                        errors: '',
                        issueTypeCount: {}
                    };

                    const propsErr = checkProps(IssueTypeList, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updateIssueType: () => {},
                            handlePreloaderStyle: () => {},
                            deleteIssueType: () => {},
                            issueType: {},
                            errors: {},
                            issueTypeCount: 1
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "IssueTypeListComponent");
                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updateIssueType: () => {},
                            handlePreloaderStyle: () => {},
                            deleteIssueType: () => {},
                            issueType: {},
                            errors: {},
                            issueTypeCount: 1

                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "IssueTypeListComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });