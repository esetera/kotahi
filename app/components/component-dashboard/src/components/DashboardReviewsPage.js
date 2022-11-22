import { useMutation, useQuery } from '@apollo/client'
import config from 'config'
import React, { useEffect } from 'react'
import { SectionContent, SectionHeader, Title } from '../../../shared'
import mutations from '../graphql/mutations'
import queries from '../graphql/queries'
import ReviewerTable from './sections/ReviewerTable'

const DashboardReviewsPage = () => {
  const instanceName = process.env.INSTANCE_NAME

  const urlFrag = config.journal.metadata.toplevel_urlfragment

  const query = useQuery(queries.dashboard, {
    fetchPolicy: 'cache-and-network',
  })

  const [updateTab] = useMutation(mutations.updateTab)

  useEffect(() => {
    updateTab({
      variables: {
        tab: 'reviews',
      },
    })
  }, [])

  return !['ncrc'].includes(instanceName) ? (
    <SectionContent>
      <SectionHeader>
        <Title>To Review</Title>
      </SectionHeader>
      <ReviewerTable query={query} urlFrag={urlFrag} />
    </SectionContent>
  ) : null
}

export default DashboardReviewsPage
