import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import PrintView from "../../components/dashboard/PrintView";

const setUp = (props = {}) => {
    const component = shallow(<PrintView {...props} />);
    return component;
};

describe("Create PrintView", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                leftSide: [],
                rightSide: []
            };

            const propsErr = checkProps(PrintView, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                leftSide: '',
                rightSide: ''
            };

            const propsErr = checkProps(PrintView, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    leftSide: [],
                    rightSide: []
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "PrintViewComponent");
                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    leftSide: [{ bed: { bed_name: 'test bed', stations: [{ name: 'Station 1', _id: 'asdf' }] } }],
                    rightSide: [{ bed: { bed_name: 'test bed', stations: [{ name: 'Station 1', _id: 'asdf' }] } }]

                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "PrintViewComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
