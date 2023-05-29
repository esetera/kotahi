import React from 'react'
import { ToolGroup } from 'wax-prosemirror-core'
import TableUncitation from './TableUncitationTool'

class TableUncitationToolGroup extends ToolGroup {
  tools = []

  /* eslint-disable-next-line */
  constructor() {
    super()
  }

  /* eslint-disable-next-line */
  renderTools() {
    return <TableUncitation key="tableuncitationtool" />
  }
}

export default TableUncitationToolGroup
