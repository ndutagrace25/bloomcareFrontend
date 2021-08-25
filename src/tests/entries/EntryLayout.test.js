import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps, testStore } from "../../utils";

import EntryLayout from "../../components/entry/EntryLayout";
import Login from "../../components/auth/Login";

const setUp = (initialState = {}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<EntryLayout store={store} history={Login} />)
        .childAt(0)
        .dive();
    return wrapper;
};

describe("Entry tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                fetchEntry: () => { },
                entry: {},
                errors: "",
                auth: {},
                createEntry: () => { },
                updateEntry: () => { },
                deleteEntry: () => { }
            };

            const propsErr = checkProps(EntryLayout, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                fetchEntry: "",
                entry: [],
                errors: {},
                auth: [],
                createEntry: "",
                updateEntry: "",
                deleteEntry: ""
            };

            const propsErr = checkProps(EntryLayout, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    entry: {
                        entry: {
                            rows: 1,
                            items: [
                                {
                                    name: "Station 1",
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
                const component = findByTestAttribute(wrapper, "EntryLayoutComponent");

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
            // checking if it has TableWrap component
            //   it("It should render TableWrap component", () => {
            //     const component = findByTestAttribute(wrapper, "TableWrapComponent");

            //     expect(component.length).toBe(1);
            //   });

            // checking if it has Search component
            //   it("It should render Search component", () => {
            //     const component = findByTestAttribute(wrapper, "SearchEntryComponent");

            //     expect(component.length).toBe(1);
            //   });

            describe("Method calls", () => {
                it("handlePreloaderStyle should pdate preloaderStyle state", () => {
                    const classInstance = wrapper.instance();
                    classInstance.handlePreloaderStyle("d-block");
                    const newState = classInstance.state.preloaderStyle;
                    expect(newState).toBe("d-block");
                });
            });
        });

        describe("Redirects to the homepage if not authenticated", () => { });
    });
});
