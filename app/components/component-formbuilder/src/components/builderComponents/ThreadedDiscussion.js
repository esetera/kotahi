import React from 'react'
import SimpleWaxEditor from '../../../../wax-collab/src/SimpleWaxEditor'
import { SimpleWaxEditorWrapper } from '../style'
import ThreadedComment from '../ThreadedComment'

import {
  Button,
} from '@pubsweet/ui'

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

  const [newComment, setNewComment] = React.useState();

  const lastComment = comments ? comments[comments.length - 1] : null

  const lastCommentByCurrentUser = lastComment ? lastComment.userId === user.id : null

  const onClickComment = () => {
    alert(newComment);
  };

  return (
    <>
      {comments && comments.map(comment => {
        return (
          <ThreadedComment
            comment={comment}
            currentUserId={user.id}
            key={comment.id}
            simpleWaxEditorProps={SimpleWaxEditorProps}
          />
        )
      })}

      {!lastCommentByCurrentUser &&
      (
        <>
        <SimpleWaxEditorWrapper>
          <SimpleWaxEditor
            {...SimpleWaxEditorProps}
            onChange={content => setNewComment(content)} />
        </SimpleWaxEditorWrapper>
            <Button
              disabled={false}
              primary
              type="button"
              onClick={onClickComment}
            >
              Submit
            </Button>
            
        </>
      )
      }
    </>
  )
}

export default ThreadedDiscussion
