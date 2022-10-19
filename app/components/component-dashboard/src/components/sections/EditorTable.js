import { useQuery } from '@apollo/client'
import React from 'react'
import prettyRoleText from '../../../../../shared/prettyRoleText'
import { CommsErrorBanner, SectionRow, Spinner } from '../../../../shared'
import queries from '../../graphql/queries'
import { Placeholder } from '../../style'
import {
  getLatestVersion,
  getManuscriptsUserHasRoleIn,
  getRoles,
} from '../../utils'
import buildColumnDefinitions from '../../../../component-manuscripts-table/src/util/buildColumnDefinitions'
import ManuscriptsTable from '../../../../component-manuscript-table/ManuscriptTable'
import EditorItem from './EditorItem'

const EditorTable = ({ instanceName, shouldShowShortId, urlFrag }) => {
  const { loading, data, error } = useQuery(queries.dashboard, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const currentUser = data && data.currentUser

  // Editors are always linked to the parent/original manuscript, not to versions
  const latestVersions = data.manuscriptsUserHasCurrentRoleIn.map(
    getLatestVersion,
  )

  const editorLatestVersions = getManuscriptsUserHasRoleIn(
    latestVersions,
    currentUser.id,
    ['seniorEditor', 'handlingEditor', 'editor'],
  )

  if (editorLatestVersions.length === 0) {
    return <Placeholder>You have not submitted any manuscripts yet</Placeholder>
  }

  /*
  submission.articleDescription,submission.journal,created,updated,submission.topics,status,submission.labels,editor
  */
  const specialComponentValues = {
    deleteManuscript,
    isManuscriptBlockedFromPublishing,
    tryPublishManuscript,
    selectedNewManuscripts,
    toggleNewManuscriptCheck,
    setReadyToEvaluateLabel,
    urlFrag,
  }
  const displayProps = {
    uriQueryParams,
    sortName,
    sortDirection,
    currentSearchQuery,
  }

  const columnNames = [
    ''
  ]
  /*
  Manuscript Number
  Title
  Status -> FilterableStatusBadge
  Version
  Reviewer Statuses
  Actions
  */

  const columnProps = buildColumnDefinitions(columnNames, fieldDefinitions, specialComponentValues, displayProps)
  return <ManuscriptsTable manuscripts={editorLatestVersions}
  columnsProps={}
  setFilter={}
  setSortName={}
  setSortDirection={}
  sortDirection={}
  sortName={} />
  return (
    <>
      {editorLatestVersions.map(manuscript => (
        <SectionRow key={`manuscript-${manuscript.id}`}>
          <EditorItem
            currentRoles={getRoles(manuscript, currentUser.id)}
            instanceName={instanceName}
            prettyRoleText={prettyRoleText}
            shouldShowShortId={shouldShowShortId}
            urlFrag={urlFrag}
            version={manuscript}
          />
        </SectionRow>
      ))}
    </>
  )
}

export default EditorTable
