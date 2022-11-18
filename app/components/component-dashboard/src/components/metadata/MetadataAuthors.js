/* eslint-disable react/prop-types */

import React from 'react'
import { getMembersOfTeam } from '../../../../../shared/manuscriptUtils'

const MetadataAuthors = ({ manuscript }) => {
  const authors = getMembersOfTeam(manuscript, 'author')
  return authors.length ? (
    <span>
      {authors
        .map(author => (
          <span key={(author.user || {}).username || 'Anonymous'}>
            {(author.user || {}).username || 'Anonymous'}
          </span>
        ))
        .reduce((prev, curr) => [prev, ', ', curr])}
    </span>
  ) : null
}

export default MetadataAuthors
