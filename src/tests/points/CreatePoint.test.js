import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import CreatePoint from "../../components/point/CreatePoint";

const setUp = (props = {}) => {
        const component = shallow( < CreatePoint {
                ...props
            }
            />);
            return component;
        };

        describe("Create Point tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        handleCreatePoint: () => {},
                        errors: {},
                        name: ''
                    };

                    const propsErr = checkProps(CreatePoint, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        handleCreatePoint: '',
                        errors: [],
                        name: []
                    };

                    const propsErr = checkProps(CreatePoint, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            handleCreatePoint: () => {},
                            errors: {},
                            name: ''
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "CreatePointComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            handleCreatePoint: () => {},
                            point: [{
                                name: 'asdfd',
                                _id: 'asdf'
                            }],
                            errors: {
                                name: 'Name is required'
                            }
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "CreatePointComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });