import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import EditBlock from "../../components/blocks/EditBlock";

const setUp = (props = {}) => {
    const component = shallow(<EditBlock {...props} />);
    return component;
};

describe("Edit Block tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                updateBlock: () => { },
                _id: '',
                parent: '',
                name: '',
                errors: {},
                parentBlockList: []
            };

            const propsErr = checkProps(EditBlock, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                updateBlock: '',
                _id: () => { },
                parent: () => { },
                name: () => { },
                errors: '',
                parentBlockList: ''
            };

            const propsErr = checkProps(EditBlock, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateBlock: () => { },
                    _id: '',
                    parent: '',
                    name: '',
                    errors: {},
                    parentBlockList: []
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "EditBlockComponent");

                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateBlock: () => { },
                    _id: 'asdf',
                    parent: 'asdf',
                    name: 'asdf',
                    errors: { name: 'error' },
                    parentBlockList: [{ name: 'error', _id: 'sdf' }]
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "EditBlockComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
