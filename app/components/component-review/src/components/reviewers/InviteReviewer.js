import React, { useState } from 'react'
import { grid, th } from '@pubsweet/ui-toolkit'
import styled from 'styled-components'
import { Formik } from 'formik'
import { CheckboxGroup } from '@pubsweet/ui'
import ReviewerForm from './ReviewerForm'
import {
  SectionRow,
  SectionContent,
  SectionHeader,
  Title,
  ActionButton,
  MediumRow,
  Primary,
  Secondary,
  LooseColumn,
} from '../../../../shared'
import { UserAvatar } from '../../../../component-avatar/src'
import Modal from '../../../../component-kanban-modal'

const Card = styled.div`
  background-color: #f8f8f9;
  border-bottom: 0.8px solid #bfbfbf;
  border-radius: 8px;
  display: flex;
  padding: 10px;
  width: 100%;

  &:hover {
    box-shadow: 0px 9px 5px -6px #bfbfbf;
    transition: 0.3s ease;
  }
`

const ModalContainer = styled(LooseColumn)`
  background-color: ${th('colorBackground')};
  padding: ${grid(2.5)} ${grid(3)};
  z-index: 10000;
`

const UserId = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const StyledInfo = styled.div`
  display: grid;
  grid-template-columns: min-content max-content;
  gap: 10px;
`

const StyledCheckbox = styled.div`
  grid-column: 2 / 3;
`

const InviteReviewer = ({
  reviewerUsers,
  manuscript,
  addReviewer,
  sendNotifyEmail,
}) => {
  const [open, setOpen] = useState(false)
  const [condition, setCondition] = useState([])

  const [userId, setUserId] = useState(undefined)
  const identity = reviewerUsers.find(user => user.id === userId)

  const options = [
    {
      value: 'shared',
      label: 'Shared',
    },
    {
      value: 'email-notification',
      label: 'Email Notification',
    },
  ]

  return (
    <>
      <Card>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Invite Reviewer"
        >
          <ModalContainer>
            <StyledInfo>
              <UserAvatar
                isClickable={false}
                size={48}
                user={identity?.username}
              />
              <UserId>
                <Primary>{identity?.username}</Primary>
                <Secondary>{identity?.defaultIdentity?.identifier}</Secondary>
              </UserId>
              <StyledCheckbox>
                <CheckboxGroup
                  onChange={value => setCondition({ value })}
                  options={options}
                  value={condition.value}
                />
              </StyledCheckbox>
            </StyledInfo>
            <MediumRow>
              <ActionButton onClick={() => setOpen(false)}>Cancel</ActionButton>
              &nbsp;
              <ActionButton
                onClick={() => {
                  addReviewer({
                    variables: {
                      userId: identity.user.id,
                      manuscriptId: manuscript.id,
                    },
                  })

                  if (condition.value.includes('email-notification')) {
                    sendNotifyEmail()
                  }
                }}
                primary
              >
                Invite
              </ActionButton>
            </MediumRow>
          </ModalContainer>
        </Modal>
      </Card>
      <Formik
        displayName="reviewers"
        initialValues={{ user: undefined }}
        onSubmit={values => {
          setOpen(true)
          setUserId(values.user.id)
        }}
      >
        {props => (
          <SectionContent>
            <SectionHeader>
              <Title>Invite Reviewers</Title>
            </SectionHeader>
            <SectionRow>
              <ReviewerForm {...props} reviewerUsers={reviewerUsers} />
            </SectionRow>
          </SectionContent>
        )}
      </Formik>
    </>
  )
}

export default InviteReviewer
