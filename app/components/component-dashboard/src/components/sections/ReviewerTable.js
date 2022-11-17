import { useMutation, useQuery } from '@apollo/client'
import React, { useState, useMemo } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { UPDATE_MEMBER_STATUS_MUTATION } from '../../../../../queries/team'
import { CommsErrorBanner, Spinner } from '../../../../shared'
import ManuscriptsTable from '../../../../component-manuscripts-table/src/ManuscriptsTable'
import buildColumnDefinitions from '../../../../component-manuscripts-table/src/util/buildColumnDefinitions'
import mutations from '../../graphql/mutations'
import queries from '../../graphql/queries'
import { Placeholder } from '../../style'
import { getLatestVersion, getManuscriptsUserHasRoleIn } from '../../utils'
import {
  URI_SEARCH_PARAM,
  reviewerColumns,
} from '../../../../../../config/journal/manuscripts'

const ReviewerTable = ({ urlFrag }) => {
  const history = useHistory()
  const { search, pathname } = useLocation()
  const uriQueryParams = new URLSearchParams(search)
  const [sortName, setSortName] = useState('created')
  const [sortDirection, setSortDirection] = useState('DESC')
  const [mainActionLink, setActionLink] = useState(null)

  const [reviewerRespond] = useMutation(mutations.reviewerResponseMutation)
  const [updateMemberStatus] = useMutation(UPDATE_MEMBER_STATUS_MUTATION)

  const { loading, data, error } = useQuery(queries.dashboard, {
    fetchPolicy: 'cache-and-network',
  })

  // TODO: move graphQL query that returns fieldDefinitions to Dashboard and pass it in as a prop
  const fieldDefinitions = useMemo(() => {
    const fields = data?.formForPurposeAndCategory?.structure?.children ?? []
    const defs = {}
    fields.forEach(field => {
      // Incomplete fields in the formbuilder may not have a name specified. Ignore these
      if (field.name) defs[field.name] = field
    })
    return defs
  }, [data])

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const currentUser = data && data.currentUser

  const latestVersions = data?.manuscriptsUserHasCurrentRoleIn.map(
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

  const setMainActionLink = link => setActionLink(link)

  const specialComponentValues = {
    urlFrag,
    currentUser,
    reviewerRespond,
    updateMemberStatus,
    setMainActionLink,
  }

  const currentSearchQuery = uriQueryParams.get(URI_SEARCH_PARAM)

  const displayProps = {
    uriQueryParams,
    sortName,
    sortDirection,
    currentSearchQuery,
  }

  const setFilter = (fieldName, filterValue) => {
    uriQueryParams.set(fieldName, filterValue)
    history.replace({ pathname, search: uriQueryParams.toString() })
  }

  const columnsProps = buildColumnDefinitions(
    reviewerColumns,
    fieldDefinitions,
    specialComponentValues,
    displayProps,
  )

  return (
    <ManuscriptsTable
      columnsProps={columnsProps}
      getLink={_ => mainActionLink}
      manuscripts={reviewerLatestVersions}
      setFilter={setFilter}
      setSortDirection={setSortDirection}
      setSortName={setSortName}
      sortDirection={sortDirection}
      sortName={sortName}
    />
  )
}

export default ReviewerTable
