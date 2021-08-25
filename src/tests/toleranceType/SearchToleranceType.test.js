import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import SearchToleranceType from '../../components/toleranceType/SearchToleranceType';

const setUpSearch = (props = {}) => {
        const component = shallow( < SearchToleranceType {
                ...props
            }
            />);
            return component;
        }

        describe('SearchToleranceType tests', () => {
            describe('Checking Prop Types', () => {
                it('It should not throw a warning', () => {
                    const expectedProps = {
                        handleCloseSearch: () => {},
                        handleSearch: () => {},
                        search_name: ''
                    }

                    const propsErr = checkProps(SearchToleranceType, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it('It should throw a warning', () => {
                    const expectedProps = {
                        handleCloseSearch: [],
                        handleSearch: [],
                        search_name: {}
                    }

                    const propsErr = checkProps(SearchToleranceType, expectedProps);
                    expect(propsErr).toMatch('Failed props type');
                });
            })

            describe('Rendering component', () => {

                describe('Render with props', () => {
                    let wrapper;
                    beforeEach(() => {
                        const props = {
                            handleCloseSearch: () => {},
                            handleSearch: () => {},
                            search_name: ''
                        };
                        wrapper = setUpSearch(props);
                    });

                    it('It should render component without errors', () => {
                        const component = findByTestAttribute(wrapper, "SearchToleranceTypeComponent");

                        expect(component.length).toBe(1);
                    });
                })
            })
        })