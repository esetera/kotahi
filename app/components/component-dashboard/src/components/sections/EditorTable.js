import React, { useMemo, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import ManuscriptsTable from '../../../../component-manuscripts-table/src/ManuscriptsTable'
import buildColumnDefinitions from '../../../../component-manuscripts-table/src/util/buildColumnDefinitions'
import {
  CommsErrorBanner,
  SectionContent,
  SectionHeader,
  Spinner,
  Title,
} from '../../../../shared'
import { Placeholder } from '../../style'
import { getLatestVersion } from '../../utils'
import {
  URI_SEARCH_PARAM,
  editorColumns,
} from '../../../../../../config/journal/manuscripts'
import InviteDeclineModal from '../../../../component-review/src/components/InviteDeclineModal'

const EditorTable = ({ urlFrag, query: { data, loading, error } }) => {
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

  const currentUser = data && data.currentUser

  const editorLatestVersions = data.manuscriptsUserHasCurrentRoleIn.manuscripts.map(
    getLatestVersion,
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
    editorColumns,
    fieldDefinitions,
    specialComponentValues,
    displayProps,
  )

  return (
    <>
      <InviteDeclineModal />
      <SectionContent>
        <SectionHeader>
          <Title>Manuscripts I&apos;m editor of</Title>
        </SectionHeader>
        <ManuscriptsTable
          columnsProps={columnsProps}
          manuscripts={editorLatestVersions}
          setFilter={setFilter}
          setSortDirection={setSortDirection}
          setSortName={setSortName}
          sortDirection={sortDirection}
          sortName={sortName}
        />
      </SectionContent>
    </>
  )
}

export default EditorTable
