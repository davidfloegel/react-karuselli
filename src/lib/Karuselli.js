import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Context from './context'
import { DIRECTION, ARROW_KEYS, getSpeedSteps, calculateItemWidth } from './util'

const KaruselliDiv = styled.div`
  position: relative;
`

export default class Karuselli extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    visibleItems: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        xs: PropTypes.number,
        sm: PropTypes.number,
        md: PropTypes.number,
        lg: PropTypes.number
      })
    ]),
    speed: PropTypes.oneOf(['slow', 'default', 'fast']),
    spaceBetween: PropTypes.number,
    teaseNext: PropTypes.bool,
    scrollItems: PropTypes.number,
    scrollWithArrowKeys: PropTypes.bool
  }

  static defaultProps = {
    width: null,
    visibleItems: {
      xs: 2,
      sm: 3,
      md: 3,
      lg: 4
    },
    speed: 'default',
    spaceBetween: 30,
    teaseNext: true,
    scrollItems: 1,
    scrollWithArrowKeys: false
  }

  constructor(props) {
    super(props)

    this.wrapperRef = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
    this.forceUpdate()
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress = ({ keyCode }) => {
    if (this.props.scrollWithArrowKeys) {
      if (keyCode === ARROW_KEYS.LEFT) {
        this.scroll(DIRECTION.LEFT)
      }

      if (keyCode === ARROW_KEYS.RIGHT) {
        this.scroll(DIRECTION.RIGHT)
      }
    }
  }

  getKaruselliWidth = () => {
    if (this.props.width) {
      return this.props.width
    }

    if (!this.wrapperRef.current) {
      return 0
    }

    return this.wrapperRef.current.clientWidth
  }

  calculateItemWidth = () => {
    if (!this.wrapperRef.current) {
      return 0
    }

    const { spaceBetween, teaseNext, visibleItems } = this.props
    return calculateItemWidth(this.getKaruselliWidth(), visibleItems, spaceBetween, teaseNext)
  }

  scroll = (direction) => {
    const { spaceBetween, scrollItems } = this.props
    const itemWidth = this.calculateItemWidth()
    const karuselliWidth = this.getKaruselliWidth()

    const karuselli = this.wrapperRef.current
    const totalWidth = karuselli.scrollWidth

    const currentOffset = karuselli.scrollLeft

    const isBackwards = direction === DIRECTION.LEFT
    const moveByPixels = (itemWidth + spaceBetween) * scrollItems * (isBackwards ? -1 : 1)

    // make sure user can't "overscroll"
    let targetPosition = currentOffset + moveByPixels
    if (targetPosition >= totalWidth - karuselliWidth) {
      targetPosition = totalWidth - karuselliWidth
    }

    this._animateScroll(direction, targetPosition, () => this.forceUpdate())
  }

  _animateScroll = (direction, targetPosition, onFinish) => {
    const wrapper = this.wrapperRef.current

    if (direction === DIRECTION.LEFT && wrapper.scrollLeft <= 0) {
      return onFinish()
    }

    if (direction === DIRECTION.RIGHT && wrapper.scrollLeft >= targetPosition) {
      return onFinish()
    }

    const steps = getSpeedSteps(this.props.speed)
    const currentOffset = wrapper.scrollLeft

    if (direction === DIRECTION.RIGHT) {
      if (currentOffset + steps > targetPosition) {
        this.wrapperRef.current.scrollLeft = targetPosition
        return onFinish()
      } else {
        this.wrapperRef.current.scrollLeft += steps
      }
    }

    if (direction === DIRECTION.LEFT) {
      if (currentOffset - steps < targetPosition) {
        this.wrapperRef.current.scrollLeft = targetPosition
        return onFinish()
      } else {
        this.wrapperRef.current.scrollLeft += steps * -1
      }
    }

    setTimeout(() => this._animateScroll(direction, targetPosition, onFinish))
    return null
  }

  getDirectionEnabled = () => {
    const wrapper = this.wrapperRef.current

    if (!wrapper) {
      return 0
    }

    const { scrollLeft, scrollWidth } = wrapper

    return {
      scrollLeftDisabled: scrollLeft <= 0,
      scrollRightDisabled: scrollLeft > 0 && scrollLeft + 1 >= scrollWidth - this.getKaruselliWidth()
    }
  }

  render() {
    const { children, spaceBetween } = this.props

    return (
      <Context.Provider value={{
        onScrollLeft: () => this.scroll(DIRECTION.LEFT),
        onScrollRight: () => this.scroll(DIRECTION.RIGHT),
        scrollable: {
          spaceBetween,
          width: this.getKaruselliWidth(),
          itemWidth: this.calculateItemWidth(),
          ref: this.wrapperRef
        },
        ...this.getDirectionEnabled()
      }}>
        <KaruselliDiv>
          {children}
        </KaruselliDiv>
      </Context.Provider>
    )
  }
}
