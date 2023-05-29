import React from 'react'
import { ToolGroup } from 'wax-prosemirror-core'
import ImageCitationTool from './ImageCitationTool'

class ImageCitationToolGroup extends ToolGroup {
  tools = []

  /* eslint-disable-next-line */
  constructor() {
    super()
  }

  /* eslint-disable-next-line */
  renderTools() {
    return <ImageCitationTool key="imagecitationtool" />
  }
}

export default ImageCitationToolGroup
