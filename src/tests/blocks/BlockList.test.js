import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import BlockList from "../../components/blocks/BlockList";

const setUp = (props = {}) => {
    const component = shallow(<BlockList {...props} />);
    return component;
};

describe("Create Block tests", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                updateBlock: () => { },
                handlePreloaderStyle: () => { },
                deleteBlock: () => { },
                block: {},
                parentBlockList: [],
                errors: {}
            };

            const propsErr = checkProps(BlockList, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                updateBlock: '',
                handlePreloaderStyle: '',
                deleteBlock: '',
                block: '',
                parentBlockList: '',
                errors: ''
            };

            const propsErr = checkProps(BlockList, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateBlock: () => { },
                    handlePreloaderStyle: () => { },
                    deleteBlock: () => { },
                    block: {},
                    errors: {},
                    parentBlockList: [{ _id: 'sss', block_name: 'sss', block_number: 'sss', block: 'iii' }]
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "BlockListComponent");
                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    updateBlock: () => { },
                    handlePreloaderStyle: () => { },
                    deleteBlock: () => { },
                    block: { rows: 1, items: [{ _id: 'sss', block_name: 'sss', block_number: 'sss', block: 'iii' }] },
                    errors: {},
                    parentBlockList: [{ _id: 'sss', block_name: 'sss', block_number: 'sss', block: 'iii' }]

                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "BlockListComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
