import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
    checkProps
} from '../../utils';

import Button from '../../components/common/Button';

const setUp = (props = {}) => {
    const component = shallow(<Button {...props} />);
    return component;
}

describe('Button tests', () => {
    describe('Checking Prop Types', () => {
        it('It should not throw a warning', () => {
            const expectedProps = {
                type: '',
                value: '',
                className: '',
                onClick: () => { },
                dataToggle: '',
                dataTarget: '',
                dataDismiss: '',
                otherProps: ''
            }

            const propsErr = checkProps(Button, expectedProps);

            expect(propsErr).toBeUndefined();
        });

        it('It should throw a warning', () => {
            const expectedProps = {
                type: () => { },
                value: () => { },
                className: () => { },
                onClick: false,
                dataToggle: () => { },
                dataTarget: () => { },
                dataDismiss: () => { },
                otherProps: false
            }

            const propsErr = checkProps(Button, expectedProps);
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
                className: 'btn btn-primary',
                onClick: mockFunc,
            };

            wrapper = setUp(props);
        });

        it('It should render a button without errors', () => {
            const component = findByTestAttribute(wrapper, "ButtonComponent");

            expect(component.length).toBe(1);
        });

        it('It should call callback on click event', () => {
            const component = findByTestAttribute(wrapper, "ButtonComponent");
            component.simulate('click');
            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(1);
        });
    })
})