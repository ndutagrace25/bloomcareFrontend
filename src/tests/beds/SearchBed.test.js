import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import SearchBed from '../../components/beds/SearchBed';

const setUpSearch = (props = {}) => {
    const component = shallow(<SearchBed {...props} />);
    return component;
}

describe('Bed tests', () => {
    describe('Checking Prop Types', () => {
        it('It should not throw a warning', () => {
            const expectedProps = {
                handleSearch: () => { },
                handleCloseSearch: () => { },
                search_bed_name: '',
                search_bed_number: '',
                search_block: '',
                blockList: [],
                varietyList: []
            }

            const propsErr = checkProps(SearchBed, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it('It should throw a warning', () => {
            const expectedProps = {
                handleSearch: '',
                handleCloseSearch: '',
                search_bed_name: () => { },
                search_bed_number: () => { },
                search_block: () => { },
                blockList: '',
                varietyList: ''
            }

            const propsErr = checkProps(SearchBed, expectedProps);
            expect(propsErr).toMatch('Failed props type');
        });
    })

    describe('Rendering component', () => {

        describe('Render with props', () => {
            let wrapper;
            beforeEach(() => {
                const props = {
                    handleSearch: () => { },
                    handleCloseSearch: () => { },
                    search_bed_name: '',
                    search_bed_number: '',
                    search_block: '',
                    blockList: [],
                    varietyList: []
                };
                wrapper = setUpSearch(props);
            });

            it('It should render component without errors', () => {
                const component = findByTestAttribute(wrapper, "SearchBedComponent");

                expect(component.length).toBe(1);
            });
        })
    })
})