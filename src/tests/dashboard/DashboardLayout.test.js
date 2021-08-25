import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps,
    testStore
} from "../../utils";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Login from "../../components/auth/Login";

const setUp = (initialState = {}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<DashboardLayout store={store} history={Login} />)
        .childAt(0)
        .dive();

    return wrapper;
};

describe("Dashboard tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                bedList: [],
                farmReportAlert: [],
                bedDates: [],
                blockReport: {},
                bedReport: {},
                fetchBlockReport: () => { },
                fetchPrevalence: () => { }
            };

            const propsErr = checkProps(DashboardLayout, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                bedList: '',
                farmReportAlert: '',
                bedDates: '',
                blockReport: '',
                bedReport: '',
                fetchBlockReport: '',
                fetchPrevalence: ''
            };

            const propsErr = checkProps(DashboardLayout, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    plant: {
                        bedList: [
                            {
                                bed_name: "Dashboard 1",
                                bed_number: "1",
                                _id: "123456"
                            }
                        ]
                    },
                    scout: {
                        farmReportAlert: [
                            {
                                bed_name: "Dashboard 1",
                                bed_number: "1",
                                _id: "123456"
                            }
                        ],
                        bedDates: [
                            {
                                bed_name: "Dashboard 1",
                                bed_number: "1",
                                _id: "123456"
                            }
                        ],
                        blockReport: {
                            bed_name: "Dashboard 1",
                            bed_number: "1",
                            _id: "123456"
                        },
                        bedReport: {
                            bed_name: "Dashboard 1",
                            bed_number: "1",
                            _id: "123456"
                        }
                    },
                    auth: {
                        isAuthenticated: true
                    }
                };

                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "DashboardLayoutComponent");
                expect(component.length).toBe(1);
            });

            // checking if it has preloader component
            it("It should render preloader component", () => {
                const component = findByTestAttribute(wrapper, "PreloaderComponent");

                expect(component.length).toBe(1);
            });
            // checking if it has navbar component
            it("It should render navbar component", () => {
                const component = findByTestAttribute(wrapper, "FarmViewComponent");

                expect(component.length).toBe(1);
            });
            // checking if it has DashboardNavComponent component
            it("It should render Nav component", () => {
                const component = findByTestAttribute(wrapper, "DashboardNavComponent");

                expect(component.length).toBe(1);
            });
            // checking if it has DashboardComponent component
            it("It should render Dasboard component", () => {
                const component = findByTestAttribute(wrapper, "DashboardComponent");

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