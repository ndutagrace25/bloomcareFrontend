import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import SingleBlockView from "../../components/dashboard/SingleBlockView";

const setUp = (props = {}) => {
    const component = shallow(<SingleBlockView {...props} />);
    return component;
};

describe("Create SingleBlockView", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                allBeds: [],
                leftSide: [],
                rightSide: [],
                _id: '',
                onBlockClick: () => { }
            };

            const propsErr = checkProps(SingleBlockView, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                allBeds: '',
                leftSide: '',
                rightSide: '',
                _id: [],
                onBlockClick: {}
            };

            const propsErr = checkProps(SingleBlockView, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    allBeds: [],
                    leftSide: [],
                    rightSide: [],
                    _id: '',
                    onBlockClick: () => { }
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "SingleBlockViewComponent");
                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    allBeds: [{ bed_name: 'test bed', _id: 'ss', bed_number: 'asdf' }],
                    leftSide: [{ bed: { bed_name: 'test bed', stations: [{ name: 'Station 1', _id: 'asdf' }] } }],
                    rightSide: [{ bed: { bed_name: 'test bed', stations: [{ name: 'Station 1', _id: 'asdf' }] } }],
                    _id: '',
                    onBlockClick: () => { }

                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "SingleBlockViewComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
