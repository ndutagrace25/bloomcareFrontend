import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import SearchBlock from '../../components/blocks/SearchBlock';

const setUpSearch = (props = {}) => {
    const component = shallow(<SearchBlock {...props} />);
    return component;
}

describe('Block tests', () => {
    describe('Checking Prop Types', () => {
        it('It should not throw a warning', () => {
            const expectedProps = {
                handleCloseSearch: () => { },
                handleSearch: () => { },
                search_parent: '',
                search_name: '',
                parentBlockList: []
            }

            const propsErr = checkProps(SearchBlock, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it('It should throw a warning', () => {
            const expectedProps = {
                handleCloseSearch: '',
                handleSearch: '',
                search_parent: [],
                search_name: [],
                parentBlockList: ''
            }

            const propsErr = checkProps(SearchBlock, expectedProps);
            expect(propsErr).toMatch('Failed props type');
        });
    })

    describe('Rendering component', () => {

        describe('Render with props', () => {
            let wrapper;
            beforeEach(() => {
                const props = {
                    handleCloseSearch: () => { },
                    handleSearch: () => { },
                    search_parent: '',
                    search_name: '',
                    parentBlockList: []
                };
                wrapper = setUpSearch(props);
            });

            it('It should render component without errors', () => {
                const component = findByTestAttribute(wrapper, "SearchBlockComponent");

                expect(component.length).toBe(1);
            });
        })
    })
})