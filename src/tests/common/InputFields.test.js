import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import InputFields from '../../components/common/InputFields';

const setUp = (props = {}) => {
        const component = shallow( < InputFields {
                ...props
            }
            />);
            return component;
        }

        describe('InputFields tests', () => {
            describe('Checking Prop Types', () => {
                it('It should not throw a warning', () => {
                    const expectedProps = {
                        name: '',
                        type: '',
                        onChange: () => {},
                        label: ''
                    }

                    const propsErr = checkProps(InputFields, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it('It should throw a warning', () => {
                    const expectedProps = {
                        name: () => {},
                        type: () => {},
                        onChange: '',
                        label: () => {}
                    }

                    const propsErr = checkProps(InputFields, expectedProps);
                    expect(propsErr).toMatch('Failed props type');
                });
            })

            describe('Rendering component', () => {

                let wrapper;
                beforeEach(() => {
                    const props = {
                        name: '',
                        type: '',
                        onChange: () => {},
                        label: ''
                    };
                    wrapper = setUp(props);
                });

                it('It should render an InputField without errors', () => {
                    const component = findByTestAttribute(wrapper, "InputFieldsComponent");

                    expect(component.length).toBe(1);
                });
            })
        })