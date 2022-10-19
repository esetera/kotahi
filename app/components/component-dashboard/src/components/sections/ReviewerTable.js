import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { UPDATE_MEMBER_STATUS_MUTATION } from '../../../../../queries/team'
import { CommsErrorBanner, Spinner } from '../../../../shared'
import mutations from '../../graphql/mutations'
import queries from '../../graphql/queries'
import { Placeholder } from '../../style'
import { getLatestVersion, getManuscriptsUserHasRoleIn } from '../../utils'
import ReviewerItem from './ReviewerItem'

const ReviewerTable = ({ urlFrag }) => {
  const [reviewerRespond] = useMutation(mutations.reviewerResponseMutation)
  const [updateMemberStatus] = useMutation(UPDATE_MEMBER_STATUS_MUTATION)

  const { loading, data, error } = useQuery(queries.dashboard, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const currentUser = data && data.currentUser

  const latestVersions = data.manuscriptsUserHasCurrentRoleIn.map(
    getLatestVersion,
  )

  const reviewerLatestVersions = getManuscriptsUserHasRoleIn(
    latestVersions,
    currentUser.id,
    ['reviewer', 'invited:reviewer', 'accepted:reviewer', 'completed:reviewer'],
  )

  if (reviewerLatestVersions.length === 0) {
    return <Placeholder>You have not been assigned any reviews yet</Placeholder>
  }

  return (
    <>
      {reviewerLatestVersions.map(version => (
        <ReviewerItem
          currentUser={currentUser}
          key={version.id}
          reviewerRespond={reviewerRespond}
          updateMemberStatus={updateMemberStatus}
          urlFrag={urlFrag}
          version={version}
        />
      ))}
    </>
  )
}

export default ReviewerTable
