import React, { useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  ownerColumns,
  URI_SEARCH_PARAM,
} from '../../../../../../config/journal/manuscripts'
import ManuscriptsTable from '../../../../component-manuscripts-table/src/ManuscriptsTable'
import buildColumnDefinitions from '../../../../component-manuscripts-table/src/util/buildColumnDefinitions'
import { CommsErrorBanner, Spinner } from '../../../../shared'
import { Placeholder } from '../../style'
import { getLatestVersion } from '../../utils'

const OwnerTable = ({ urlFrag, query: { data, loading, error } }) => {
  const { search, pathname } = useLocation()
  const uriQueryParams = new URLSearchParams(search)
  const history = useHistory()
  const [sortName, setSortName] = useState('created')
  const [sortDirection, setSortDirection] = useState('DESC')

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

  const authorLatestVersions = data.manuscriptsUserHasCurrentRoleIn.manuscripts.map(
    getLatestVersion,
  )

  if (authorLatestVersions.length === 0) {
    return <Placeholder>You have not submitted any manuscripts yet</Placeholder>
  }

  const specialComponentValues = {
    urlFrag,
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
    ownerColumns,
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
