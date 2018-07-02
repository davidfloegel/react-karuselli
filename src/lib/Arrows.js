import React from 'react'

import Context from './context'

const Arrow = ({ left, component }) => (
  <Context.Consumer>
    {({ onScrollLeft, onScrollRight, scrollLeftDisabled, scrollRightDisabled }) => (
      React.cloneElement(component, {
        onClick: left ? onScrollLeft : onScrollRight,
        disabled: left ? scrollLeftDisabled : scrollRightDisabled
      })
    )}
  </Context.Consumer>
)

const LeftArrow = (props) => <Arrow left {...props} />
const RightArrow = (props) => <Arrow {...props} />

LeftArrow.displayName = 'Karuselli-Arrow'
RightArrow.displayName = 'Karuselli-Arrow'

export {
  LeftArrow,
  RightArrow
}
