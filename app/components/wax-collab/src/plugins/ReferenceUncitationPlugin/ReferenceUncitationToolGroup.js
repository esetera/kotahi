import React from 'react'
import { ToolGroup } from 'wax-prosemirror-core'
import ReferenceUncitationTool from './ReferenceUncitationTool'

class ReferenceUncitationToolGroup extends ToolGroup {
  tools = []

  /* eslint-disable-next-line */
  constructor() {
    super()
  }

  /* eslint-disable-next-line */
  renderTools() {
    return <ReferenceUncitationTool />
  }
}

export default ReferenceUncitationToolGroup
