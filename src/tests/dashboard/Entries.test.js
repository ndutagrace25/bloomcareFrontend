import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute, checkProps } from "../../utils";

import Entries from "../../components/dashboard/Entries";

const setUp = (props = {}) => {
    const component = shallow(<Entries {...props} />);
    return component;
};

describe("Create Entries", () => {
    describe("Checking Prop Types", () => {
        it("It should not throw a warning", () => {
            const expectedProps = {
                bedReport: [],
                entryReport: [],
                bedDates: [],
                bed_id: '',
                entryName: '',
                date: '',
                prevalence: {}
            };

            const propsErr = checkProps(Entries, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it("It should throw a warning", () => {
            const expectedProps = {
                bedReport: '',
                entryReport: '',
                bedDates: '',
                bed_id: [],
                entryName: [],
                date: [],
                prevalence: ''
            };

            const propsErr = checkProps(Entries, expectedProps);
            expect(propsErr).toMatch("Failed props type");
        });
    });

    describe("Rendering component", () => {
        describe("Render with empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    bedReport: [],
                    entryReport: [],
                    bedDates: [],
                    bed_id: '',
                    entryName: '',
                    date: '',
                    prevalence: {}
                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "EntriesComponent");
                expect(component.length).toBe(1);
            });
        });

        describe("Render with non-empty props", () => {
            let wrapper;
            beforeEach(() => {
                const initialState = {
                    bedReport: [{ entry_id: 'sss', block_name: 'sss', block_number: 'sss', block: 'iii' }],
                    entryReport: [{ entry_id: 'sss', index: 'sss', block_number: 'sss', block: 'iii' }],
                    bedDates: [{ _id: 'sss', block_name: 'sss', block_number: 'sss', block: 'iii' }],
                    bed_id: '',
                    entryName: '',
                    date: '',
                    prevalence: { dates: [], issues: [] }

                };
                wrapper = setUp(initialState);
            });

            it("It should render component without errors", () => {
                const component = findByTestAttribute(wrapper, "EntriesComponent");

                expect(component.length).toBe(1);
            });
        });
    });
});
