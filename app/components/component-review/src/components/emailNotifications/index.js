import React, { useState } from 'react'
import { th } from '@pubsweet/ui-toolkit'
import styled, { css } from 'styled-components'
import { SectionHeader, SectionRowGrid, Title } from '../style'
import { SectionContent } from '../../../../shared'
import SelectReceiver from './SelectReceiver'
import SelectEmailTemplate from './SelectEmailTemplate'
import ActionButton from '../../../../shared/ActionButton'
import { sendEmailHandler } from './emailUtils'

const UserEmailWrapper = styled.div`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
`

const editorOption = user => ({
  label: (
    <>
      <div>{user.username}</div>{' '}
      <UserEmailWrapper>{user.email}</UserEmailWrapper>{' '}
    </>
  ),
  value: user.email,
  userName: user.username,
})

const MessageWrapper = styled.div`
  color: ${th('colorError')};
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};

  ${props =>
    props.isVisible === true
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `}

  padding: calc(8px * 2) calc(8px * 3);

  &:not(:last-child) {
    margin-bottom: ${th('gridUnit')};
  }
`

const RowGridStyled = styled(SectionRowGrid)`
  grid-template-columns: repeat(5, minmax(0, 1fr));
`

const EmailNotifications = ({
  manuscript,
  allUsers,
  currentUser,
  sendNotifyEmail,
  sendChannelMessageCb,
  selectedEmail,
  externalEmail,
  setSelectedEmail,
  setExternalEmail,
  isEmailAddressOptedOut,
}) => {
  const [externalName, setExternalName] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [notificationStatus, setNotificationStatus] = useState(null)

  const resetAll = () => {
    setExternalEmail('')
    setSelectedEmail('')
    setExternalName('')
    setSelectedTemplate('')
    setIsVisible(false)
  }

  const handlerForNewUserToggle = () => {
    resetAll()
    setIsNewUser(s => !s)
  }

  const options = (allUsers || [])
    .filter(user => user.email)
    .map(user => editorOption(user))

  return (
    <SectionContent>
      <SectionHeader>
        <Title>Notifications</Title>
      </SectionHeader>
      <RowGridStyled>
        <SelectReceiver
          externalEmail={externalEmail}
          externalName={externalName}
          isNewUser={isNewUser}
          onChangeReceiver={setSelectedEmail}
          options={options}
          selectedReceiver={selectedEmail}
          setExternalEmail={setExternalEmail}
          setExternalName={setExternalName}
          setIsNewUser={handlerForNewUserToggle}
        />
        <SelectEmailTemplate
          onChangeEmailTemplate={setSelectedTemplate}
          selectedEmailTemplate={selectedTemplate}
        />
        <ActionButton
          onClick={() =>
            sendEmailHandler(
              manuscript,
              isNewUser,
              currentUser,
              sendNotifyEmail,
              sendChannelMessageCb,
              setNotificationStatus,
              selectedTemplate,
              selectedEmail,
              externalEmail,
              externalName,
              isEmailAddressOptedOut,
            )
          }
          primary
          status={notificationStatus}
        >
          Notify
        </ActionButton>
      </RowGridStyled>
      <MessageWrapper isVisible={isVisible}>
        User email address opted out
      </MessageWrapper>
    </SectionContent>
  )
}

export default EmailNotifications
