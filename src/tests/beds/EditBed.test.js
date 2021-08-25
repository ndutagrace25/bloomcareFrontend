import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import EditBed from "../../components/beds/EditBed";

const setUp = (props = {}) => {
    const component = shallow(<EditBed {...props} />);
    return component;
};

describe("Edit Bed tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                updateBed: () => { },
                _id: "",
                bed_name: "",
                bed_number: "",
                errors: {},
                blockList: [],
                varietyList: []
            };

            const propsErr = checkProps(EditBed, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                updateBed: "",
                _id: () => { },
                bed_name: () => { },
                bed_number: () => { },
                errors: "",
                blockList: "",
                varietyList: ""
            };

            const propsErr = checkProps(EditBed, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateBed: () => { },
                    _id: "",
                    bed_name: "",
                    bed_number: "",
                    errors: {},
                    blockList: [],
                    varietyList: []
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "EditBedComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateBed: () => { },
                    _id: "",
                    bed_name: "",
                    bed_number: "",
                    errors: {},
                    blockList: [{ _id: 'sss', name: 'sss' }, { _id: 'sss', name: 'sss' }],
                    varietyList: [{ _id: 'sss', name: 'sss' }, { _id: 'sss', name: 'sss' }]
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "EditBedComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with incorrect prop properties", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateBed: () => { },
                    _id: "",
                    bed_name: "",
                    bed_number: "",
                    errors: {},
                    blockList: [{ _id: 'sss', wrongName: 'sss' }, { _id: 'sss', wrongName: 'sss' }],
                    varietyList: [{ _id: 'sss', wrongName: 'sss' }, { _id: 'sss', wrongName: 'sss' }]
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "EditBedComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
