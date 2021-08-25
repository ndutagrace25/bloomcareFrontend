import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import HyperLink from '../../components/common/HyperLink';

const setUp = (props = {}) => {
        const component = shallow( < HyperLink {
                ...props
            }
            />);
            return component;
        }

        describe('HyperLink tests', () => {
            describe('Checking Prop Types', () => {
                it('It should not throw a warning', () => {
                    const expectedProps = {
                        name: '',
                        to: '',
                        className: '',
                        onClick: () => {}
                    }

                    const propsErr = checkProps(HyperLink, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it('It should throw a warning', () => {
                    const expectedProps = {
                        name: () => {},
                        to: () => {},
                        className: () => {},
                        onClick: ''
                    }

                    const propsErr = checkProps(HyperLink, expectedProps);
                    expect(propsErr).toMatch('Failed props type');
                });
            })

            describe('Rendering component', () => {

                let wrapper;
                let mockFunc;

                beforeEach(() => {
                    mockFunc = jest.fn();

                    const props = {
                        type: 'button',
                        to: '/',
                        className: 'btn btn-primary',
                        onClick: mockFunc,
                    };

                    wrapper = setUp(props);
                });

                it('It should render a button without errors', () => {
                    const component = findByTestAttribute(wrapper, "HyperLinkComponent");

                    expect(component.length).toBe(1);
                });

                it('It should call callback on click event', () => {
                    const component = findByTestAttribute(wrapper, "HyperLinkComponent");
                    component.simulate('click');
                    const callback = mockFunc.mock.calls.length;
                    expect(callback).toBe(1);
                });
            })
        })