import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'

import { Container, Heading, Content, Spinner } from './../style'
import { CommsErrorBanner } from '../../../shared'

import { ConfigContext } from '../../../config/src'

import { getFlaxPages } from './../queries'

import CMSPagesTable from './CMSPagesTable'

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
    <Container>
      <Heading>Pages</Heading>
      <Content>
        <CMSPagesTable
          history={history}
          flaxPages={flaxPages}
          onClickTitle={currentFlaxPage => showManagePage(currentFlaxPage)}
        />
      </Content>
    </Container>
  )
}

export default CMSPages
