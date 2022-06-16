import React from 'react'
import { Button } from '@pubsweet/ui'
import SimpleWaxEditor from '../../../../../wax-collab/src/SimpleWaxEditor'
import { SimpleWaxEditorWrapper } from '../../style'
import ThreadedComment from './ThreadedComment'

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
    data,
    ...SimpleWaxEditorProps} = props
  
  const [, setNewComment] = React.useState()
  const lastComment = comments ? comments[comments.length - 1] : null

  const lastCommentByCurrentUser = lastComment
    ? lastComment.userId === user.id
    : null

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
          <Button onClick={alert} primary type="submit">
            Submit
          </Button>
        </>
      )}
    </>
  )
}

export default ThreadedDiscussion
