import React from 'react'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Karuselli from './index'

Enzyme.configure({ adapter: new Adapter() });


describe('Karuselli Tests', () => {
  it('renders properly with default configuration', () => {
    const Item = <div style={{ background: 'red', height: '50px' }}>Hello</div>

    const Component = () => (
      <Karuselli width={800}>
        <Karuselli.Items>
          {Item}
          {Item}
          {Item}
          {Item}
          {Item}
          {Item}
          {Item}
        </Karuselli.Items>
      </Karuselli>
    )

    const renderedComponent = mount(<Component />)

    const wrapper = renderedComponent.find('div[data-testid="karuselli-items-wrapper"]')
    expect(wrapper.prop('width')).toBe(800)

    const firstItem = renderedComponent.find('div[data-testid="karuselli-item-0"]')
    expect(firstItem.prop('width')).toBe(227)

    const secondItem = renderedComponent.find('div[data-testid="karuselli-item-1"]')
    expect(secondItem.prop('width')).toBe(227)
    console.log(secondItem.getDOMNode())

    // @TODO
    // - test that the second item starts at firstItemWidth + DefaultSpace
    // - test that the 4th item is slightly visible (teaseNext)
  })
})