import React, { useContext, useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'

import { Spinner, CommsErrorBanner } from '../../shared'

import CMSPageEdit from './pages/CMSPageEdit'

import CMSPageEditSidebar from './pages/CMSPageEditSidebar'

import { ConfigContext } from '../../config/src'

import { EditPageContainer, EditPageLeft, EditPageRight } from './style'
import PageHeader from './components/PageHeader'

import {
  createCMSPageMutation,
  getCMSPages,
  updateCMSPageDataMutation,
  rebuildFlaxSiteMutation,
} from './queries'

const CMSPageManager = ({ match, history }) => {
  const [isNewPage, setIsNewPage] = useState(false)
  const config = useContext(ConfigContext)
  const urlFrag = config.journal.metadata.toplevel_urlfragment

  const { loading, data, error, refetch: refetchCMSPages } = useQuery(
    getCMSPages,
  )

  const [createNewCMSPage] = useMutation(createCMSPageMutation)
  const [updatePageDataQuery] = useMutation(updateCMSPageDataMutation)
  const [rebuildFlaxSiteQuery] = useMutation(rebuildFlaxSiteMutation)

  let currentCMSPageId = null

  if (match.params.pageId) {
    currentCMSPageId = match.params.pageId
  }

  const showPage = async currentCMSPage => {
    setIsNewPage(false)
    await refetchCMSPages()
    const link = `${urlFrag}/admin/cms/pages/${currentCMSPage.id}`
    history.push(link)
    return true
  }

  const addNewPage = () => {
    if (isNewPage) {
      return
    }
    setIsNewPage(true)
  }

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const { cmsPages } = data

  let cmsPage = cmsPages.length > 0 ? cmsPages[0] : null

  if (currentCMSPageId) {
    cmsPage = cmsPages.find(obj => {
      return obj.id === currentCMSPageId
    })
  }

  if (isNewPage) {
    cmsPage = {}
  }

  // added to make sure that new page action is unset
  if (cmsPage.id && isNewPage) {
    setIsNewPage(false)
  }

  if (!cmsPage) {
    return <p>No CMS page found.</p>
  }

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
        <PageHeader
          hideSearch={true}
          mainHeading={isNewPage ? 'New Page' : 'Pages'}
          newItemButtonText="+ New page"
          onNewItemButtonClick={() => addNewPage()}
          history={history}
        />
        <CMSPageEdit
          isNewPage={isNewPage}
          cmsPage={cmsPage}
          key={cmsPage.id}
          rebuildFlaxSiteQuery={rebuildFlaxSiteQuery}
          updatePageDataQuery={updatePageDataQuery}
          createNewCMSPage={createNewCMSPage}
          showPage={showPage}
        />
      </EditPageRight>
    </EditPageContainer>
  )
}

export default CMSPageManager
