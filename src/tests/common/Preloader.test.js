import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import Preloader from '../../components/common/Preloader';

const setUp = (props = {}) => {
        const component = shallow( < Preloader {
                ...props
            }
            />);
            return component;
        }

        describe('Preloader tests', () => {
            describe('Checking Prop Types', () => {
                it('It should not throw a warning', () => {
                    const expectedProps = {
                        style: 'd-block',
                    }

                    const propsErr = checkProps(Preloader, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it('It should throw a warning', () => {
                    const expectedProps = {
                        style: {}
                    }

                    const propsErr = checkProps(Preloader, expectedProps);
                    expect(propsErr).toMatch('Failed props type');
                });
            })

            describe('Rendering component', () => {

                let wrapper;

                beforeEach(() => {
                    const props = {
                        style: 'd-block',
                    };

                    wrapper = setUp(props);
                });

                it('It should render Preloader without errors', () => {
                    const component = findByTestAttribute(wrapper, "PreloaderComponent");

                    expect(component.length).toBe(1);
                });

            })
        })