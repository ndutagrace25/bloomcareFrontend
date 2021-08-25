import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import Pagination from '../../components/common/Pagination';

const setUp = (props = {}) => {
        const component = shallow( < Pagination {
                ...props
            }
            />);
            return component;
        }

        describe('Pagination tests', () => {
            describe('Checking Prop Types', () => {
                it('It should not throw a warning', () => {
                    const expectedProps = {
                        page: 23,
                        limit: 23,
                        count: 23,
                        handleDecrementPage: () => {},
                        handleIncrementPage: () => {},
                        handleOnChangePage: () => {}
                    }

                    const propsErr = checkProps(Pagination, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it('It should throw a warning', () => {
                    const expectedProps = {
                        page: '',
                        limit: '',
                        count: '',
                        handleDecrementPage: [],
                        handleIncrementPage: [],
                        handleOnChangePage: []
                    }

                    const propsErr = checkProps(Pagination, expectedProps);
                    expect(propsErr).toMatch('Failed props type');
                });
            })

            describe('Rendering component', () => {

                let wrapper;

                beforeEach(() => {
                    const props = {
                        page: 23,
                        limit: 23,
                        count: 23,
                        handleDecrementPage: () => {},
                        handleIncrementPage: () => {},
                        handleOnChangePage: () => {}
                    };

                    wrapper = setUp(props);
                });

                it('It should render Pagination without errors', () => {
                    const component = findByTestAttribute(wrapper, "PaginationComponent");

                    expect(component.length).toBe(1);
                });

            })
        })