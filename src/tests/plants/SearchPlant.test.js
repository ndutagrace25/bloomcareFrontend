import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import SearchPlant from "../../components/plant/SearchPlant";

const setUp = (props = {}) => {
        const component = shallow( < SearchPlant {
                ...props
            }
            />);
            return component;
        };

        describe("Search Point tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        handleSearch: () => {},
                        handleCloseSearch: () => {},
                        search_plant_date: '',
                        search_expected_pick_date: '',
                        search_status: '',
                        search_block: '',
                        search_bed: '',
                        search_flower: ''
                    };

                    const propsErr = checkProps(SearchPlant, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        handleSearch: '',
                        handleCloseSearch: '',
                        search_plant_date: [],
                        search_expected_pick_date: [],
                        search_status: [],
                        search_block: [],
                        search_bed: [],
                        search_flower: []
                    };

                    const propsErr = checkProps(SearchPlant, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            handleSearch: () => {},
                            handleCloseSearch: () => {},
                            search_plant_date: '',
                            search_expected_pick_date: '',
                            search_status: '',
                            search_block: '',
                            search_bed: '',
                            search_flower: ''
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "SearchPlantComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            handleSearch: () => {},
                            handleCloseSearch: () => {},
                            search_plant_date: '',
                            search_expected_pick_date: '',
                            search_status: '',
                            search_block: '',
                            search_bed: '',
                            search_flower: ''

                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "SearchPlantComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });