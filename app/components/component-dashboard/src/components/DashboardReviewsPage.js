import { useMutation, useQuery } from '@apollo/client'
import config from 'config'
import React, { useEffect } from 'react'
import { UPDATE_MEMBER_STATUS_MUTATION } from '../../../../queries/team'
import mutations from '../graphql/mutations'
import queries from '../graphql/queries'
import ReviewerTable from './sections/ReviewerTable'

const DashboardReviewsPage = () => {
  const instanceName = process.env.INSTANCE_NAME
  const urlFrag = config.journal.metadata.toplevel_urlfragment

  const wantedRoles = [
    'reviewer',
    'invited:reviewer',
    'accepted:reviewer',
    'completed:reviewer',
  ]

  const query = useQuery(queries.dashboard, {
    variables: {
      wantedRoles,
      sort: null,
      offset: 0,
      limit: process.env.INSTANCE_NAME === 'ncrc' ? 100 : 10,
      filters: [],
      timezoneOffsetMinutes: new Date().getTimezoneOffset(),
    },
    fetchPolicy: 'cache-and-network',
  })

  const [updateTab] = useMutation(mutations.updateTab)
  const [reviewerRespond] = useMutation(mutations.reviewerResponseMutation)
  const [updateMemberStatus] = useMutation(UPDATE_MEMBER_STATUS_MUTATION)

  useEffect(() => {
    updateTab({
      variables: {
        tab: 'reviews',
      },
    })
  }, [])

  return !['ncrc'].includes(instanceName) ? (
    <ReviewerTable
      query={query}
      reviewerRespond={reviewerRespond}
      updateMemberStatus={updateMemberStatus}
      urlFrag={urlFrag}
    />
  ) : null
}

export default DashboardReviewsPage
