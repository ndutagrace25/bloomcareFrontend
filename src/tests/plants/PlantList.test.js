import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import PlantList from "../../components/plant/PlantList";

const setUp = (props = {}) => {
        const component = shallow( < PlantList {
                ...props
            }
            />);
            return component;
        };

        describe("Create PlantList tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        updatePlant: () => {},
                        handlePreloaderStyle: () => {},
                        deletePlant: () => {},
                        plant: [],
                        plantCount: 0,
                        blockList: [],
                        bedList: [],
                        flowerList: [],
                        errors: {}
                    };

                    const propsErr = checkProps(PlantList, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        updatePlant: '',
                        handlePreloaderStyle: '',
                        deletePlant: '',
                        plant: '',
                        plantCount: '',
                        blockList: '',
                        bedList: '',
                        flowerList: '',
                        errors: ''
                    };

                    const propsErr = checkProps(PlantList, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updatePlant: () => {},
                            handlePreloaderStyle: () => {},
                            deletePlant: () => {},
                            plant: [],
                            plantCount: 0,
                            blockList: [],
                            bedList: [],
                            flowerList: [],
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "PlantListComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updatePlant: () => {},
                            handlePreloaderStyle: () => {},
                            deletePlant: () => {},
                            plantCount: 0,
                            plant: [{
                                plant_name: 'asdfd',
                                _id: 'asdf'
                            }],
                            errors: {
                                name: 'asdfd',
                                _id: 'asdf'
                            },
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "PlantListComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });