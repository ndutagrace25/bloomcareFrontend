import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import Error from '../../components/common/Error';

const setUp = (props = {}) => {
        const component = shallow( < Error {
                ...props
            }
            />);
            return component;
        }

        describe('Error tests', () => {
            describe('Checking Prop Types', () => {
                it('It should not throw a warning', () => {
                    const expectedProps = {
                        message: '',
                    }

                    const propsErr = checkProps(Error, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it('It should throw a warning', () => {
                    const expectedProps = {
                        message: () => {}
                    }

                    const propsErr = checkProps(Error, expectedProps);
                    expect(propsErr).toMatch('Failed props type');
                });
            })

            describe('Rendering component', () => {

                let wrapper;
                beforeEach(() => {
                    const props = {
                        message: 'Farm View',
                    };
                    wrapper = setUp(props);
                });

                it('It should render a Error without errors', () => {
                    const component = findByTestAttribute(wrapper, "ErrorComponent");

                    expect(component.length).toBe(1);
                });
            })
        })