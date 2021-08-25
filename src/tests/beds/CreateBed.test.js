import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import CreateBed from "../../components/beds/CreateBed";

const setUp = (props = {}) => {
    const component = shallow(<CreateBed {...props} />);
    return component;
};

describe("Create Bed tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                handleCreateBed: () => { },
                allBlocks: [],
                errors: {},
                varietyList: []
            };

            const propsErr = checkProps(CreateBed, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                handleCreateBed: "",
                allBlocks: "",
                errors: "",
                varietyList: ""
            };

            const propsErr = checkProps(CreateBed, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleCreateBed: () => { },
                    allBlocks: [],
                    errors: {},
                    varietyList: []
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "CreateBedComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleCreateBed: () => { },
                    errors: {},
                    allBlocks: [{ _id: 'sss', name: 'sss' }, { _id: 'sss', name: 'sss' }],
                    varietyList: [{ _id: 'sss', name: 'sss' }, { _id: 'sss', name: 'sss' }]
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "CreateBedComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with incorrect props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleCreateBed: () => { },
                    errors: {},
                    allBlocks: [{ _id: 'sss', wrongName: 'sss' }, { _id: 'sss', wrongName: 'sss' }],
                    varietyList: [{ _id: 'sss', wrongName: 'sss' }, { _id: 'sss', wrongName: 'sss' }]
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "CreateBedComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
