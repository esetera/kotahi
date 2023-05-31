import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { grid } from '@pubsweet/ui-toolkit'

import { Container, Heading, Spinner, PageTableContainer } from '../style'
import { CommsErrorBanner } from '../../../shared'

import { ConfigContext } from '../../../config/src'

import { getFlaxPages } from '../queries'

import CMSPagesTable from './CMSPagesTable'

const OuterContainer = styled(Container)`
  overflow: hidden;
  padding: 0;
`

const CMSPagesPane = styled.div`
  overflow-y: scroll;
  padding: 16px 16px 0 16px;
`

const FlexRow = styled.div`
  display: flex;
  gap: ${grid(1)};
  justify-content: space-between;
`

const CMSPages = ({ history }) => {
  const config = useContext(ConfigContext)
  const urlFrag = config.journal.metadata.toplevel_urlfragment

  const { loading, error, data } = useQuery(getFlaxPages, {
    fetchPolicy: 'cache-and-network',
  })

  const showManagePage = currentFlaxPage => {
    const link = `${urlFrag}/admin/flax/flax-edit/${currentFlaxPage.id}`
    history.push(link)
  }

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const { flaxPages } = data

  return (
    <OuterContainer>
      <CMSPagesPane>
        <FlexRow>
          <Heading>Pages</Heading>
          {/* {topRightControls} */}
        </FlexRow>
        <PageTableContainer>
          <CMSPagesTable
            flaxPages={flaxPages}
            history={history}
            onClickTitle={currentFlaxPage => showManagePage(currentFlaxPage)}
          />
        </PageTableContainer>
      </CMSPagesPane>
    </OuterContainer>
  )
}

export default CMSPages
