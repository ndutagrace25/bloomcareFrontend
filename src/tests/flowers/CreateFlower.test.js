import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import CreateFlower from "../../components/flower/CreateFlower";

const setUp = (props = {}) => {
    const component = shallow(<CreateFlower {...props} />);
    return component;
};

describe("Create Flower tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                handleCreateFlower: () => { },
                errors: {}
            };

            const propsErr = checkProps(CreateFlower, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                handleCreateFlower: '',
                errors: ''
            };

            const propsErr = checkProps(CreateFlower, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleCreateFlower: () => { },
                    errors: {}
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "CreateFlowerComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleCreateFlower: () => { },
                    errors: { name: 'Name is required' }
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "CreateFlowerComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with incorrect props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleCreateFlower: () => { },
                    errors: { namez: 'Name is required' }
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "CreateFlowerComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
