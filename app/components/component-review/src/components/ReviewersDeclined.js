import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import { SectionHeader } from '../../../shared'
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

const AllRejectedReviewers = styled.div`
  :not(:last-child) {
    border-bottom: 0.8px solid #bfbfbf;
  }
`

const ReviewersDeclined = ({ invitations, reviewers }) => {
  const [open, setOpen] = useState(false)
  const [modalInvitation, setModalInvitation] = useState(null)

  const declinations = invitations ? [...invitations, ...reviewers] : reviewers
  declinations.sort((a, b) => {
    const aDate = Object.prototype.hasOwnProperty.call(a, 'declinedReason')
      ? a.responseDate
      : a.updated

    const bDate = Object.prototype.hasOwnProperty.call(b, 'declinedReason')
      ? b.responseDate
      : b.updated

    return aDate - bDate
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
              <Icon color={th('colorSecondary')}>chevron-up</Icon>
            </DropdownTitleContainer>
          </SectionHeader>
          <DeclinedReviewerContainer>
            {declinations.map(
              declined =>
                declined.status === 'rejected' && (
                  <AllRejectedReviewers>
                    <DeclinedReviewer declined={declined} />
                  </AllRejectedReviewers>
                ),
            )}
          </DeclinedReviewerContainer>
        </>
      ) : (
        <SectionHeader onClick={() => setOpen(!open)}>
          <DropdownTitleContainer>
            <UserAction>See Declined</UserAction>
            <Icon color={th('colorSecondary')}>chevron-down</Icon>
          </DropdownTitleContainer>
        </SectionHeader>
      )}
    </>
  )
}

export default ReviewersDeclined
