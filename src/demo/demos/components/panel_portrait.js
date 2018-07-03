import React from 'react'
import styled from 'styled-components'

const Panel = styled.div`

`

const FakeImg = styled.div`
  background: ${({ bg }) => bg};
  max-width: 100%;
  padding: 50% 0;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: center;
  color: white;
  position: relative;
`

const Content = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Num = styled.div`
  font-size: 60px;
  font-weight: bold;
`

const FakeTitle = styled.div`
  font-weight: bold;
`

export default ({ i, bg }) => (
  <Panel>
    <FakeImg bg={bg}>
      <Content>
        <Num>{i}</Num>
      </Content>
    </FakeImg>
    <FakeTitle>This is the title of this card</FakeTitle>
  </Panel>
)
