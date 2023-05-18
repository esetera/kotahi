import React from 'react'
import { ToolGroup } from 'wax-prosemirror-core'
import TableCitationTool from './TableCitationTool'

class TableCitationToolGroup extends ToolGroup {
  tools = []

  /* eslint-disable-next-line */
  constructor() {
    super()
  }

  /* eslint-disable-next-line */
  renderTools() {
    return <TableCitationTool />
  }
}

export default TableCitationToolGroup
