import React from 'react'
import styled from 'styled-components'
import { Action, Button, Checkbox } from '@pubsweet/ui'
import { grid } from '@pubsweet/ui-toolkit'
import PropTypes from 'prop-types'
import config from 'config'
import ReviewerForm from './ReviewerForm'
import { AdminSection } from '../style'
import {
  Container,
  SectionRow,
  SectionContent,
  SectionHeader,
  Title,
  Heading,
  HeadingWithAction,
  StatusBadge,
  Primary,
  Secondary,
} from '../../../../shared'
import { useParams } from 'react-router-dom'

// TODO: Make this a proper shared component?
import { UserAvatar } from '../../../../component-avatar/src'

const ReviewersList = styled.div`
  display: grid;
  grid-gap: ${grid(2)};
  grid-template-columns: repeat(auto-fill, minmax(${grid(20)}, 1fr));
`

const Reviewer = styled.div``

const urlFrag = config.journal.metadata.toplevel_urlfragment

const Reviewers = ({
  isValid,
  reviewers,
  reviewerUsers,
  manuscript,
  handleSubmit,
  removeReviewer,
  updateTeamMember,
  refetchManuscriptData,
}) => {
  const toggleReviewerSharedStatus = async (id, delta) => {
    await updateTeamMember({
      variables: {
        id,
        input: JSON.stringify(delta),
      },
    })
    refetchManuscriptData()
  }

  return (
    <>
      <AdminSection>
        <SectionContent>
          <SectionHeader>
            <Title>Invite Reviewers</Title>
          </SectionHeader>

          <SectionRow>
            <ReviewerForm
              handleSubmit={handleSubmit}
              isValid={isValid}
              reviewerUsers={reviewerUsers}
            />
          </SectionRow>
        </SectionContent>
      </AdminSection>
    </>
  )
}

Reviewers.propTypes = {
  isValid: PropTypes.bool.isRequired,
  reviewers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        defaultIdentity: PropTypes.shape({
          identifier: PropTypes.string.isRequired,
        }),
      }).isRequired,
    }).isRequired,
  ).isRequired,
  reviewerUsers: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  manuscript: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  removeReviewer: PropTypes.func.isRequired,
}

export default Reviewers
