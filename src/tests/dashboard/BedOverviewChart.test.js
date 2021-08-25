import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import BedOverviewChart from "../../components/dashboard/BedOverviewChart";

const setUp = (props = {}) => {
    const component = shallow(<BedOverviewChart {...props} />);
    return component;
};

describe("Create BedOverviewChart", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                prevalence: {}
            };

            const propsErr = checkProps(BedOverviewChart, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                prevalence: ''
            };

            const propsErr = checkProps(BedOverviewChart, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    prevalence: {},
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "BedOverviewChartComponent");
                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    prevalence: { dates: [], issues: [] }

                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "BedOverviewChartComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
