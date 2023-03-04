import { useMutation, useQuery } from '@apollo/client'
import config from 'config'
import React, { useEffect } from 'react'
import { UPDATE_REVIEWER_STATUS_MUTATION } from '../../../../queries/team'
import {
  extractFilters,
  extractSortData,
  URI_PAGENUM_PARAM,
  URI_REVIEWER_STATUS_PARAM,
  useQueryParams,
} from '../../../../shared/urlParamUtils'
import mutations from '../graphql/mutations'
import queries from '../graphql/queries'
import ReviewerTable from './sections/ReviewerTable'

const DashboardReviewsPage = ({ history }) => {
  const instanceName = process.env.INSTANCE_NAME
  const urlFrag = config.journal.metadata.toplevel_urlfragment

  const wantedRoles = [
    'reviewer',
    'invited:reviewer',
    'accepted:reviewer',
    'inProgress:reviewer',
    'completed:reviewer',
  ]

  const applyQueryParams = useQueryParams()

  const uriQueryParams = new URLSearchParams(history.location.search)
  const page = uriQueryParams.get(URI_PAGENUM_PARAM) || 1
  const sortName = extractSortData(uriQueryParams).name
  const sortDirection = extractSortData(uriQueryParams).direction
  const filters = extractFilters(uriQueryParams)

  const limit = process.env.INSTANCE_NAME === 'ncrc' ? 100 : 10

  const query = useQuery(queries.dashboard, {
    variables: {
      reviewerStatus: uriQueryParams.get(URI_REVIEWER_STATUS_PARAM),
      wantedRoles,
      sort: sortName
        ? { field: sortName, isAscending: sortDirection === 'ASC' }
        : null,
      offset: (page - 1) * limit,
      limit,
      filters,
      timezoneOffsetMinutes: new Date().getTimezoneOffset(),
    },
    fetchPolicy: 'network-only',
  })

  const [updateTab] = useMutation(mutations.updateTab)
  const [reviewerRespond] = useMutation(mutations.reviewerResponseMutation)
  const [updateReviewerStatus] = useMutation(UPDATE_REVIEWER_STATUS_MUTATION)

  useEffect(() => {
    updateTab({
      variables: {
        tab: 'reviews',
      },
    })
  }, [])

  return !['ncrc'].includes(instanceName) ? (
    <ReviewerTable
      applyQueryParams={applyQueryParams}
      query={query}
      reviewerRespond={reviewerRespond}
      updateReviewerStatus={updateReviewerStatus}
      uriQueryParams={uriQueryParams}
      urlFrag={urlFrag}
    />
  ) : null
}

export default DashboardReviewsPage
