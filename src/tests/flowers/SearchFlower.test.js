import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import SearchFlower from "../../components/flower/SearchFlower";

const setUp = (props = {}) => {
    const component = shallow(<SearchFlower {...props} />);
    return component;
};

describe("Create Flower tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                handleSearch: () => { },
                handleCloseSearch: () => { },
                onChange: () => { },
                search_name: ''
            };

            const propsErr = checkProps(SearchFlower, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                handleSearch: '',
                handleCloseSearch: '',
                onChange: '',
                search_name: []
            };

            const propsErr = checkProps(SearchFlower, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleSearch: () => { },
                    handleCloseSearch: () => { },
                    onChange: () => { },
                    search_name: ''
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "SearchFlowerComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleSearch: () => { },
                    handleCloseSearch: () => { },
                    onChange: () => { },
                    search_name: 'variety'
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "SearchFlowerComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
