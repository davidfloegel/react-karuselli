import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { determineScreenSize } from './util'

const Context = React.createContext({
  onScrollLeft: () => {},
  onScrollRight: () => {}
})

const KaruselliDiv = styled.div`
  position: relative;
`

const ScrollableArea = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
  overflow-scrolling: touch;
  width: ${({ width }) => `${width}px` || '100%'}

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }
`

const Item = styled.div`
  ${({ width, spaceRight }) => css`
    display: inline-block;
    width: ${width}px;
    margin-right: ${spaceRight}px;
    flex: 0 0 auto;
  `}
`

class KaruselliWrapper extends React.Component {
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
    spaceBetween: PropTypes.number,
    teaseNext: PropTypes.bool,
    scrollItems: PropTypes.number
  }

  static defaultProps = {
    width: null,
    visibleItems: {
      xs: 2,
      sm: 3,
      md: 3,
      lg: 4
    },
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

  getNumberOfVisibleItems() {
    const { visibleItems } = this.props

    if (_.isNumber(visibleItems)) {
      return visibleItems
    }

    const sizeString = determineScreenSize(window.innerWidth)

    if (_.get(visibleItems, sizeString)) {
      return visibleItems[sizeString]
    }

    return _.get(visibleItems, _.last(_.keys(visibleItems)))
  }

  calculateItemWidth = () => {
    if (!this.wrapperRef.current) {
      return 0
    }

    const clientWidth = this.getKaruselliWidth()
    const { spaceBetween, teaseNext } = this.props
    const visibleItems = this.getNumberOfVisibleItems()

    const calcSpaceBetween = teaseNext ? visibleItems * spaceBetween : (visibleItems - 1) * spaceBetween

    return Math.round((clientWidth - calcSpaceBetween - (teaseNext * spaceBetween)) / visibleItems)
  }

  // getItems() {
  //   const container = _.head(_.filter(this.props.children, c => c.type.displayName === 'Scrollable'))
  //   return _.get(container, 'props.children', [])
  // }

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
      // console.log(currentOffset + s, targetPosition)

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

    return {
      scrollLeftDisabled: k.scrollLeft <= 0,
      scrollRightDisabled: k.scrollLeft > 0 && k.scrollLeft + 1 >= k.scrollWidth - this.getKaruselliWidth()
    }
  }

  render() {
    const { width, children, spaceBetween } = this.props

    return (
      <Context.Provider value={{
        onScrollLeft: () => this.scrollLeft(),
        onScrollRight: () => this.scrollRight(),
        ...this.getDirectionEnabled()
      }}>
        <KaruselliDiv>
          {_.map(children, (child, x) => {
            if (child.type.displayName === 'Scrollable') {
              return (
                <ScrollableArea key={x} width={width} innerRef={this.wrapperRef} data-testid="karuselli-wrapper">
                  {_.map(child.props.children, (item, i) => (
                    <Item
                      key={i}
                      width={this.calculateItemWidth()}
                      spaceRight={i < child.props.children.length - 1 ? spaceBetween : 0}
                      data-testid={`karuselli-item-${i}`}
                    >
                      {item}
                    </Item>
                  ))}
                </ScrollableArea>
              )
            }

            return child
          })}
        </KaruselliDiv>
      </Context.Provider>
    )
  }
}

const Scrollable = ({ children }) => children
Scrollable.displayName = 'Scrollable'

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

KaruselliWrapper.Scrollable = Scrollable
KaruselliWrapper.LeftArrow = LeftArrow
KaruselliWrapper.RightArrow = RightArrow

export default KaruselliWrapper
