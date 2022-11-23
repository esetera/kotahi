import React from 'react'
import PropTypes from 'prop-types'
import { Action, ActionGroup } from '@pubsweet/ui'
import styled from 'styled-components'

const StyledActionGroup = styled(ActionGroup)`
  text-align: right;
`

const EditorItemLinks = ({ manuscript, urlFrag }) => (
  <StyledActionGroup>
    <Action
      to={`${urlFrag}/versions/${manuscript.parentId || manuscript.id}/submit`}
    >
      Summary Info
    </Action>
    <Action
      data-testid="control-panel"
      to={`${urlFrag}/versions/${
        manuscript.parentId || manuscript.id
      }/decision`}
    >
      Control Panel
    </Action>
  </StyledActionGroup>
)

EditorItemLinks.propTypes = {
  version: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string,
  }).isRequired,
}

export default EditorItemLinks
