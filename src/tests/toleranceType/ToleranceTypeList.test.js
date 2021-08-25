import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import ToleranceTypeList from "../../components/toleranceType/ToleranceTypeList";

const setUp = (props = {}) => {
        const component = shallow( < ToleranceTypeList {
                ...props
            }
            />);
            return component;
        };

        describe("Create ToleranceType tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        updateToleranceType: () => {},
                        handlePreloaderStyle: () => {},
                        deleteToleranceType: () => {},
                        toleranceType: [],
                        errors: {}
                    };

                    const propsErr = checkProps(ToleranceTypeList, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        updateToleranceType: '',
                        handlePreloaderStyle: '',
                        deleteToleranceType: '',
                        toleranceType: '',
                        errors: ''
                    };

                    const propsErr = checkProps(ToleranceTypeList, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updateToleranceType: () => {},
                            handlePreloaderStyle: () => {},
                            deleteToleranceType: () => {},
                            toleranceType: [],
                            errors: {}
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "ToleranceTypeListComponent");
                        expect(component.length).toBe(1);
                    });
                });

                describe("Render with non-empty props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            updateBed: () => {},
                            handlePreloaderStyle: () => {},
                            deleteBed: () => {},
                            bed: [{
                                _id: 'sss',
                                bed_name: 'sss',
                                bed_number: 'sss',
                                block: 'iii'
                            }, {
                                _id: 'sss',
                                bed_name: 'sss',
                                bed_number: 'sss',
                                block: 'iii'
                            }],
                            errors: {},
                            bedCount: 0,
                            blockList: [],
                            varietyList: []
                        };
                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "ToleranceTypeListComponent");

                        expect(component.length).toBe(1);
                    });
                });
            });
        });