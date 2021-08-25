import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import BedList from "../../components/beds/BedList";

const setUp = (props = {}) => {
    const component = shallow(<BedList {...props} />);
    return component;
};

describe("Create Bed tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                updateBed: () => { },
                handlePreloaderStyle: () => { },
                deleteBed: () => { },
                bed: [],
                errors: {},
                bedCount: 0,
                blockList: [],
                varietyList: []
            };

            const propsErr = checkProps(BedList, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                updateBed: '',
                handlePreloaderStyle: '',
                deleteBed: '',
                bed: '',
                errors: '',
                bedCount: '',
                blockList: '',
                varietyList: ''
            };

            const propsErr = checkProps(BedList, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateBed: () => { },
                    handlePreloaderStyle: () => { },
                    deleteBed: () => { },
                    bed: [],
                    errors: {},
                    bedCount: 0,
                    blockList: [],
                    varietyList: []
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "BedListComponent");
                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateBed: () => { },
                    handlePreloaderStyle: () => { },
                    deleteBed: () => { },
                    bed: [{ _id: 'sss', bed_name: 'sss', bed_number: 'sss', block: 'iii' }, { _id: 'sss', bed_name: 'sss', bed_number: 'sss', block: 'iii' }],
                    errors: {},
                    bedCount: 0,
                    blockList: [],
                    varietyList: []
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "BedListComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
