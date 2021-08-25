import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import SearchEntry from '../../components/entry/SearchEntry';

const setUpSearch = (props = {}) => {
    const component = shallow(<SearchEntry {...props} />);
    return component;
}

describe('Entry tests', () => {
    describe('Checking Prop Types', () => {
        it('It should not throw a warning', () => {
            const expectedProps = {
                handleSearch: () => { },
                handleCloseSearch: () => { },
                search_name: ''
            }

            const propsErr = checkProps(SearchEntry, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it('It should throw a warning', () => {
            const expectedProps = {
                handleSearch: '',
                handleCloseSearch: '',
                search_name: false
            }

            const propsErr = checkProps(SearchEntry, expectedProps);
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
                    search_name: ''
                };
                wrapper = setUpSearch(props);
            });

            it('It should render component without errors', () => {
                const component = findByTestAttribute(wrapper, "SearchEntryComponent");

                expect(component.length).toBe(1);
            });
        })
    })
})