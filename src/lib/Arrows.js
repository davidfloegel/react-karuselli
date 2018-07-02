import React from 'react'
import PropTypes from 'prop-types'

import Context from './context'

const Arrow = ({ isLeft, component }) => (
  <Context.Consumer>
    {({ onScrollLeft, onScrollRight, scrollLeftDisabled, scrollRightDisabled }) => (
      React.cloneElement(component, {
        onClick: isLeft ? onScrollLeft : onScrollRight,
        disabled: isLeft ? scrollLeftDisabled : scrollRightDisabled
      })
    )}
  </Context.Consumer>
)

Arrow.propTypes = {
  isLeft: PropTypes.bool,
  component: PropTypes.element.isRequired
}

Arrow.defaultProps = {
  isLeft: false
}

const LeftArrow = props => <Arrow isLeft {...props} />
const RightArrow = props => <Arrow {...props} />

LeftArrow.displayName = 'Karuselli-Arrow'
RightArrow.displayName = 'Karuselli-Arrow'

export {
  LeftArrow,
  RightArrow
}
