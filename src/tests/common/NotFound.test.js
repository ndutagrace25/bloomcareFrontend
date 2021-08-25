import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
} from '../../utils';

import NotFound from '../../components/common/NotFound';

const setUp = (props = {}) => {
    const component = shallow(<NotFound {...props} />);
    return component;
}

describe('NotFound tests', () => {
    describe('Rendering component', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                cardBody: 'cardBody',
            };
            wrapper = setUp(props);
        });

        it('It should render a NotFound without errors', () => {
            const component = findByTestAttribute(wrapper, "NotFoundComponent");
            expect(component.length).toBe(1);
        });
    })
})