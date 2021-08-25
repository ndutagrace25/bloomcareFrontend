import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';
import sinon from "sinon";

import LoginTextFieldGroup from '../../components/common/LoginTextFieldGroup';

const setUp = (props = {}) => {
        const component = shallow( < LoginTextFieldGroup {
                ...props
            }
            />);
            return component;
        }

        describe('LoginTextFieldGroup tests', () => {
            describe('Checking Prop Types', () => {
                it('It should not throw a warning', () => {
                    const expectedProps = {
                        name: '',
                        id: '',
                        placeholder: '',
                        value: '',
                        error: '',
                        style: {},
                        type: '',
                        onChange: () => {},
                        icon: ''
                    }

                    const propsErr = checkProps(LoginTextFieldGroup, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it('It should throw a warning', () => {
                    const expectedProps = {
                        name: [],
                        id: [],
                        placeholder: [],
                        value: [],
                        error: [],
                        style: '',
                        type: [],
                        onChange: '',
                        icon: []
                    }

                    const propsErr = checkProps(LoginTextFieldGroup, expectedProps);
                    expect(propsErr).toMatch('Failed props type');
                });
            })

            describe('Rendering component', () => {

                let wrapper;
                beforeEach(() => {
                    const props = {
                        name: '',
                        id: '',
                        placeholder: '',
                        value: '',
                        error: '',
                        style: {},
                        type: '',
                        onChange: () => {},
                        icon: ''
                    };

                    wrapper = setUp(props);
                });

                it('It should render a LoginFieldGroup without errors', () => {
                    const component = findByTestAttribute(wrapper, "LoginTextFieldGroupComponent");

                    expect(component.length).toBe(1);
                });
            })
        })