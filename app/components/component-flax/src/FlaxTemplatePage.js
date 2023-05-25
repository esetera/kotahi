/* eslint-disable no-shadow */

import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
} from '@apollo/client'
import { ConfigContext } from '../../config/src'
import {
  GET_MANUSCRIPTS_AND_FORM,
  DELETE_MANUSCRIPT,
  IMPORTED_MANUSCRIPTS_SUBSCRIPTION,
  ARCHIVE_MANUSCRIPT,
} from '../../../queries'
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

const FlaxTemplatePage = ({ history }) => {
  const config = useContext(ConfigContext)
  const urlFrag = config.journal.metadata.toplevel_urlfragment

  /** Returns an array of column names, e.g.
   *  ['shortId', 'created', 'meta.title', 'submission.topic', 'status'] */
  const configuredColumnNames = (config?.manuscript?.tableColumns || '')
    .split(',')
    .map(columnName => columnName.trim())

  const applyQueryParams = useQueryParams()

  const uriQueryParams = new URLSearchParams(history.location.search)
  const page = uriQueryParams.get(URI_PAGENUM_PARAM) || 1
  const sortName = extractSortData(uriQueryParams).name
  const sortDirection = extractSortData(uriQueryParams).direction
  const filters = extractFilters(uriQueryParams)
  const limit = config?.manuscript?.paginationCount || 10

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

  useSubscription(IMPORTED_MANUSCRIPTS_SUBSCRIPTION, {
    onSubscriptionData: data => {
      const {
        subscriptionData: {
          data: { manuscriptsImportStatus },
        },
      } = data

      applyQueryParams({ [URI_PAGENUM_PARAM]: 1 })

      toast.success(
        manuscriptsImportStatus && 'Manuscripts successfully imported',
        { hideProgressBar: true },
      )
    },
  })

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

  const [update] = useMutation(updateMutation)
  const [doPublishManuscript] = useMutation(publishManuscriptMutation)
  const client = useApolloClient()

  const publishManuscript = async manuscriptId => {
    return doPublishManuscript({
      variables: { id: manuscriptId },
    })
  }

  return (
    <Manuscripts
      applyQueryParams={applyQueryParams}
      archiveManuscriptMutations={archiveManuscriptMutations}
      configuredColumnNames={configuredColumnNames}
      deleteManuscriptMutations={deleteManuscriptMutations}
      page={page}
      publishManuscript={publishManuscript}
      queryObject={queryObject}
      setReadyToEvaluateLabels={setReadyToEvaluateLabels}
      sortDirection={sortDirection}
      sortName={sortName}
      uriQueryParams={uriQueryParams}
      urlFrag={urlFrag}
      validateDoi={validateDoi(client)}
      validateSuffix={validateSuffix(client)}
    />
  )
}

export default FlaxTemplatePage
