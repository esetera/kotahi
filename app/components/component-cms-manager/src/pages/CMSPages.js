import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { grid } from '@pubsweet/ui-toolkit'

import PageHeader from '../components/PageHeader'

import { PageTableContainer } from '../style'
import { CommsErrorBanner, Container, Spinner } from '../../../shared'

import { ConfigContext } from '../../../config/src'

import { getCMSPages } from '../queries'

import CMSPagesTable from './CMSPagesTable'

export const ControlsContainer = styled.div`
  display: flex;
  flex: 1 1;
  gap: ${grid(2)};
  justify-content: flex-end;
`

const OuterContainer = styled(Container)`
  overflow: hidden;
  padding: 0;
`

const CMSPagesPane = styled.div`
  overflow-y: scroll;
  padding: 16px 16px 0 16px;
`

const CMSPages = ({ history }) => {
  const config = useContext(ConfigContext)
  const urlFrag = config.journal.metadata.toplevel_urlfragment

  const { loading, error, data } = useQuery(getCMSPages, {
    fetchPolicy: 'cache-and-network',
  })

  const showManagePage = currentCMSPage => {
    const link = `${urlFrag}/admin/cms/page-edit/${currentCMSPage.id}`
    history.push(link)
  }

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const { cmsPages } = data

  return (
    <OuterContainer>
      <CMSPagesPane>
        <PageHeader
          history={history}
          mainHeading="Pages"
          newItemButtonText="+ New page"
          onNewItemButtonClick={() => alert('Coming Soon.')}
        />
        <PageTableContainer>
          <CMSPagesTable
            cmsPages={cmsPages}
            history={history}
            onClickTitle={currentCMSPage => showManagePage(currentCMSPage)}
          />
        </PageTableContainer>
      </CMSPagesPane>
    </OuterContainer>
  )
}

export default CMSPages
