import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Context = React.createContext({
  onScrollLeft: () => {},
  onScrollRight: () => {}
})

const KaruselliDiv = styled.div`
  position: relative;
`

const ScrollableArea = styled.div`
  overflow-x: hidden;
  white-space: nowrap;
  overflow-scrolling: touch;
  width: ${({ width }) => `${width}px` || '100%'}

  &::-webkit-scrollbar {
    display: none;
  }

`

const Item = styled.div`
  ${({ width, spaceRight }) => css`
    display: inline-block;
    width: ${width}px;
    margin-right: ${spaceRight}px;
  `}
`

class KaruselliWrapper extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    visibleItems: PropTypes.number.isRequired,
    spaceBetween: PropTypes.number,
    teaseNext: PropTypes.bool,
    scrollItems: PropTypes.number
  }

  static defaultProps = {
    width: null,
    visibleItems: 3,
    spaceBetween: 30,
    teaseNext: true,
    scrollItems: 1
  }

  constructor(props) {
    super(props)

    this.wrapperRef = React.createRef()
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  getKaruselliWidth() {
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

    const clientWidth = this.getKaruselliWidth()
    const { visibleItems, spaceBetween, teaseNext } = this.props

    const calcSpaceBetween = teaseNext ? visibleItems * spaceBetween : (visibleItems - 1) * spaceBetween

    return Math.round((clientWidth - calcSpaceBetween - (teaseNext * spaceBetween)) / visibleItems)
  }

  getItems() {
    return _.filter(this.props.children, c => c.type.displayName !== 'Karuselli-Arrow')
  }

  scrollLeft() {
    this._scroll(true)
  }

  scrollRight() {
    this._scroll()
  }

  _scroll(isBack) {
    const { spaceBetween, scrollItems } = this.props
    const itemWidth = this.calculateItemWidth()
    const width = this.getKaruselliWidth()

    const karuselli = this.wrapperRef.current
    const totalWidth = karuselli.scrollWidth

    console.log('1', totalWidth)

    const currentOffset = karuselli.scrollLeft

    const moveByPixels = (itemWidth + spaceBetween) * scrollItems * (isBack ? -1 : 1)

    // make sure user can't "overscroll"
    let targetPosition = currentOffset + moveByPixels
    if (targetPosition >= totalWidth - width) {
      targetPosition = totalWidth - width
    }

    this.animateScroll(moveByPixels, targetPosition, () => this.forceUpdate())
  }

  animateScroll(moveByPixels, targetPosition, onFinish) {
    const direction = moveByPixels > 0 ? 'right' : 'left'

    const wrapper = this.wrapperRef.current

    if (direction === 'left' && wrapper.scrollLeft <= 0) {
      return onFinish()
    }

    if (direction === 'right' && wrapper.scrollLeft >= targetPosition) {
      return onFinish()
    }

    const s = 12
    const currentOffset = wrapper.scrollLeft

    if (direction === 'right') {
      console.log(currentOffset + s, targetPosition)

      if (currentOffset + s > targetPosition) {
        this.wrapperRef.current.scrollLeft = targetPosition
        return onFinish()
      } else {
        this.wrapperRef.current.scrollLeft += s
      }
    }

    if (direction === 'left') {
      if (currentOffset - s < targetPosition) {
        this.wrapperRef.current.scrollLeft = targetPosition
        return onFinish()
      } else {
        this.wrapperRef.current.scrollLeft += s * -1
      }
    }

    setTimeout(() => this.animateScroll(moveByPixels, targetPosition, onFinish))
    return null
  }

  getDirectionEnabled() {
    if (!this.wrapperRef.current) {
      return 0
    }

    const k = this.wrapperRef.current

    console.log('here', k.scrollLeft + 1, k.scrollWidth - this.getKaruselliWidth())

    return {
      scrollLeftDisabled: k.scrollLeft <= 0,
      scrollRightDisabled: k.scrollLeft > 0 && k.scrollLeft + 1 >= k.scrollWidth - this.getKaruselliWidth()
    }
  }

  render() {
    const { width, children, spaceBetween } = this.props

    const arrows = _.filter(children, c => c.type.displayName === 'Karuselli-Arrow')
    const items = this.getItems()
    const numOfCards = items.length

    return (
      <Context.Provider value={{
        onScrollLeft: () => this.scrollLeft(),
        onScrollRight: () => this.scrollRight(),
        ...this.getDirectionEnabled()
      }}>
        <KaruselliDiv>
          {arrows}

          <ScrollableArea width={width} innerRef={this.wrapperRef} data-testid="karuselli-wrapper">
            {_.map(items, (item, i) => (
              <Item
                key={i}
                width={this.calculateItemWidth()}
                spaceRight={i < numOfCards - 1 ? spaceBetween : 0}
                data-testid={`karuselli-item-${i}`}
              >
                {item}
              </Item>
            ))}
          </ScrollableArea>
        </KaruselliDiv>
      </Context.Provider>
    )
  }
}

const Arrow = ({ left, children }) => (
  <Context.Consumer>
    {({ onScrollLeft, onScrollRight, scrollLeftDisabled, scrollRightDisabled }) => (
      React.cloneElement(children, {
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

KaruselliWrapper.LeftArrow = LeftArrow
KaruselliWrapper.RightArrow = RightArrow

export default KaruselliWrapper
