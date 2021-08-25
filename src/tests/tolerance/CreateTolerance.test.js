import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import CreateTolerance from "../../components/tolerance/CreateTolerance";

const setUp = (props = {}) => {
        const component = shallow( < CreateTolerance {
                ...props
            }
            />);
            return component;
        };

        describe("CreateTolerance tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        handleCreateTolerance: () => {},
                        toleranceType: [],
                        errors: {}
                    };

                    const propsErr = checkProps(CreateTolerance, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        handleCreateTolerance: [],
                        toleranceType: '',
                        errors: []
                    };

                    const propsErr = checkProps(CreateTolerance, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            handleCreateTolerance: () => {},
                            toleranceType: [],
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "CreateToleranceComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            handleCreateTolerance: () => {},
                            toleranceType: [],
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "CreateToleranceComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with incorrect props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            handleCreateTolerance: () => {},
                            toleranceType: [],
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "CreateToleranceComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });