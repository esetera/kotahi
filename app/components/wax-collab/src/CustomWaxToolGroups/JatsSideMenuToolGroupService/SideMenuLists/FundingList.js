import React from 'react'
import { decorate, injectable, inject } from 'inversify'
import { ToolGroup } from 'wax-prosemirror-services'
import { LeftMenuTitle } from 'wax-prosemirror-components'

class FundingList extends ToolGroup {
  tools = []
  title = (<LeftMenuTitle title="Funding Group" />)

  constructor(
    @inject('FundingSource') fundingSource,
    @inject('AwardId') awardId,
    @inject('FundingStatement') fundingStatement,
  ) {
    super()
    this.tools = [fundingSource, awardId, fundingStatement]
  }
}

decorate(injectable(), FundingList)

export default FundingList
