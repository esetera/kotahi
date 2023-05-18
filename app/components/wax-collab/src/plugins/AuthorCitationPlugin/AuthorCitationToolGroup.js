import React from 'react'
import { ToolGroup } from 'wax-prosemirror-core'
import AuthorCitationTool from './AuthorCitationTool'

class AuthorCitationToolGroup extends ToolGroup {
  tools = []

  /* eslint-disable-next-line */
  constructor() {
    super()
  }

  /* eslint-disable-next-line */
  renderTools() {
    return <AuthorCitationTool />
  }
}

export default AuthorCitationToolGroup
