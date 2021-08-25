import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import FarmView from "../../components/dashboard/FarmView";

const setUp = (props = {}) => {
    const component = shallow(<FarmView {...props} />);
    return component;
};

describe("Create FarmView", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                farmReportAlert: []
            };

            const propsErr = checkProps(FarmView, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                farmReportAlert: ''
            };

            const propsErr = checkProps(FarmView, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    farmReportAlert: [],
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "FarmViewComponent");
                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    farmReportAlert: [{ dates: [], issues: [] }]

                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "FarmViewComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
