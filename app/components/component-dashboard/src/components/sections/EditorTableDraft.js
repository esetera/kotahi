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

const EditorTable = ({ instanceName, shouldShowShortId, urlFrag }) => {
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

  const editorLatestVersions = getManuscriptsUserHasRoleIn(
    latestVersions,
    currentUser.id,
    ['seniorEditor', 'handlingEditor', 'editor'],
  )

  if (editorLatestVersions.length === 0) {
    return (
      <Placeholder>
        You have not been assigned as editor to any manuscripts yet
      </Placeholder>
    )
  }

  const specialComponentValues = {
    urlFrag,
    currentUser,
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
    'statusCounts',
    'roles',
    'editorLinks',
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
      manuscripts={editorLatestVersions}
      setFilter={setFilter}
      setSortDirection={setSortDirection}
      setSortName={setSortName}
      sortDirection={sortDirection}
      sortName={sortName}
    />
  )
}

export default EditorTable
