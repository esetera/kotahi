import React from 'react'
import { decorate, injectable, inject } from 'inversify'
import { ToolGroup } from 'wax-prosemirror-services'
import { LeftMenuTitle } from 'wax-prosemirror-components'

class AppendixList extends ToolGroup {
  tools = []
  title = (<LeftMenuTitle title="Appendices" />)

  constructor(
    @inject('Appendix') appendix,
    @inject('AppendixHeader') appendixHeader,
  ) {
    super()
    this.tools = [appendix, appendixHeader]
  }
}

decorate(injectable(), AppendixList)

export default AppendixList
