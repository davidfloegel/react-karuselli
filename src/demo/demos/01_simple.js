import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'

import Karuselli from '../../lib'
import PortraitPanel from './components/number_panel'

const COLORS = [
  '#16a085', '#2980b9', '#c0392b', '#8e44ad', '#f39c12', '#27ae60', '#e67e22'
]

const Arrow = styled.button`
  font-size: 35px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0px;
  margin-left: 10px;

  &:active, &:focus {
    outline: none;
  }

  &:active {
    color: #2980b9;
  }

  &:disabled {
    opacity: .5;
  }
`

const Header = styled.div`
  display: flex;
  margin-bottom: 25px;
  align-items: center;
`

const TitleContainer = styled.div`
  flex: 1;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`

const Subtitle = styled.div`
  font-size: 14px;
  color: #ccc;
`

const ButtonsWrapper = styled.div`
  padding-left: 20px;
`

export default () => (
  <Karuselli visibleItems={{ xs: 1, sm: 2, md: 3 }} scrollWithArrowKeys>
    <Header>
      <TitleContainer>
        <Title>Simple Karuselli</Title>
        <Subtitle>Use the arrow keys to navigate!</Subtitle>
      </TitleContainer>
      <ButtonsWrapper>
        <Karuselli.LeftArrow component={<Arrow className="fa fa-angle-left" />} />
        <Karuselli.RightArrow component={<Arrow className="fa fa-angle-right" />} />
      </ButtonsWrapper>
    </Header>

    <Karuselli.Items>
      {_.map(_.range(1, 11), i => (
        <PortraitPanel
          key={i}
          i={i}
          bg={_.sample(COLORS)}
        />
      ))}
    </Karuselli.Items>
  </Karuselli>
)
