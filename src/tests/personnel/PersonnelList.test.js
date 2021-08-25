import React from "react";
import {
    shallow
} from "enzyme";
import {
    findByTestAttribute,
    checkProps
} from "../../utils";

import PersonnelList from "../../components/personnel/PersonnelList";

const setUp = (props = {}) => {
    const component = shallow(< PersonnelList {
        ...props
    }
    />);
    return component;
};

describe("Create PersonnelList tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                updatePersonnel: () => { },
                handlePreloaderStyle: () => { },
                deletePersonnel: () => { },
                personnel: {},
                personnelCount: 0
            };

            const propsErr = checkProps(PersonnelList, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                updatePersonnel: [],
                handlePreloaderStyle: [],
                deletePersonnel: [],
                personnel: "",
                personnelCount: []
            };

            const propsErr = checkProps(PersonnelList, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updatePersonnel: () => { },
                    handlePreloaderStyle: () => { },
                    deletePersonnel: () => { },
                    personnel: {},
                    errors: {},
                    personnelCount: 0
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(
                    wrapper,
                    "PersonnelListComponent"
                );

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updatePersonnel: () => { },
                    handlePreloaderStyle: () => { },
                    deletePersonnel: () => { },
                    personnelCount: 0,
                    personnel: {
                        personnel_name: "asdfd",
                        _id: "asdf"
                    },
                    errors: {
                        name: "asdfd",
                        _id: "asdf"
                    }
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(
                    wrapper,
                    "PersonnelListComponent"
                );

                expect(component.length).toBe(1);
            });
        });
    });
});