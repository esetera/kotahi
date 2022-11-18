import React from 'react'
import { SectionContent, SectionHeader, Title } from '../../../shared'
import ReviewerTable from './sections/ReviewerTable'
import config from 'config'

const DashboardReviewsPage = () => {
  const instanceName = process.env.INSTANCE_NAME

  const urlFrag = config.journal.metadata.toplevel_urlfragment

  return !['ncrc'].includes(instanceName) ? (
    <SectionContent>
      <SectionHeader>
        <Title>To Review</Title>
      </SectionHeader>
      <ReviewerTable urlFrag={urlFrag} />
    </SectionContent>
  ) : null
}

export default DashboardReviewsPage
