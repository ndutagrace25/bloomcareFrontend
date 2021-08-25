import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import EditToleranceType from "../../components/toleranceType/EditToleranceType";

const setUp = (props = {}) => {
        const component = shallow( < EditToleranceType {
                ...props
            }
            />);
            return component;
        };

        describe("Edit ToleranceType tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        updateToleranceType: () => {},
                        _id: '',
                        name: '',
                        errors: {}
                    };

                    const propsErr = checkProps(EditToleranceType, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        updateToleranceType: [],
                        _id: {},
                        name: {},
                        errors: ''
                    };

                    const propsErr = checkProps(EditToleranceType, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updateToleranceType: () => {},
                            _id: '',
                            name: '',
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "EditToleranceTypeComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updateToleranceType: () => {},
                            _id: '',
                            name: '',
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "EditToleranceTypeComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });