import React from 'react'
import PropTypes from 'prop-types'
import { Action, ActionGroup } from '@pubsweet/ui'
import { Edit } from 'react-feather'
import styled from 'styled-components'

const StyledActionGroup = styled(ActionGroup)`
  text-align: left;
`

const StyledAction = styled(Action)`
  align-items: center;
  display: flex;
  font-size: 14px;
`

const AuthorProofingLink = ({
  manuscript,
  urlFrag,
  currentUser,
  getIsAuthorProofingEnabled,
}) => {
  const isAuthorProofingEnabled =
    getIsAuthorProofingEnabled && getIsAuthorProofingEnabled(manuscript)

  const authorTeam = manuscript.teams.find(team => team.role === 'author')

  const sortedAuthors = authorTeam?.members
    .slice()
    .sort(
      (a, b) =>
        Date.parse(new Date(b.created)) - Date.parse(new Date(a.created)),
    )

  if (
    isAuthorProofingEnabled &&
    sortedAuthors[0]?.user?.id === currentUser.id
  ) {
    return (
      <StyledActionGroup>
        <StyledAction
          data-testid="control-panel-decision"
          onClick={e => {
            e.stopPropagation()
          }}
          to={{
            pathname: `${urlFrag}/versions/${
              manuscript.parentId || manuscript.id
            }/production`,
          }}
        >
          <Edit />
        </StyledAction>
      </StyledActionGroup>
    )
  }

  return <></>
}

AuthorProofingLink.propTypes = {
  manuscript: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string,
  }).isRequired,
}

export default AuthorProofingLink
