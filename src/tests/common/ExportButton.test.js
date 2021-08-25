import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import ExportButton from '../../components/common/ExportButton';

const setUp = (props = {}) => {
    const component = shallow(<ExportButton {...props} />);
    return component;
}

describe('ExportButton tests', () => {
    describe('Checking Prop Types', () => {
        it('It should not throw a warning', () => {
            const expectedProps = {
                data: [], 
                filename: ''
            }

            const propsErr = checkProps(ExportButton, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it('It should throw a warning', () => {
            const expectedProps = {
                data: {}, 
                filename: {}
            }

            const propsErr = checkProps(ExportButton, expectedProps);
            expect(propsErr).toMatch('Failed props type');
        });
    })

    describe('Rendering component', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                data: [], 
                filename: ''
            };

            wrapper = setUp(props);
        });

        it('It should render an export button without errors', () => {
            const component = findByTestAttribute(wrapper, "ExportButtonComponent");

            expect(component.length).toBe(1);
        });
    })
})