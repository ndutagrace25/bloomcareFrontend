import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import NavLink from '../../components/common/NavLink';

const setUp = (props = {}) => {
        const component = shallow( < NavLink {
                ...props
            }
            />);
            return component;
        }

        describe('NavLink tests', () => {
            describe('Checking Prop Types', () => {
                it('It should not throw a warning', () => {
                    const expectedProps = {
                        name: '',
                        to: '',
                    }

                    const propsErr = checkProps(NavLink, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it('It should throw a warning', () => {
                    const expectedProps = {
                        name: () => {},
                        to: () => {},
                    }

                    const propsErr = checkProps(NavLink, expectedProps);
                    expect(propsErr).toMatch('Failed props type');
                });
            })

            describe('Rendering component', () => {

                let wrapper;
                beforeEach(() => {
                    const props = {
                        name: 'button',
                        to: '/',
                    };

                    wrapper = setUp(props);
                });

                it('It should render a NavLink without errors', () => {
                    const component = findByTestAttribute(wrapper, "NavLinkComponent");

                    expect(component.length).toBe(1);
                });
            })
        })