import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import SearchContainer from '../../components/common/SearchContainer';

const setUp = (props = {}) => {
        const component = shallow( < SearchContainer {
                ...props
            }
            />);
            return component;
        }

        describe('SearchContainer tests', () => {
            describe('Rendering component', () => {

                let wrapper;

                beforeEach(() => {
                    wrapper = setUp();
                });

                it('It should render SearchContainer without errors', () => {
                    const component = findByTestAttribute(wrapper, "SearchContainerComponent");

                    expect(component.length).toBe(1);
                });

            })
        })