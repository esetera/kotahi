import React from 'react'
import ReviewerForm from './ReviewerForm'
import {
  SectionRow,
  SectionContent,
  SectionHeader,
  Title,
} from '../../../../shared'

const InviteReviewer = ({ handleSubmit, isValid, reviewerUsers }) => {
  return (
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
  )
}

export default InviteReviewer
