import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@pubsweet/ui'
import { SectionHeader, SectionRow } from '../../../shared'
import { UserAction } from '../../../component-manuscripts-table/src/style'
import InviteDeclineModal from './InviteDeclineModal'
import DeclinedReviewer from './DeclinedReviewer'

const DropdownTitleContainer = styled.div`
  align-content: center;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
`

const DeclinedReviewerContainer = styled.div`
  background-color: #f8f8f9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1em;
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 1em;
`

const AddBorder = styled.div`
  :not(:last-child) {
    border-bottom: 0.8px solid #bfbfbf;
  }
`

const ReviewersDeclined = ({ emailAndWebReviewers }) => {
  const [open, setOpen] = useState(false)
  const [modalInvitation, setModalInvitation] = useState(null)

  const declinations = emailAndWebReviewers.filter(user => {
    return user.status === 'rejected'
  })

  return (
    <>
      <InviteDeclineModal
        invitation={modalInvitation}
        isOpen={modalInvitation !== null}
        onClose={() => setModalInvitation(null)}
      />
      {open ? (
        <>
          <SectionHeader onClick={() => setOpen(!open)}>
            <DropdownTitleContainer>
              <UserAction>Hide Declined</UserAction>
              <Icon color="#9e9e9e">chevron-up</Icon>
            </DropdownTitleContainer>
          </SectionHeader>

          {declinations && declinations.length ? (
            <DeclinedReviewerContainer>
              {declinations.map(declined => {
                return (
                  <AddBorder key={declined.user.id}>
                    <DeclinedReviewer declined={declined} />
                  </AddBorder>
                )
              })}
            </DeclinedReviewerContainer>
          ) : (
            <SectionRow>No Declined Reviewers</SectionRow>
          )}
        </>
      ) : (
        <SectionHeader onClick={() => setOpen(!open)}>
          <DropdownTitleContainer>
            <UserAction>See Declined</UserAction>
            <Icon color="#9e9e9e">chevron-down</Icon>
          </DropdownTitleContainer>
        </SectionHeader>
      )}
    </>
  )
}

export default ReviewersDeclined
