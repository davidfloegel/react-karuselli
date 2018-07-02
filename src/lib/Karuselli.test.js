import React from 'react'
import { render } from 'react-testing-library'

import Karuselli from './Wrapper'

describe('Karuselli Tests', () => {
  it('renders properly with default configuration', () => {
    const Item = <div style={{ background: 'red', height: '50px' }}>Hello</div>

    const Component = (
      <div style={{ width: '800px' }}>
        <Karuselli width={800}>
          {Item}
          {Item}
          {Item}
          {Item}
          {Item}
          {Item}
          {Item}
        </Karuselli>
      </div>
    )

    const { getByTestId } = render(Component)

    const firstItem = getByTestId('karuselli-item-0')
    // const secondItem = getByTestId('karuselli-item-1')

    expect(parseInt(firstItem.attributes.width.value, 10)).toBeCloseTo(226)

    // @TODO
    // - test that the second item starts at firstItemWidth + DefaultSpace
    // - test that the 4th item is slightly visible (teaseNext)
  })
})