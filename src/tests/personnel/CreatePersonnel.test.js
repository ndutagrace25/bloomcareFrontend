import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import CreatePersonnel from "../../components/personnel/CreatePersonnel";

const setUp = (props = {}) => {
    const component = shallow(<CreatePersonnel {...props} />);
    return component;
};

describe("Create Personnel tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                handleCreatePersonnel: () => { },
                personnelType: [],
                errors: {}
            };

            const propsErr = checkProps(CreatePersonnel, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                handleCreatePersonnel: '',
                personnelType: '',
                errors: ''
            };

            const propsErr = checkProps(CreatePersonnel, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleCreatePersonnel: () => { },
                    personnelType: [],
                    errors: {}
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "CreatePersonnelComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleCreatePersonnel: () => { },
                    personnelType: [{ name: 'asdfd', _id: 'asdf' }],
                    errors: { name: 'Name is required' }
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "CreatePersonnelComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
