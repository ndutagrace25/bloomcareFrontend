import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps,
    testStore
} from "../../utils";

import PlantLayout from "../../components/plant/PlantLayout";
import Login from "../../components/auth/Login";

const setUp = (initialState = {}) => {
        const store = testStore(initialState);
        const wrapper = shallow( < PlantLayout store = {
                store
            }
            history = {
                Login
            }
            />)
            .childAt(0)
            .dive();

            return wrapper;
        };

        describe("Plant tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        fetchPlant: () => {},
                        plant: {},
                        blockList: [],
                        bedList: [],
                        flowerList: [],
                        createPlant: () => {},
                        updatePlant: () => {},
                        deletePlant: () => {},
                        fetchBlock: () => {},
                        fetchBed: () => {},
                        fetchFlower: () => {},
                        errors: {}
                    };

                    const propsErr = checkProps(PlantLayout, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        fetchPlant: '',
                        plant: '',
                        blockList: '',
                        bedList: '',
                        flowerList: '',
                        createPlant: '',
                        updatePlant: '',
                        deletePlant: '',
                        fetchBlock: '',
                        fetchBed: '',
                        fetchFlower: '',
                        errors: ''
                    };

                    const propsErr = checkProps(PlantLayout, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            plant: {
                                plantCreated: {},
                                plantUpdated: {},
                                plantDeleted: {},
                                plantErrors: {},
                                plant: {
                                    rows: 1,
                                    items: [{
                                        name: "Plant 1",
                                        _id: "123456"
                                    }]
                                },
                            },
                            auth: {
                                isAuthenticated: true
                            }
                        };

                        wrapper = setUp(initialState);
                    });

                    it("It should render component without errors", () => {
                        const component = findByTestAttribute(wrapper, "PlantLayoutComponent");
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
                            classInstance.handlePreloaderStyle("d-issue");
                            const newState = classInstance.state.preloaderStyle;
                            expect(newState).toBe("d-issue");
                        });
                    });
                });
            });
        });