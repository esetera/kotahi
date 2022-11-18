import React from 'react'
import config from 'config'
import { SectionContent, SectionHeader, Title } from '../../../shared'
import OwnerTable from './sections/OwnerTable'

const DashboardSubmissionsPage = () => {
  const instanceName = process.env.INSTANCE_NAME

  const urlFrag = config.journal.metadata.toplevel_urlfragment

  return !['ncrc'].includes(instanceName) ? (
    <SectionContent>
      <SectionHeader>
        <Title>My Submissions</Title>
      </SectionHeader>
      <OwnerTable urlFrag={urlFrag} />
    </SectionContent>
  ) : null
}

export default DashboardSubmissionsPage
