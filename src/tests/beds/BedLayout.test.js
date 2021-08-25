import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps,
    testStore
} from "../../utils";

import BedLayout from "../../components/beds/BedLayout";
import Login from "../../components/auth/Login";

const setUp = (initialState = {}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<BedLayout store={store} history={Login} />)
        .childAt(0)
        .dive();

    return wrapper;
};

describe("Bed tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                fetchBed: () => { },
                bed: {},
                allBlocks: [],
                varietyList: [],
                createBed: () => { },
                updateBed: () => { },
                deleteBed: () => { },
                fetchAllBlocks: () => { },
                errors: {}

            };

            const propsErr = checkProps(BedLayout, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                fetchBed: '',
                bed: '',
                allBlocks: '',
                varietyList: '',
                createBed: '',
                updateBed: '',
                deleteBed: '',
                fetchAllBlocks: '',
                errors: ''
            };

            const propsErr = checkProps(BedLayout, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    bed: {
                        bed: {
                            rows: 1,
                            items: [
                                {
                                    bed_name: "Bed 1",
                                    bed_number: "1",
                                    _id: "123456"
                                }
                            ]
                        },
                        varietyList: [
                            {
                                name: "Red Roses",
                                _id: "123456"
                            }
                        ],
                        bedErrors: {}
                    },
                    auth: {
                        isAuthenticated: true
                    }
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "BedLayoutComponent");

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
                    classInstance.handlePreloaderStyle("d-block");
                    const newState = classInstance.state.preloaderStyle;
                    expect(newState).toBe("d-block");
                });
            });
        });

        describe("Redirects to the homepage if not authenticated", () => { });
    });
});