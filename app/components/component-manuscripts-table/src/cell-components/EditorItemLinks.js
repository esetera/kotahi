import React from 'react'
import PropTypes from 'prop-types'
import { Action, ActionGroup } from '@pubsweet/ui'
import styled from 'styled-components'
import { Users, MessageSquare } from 'react-feather'

const StyledActionGroup = styled(ActionGroup)`
  text-align: left;
`

const StyledAction = styled(Action)`
  display: flex;
  align-items: center;
  font-size: 14px;
`

const EditorItemLinks = ({ manuscript, urlFrag }) => (
  <StyledActionGroup>
    <StyledAction
      to={{
        pathname: `${urlFrag}/versions/${
          manuscript.parentId || manuscript.id
        }/decision`,
        state: { label: 'Decision' },
      }}
    >
      <MessageSquare />
      &nbsp;DECISION
    </StyledAction>
    <StyledAction
      to={{
        pathname: `${urlFrag}/versions/${
          manuscript.parentId || manuscript.id
        }/decision`,
        state: { label: 'Team' },
      }}
    >
      <Users />
      &nbsp;TEAM
    </StyledAction>
  </StyledActionGroup>
)

EditorItemLinks.propTypes = {
  manuscript: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string,
  }).isRequired,
}

export default EditorItemLinks
