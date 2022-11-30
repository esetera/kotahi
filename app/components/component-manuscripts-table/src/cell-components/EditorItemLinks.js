import React from 'react'
import PropTypes from 'prop-types'
import { Action, ActionGroup } from '@pubsweet/ui'
import styled from 'styled-components'
import { Users, MessageSquare } from 'react-feather'

const StyledActionGroup = styled(ActionGroup)`
  text-align: right;
`
// const StyledAction = styled(Action)`
//   word-spacing: 10px;
// `

const EditorItemLinks = ({ manuscript, urlFrag }) => (
  <StyledActionGroup>
    <Action
      to={{
        pathname: `${urlFrag}/versions/${
          manuscript.parentId || manuscript.id
        }/decision`,
        state: { label: 'Decision' },
      }}
    >
      <MessageSquare />
      &nbsp;DECISION
    </Action>
    <Action
      to={{
        pathname: `${urlFrag}/versions/${
          manuscript.parentId || manuscript.id
        }/decision`,
        state: { label: 'Team' },
      }}
    >
      <Users />
      &nbsp;TEAM
    </Action>
  </StyledActionGroup>
)

EditorItemLinks.propTypes = {
  manuscript: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string,
  }).isRequired,
}

export default EditorItemLinks
