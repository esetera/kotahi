import React from 'react'

import { useMutation, useQuery } from '@apollo/client'

import { Spinner, CommsErrorBanner } from '../../shared'

import CMSPageEditForm from './pages/CMSPageEdit'

import {
  getCMSPage,
  updateCMSPageDataMutation,
  rebuildFlaxSiteMutation,
} from './queries'

const CMSPageEditor = ({ match }) => {
  const { loading, data, error } = useQuery(getCMSPage, {
    variables: {
      id: match.params.pageId,
    },
  })

  const [updatePageDataQuery] = useMutation(updateCMSPageDataMutation)
  const [rebuildFlaxSiteQuery] = useMutation(rebuildFlaxSiteMutation)

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const { cmsPage } = data

  return (
    <CMSPageEditForm
      cmsPage={cmsPage}
      rebuildFlaxSiteQuery={rebuildFlaxSiteQuery}
      updatePageDataQuery={updatePageDataQuery}
    />
  )
}

export default CMSPageEditor
