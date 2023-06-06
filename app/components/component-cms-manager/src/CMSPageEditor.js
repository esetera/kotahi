import React from 'react'

import { useMutation, useQuery } from '@apollo/client'

import { Spinner, CommsErrorBanner } from '../../shared'

import CMSPageEditForm from './pages/CMSPageEdit'

import CMSPageEditSidebar from './pages/CMSPageEditSidebar'

import { EditPageContainer, EditPageLeft, EditPageRight } from './style'

import {
  getCMSPages,
  updateCMSPageDataMutation,
  rebuildFlaxSiteMutation,
} from './queries'

const CMSPageEditor = ({ match }) => {
  const currentCMSPageId = match.params.pageId

  const { loading, data, error } = useQuery(getCMSPages)

  const [updatePageDataQuery] = useMutation(updateCMSPageDataMutation)
  const [rebuildFlaxSiteQuery] = useMutation(rebuildFlaxSiteMutation)

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const { cmsPages } = data

  const cmsPage = cmsPages.find(obj => {
    return obj.id === currentCMSPageId
  })

  return (
    <EditPageContainer>
      <EditPageLeft>
        <CMSPageEditSidebar cmsPages={cmsPages} currentCMSPage={cmsPage} />
      </EditPageLeft>
      <EditPageRight>
        <CMSPageEditForm
          cmsPage={cmsPage}
          rebuildFlaxSiteQuery={rebuildFlaxSiteQuery}
          updatePageDataQuery={updatePageDataQuery}
        />
      </EditPageRight>
    </EditPageContainer>
  )
}

export default CMSPageEditor
