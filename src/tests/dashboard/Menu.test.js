import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import Menu from "../../components/dashboard/Menu";

const setUp = (props = {}) => {
    const component = shallow(<Menu {...props} />);
    return component;
};

describe("Create Menu", () => {
    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "MenuComponent");
                expect(component.length).toBe(1);
            });
        });
    });
});
