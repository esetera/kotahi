import { useMutation, useQuery } from '@apollo/client'
import config from 'config'
import React, { useEffect } from 'react'
import {
  extractFilters,
  extractSortData,
  URI_PAGENUM_PARAM,
  useQueryParams,
} from '../../../../shared/urlParamUtils'
import mutations from '../graphql/mutations'
import queries from '../graphql/queries'
import EditorTable from './sections/EditorTable'

const DashboardEditsPage = ({ history }) => {
  const urlFrag = config.journal.metadata.toplevel_urlfragment
  const wantedRoles = ['seniorEditor', 'handlingEditor', 'editor']

  const applyQueryParams = useQueryParams()

  const uriQueryParams = new URLSearchParams(history.location.search)
  const page = uriQueryParams.get(URI_PAGENUM_PARAM) || 1
  const sortName = extractSortData(uriQueryParams).name
  const sortDirection = extractSortData(uriQueryParams).direction
  const filters = extractFilters(uriQueryParams)

  const limit = process.env.INSTANCE_NAME === 'ncrc' ? 100 : 10

  const query = useQuery(queries.dashboard, {
    variables: {
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

  useEffect(() => {
    updateTab({
      variables: {
        tab: 'edits',
      },
    })
  }, [])

  return (
    <EditorTable
      applyQueryParams={applyQueryParams}
      query={query}
      uriQueryParams={uriQueryParams}
      urlFrag={urlFrag}
    />
  )
}

export default DashboardEditsPage
