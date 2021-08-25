import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
} from '../../utils';

import Table from '../../components/common/Table';

const setUp = (props = {}) => {
        const component = shallow( < Table {
                ...props
            }
            />);
            return component;
        }

        describe('Table tests', () => {

            describe('Rendering component', () => {

                let wrapper;

                beforeEach(() => {
                    wrapper = setUp();
                });

                it('It should render Table without errors', () => {
                    const component = findByTestAttribute(wrapper, "TableComponent");

                    expect(component.length).toBe(1);
                });

            })
        })