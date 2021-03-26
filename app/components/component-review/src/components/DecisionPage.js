import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import DecisionVersion from './DecisionVersion'

import {
  Spinner,
  VersionSwitcher,
  ErrorBoundary,
  Columns,
  Manuscript,
  Chat,
} from '../../../shared'

import gatherManuscriptVersions from '../../../../shared/manuscript_versions'

import MessageContainer from '../../../component-chat/src'

import { query } from './queries'

const DecisionPage = ({ match }) => {
  const { loading, error, data } = useQuery(query, {
    variables: {
      id: match.params.version,
    },
    // fetchPolicy: 'cache-and-network',
  })

  if (loading) return <Spinner />
  if (error) return `Error! ${error.message}`

  const { manuscript, getForms } = data

  const form = getForms?.find(f => f.id === 'submit') ?? {
    name: '',
    id: '',
    children: [],
    description: '',
    haspopup: 'false',
  }

  const versions = gatherManuscriptVersions(manuscript)

  // Protect if channels don't exist for whatever reason
  let editorialChannelId, allChannelId

  if (Array.isArray(manuscript.channels) && manuscript.channels.length) {
    editorialChannelId = manuscript.channels.find(c => c.type === 'editorial')
      .id
    allChannelId = manuscript.channels.find(c => c.type === 'all').id
  }

  const channels = [
    { id: allChannelId, name: 'Discussion with author' },
    { id: editorialChannelId, name: 'Editorial discussion' },
  ]

  return (
    <Columns>
      <Manuscript>
        <ErrorBoundary>
          <VersionSwitcher>
            {versions.map((version, index) => (
              <DecisionVersion
                current={index === 0}
                form={form}
                key={version.manuscript.id}
                parent={manuscript}
                version={version.manuscript}
              />
            ))}
          </VersionSwitcher>
        </ErrorBoundary>
      </Manuscript>
      <Chat>
        <MessageContainer channels={channels} />
      </Chat>
    </Columns>
  )
}

DecisionPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      version: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default DecisionPage
