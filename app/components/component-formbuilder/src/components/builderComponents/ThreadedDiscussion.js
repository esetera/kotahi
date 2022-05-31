import React from 'react'
import { Button } from '@pubsweet/ui'
import SimpleWaxEditor from '../../../../wax-collab/src/SimpleWaxEditor'
import { SimpleWaxEditorWrapper } from '../style'
import ThreadedComment from '../ThreadedComment'

const ThreadedDiscussion = props => {
  const {
    user,
    userCanAddComment,
    channelId,
    value,
    key,
    comments,
    threadedDiscussions,
    ...SimpleWaxEditorProps
  } = props

  const [newComment, setNewComment] = React.useState()

  const lastComment = comments ? comments[comments.length - 1] : null

  const lastCommentByCurrentUser = lastComment
    ? lastComment.userId === user.id
    : null

  const onClickComment = () => {
    alert(newComment)
  }

  const { data, error, loading } = threadedDiscussions()

  return (
    <>
      {loading && 'loading dicussion...'}
      {error && 'some error occurred while trying to load'}
      {data && JSON.stringify(data)}
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
          <Button
            disabled={false}
            onClick={onClickComment}
            primary
            type="button"
          >
            Submit
          </Button>
        </>
      )}
    </>
  )
}

export default ThreadedDiscussion
