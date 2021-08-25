import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import SearchPoint from "../../components/point/SearchPoint";

const setUp = (props = {}) => {
        const component = shallow( < SearchPoint {
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
                        search_name: ''
                    };

                    const propsErr = checkProps(SearchPoint, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        handleSearch: [],
                        handleCloseSearch: [],
                        search_name: []
                    };

                    const propsErr = checkProps(SearchPoint, expectedProps);
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
                            search_name: ''
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "SearchPointComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            handleSearch: () => {},
                            handleCloseSearch: () => {},
                            search_name: ''

                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "SearchPointComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });