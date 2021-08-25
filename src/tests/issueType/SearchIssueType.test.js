import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import SearchIssueType from '../../components/issueType/SearchIssueType';

const setUpSearch = (props = {}) => {
        const component = shallow( < SearchIssueType {
                ...props
            }
            />);
            return component;
        }

        describe('SearchIssueType tests', () => {
            describe('Checking Prop Types', () => {
                it('It should not throw a warning', () => {
                    const expectedProps = {
                        handleSearch: () => {},
                        handleCloseSearch: () => {},
                        search_name: ''
                    }

                    const propsErr = checkProps(SearchIssueType, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it('It should throw a warning', () => {
                    const expectedProps = {
                        handleSearch: [],
                        handleCloseSearch: [],
                        search_name: {}
                    }

                    const propsErr = checkProps(SearchIssueType, expectedProps);
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
                            search_name: ''
                        };
                        wrapper = setUpSearch(props);
                    });

                    it('It should render component without errors', () => {
                        const component = findByTestAttribute(wrapper, "SearchIssueTypeComponent");

                        expect(component.length).toBe(1);
                    });
                })
            })
        })