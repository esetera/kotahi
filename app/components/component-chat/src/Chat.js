import React from 'react'
import { useQuery, gql } from '@apollo/client'
import ChatInput from './SuperChatInput/SuperChatInput'
import Messages from './Messages/Messages'

const Chat = ({
  channelId,
  chatRoomId,
  currentUser,
  searchUsers,
  sendChannelMessages,
  fetchMoreData,
  queryData,
  manuscriptId = null,
}) => {
  const GET_USER = gql`
    query {
      users {
        id
        username
      }
    }
  `

  const { loading, error, data } = useQuery(GET_USER)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <Messages
        channelId={channelId}
        chatRoomId={chatRoomId}
        fetchMoreData={fetchMoreData}
        manuscriptId={manuscriptId}
        queryData={queryData}
      />
      <ChatInput
        channelId={channelId}
        currentUser={currentUser}
        searchUsers={searchUsers}
        sendChannelMessages={sendChannelMessages}
        users={data.users}
      />
    </>
  )
}

export default Chat
