import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps,
    testStore
} from "../../utils";

import FlowerLayout from "../../components/flower/FlowerLayout";
import Login from "../../components/auth/Login";

const setUp = (initialState = {}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<FlowerLayout store={store} history={Login} />)
        .childAt(0)
        .dive();

    return wrapper;
};

describe("Flower tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                fetchFlower: () => { },
                createFlower: () => { },
                updateFlower: () => { },
                deleteFlower: () => { },
                flower: {},
                errors: {}
            };

            const propsErr = checkProps(FlowerLayout, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                fetchFlower: '',
                createFlower: '',
                updateFlower: '',
                deleteFlower: '',
                flower: ''
            };

            const propsErr = checkProps(FlowerLayout, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    flower: {
                        flower: {
                            rows: 1,
                            items: [
                                {
                                    flower_name: "Flower 1",
                                    flower_number: "1",
                                    _id: "123456"
                                }
                            ]
                        }
                    },
                    auth: {
                        isAuthenticated: true
                    }
                };

                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "FlowerLayoutComponent");
                expect(component.length).toBe(1);
            });

            // checking if it has preloader component
            it("It should render preloader component", () => {
                const component = findByTestAttribute(wrapper, "PreloaderComponent");

                expect(component.length).toBe(1);
            });
            // checking if it has navbar component
            it("It should render navbar component", () => {
                const component = findByTestAttribute(wrapper, "NavbarComponent");

                expect(component.length).toBe(1);
            });
            // checking if it has ContainerComponent component
            it("It should render Container component", () => {
                const component = findByTestAttribute(wrapper, "ContainerComponent");

                expect(component.length).toBe(1);
            });

            describe("Method calls", () => {
                it("handlePreloaderStyle should pdate preloaderStyle state", () => {
                    const classInstance = wrapper.instance();
                    classInstance.handlePreloaderStyle("d-flower");
                    const newState = classInstance.state.preloaderStyle;
                    expect(newState).toBe("d-flower");
                });
            });
        });

        describe("Redirects to the homepage if not authenticated", () => { });
    });
});