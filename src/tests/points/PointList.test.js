import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import PointList from "../../components/point/PointList";

const setUp = (props = {}) => {
        const component = shallow( < PointList {
                ...props
            }
            />);
            return component;
        };

        describe("Create PointList tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        updatePoint: () => {},
                        handlePreloaderStyle: () => {},
                        deletePoint: () => {},
                        point: {},
                        errors: {},
                        pointCount: 0
                    };

                    const propsErr = checkProps(PointList, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        updatePoint: [],
                        handlePreloaderStyle: [],
                        deletePoint: [],
                        point: '',
                        errors: '',
                        pointCount: []
                    };

                    const propsErr = checkProps(PointList, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updatePoint: () => {},
                            handlePreloaderStyle: () => {},
                            deletePoint: () => {},
                            point: {},
                            errors: {},
                            pointCount: 0
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "PointListComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updatePoint: () => {},
                            handlePreloaderStyle: () => {},
                            deletePoint: () => {},
                            pointCount: 0,
                            point: {
                                point_name: 'asdfd',
                                _id: 'asdf'
                            },
                            errors: {
                                name: 'asdfd',
                                _id: 'asdf'
                            },
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "PointListComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });