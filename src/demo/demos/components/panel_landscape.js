import React from 'react'
import styled from 'styled-components'

const Panel = styled.div`

`

const FakeImg = styled.div`
  background: ${({ bg }) => bg};
  max-width: 100%;
  padding: 25% 0;
  margin-bottom: 10px;
  border-radius: 5px;
`

export default ({ bg }) => (
  <Panel>
    <FakeImg bg={bg} />
  </Panel>
)
