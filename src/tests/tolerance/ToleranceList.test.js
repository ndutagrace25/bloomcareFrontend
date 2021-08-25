import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import ToleranceList from "../../components/tolerance/ToleranceList";

const setUp = (props = {}) => {
        const component = shallow( < ToleranceList {
                ...props
            }
            />);
            return component;
        };

        describe("Create ToleranceType tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        updateTolerance: () => {},
                        handlePreloaderStyle: () => {},
                        deleteTolerance: () => {},
                        tolerance: [],
                        errors: {}
                    };

                    const propsErr = checkProps(ToleranceList, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        updateTolerance: [],
                        handlePreloaderStyle: [],
                        deleteTolerance: [],
                        tolerance: '',
                        errors: ''
                    };

                    const propsErr = checkProps(ToleranceList, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updateTolerance: () => {},
                            handlePreloaderStyle: () => {},
                            deleteTolerance: () => {},
                            tolerance: [],
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "ToleranceListComponent");
                        expect(component.length).toBe(1);
                    });
                });
            });
        });