import React from 'react'
import SimpleWaxEditor from '../../../../../wax-collab/src/SimpleWaxEditor'
import { SimpleWaxEditorWrapper } from '../../style'
import ThreadedComment from './ThreadedComment'
import { GET_THREADED_DISCUSSIONS } from './queries'
import { useQuery } from '@apollo/client'

const ThreadedDiscussion = props => {
  const {
    user,
    userCanAddComment,
    channelId,
    value,
    key,
    comments,
    threadedDiscussions,
    manuscriptId,
    loading,
    error,
    ...SimpleWaxEditorProps} = props
  
  const [NewComment, setNewComment] = React.useState()
  const lastComment = comments ? comments[comments.length - 1] : null

  const lastCommentByCurrentUser = lastComment
    ? lastComment.userId === user.id
    : null
    const { data } = useQuery(GET_THREADED_DISCUSSIONS, {
      variables: { id: manuscriptId,
        comments: NewComment,
        created: new Date(),
        updated: new Date(),
       },
    })

  return (
    <>
      {loading && 'loading dicussion...'}
      {data && JSON.stringify(data)}
      {error && 'some error occurred while trying to load'}    

      {comments &&
        comments.map(comment => {
          return (
            <ThreadedComment
              comment={comment}
              currentUserId={user.id}
              key={comment.id}
              simpleWaxEditorProps={SimpleWaxEditorProps}
            />
          )
        })}

      {!lastCommentByCurrentUser && (
        <>
          <SimpleWaxEditorWrapper>
            <SimpleWaxEditor
              {...SimpleWaxEditorProps}
              onChange={content => setNewComment(content)}
            />
          </SimpleWaxEditorWrapper>
        </>
      )}
    </>
  )
}

export default ThreadedDiscussion
