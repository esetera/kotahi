import React from 'react'
import { decorate, injectable, inject } from 'inversify'
import { ToolGroup } from 'wax-prosemirror-services'
import { LeftMenuTitle } from 'wax-prosemirror-components'

class AcknowledgementsList extends ToolGroup {
  tools = []
  title = (<LeftMenuTitle title="Acknowledgements" />)

  constructor(@inject('AcknowledgementsSection') acknowledgementsSection) {
    super()
    this.tools = [acknowledgementsSection]
  }
}

decorate(injectable(), AcknowledgementsList)

export default AcknowledgementsList
