import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import CreateBlock from "../../components/blocks/CreateBlock";

const setUp = (props = {}) => {
    const component = shallow(<CreateBlock {...props} />);
    return component;
};

describe("Create Block tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                handleCreateBlock: () => { },
                errors: {},
                parentBlockList: []
            };

            const propsErr = checkProps(CreateBlock, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                handleCreateBlock: "",
                errors: "",
                parentBlockList: ""
            };

            const propsErr = checkProps(CreateBlock, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleCreateBlock: () => { },
                    errors: {},
                    parentBlockList: []
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "CreateBlockComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleCreateBlock: () => { },
                    errors: {},
                    parentBlockList: [{ _id: 'sss', name: 'sss' }, { _id: 'sss', name: 'sss' }]
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "CreateBlockComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with incorrect props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    handleCreateBlock: () => { },
                    errors: {},
                    parentBlockList: [{ _id: 'sss', wrongName: 'sss' }, { _id: 'sss', wrongName: 'sss' }]
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "CreateBlockComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
