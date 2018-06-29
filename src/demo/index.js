import _ from 'lodash'
import React from 'react'
import styled, { css } from 'styled-components'

import Karuselli from '../lib'
import PortraitPanel from './panel_portrait'

const COLORS = [
  '#16a085', '#2980b9', '#c0392b', '#8e44ad', '#f39c12', '#27ae60', '#e67e22'
]

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 50px;
`

const Arrow = styled.button`
  width: 40px;
  height: 40px;
  background: #000;
  border-radius: 100%;
  font-size: 18px;
  color: #fff;

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
          <Karuselli.LeftArrow>
            <Arrow>&#8678;</Arrow>
          </Karuselli.LeftArrow>
          <Karuselli.RightArrow>
            <Arrow right>&#8680;</Arrow>
          </Karuselli.RightArrow>
        </ButtonsWrapper>
      </Header>

      <Karuselli.Scrollable>
        <PortraitPanel i={1} bg={_.sample(COLORS)} />
        <PortraitPanel i={2} bg={_.sample(COLORS)} />
        <PortraitPanel i={3} bg={_.sample(COLORS)} />
        <PortraitPanel i={4} bg={_.sample(COLORS)} />
        <PortraitPanel i={5} bg={_.sample(COLORS)} />
        <PortraitPanel i={6} bg={_.sample(COLORS)} />
        <PortraitPanel i={7} bg={_.sample(COLORS)} />
        <PortraitPanel i={8} bg={_.sample(COLORS)} />
        <PortraitPanel i={9} bg={_.sample(COLORS)} />
        <PortraitPanel i={10} bg={_.sample(COLORS)} />
      </Karuselli.Scrollable>
    </Karuselli>
  </Container>
)
