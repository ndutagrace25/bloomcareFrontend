import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps,
    testStore
} from "../../utils";

import PersonnelLayout from "../../components/personnel/PersonnelLayout";
import Login from "../../components/auth/Login";

const setUp = (initialState = {}) => {
        const store = testStore(initialState);
        const wrapper = shallow( < PersonnelLayout store = {
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

        describe("Personnel tests", () => {
            describe("Checking Prop Types", () => {
                it("It should not throw a warning", () => {
                    const expectedProps = {
                        fetchPersonnel: () => {},
                        personnel: {},
                        createPersonnel: () => {},
                        updatePersonnel: () => {},
                        fetchPesonnelType: () => {},
                        deletePersonnel: () => {},
                        errors: {},
                        auth: {}
                    };

                    const propsErr = checkProps(PersonnelLayout, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it("It should throw a warning", () => {
                    const expectedProps = {
                        fetchPersonnel: '',
                        personnel: [],
                        createPersonnel: '',
                        updatePersonnel: '',
                        fetchPesonnelType: '',
                        deletePersonnel: '',
                        errors: [],
                        auth: []
                    };

                    const propsErr = checkProps(PersonnelLayout, expectedProps);
                    expect(propsErr).toMatch("Failed props type");
                });
            });

            describe("Rendering component", () => {
                describe("Render with props", () => {
                    let wrapper;
                    beforeEach(() => {
                        const initialState = {
                            personnel: {
                                personnelCreated: {},
                                personnelUpdated: {},
                                personnelDeleted: {},
                                personnelErrors: {},
                                personnel: {
                                    rows: 1,
                                    items: [{
                                        name: "Personnel 1",
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
                        const component = findByTestAttribute(wrapper, "PersonnelLayoutComponent");
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