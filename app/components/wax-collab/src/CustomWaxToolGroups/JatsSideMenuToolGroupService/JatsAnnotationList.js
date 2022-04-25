import React from 'react'
import { decorate, injectable, inject } from 'inversify'
import { LeftMenuTitle } from 'wax-prosemirror-components'
import { ToolGroup } from 'wax-prosemirror-services'

class AppendixList extends ToolGroup {
  tools = []
  title = (<LeftMenuTitle title="Appendices" />)

  constructor(appendix, appendixHeader) {
    super()
    this.tools = [appendix, appendixHeader]
  }
}

class FrontMatterList extends ToolGroup {
  tools = []
  title = (<LeftMenuTitle title="Front Matter" />)

  constructor(frontMatter, title, abstractSection) {
    super()
    this.tools = [frontMatter, title, abstractSection]
  }
}

class CitationList extends ToolGroup {
  tools = []
  title = (<LeftMenuTitle title="Citations" />)

  constructor(mixedCitation, refList, referenceHeader) {
    super()
    this.tools = [refList, referenceHeader, mixedCitation]
  }
}

class AcknowledgementsList extends ToolGroup {
  tools = []
  title = (<LeftMenuTitle title="Acknowledgements" />)

  constructor(acknowledgementsSection) {
    super()
    this.tools = [acknowledgementsSection]
  }
}

decorate(injectable(), AppendixList)
decorate(injectable(), FrontMatterList)
decorate(injectable(), CitationList)
decorate(injectable(), AcknowledgementsList)

export { AppendixList, CitationList, FrontMatterList, AcknowledgementsList }
