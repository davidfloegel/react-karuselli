import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import DemoSimple01 from './demos/01_simple'
import DemoImages02 from './demos/02_images'

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: Verdana;
  }
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 50px;
`

export default () => (
  <Container>
    <GlobalStyle />
    <h1>React Karuselli Demos</h1>

    <p>Here are some demos for the Karuselli library.</p>

    <div style={{ height: '50px' }} />

    <DemoSimple01 />

    <div style={{ height: '100px' }} />

    <DemoImages02 />

    <div style={{ height: '100px' }} />
  </Container>
)
