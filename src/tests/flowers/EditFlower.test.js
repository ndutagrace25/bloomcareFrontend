import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import EditFlower from "../../components/flower/EditFlower";

const setUp = (props = {}) => {
    const component = shallow(<EditFlower {...props} />);
    return component;
};

describe("Create Flower tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                errors: {},
                updateFlower: () => { },
                _id: '',
                name: ''
            };

            const propsErr = checkProps(EditFlower, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                errors: '',
                updateFlower: '',
                _id: {},
                name: {}
            };

            const propsErr = checkProps(EditFlower, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateFlower: () => { },
                    errors: {},
                    _id: '',
                    name: ''
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "EditFlowerComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    errors: { name: 'Name is required' },
                    updateFlower: () => { },
                    _id: '',
                    name: ''
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "EditFlowerComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with incorrect props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    errors: { namez: 'Name is required' },
                    updateFlower: () => { },
                    _id: 'asdf',
                    name: 'asdf'
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "EditFlowerComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
