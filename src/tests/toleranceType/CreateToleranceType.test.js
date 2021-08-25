import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import CreateToleranceType from "../../components/toleranceType/CreateToleranceType";

const setUp = (props = {}) => {
        const component = shallow( < CreateToleranceType {
                ...props
            }
            />);
            return component;
        };

        describe("CreateToleranceType tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        handleCreateToleranceType: () => {},
                        errors: {}
                    };

                    const propsErr = checkProps(CreateToleranceType, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        handleCreateToleranceType: '',
                        errors: []
                    };

                    const propsErr = checkProps(CreateToleranceType, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            handleCreateToleranceType: () => {},
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "CreateToleranceTypeComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            handleCreateToleranceType: () => {},
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "CreateToleranceTypeComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with incorrect props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            handleCreateToleranceType: () => {},
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "CreateToleranceTypeComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });