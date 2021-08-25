import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import SearchTolerance from '../../components/tolerance/SearchTolerance';

const setUpSearch = (props = {}) => {
        const component = shallow( < SearchTolerance {
                ...props
            }
            />);
            return component;
        }

        describe('SearchTolerance tests', () => {
            describe('Checking Prop Types', () => {
                it('It should not throw a warning', () => {
                    const expectedProps = {
                        handleSearch: () => {},
                        handleCloseSearch: () => {},
                        search_name: '',
                        search_percentage: '',
                        search_tolerance_type: '',
                        toleranceType: []
                    }

                    const propsErr = checkProps(SearchTolerance, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it('It should throw a warning', () => {
                    const expectedProps = {
                        handleSearch: [],
                        handleCloseSearch: [],
                        search_name: {},
                        search_percentage: {},
                        search_tolerance_type: {},
                        toleranceType: {}
                    }

                    const propsErr = checkProps(SearchTolerance, expectedProps);
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
                            search_name: '',
                            search_percentage: '',
                            search_tolerance_type: '',
                            toleranceType: []
                        };
                        wrapper = setUpSearch(props);
                    });

                    it('It should render component without errors', () => {
                        const component = findByTestAttribute(wrapper, "SearchToleranceComponent");

                        expect(component.length).toBe(1);
                    });
                })
            })
        })