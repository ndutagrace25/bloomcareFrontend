import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import FilterPrevalence from "../../components/dashboard/FilterPrevalence";

const setUp = (props = {}) => {
    const component = shallow(<FilterPrevalence {...props} />);
    return component;
};

describe("Create FilterPrevalence", () => {
    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "FilterPrevalenceComponent");
                expect(component.length).toBe(1);
            });
        });
    });
});
