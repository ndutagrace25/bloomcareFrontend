import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    findByTestAttribute,
} from '../../utils';

import ContentContainer from '../../components/common/ContentContainer';

const setUp = (props = {}) => {
    const component = shallow(<ContentContainer {...props} />);
    return component;
}

describe('ContentContainer tests', () => {
    describe('Rendering component', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                content: 'content',
            };
            wrapper = setUp(props);
        });

        it('It should render a card without errors', () => {
            const component = findByTestAttribute(wrapper, "ContentContainerComponent");
            expect(component.length).toBe(1);
        });
    })
})