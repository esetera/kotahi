import React from 'react'
import { ToolGroup } from 'wax-prosemirror-services'
import ExternalTool from './ExternalTool'

export default class ExternalToolGroup extends ToolGroup {
  tools = []

  constructor() {
    super()
  }

  renderTools() {
    return <ExternalTool />
  }
}
