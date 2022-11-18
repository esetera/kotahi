import React from 'react'
import config from 'config'
import { useQuery } from '@apollo/client'
import { SectionContent, SectionHeader, Title } from '../../../shared'
import queries from '../graphql/queries'
import EditorTable from './sections/EditorTable'

const DashboardEditsPage = () => {
  const urlFrag = config.journal.metadata.toplevel_urlfragment

  const query = useQuery(queries.dashboard, {
    fetchPolicy: 'cache-and-network',
  })

  return (
    <SectionContent>
      <SectionHeader>
        <Title>Manuscripts I&apos;m editor of</Title>
      </SectionHeader>
      <EditorTable query={query} urlFrag={urlFrag} />
    </SectionContent>
  )
}

export default DashboardEditsPage
