import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import SearchScout from '../../components/scout/SearchScout';

const setUpSearch = (props = {}) => {
        const component = shallow( < SearchScout {
                ...props
            }
            />);
            return component;
        }

        describe('SearchScout tests', () => {
            describe('Checking Prop Types', () => {
                it('It should not throw a warning', () => {
                    const expectedProps = {
                        handleSearch: () => {},
                        handleCloseSearch: () => {},
                        search_date: '',
                        search_plant: '',
                        search_entry: '',
                        search_point: '',
                        search_issue: '',
                        search_issueCategory: '',
                        search_value: ''
                    }

                    const propsErr = checkProps(SearchScout, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it('It should throw a warning', () => {
                    const expectedProps = {
                        handleSearch: [],
                        handleCloseSearch: [],
                        search_date: [],
                        search_plant: [],
                        search_entry: [],
                        search_point: [],
                        search_issue: [],
                        search_issueCategory: [],
                        search_value: []
                    }

                    const propsErr = checkProps(SearchScout, expectedProps);
                    expect(propsErr).toMatch('Failed props type');
                });
            })

            describe('Rendering component', () => {

                describe('Render with props', () => {
                    let wrapper;
                    beforeEach(() => {
                        const props = {
                            handleSearch: () => {},
                            handleCloseSearch: () => {},
                            search_date: '',
                            search_plant: '',
                            search_entry: '',
                            search_point: '',
                            search_issue: '',
                            search_issueCategory: '',
                            search_value: ''
                        };
                        wrapper = setUpSearch(props);
                    });

                    it('It should render component without errors', () => {
                        const component = findByTestAttribute(wrapper, "SearchScoutComponent");

                        expect(component.length).toBe(1);
                    });
                })
            })
        })