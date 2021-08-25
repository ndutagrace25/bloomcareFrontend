import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import CreatePlant from "../../components/plant/CreatePlant";

const setUp = (props = {}) => {
        const component = shallow( < CreatePlant {
                ...props
            }
            />);
            return component;
        };

        describe("Create Plant tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        handleCreatePlant: () => {},
                        blockList: [],
                        bedList: [],
                        flowerList: []
                    };

                    const propsErr = checkProps(CreatePlant, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        handleCreatePlant: '',
                        blockList: '',
                        bedList: '',
                        flowerList: ''
                    };

                    const propsErr = checkProps(CreatePlant, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            handleCreatePlant: () => {},
                            blockList: [],
                            bedList: [],
                            flowerList: []
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "CreatePlantComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            handleCreatePlant: () => {},
                            plant: [{
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
                        const component = findByTestAttribute(wrapper, "CreatePlantComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });