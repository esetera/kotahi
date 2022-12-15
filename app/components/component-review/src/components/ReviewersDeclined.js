import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import { Primary, Secondary, SectionHeader } from '../../../shared'
import { convertTimestampToRelativeDateString } from '../../../../shared/dateUtils'
import { UserAction } from '../../../component-manuscripts-table/src/style'

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

const TextChange = styled.div`
  color: ${th('colorSecondary')};
`

const DeclinedReviewer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5em;
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 1.5em;
  overflow-x: hidden;
  overflow-y: auto;
`

const UserName = styled.div`
  display: flex;
  width: 8em;
  word-break: break-all;
`

const Date = styled.div`
  display: flex;
  width: 15em;
  word-break: break-all;
`

const AllRejectedReviewers = styled.div`
  :not(:last-child) {
    border-bottom: 0.8px solid #bfbfbf;
  }
`

const Box = styled.div`
  align-items: space-between;
  display: flex;
`

const Container = styled.div``

const ReviewersDeclined = ({ reviewers }) => {
  const [open, setOpen] = useState(false)

  return (
    <Container onClick={() => setOpen(!open)}>
      {open ? (
        <>
          <SectionHeader>
            <DropdownTitleContainer>
              <UserAction>Hide Declined</UserAction>
              <Icon color={th('colorSecondary')}>chevron-up</Icon>
            </DropdownTitleContainer>
          </SectionHeader>
          <DeclinedReviewerContainer>
            {reviewers.slice().map(
              reviewer =>
                reviewer.status === 'rejected' && (
                  <AllRejectedReviewers>
                    <DeclinedReviewer>
                      <Box>
                        <UserName>
                          <Primary>{reviewer.user.username}</Primary>
                        </UserName>
                        <Date>
                          <Secondary>
                            <TextChange>
                              Declined{' '}
                              {convertTimestampToRelativeDateString(
                                reviewer.updated,
                              )}
                            </TextChange>
                          </Secondary>
                        </Date>
                      </Box>
                      <Secondary>View Details</Secondary>
                    </DeclinedReviewer>
                  </AllRejectedReviewers>
                ),
            )}
          </DeclinedReviewerContainer>
        </>
      ) : (
        <SectionHeader>
          <DropdownTitleContainer>
            <UserAction>See Declined</UserAction>
            <Icon color={th('colorSecondary')}>chevron-down</Icon>
          </DropdownTitleContainer>
        </SectionHeader>
      )}
    </Container>
  )
}

export default ReviewersDeclined
