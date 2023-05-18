import React from 'react'
import { ToolGroup } from 'wax-prosemirror-core'
import ReferenceValidationTool from './ReferenceValidationTool'

class ReferenceValidationToolGroup extends ToolGroup {
  tools = []

  /* eslint-disable-next-line */
  constructor() {
    super()
  }

  /* eslint-disable-next-line */
  renderTools() {
    return <ReferenceValidationTool />
  }
}

export default ReferenceValidationToolGroup
