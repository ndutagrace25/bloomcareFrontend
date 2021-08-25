import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import SearchPersonnel from "../../components/personnel/SearchPersonnel";

const setUp = (props = {}) => {
        const component = shallow( < SearchPersonnel {
                ...props
            }
            />);
            return component;
        };

        describe("Search Personnel tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        handleSearch: () => {},
                        handleCloseSearch: () => {},
                        search_first_name: '',
                        search_last_name: '',
                        search_phone: '',
                        search_status: '',
                        search_personnel_type: '',
                        personnelType: []
                    };

                    const propsErr = checkProps(SearchPersonnel, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        handleSearch: [],
                        handleCloseSearch: [],
                        search_first_name: [],
                        search_last_name: [],
                        search_phone: [],
                        search_status: [],
                        search_personnel_type: [],
                        personnelType: ''
                    };

                    const propsErr = checkProps(SearchPersonnel, expectedProps);
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
                            search_first_name: '',
                            search_last_name: '',
                            search_phone: '',
                            search_status: '',
                            search_personnel_type: '',
                            personnelType: []
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "SearchPersonnelComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {                            
                            handleSearch: () => {},
                            handleCloseSearch: () => {},
                            search_first_name: 'asdf',
                            search_last_name: 'asdf',
                            search_phone: 'asdf',
                            search_status: 'asdf',
                            search_personnel_type: '',
                            personnelType: [{
                                name: 'asdfd',
                                _id: 'asdf'
                            }],

                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "SearchPersonnelComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });