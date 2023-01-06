/* eslint-disable no-shadow */

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
} from '@apollo/client'
import config from 'config'
import fnv from 'fnv-plus'
import {
  GET_MANUSCRIPTS_AND_FORM,
  DELETE_MANUSCRIPT,
  IMPORT_MANUSCRIPTS,
  IMPORTED_MANUSCRIPTS_SUBSCRIPTION,
  GET_SYSTEM_WIDE_DISCUSSION_CHANNEL,
  ARCHIVE_MANUSCRIPT,
  ARCHIVE_MANUSCRIPTS,
} from '../../../queries'
import configuredColumnNames from './configuredColumnNames'
import { updateMutation } from '../../component-submit/src/components/SubmitPage'
import { publishManuscriptMutation } from '../../component-review/src/components/queries'
import Manuscripts from './Manuscripts'
import {
  extractFilters,
  extractSortData,
  URI_PAGENUM_PARAM,
  useQueryParams,
} from '../../../shared/urlParamUtils'
import { validateDoi, validateSuffix } from '../../../shared/commsUtils'

const urlFrag = config.journal.metadata.toplevel_urlfragment
const chatRoomId = fnv.hash(config['pubsweet-client'].baseUrl).hex()

const ManuscriptsPage = ({ history }) => {
  const [isImporting, setIsImporting] = useState(false)
  const applyQueryParams = useQueryParams()

  const uriQueryParams = new URLSearchParams(history.location.search)
  const page = uriQueryParams.get(URI_PAGENUM_PARAM) || 1
  const sortName = extractSortData(uriQueryParams).name
  const sortDirection = extractSortData(uriQueryParams).direction
  const filters = extractFilters(uriQueryParams)

  const limit = process.env.INSTANCE_NAME === 'ncrc' ? 100 : 10

  const queryObject = useQuery(GET_MANUSCRIPTS_AND_FORM, {
    variables: {
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

  // GET_SYSTEM_WIDE_DISCUSSION_ID
  const systemWideDiscussionChannel = useQuery(
    GET_SYSTEM_WIDE_DISCUSSION_CHANNEL,
  )

  useSubscription(IMPORTED_MANUSCRIPTS_SUBSCRIPTION, {
    onSubscriptionData: data => {
      const {
        subscriptionData: {
          data: { manuscriptsImportStatus },
        },
      } = data

      setIsImporting(false)
      applyQueryParams({ [URI_PAGENUM_PARAM]: 1 })

      toast.success(
        manuscriptsImportStatus && 'Manuscripts successfully imported',
        { hideProgressBar: true },
      )
    },
  })

  const [importManuscripts] = useMutation(IMPORT_MANUSCRIPTS)

  const importManuscriptsAndRefetch = () => {
    setIsImporting(true)
    importManuscripts()
  }

  const [archiveManuscriptMutation] = useMutation(ARCHIVE_MANUSCRIPT, {
    update(cache, { data: { id } }) {
      const cacheId = cache.identify({
        __typename: 'Manuscript',
        id,
      })

      cache.evict({ cacheId })
    },
  })

  const archiveManuscriptMutations = id => {
    archiveManuscriptMutation({ variables: { id } })
  }

  const [archiveManuscripts] = useMutation(ARCHIVE_MANUSCRIPTS, {
    update(cache, { data: { ids } }) {
      const cacheIds = cache.identify({
        __typename: 'Manuscript',
        id: ids,
      })

      cache.evict({ cacheIds })
    },
  })

  const [deleteManuscriptMutation] = useMutation(DELETE_MANUSCRIPT, {
    update(cache, { data: { id } }) {
      const cacheId = cache.identify({
        __typename: 'Manuscript',
        id,
      })

      cache.evict({ cacheId })
    },
  })

  const deleteManuscriptMutations = id => {
    deleteManuscriptMutation({ variables: { id } })
  }

  const setReadyToEvaluateLabels = id => {
    update({
      variables: {
        id,
        input: JSON.stringify({
          submission: {
            labels: 'readyToEvaluate',
          },
        }),
      },
    })
  }

  const confirmBulkArchive = selectedNewManuscript => {
    archiveManuscripts({
      variables: { ids: selectedNewManuscript },
    })
  }

  const [update] = useMutation(updateMutation)
  const [publishManuscript] = useMutation(publishManuscriptMutation)
  const client = useApolloClient()

  const publishManuscripts = manuscriptId => {
    publishManuscript({
      variables: { id: manuscriptId },
    })
  }

  const shouldAllowBulkImport =
    config.manuscripts.allowManualImport === 'true' &&
    ['colab', 'ncrc'].includes(process.env.INSTANCE_NAME)

  return (
    <Manuscripts
      applyQueryParams={applyQueryParams}
      archiveManuscriptMutations={archiveManuscriptMutations}
      chatRoomId={chatRoomId}
      configuredColumnNames={configuredColumnNames}
      confirmBulkArchive={confirmBulkArchive}
      deleteManuscriptMutations={deleteManuscriptMutations}
      history={history}
      importManuscripts={importManuscriptsAndRefetch}
      isImporting={isImporting}
      page={page}
      publishManuscripts={publishManuscripts}
      queryObject={queryObject}
      setReadyToEvaluateLabels={setReadyToEvaluateLabels}
      shouldAllowBulkImport={shouldAllowBulkImport}
      sortDirection={sortDirection}
      sortName={sortName}
      systemWideDiscussionChannel={systemWideDiscussionChannel}
      uriQueryParams={uriQueryParams}
      urlFrag={urlFrag}
      validateDoi={validateDoi(client)}
      validateSuffix={validateSuffix(client)}
    />
  )
}

export default ManuscriptsPage
