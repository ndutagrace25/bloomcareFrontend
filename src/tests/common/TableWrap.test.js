import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import TableWrap from '../../components/common/TableWrap';

const setUp = (props = {}) => {
        const component = shallow( < TableWrap {
                ...props
            }
            />);
            return component;
        }

        describe('TableWrap tests', () => {
            describe('Checking Prop Types', () => {
                it('It should not throw a warning', () => {
                    const expectedProps = {
                        tableTitle: "",
                    }

                    const propsErr = checkProps(TableWrap, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it('It should throw a warning', () => {
                    const expectedProps = {
                        tableTitle: [],
                    }

                    const propsErr = checkProps(TableWrap, expectedProps);
                    expect(propsErr).toMatch('Failed props type');
                });
            })

            describe('Rendering component', () => {

                let wrapper;

                beforeEach(() => {
                    const props = {
                        tableTitle: "",
                    };

                    wrapper = setUp(props);
                });

                it('It should render TableWrap without errors', () => {
                    const component = findByTestAttribute(wrapper, "TableWrapComponent");

                    expect(component.length).toBe(1);
                });

            })
        })