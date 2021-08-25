import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import EditTolerance from "../../components/tolerance/EditTolerance";

const setUp = (props = {}) => {
        const component = shallow( < EditTolerance {
                ...props
            }
            />);
            return component;
        };

        describe("Edit ToleranceType tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        updateTolerance: () => {},
                        _id: '',
                        name: '',
                        errors: {}
                    };

                    const propsErr = checkProps(EditTolerance, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        updateTolerance: [],
                        _id: [],
                        name: [],
                        errors: ''
                    };

                    const propsErr = checkProps(EditTolerance, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updateTolerance: () => {},
                            _id: '',
                            name: '',
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "EditToleranceComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });