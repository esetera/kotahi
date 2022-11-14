import React from 'react'
import { decorate, injectable, inject } from 'inversify'
import { ToolGroup } from 'wax-prosemirror-services'
import { LeftMenuTitle } from 'wax-prosemirror-components'

class CitationList extends ToolGroup {
  tools = []
  title = (<LeftMenuTitle title="Citations" />)

  constructor(
    @inject('Reference') reference,
    @inject('RefList') refList,
    @inject('ReferenceHeader') referenceHeader,
    @inject('ArticleTitle') articleTitle,
    @inject('MixedCitationSpan') mixedCitationSpan,
    // @inject('AuthorGroup') authorGroup,
    @inject('AuthorName') authorName,
    @inject('JournalTitle') journalTitle,
    @inject('Doi') doi,
    @inject('FirstPage') firstPage,
    @inject('LastPage') lastPage,
    @inject('Volume') volume,
    @inject('Issue') issue,
    @inject('Year') year,
  ) {
    super()
    this.tools = [
      refList,
      referenceHeader,
      reference,
      mixedCitationSpan,
      // authorGroup,
      authorName,
      articleTitle,
      journalTitle,
      doi,
      volume,
      issue,
      year,
      firstPage,
      lastPage,
    ]
  }
}

decorate(injectable(), CitationList)

export default CitationList
