import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import FlowerList from "../../components/flower/FlowerList";

const setUp = (props = {}) => {
    const component = shallow(<FlowerList {...props} />);
    return component;
};

describe("Create Flower tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                updateFlower: () => { },
                handlePreloaderStyle: () => { },
                deleteFlower: () => { },
                flower: {},
                flowerCount: 0,
                errors: {},
                successMessage: ''
            };

            const propsErr = checkProps(FlowerList, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                updateFlower: '',
                handlePreloaderStyle: '',
                deleteFlower: '',
                flower: '',
                flowerCount: '',
                errors: '',
                successMessage: []
            };

            const propsErr = checkProps(FlowerList, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateFlower: () => { },
                    handlePreloaderStyle: () => { },
                    deleteFlower: () => { },
                    flower: {},
                    flowerCount: 0,
                    errors: {},
                    successMessage: ''
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "FlowerListComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateFlower: () => { },
                    handlePreloaderStyle: () => { },
                    deleteFlower: () => { },
                    flower: { rows: 1, items: [{ name: 'asdf', _id: 'asdf' }] },
                    flowerCount: 0,
                    errors: {},
                    successMessage: ''
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "FlowerListComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
