import React from 'react'
import { ToolGroup } from 'wax-prosemirror-core'
import ImageUncitationTool from './ImageUncitationTool'

class ImageUncitationToolGroup extends ToolGroup {
  tools = []

  /* eslint-disable-next-line */
  constructor() {
    super()
  }

  /* eslint-disable-next-line */
  renderTools() {
    return <ImageUncitationTool />
  }
}

export default ImageUncitationToolGroup
