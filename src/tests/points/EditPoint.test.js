import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import EditPoint from "../../components/point/EditPoint";

const setUp = (props = {}) => {
        const component = shallow( < EditPoint {
                ...props
            }
            />);
            return component;
        };

        describe("EditPoint tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        updatePoint: () => {},
                        _id: '',
                        name: '',
                        errors: {}
                    };

                    const propsErr = checkProps(EditPoint, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        updatePoint: '',
                        _id: {},
                        name: {},
                        errors: ''
                    };

                    const propsErr = checkProps(EditPoint, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updatePoint: () => {},
                            _id: '',
                            name: '',
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "EditPointComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updatePoint: () => {},
                            point: [{
                                name: 'asdfd',
                                _id: 'asdf'
                            }],
                            errors: {
                                name: 'Name is required'
                            },
                            _id: 'asdf',
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "EditPointComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });