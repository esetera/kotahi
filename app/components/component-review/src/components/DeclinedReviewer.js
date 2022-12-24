import React, { useState } from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { Mail } from 'react-feather'
import { Primary, Secondary } from '../../../shared'
import { convertTimestampToRelativeDateString } from '../../../../shared/dateUtils'
import { UserAction } from '../../../component-manuscripts-table/src/style'
import InviteDeclineModal from './InviteDeclineModal'

const DeclinedReviewerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5em;
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 1.5em;
  overflow-x: hidden;
  overflow-y: auto;
`

const LeftSide = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
`

const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: flex-end;
`

const UserName = styled.div`
  display: flex;
  flex-direction: row;
  word-break: break-all;
`

const Date = styled.div`
  word-break: break-all;
`

const TextChange = styled.div`
  color: ${th('colorSecondary')};
`

const EmailDisplay = styled(Secondary)`
  align-items: center;
  color: ${th('colorSecondary')};
  display: flex;
  margin-left: calc(${th('gridUnit')} * 2);
`

const MailIcon = styled(Mail)`
  height: ${th('fontSizeBase')};
  margin-right: calc(${th('gridUnit')} / 2);
  width: auto;
`

const DeclinedReviewer = ({ declined }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  return (
    <>
      <InviteDeclineModal
        invitation={declined}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      <DeclinedReviewerContainer>
        <LeftSide>
          <UserName>
            <Primary>
              {declined.user?.username ?? declined.invitedPersonName}
            </Primary>
            {declined.isEmail && (
              <EmailDisplay>
                <MailIcon />
                {' Invited via email'}
              </EmailDisplay>
            )}
          </UserName>
          <Date>
            <Secondary>
              <TextChange>
                Declined{' '}
                {convertTimestampToRelativeDateString(
                  declined.responseComment
                    ? declined.responseDate
                    : declined.updated,
                )}
              </TextChange>
            </Secondary>
          </Date>
        </LeftSide>
        {declined.responseComment && (
          <RightSide>
            <UserAction onClick={() => setModalOpen(true)}>
              View Details
            </UserAction>
          </RightSide>
        )}
      </DeclinedReviewerContainer>
    </>
  )
}

export default DeclinedReviewer
