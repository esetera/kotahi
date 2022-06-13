import React from 'react'
import { Button } from '@pubsweet/ui'
import { useMutation, useQuery } from '@apollo/client'
import SimpleWaxEditor from '../../../../../wax-collab/src/SimpleWaxEditor'
import { SimpleWaxEditorWrapper } from '../../style'
import ThreadedComment from './ThreadedComment'
import { CREATE_THREAD, GET_THREADED_DISCUSSIONS } from './queries'

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
    ...SimpleWaxEditorProps
  } = props

  const [NewComment, setNewComment] = React.useState()

  const lastComment = comments ? comments[comments.length - 1] : null

  const lastCommentByCurrentUser = lastComment
    ? lastComment.userId === user.id
    : null

  const [addThread] = useMutation(CREATE_THREAD, {
    variables: {
      manuscriptId,
      comment: NewComment,
      created: new Date(),
      updated: new Date(),
    },
  })

  // const [updateThread] = useMutation(UPDATE_THREAD,{
  //   variables: {
  //     manuscriptId,
  //     comment: NewComment,
  //     created: new Date(),
  //     updated: new Date(),
  //   },
  // })
// console.log(updateThread, 'updateThread')

  const fetchData = () => useQuery(GET_THREADED_DISCUSSIONS)
  const { loading, error } = fetchData()
 

  return (
    <>
      {loading && 'loading dicussion...'}
      {/* {data && JSON.stringify(data)} */}
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
          <Button onClick={addThread} primary type="submit">
            Submit
          </Button>
        </>
      )}
    </>
  )
}

export default ThreadedDiscussion
