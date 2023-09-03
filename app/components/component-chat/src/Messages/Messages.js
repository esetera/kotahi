/* eslint-disable prefer-object-spread */

import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { UserAvatar } from '../../../component-avatar/src'
import { sortAndGroupMessages } from '../../../../sortAndGroup'
import NextPageButton from '../../../NextPageButton'
import {
  convertTimestampToDateWithoutTimeString,
  convertTimestampToTimeString,
  convertTimestampToDateTimeString,
} from '../../../../shared/dateUtils'
import { CommsErrorBanner } from '../../../shared'
import VideoChat from '../VideoChat'

import ChatPostDropdown from './ChatPostDropdown'
import Tooltip from '../../../component-reporting/src/Tooltip'

import {
  Time,
  Message,
  MessageGroupContainer,
  MessagesGroup,
  GutterContainer,
  Bubble,
  InnerMessageContainer,
  Byline,
  Placeholder,
  Spinner,
  InlineTime,
  UnreadLabelContainer,
  UnreadLabel,
  DateLabelContainer,
  DateLabel,
  Ellipsis,
  EditedTime,
} from './style'

const Messages = ({
  chatRoomId,
  channelId,
  fetchMoreData,
  queryData,
  firstUnreadMessageId,
  unreadMessagesCount,
  updateChannelViewed,
  manuscriptId = null,
  currentUser,
}) => {
  const { loading, error, data } = queryData

  useEffect(() => {
    // when there are new messages while the user is on the page
    // update the last view timestamp for the user
    if (data?.messages) {
      updateChannelViewed({
        variables: { channelId },
      })
    }
  }, [data])
  const [activeMessageDropdownId, setActiveMessageDropdownId] = useState(null)

  const showDropdown = messageId => {
    setActiveMessageDropdownId(prevId =>
      prevId === messageId ? null : messageId,
    )
  }

  const mainRef = useRef(null)

  const scrollToBottom = () => {
    const main = document.getElementById('messages')

    if (!main || !data || !data.messages || data.messages.length === 0) {
      return
    }

    const { scrollHeight, clientHeight } = main
    main.scrollTop = scrollHeight - clientHeight
  }

  useEffect(() => {
    scrollToBottom()

    return () => {}
  }, [mainRef.current])

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const messages = sortAndGroupMessages(
    data.messages.edges,
    firstUnreadMessageId,
  )

  const { hasPreviousPage } = data.messages.pageInfo

  const DateWithUnreadLabelElement = ({ message }) => (
    <UnreadLabelContainer>
      <UnreadLabel>
        Unread messages:{' '}
        {convertTimestampToDateWithoutTimeString(new Date(message.created))}
      </UnreadLabel>
    </UnreadLabelContainer>
  )

  const DateLabelElement = ({ message }) => (
    <DateLabelContainer>
      <DateLabel>
        {convertTimestampToDateWithoutTimeString(new Date(message.created))}
      </DateLabel>
    </DateLabelContainer>
  )

  const UnreadLabelElement = () => (
    <UnreadLabelContainer>
      <UnreadLabel>Unread messages</UnreadLabel>
    </UnreadLabelContainer>
  )

  const { globalRoles = [] } = currentUser
  const isAdmin = globalRoles.includes('admin')
  const isGroupManager = currentUser.groupRoles.includes('groupManager')

  // eslint-disable-next-line no-shadow
  const renderDropdownAndEllipsis = (isAdmin, isGroupManager, message) => {
    if ((isAdmin && isGroupManager) || currentUser.id === message.user.id) {
      return (
        <>
          <Ellipsis
            className="message-ellipsis"
            onClick={() => showDropdown(message.id)}
          />
          {activeMessageDropdownId === message.id && (
            <ChatPostDropdown
              currentUser={currentUser}
              message={message}
              show
            />
          )}
        </>
      )
    }

    return <></>
  }

  // eslint-disable-next-line no-shadow
  const MessageRenderer = ({ message }) => {
    // eslint-disable-next-line react/no-danger
    return <div dangerouslySetInnerHTML={{ __html: message.content }} />
  }

  return (
    <MessagesGroup
      id="messages"
      ref={mainRef}
      style={{ paddingBottom: unreadMessagesCount !== 0 ? '20px' : '8px' }}
    >
      {manuscriptId ? <VideoChat manuscriptId={manuscriptId} /> : ''}
      {chatRoomId ? <VideoChat manuscriptId={chatRoomId} /> : ''}
      {hasPreviousPage && (
        <NextPageButton
          fetchMore={() => fetchMoreData()}
          isFetchingMore={false}
        >
          Show previous messages
        </NextPageButton>
      )}
      {messages && !messages.length && (
        <Placeholder>
          No discussion for this manuscript yet. Start by typing a message
          below.
        </Placeholder>
      )}
      {messages.map(group => {
        const initialMessage = group[0]

        if (initialMessage.type === 'dateWithUnreadLabel') {
          return <DateWithUnreadLabelElement message={initialMessage} />
        }

        if (initialMessage.type === 'unreadLabel') {
          return <UnreadLabelElement />
        }

        if (initialMessage.type === 'dateLabel') {
          return <DateLabelElement message={initialMessage} />
        }

        return (
          <MessageGroupContainer key={initialMessage.id}>
            {group.map((message, index) => (
              <Message key={message.id}>
                <GutterContainer>
                  {index === 0 && <UserAvatar user={message.user} />}
                </GutterContainer>
                <InnerMessageContainer>
                  {index === 0 && (
                    <Byline>
                      {message.user.username}
                      <div className="message-time">
                        <Time>
                          {convertTimestampToTimeString(message.created)}
                        </Time>
                        {renderDropdownAndEllipsis(
                          isAdmin,
                          isGroupManager,
                          message,
                        )}
                      </div>
                    </Byline>
                  )}
                  <Bubble>
                    <MessageRenderer message={message} />
                    {index !== 0 && (
                      <>
                        <InlineTime className="message-timestamp">
                          {convertTimestampToTimeString(message.created)}
                        </InlineTime>
                        {renderDropdownAndEllipsis(
                          isAdmin,
                          isGroupManager,
                          message,
                        )}
                      </>
                    )}
                  </Bubble>
                  {message.created !== message.updated && (
                    <>
                      <EditedTime>Edited</EditedTime>
                      <Tooltip
                        className="custom-tooltip"
                        content={convertTimestampToDateTimeString(
                          message.updated,
                        )}
                      />
                    </>
                  )}
                </InnerMessageContainer>
              </Message>
            ))}
          </MessageGroupContainer>
        )
      })}
    </MessagesGroup>
  )
}

Messages.propTypes = {
  channelId: PropTypes.string.isRequired,
}

export default Messages
