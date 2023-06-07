import React, { useContext } from 'react'

import { useMutation, useQuery } from '@apollo/client'

import { Spinner, CommsErrorBanner } from '../../shared'

import CMSPageEditForm from './pages/CMSPageEdit'

import CMSPageEditSidebar from './pages/CMSPageEditSidebar'

import { ConfigContext } from '../../config/src'

import { EditPageContainer, EditPageLeft, EditPageRight } from './style'

import {
  getCMSPages,
  updateCMSPageDataMutation,
  rebuildFlaxSiteMutation,
} from './queries'

const CMSPageEditor = ({ match, history }) => {
  const config = useContext(ConfigContext)
  const urlFrag = config.journal.metadata.toplevel_urlfragment

  const currentCMSPageId = match.params.pageId

  const { loading, data, error } = useQuery(getCMSPages)

  const [updatePageDataQuery] = useMutation(updateCMSPageDataMutation)
  const [rebuildFlaxSiteQuery] = useMutation(rebuildFlaxSiteMutation)

  const showPage = currentCMSPage => {
    const link = `${urlFrag}/admin/cms/page-edit/${currentCMSPage.id}`
    history.push(link)
    return true
  }

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const { cmsPages } = data

  const cmsPage = cmsPages.find(obj => {
    return obj.id === currentCMSPageId
  })

  return (
    <EditPageContainer>
      <EditPageLeft>
        <CMSPageEditSidebar
          cmsPages={cmsPages}
          currentCMSPage={cmsPage}
          onItemClick={selectedCmsPage => showPage(selectedCmsPage)}
        />
      </EditPageLeft>
      <EditPageRight>
        <CMSPageEditForm
          cmsPage={cmsPage}
          key={cmsPage.id}
          rebuildFlaxSiteQuery={rebuildFlaxSiteQuery}
          updatePageDataQuery={updatePageDataQuery}
        />
      </EditPageRight>
    </EditPageContainer>
  )
}

export default CMSPageEditor
