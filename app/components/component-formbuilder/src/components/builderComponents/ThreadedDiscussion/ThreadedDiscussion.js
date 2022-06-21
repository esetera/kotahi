import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import SimpleWaxEditor from '../../../../../wax-collab/src/SimpleWaxEditor'
import { SimpleWaxEditorWrapper } from '../../style'
import ThreadedComment from './ThreadedComment'
import { CREATE_THREAD, GET_THREADED_DISCUSSIONS } from './queries'
import { Button } from '@pubsweet/ui'

const ThreadedDiscussion = props => {
  const {
    id,
    user,
    key,
    value,
    comments,
    currentUser,
    manuscriptId,
    threadedDiscussionId,
    ...SimpleWaxEditorProps
  } = props

  const [NewComment, setNewComment] = React.useState()
  const lastComment = comments ? comments[comments.length - 1] : null

  const lastCommentByCurrentUser = lastComment
    ? lastComment.userId === user.id
    : null

  const { data } = useQuery(GET_THREADED_DISCUSSIONS, {
    variables: {
      id: manuscriptId,
      comments: NewComment,
      created: new Date(),
      updated: new Date(),
    },
  })
const { upsert } = useMutation(CREATE_THREAD,{
  variables: {
    id: manuscriptId,
    comments: NewComment,
    created: new Date(),
    updated: new Date(),
  },
})
  return (
    <>
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
          <Button onClick= {upsert} primary type="submit">
            Submit
          </Button>
        </>
      )}
    </>
  )
}

export default ThreadedDiscussion
