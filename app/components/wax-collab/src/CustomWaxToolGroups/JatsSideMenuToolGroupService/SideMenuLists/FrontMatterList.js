import React from 'react'
import { decorate, injectable, inject } from 'inversify'
import { ToolGroup } from 'wax-prosemirror-services'
import { LeftMenuTitle } from 'wax-prosemirror-components'

class FrontMatterList extends ToolGroup {
  tools = []
  title = (<LeftMenuTitle title="Front Matter" />)

  constructor(
    @inject('FrontMatter') frontMatter,
    @inject('Title') title,
    @inject('Abstract') abstractSection,
  ) {
    super()
    this.tools = [frontMatter, title, abstractSection]
  }
}

decorate(injectable(), FrontMatterList)

export default FrontMatterList
