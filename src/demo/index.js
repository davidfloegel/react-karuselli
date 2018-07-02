import _ from 'lodash'
import React from 'react'
import styled, { injectGlobal } from 'styled-components'

import Karuselli from '../lib'
import PortraitPanel from './panel_portrait'

const COLORS = [
  '#16a085', '#2980b9', '#c0392b', '#8e44ad', '#f39c12', '#27ae60', '#e67e22'
]

injectGlobal`
  html, body {
    font-family: Verdana;
  }
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 50px;
`

const Arrow = styled.button`
  font-size: 35px;
  border: none;
  background: none;
  cursor: pointer;

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

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  flex: 1;
`

const ButtonsWrapper = styled.div`
  padding-left: 20px;
`

export default () => (
  <Container>
    <h1>React Karuselli</h1>

    <p>Demo for the carousel component</p>

    <div style={{ height: '50px' }} />

    <Karuselli visibleItems={{ xs: 1, sm: 2, md: 3 }}>
      <Header>
        <Title>My Karuselli</Title>
        <ButtonsWrapper>
          <Karuselli.LeftArrow component={<Arrow className="fa fa-angle-left" />} />
          <Karuselli.RightArrow component={<Arrow className="fa fa-angle-right" />} />
        </ButtonsWrapper>
      </Header>

      <Karuselli.Scrollable>
        {_.map(_.range(1, 11), i =>(
          <PortraitPanel
            key={i}
            i={i}
            bg={_.sample(COLORS)}
          />
        ))}
      </Karuselli.Scrollable>
    </Karuselli>
  </Container>
)
