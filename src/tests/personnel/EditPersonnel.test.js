import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import EditPersonnel from "../../components/personnel/EditPersonnel";

const setUp = (props = {}) => {
        const component = shallow( < EditPersonnel {
                ...props
            }
            />);
            return component;
        };

        describe("Edit Personnel tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        updatePersonnel: () => {},
                        _id: '',
                        first_name: '',
                        last_name: '',
                        phone: '',
                        status: 0,
                        personnel_type_id: '',
                        personnelType: [],
                        errors: {}
                    };

                    const propsErr = checkProps(EditPersonnel, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        updatePersonnel: [],
                        _id: [],
                        first_name: [],
                        last_name: [],
                        phone: [],
                        status: [],
                        personnel_type_id: [],
                        personnelType: [],
                        errors: []
                    };

                    const propsErr = checkProps(EditPersonnel, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updatePersonnel: () => {},
                            _id: '',
                            first_name: '',
                            last_name: '',
                            phone: '',
                            status: 0,
                            personnel_type_id: '',
                            personnelType: [],
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "EditPersonnelComponent");

                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updatePersonnel: () => {},
                            _id: '',
                            first_name: '',
                            last_name: '',
                            phone: '',
                            status: 0,
                            personnel_type_id: '',
                            personnelType: [{
                                name: 'asdfd',
                                _id: 'asdf'
                            }],
                            
                            errors: {
                                name: 'Name is required'
                            },
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "EditPersonnelComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });