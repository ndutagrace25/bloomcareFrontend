import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import DashboardNav from '../../components/common/DashboardNav';

const setUp = (props = {}) => {
        const component = shallow( < DashboardNav {
                ...props
            }
            />);
            return component;
        }

        describe('DashboardNav tests', () => {
            describe('Checking Prop Types', () => {
                it('It should not throw a warning', () => {
                    const expectedProps = {
                        reportTitle: '',
                    }

                    const propsErr = checkProps(DashboardNav, expectedProps);

                    expect(propsErr).toBeUndefined();
                });

                it('It should throw a warning', () => {
                    const expectedProps = {
                        reportTitle: () => {}
                    }

                    const propsErr = checkProps(DashboardNav, expectedProps);
                    expect(propsErr).toMatch('Failed props type');
                });
            })

            describe('Rendering component', () => {

                let wrapper;
                beforeEach(() => {
                    const props = {
                        reportTitle: 'Farm View',
                    };
                    wrapper = setUp(props);
                });

                it('It should render a dashboardNav without errors', () => {
                    const component = findByTestAttribute(wrapper, "DashboardNavComponent");

                    expect(component.length).toBe(1);
                });
            })
        })