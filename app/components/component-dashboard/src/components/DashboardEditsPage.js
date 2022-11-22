import React, { useEffect } from 'react'
import config from 'config'
import { useMutation, useQuery } from '@apollo/client'
import { SectionContent, SectionHeader, Title } from '../../../shared'
import queries from '../graphql/queries'
import EditorTable from './sections/EditorTable'
import mutations from '../graphql/mutations'

const DashboardEditsPage = () => {
  const urlFrag = config.journal.metadata.toplevel_urlfragment

  const query = useQuery(queries.dashboard, {
    fetchPolicy: 'cache-and-network',
  })

  const [updateTab] = useMutation(mutations.updateTab)

  useEffect(() => {
    updateTab({
      variables: {
        tab: 'edits',
      },
    })
  }, [])

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
