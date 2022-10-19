import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import ManuscriptsTable from '../../../../component-manuscripts-table/src/ManuscriptsTable'
import buildColumnDefinitions from '../../../../component-manuscripts-table/src/util/buildColumnDefinitions'
import { CommsErrorBanner, Spinner } from '../../../../shared'
import queries from '../../graphql/queries'
import { Placeholder } from '../../style'
import { getLatestVersion, getManuscriptsUserHasRoleIn } from '../../utils'
import { getUriQueryParams } from '../../../../../shared/urlUtils'

const URI_SEARCH_PARAM = 'search'

const OwnerTable = ({ instanceName, shouldShowShortId, urlFrag }) => {
  const [sortName, setSortName] = useState('created')
  const [sortDirection, setSortDirection] = useState('DESC')

  const { loading, data, error } = useQuery(queries.dashboard, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const currentUser = data && data.currentUser

  const latestVersions = data.manuscriptsUserHasCurrentRoleIn.map(
    getLatestVersion,
  )

  const authorLatestVersions = getManuscriptsUserHasRoleIn(
    latestVersions,
    currentUser.id,
    ['author'],
  )

  if (authorLatestVersions.length === 0) {
    return <Placeholder>You have not submitted any manuscripts yet</Placeholder>
  }

  const specialComponentValues = {
    urlFrag,
  }

  const uriQueryParams = getUriQueryParams(window.location)

  const currentSearchQuery = uriQueryParams.find(
    x => x.field === URI_SEARCH_PARAM,
  )?.value

  const displayProps = {
    uriQueryParams,
    sortName,
    sortDirection,
    currentSearchQuery,
  }

  const columnNames = [
    'shortId',
    'meta.title',
    'status',
    'created',
    'updated',
    'submitChevron',
  ]

  const setFilter = (fieldName, filterValue) => {
    // TODO
  }

  const fieldDefinitions = {}
  const fields = data.formForPurposeAndCategory?.structure?.children ?? []
  fields.forEach(field => {
    if (field.name) fieldDefinitions[field.name] = field // Incomplete fields in the formbuilder may not have a name specified. Ignore these
  })

  const columnsProps = buildColumnDefinitions(
    columnNames,
    fieldDefinitions,
    specialComponentValues,
    displayProps,
  )

  return (
    <ManuscriptsTable
      columnsProps={columnsProps}
      getLink={manuscript =>
        `${urlFrag}/versions/${manuscript.parentId || manuscript.id}/submit`
      }
      manuscripts={authorLatestVersions}
      setFilter={setFilter}
      setSortDirection={setSortDirection}
      setSortName={setSortName}
      sortDirection={sortDirection}
      sortName={sortName}
    />
  )
}

export default OwnerTable
