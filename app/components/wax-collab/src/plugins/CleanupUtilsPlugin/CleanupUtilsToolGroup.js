import React from 'react'
import styled from 'styled-components'
import { ToolGroup } from 'wax-prosemirror-core'
import CleanupUtils from './CleanupUtils'

const Wrapper = styled.div`
  display: flex;
  align-item: center !important;
  padding-left: 4px;
  padding-right: 4px;
  margin-top: 3px;
`

class CleanupUtilsToolGroup extends ToolGroup {
  tools = []

  /* eslint-disable-next-line */
  constructor() {
    super()
  }

  /* eslint-disable-next-line */
  renderTools() {
    return (
      <Wrapper>
        <CleanupUtils />
      </Wrapper>
    )
  }
}

export default CleanupUtilsToolGroup
