import React from 'react'
import { ToolGroup } from 'wax-prosemirror-core'
import ExternalTool from './ExternalTool'

class ExternalToolGroup extends ToolGroup {
  tools = []

  /* eslint-disable-next-line */
  constructor() {
    super()
  }

  /* eslint-disable-next-line */
  renderTools() {
    return <ExternalTool />
  }
}

export default ExternalToolGroup
