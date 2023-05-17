import React from 'react'
import styled from 'styled-components'
import { ToolGroup } from 'wax-prosemirror-core'
import ReferenceStructuring from './ReferenceStructuring'

const Wrapper = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  height: 30px;
`

class ReferenceStructuringToolGroup extends ToolGroup {
  tools = []

  /* eslint-disable-next-line */
  constructor() {
    super()
  }

  /* eslint-disable-next-line */
  renderTools() {
    return (
      <Wrapper>
        <ReferenceStructuring />
      </Wrapper>
    )
  }
}

export default ReferenceStructuringToolGroup
