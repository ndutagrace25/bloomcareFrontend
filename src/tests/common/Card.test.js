import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
} from '../../utils';

import Card from '../../components/common/Card';

const setUp = (props = {}) => {
    const component = shallow(<Card {...props} />);
    return component;
}

describe('Card tests', () => {
    describe('Rendering component', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                cardBody: 'cardBody',
            };
            wrapper = setUp(props);
        });

        it('It should render a card without errors', () => {
            const component = findByTestAttribute(wrapper, "CardComponent");
            expect(component.length).toBe(1);
        });
    })
})