import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Context from './context'

const ScrollableArea = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
  overflow-scrolling: touch;
  width: ${({ width }) => width ? `${width}px` : '100%'};

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


const ItemContainer = ({ children }) => (
  <Context.Consumer>
    {({ scrollable: { width, ref, itemWidth, spaceBetween } }) => (
      <ScrollableArea
        width={width}
        innerRef={ref}
        data-testid="karuselli-items-wrapper"
      >
        {_.map(children, (item, i) => (
          <Item
            key={i}
            width={itemWidth}
            spaceRight={i < children.length - 1 ? spaceBetween : 0}
            data-testid={`karuselli-item-${i}`}
          >
            {item}
          </Item>
        ))}
      </ScrollableArea>
    )}
  </Context.Consumer>
)
ItemContainer.displayName = 'ItemContainer'

ItemContainer.propTypes = {
  children: PropTypes.array
}

ItemContainer.defaultProps = {
  children: []
}

export default ItemContainer
