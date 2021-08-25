import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import EditPlant from "../../components/plant/EditPlant";

const setUp = (props = {}) => {
        const component = shallow( < EditPlant {
                ...props
            }
            />);
            return component;
        };

        describe("EditPlant tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        updatePlant: () => {},
                        _id: '',
                        plant_date: '',
                        expected_pick_date: '',
                        status: 0
                    };

                    const propsErr = checkProps(EditPlant, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        updatePlant: [],
                        _id: [],
                        plant_date: [],
                        expected_pick_date: [],
                        status: []
                    };

                    const propsErr = checkProps(EditPlant, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updatePlant: () => {},
                            _id: '',
                            plant_date: '',
                            expected_pick_date: '',
                            status: 0
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "EditPlantComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updatePlant: () => {},
                            plant: [{
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
                        const component = findByTestAttribute(wrapper, "EditPlantComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });