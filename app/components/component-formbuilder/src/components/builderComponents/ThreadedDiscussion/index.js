import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import SimpleWaxEditor from '../../../../../wax-collab/src/SimpleWaxEditor'
import { SimpleWaxEditorWrapper } from '../../style'
import ThreadedComment from './ThreadedComment'

/** Returns an array of objects supplying useful into for each comment; and adds a new one at the end
 * if the user is permitted to add a new comment and haven't yet started doing so.
 */
const getExistingOrInitialComments = (
  comments,
  currentUser,
  userCanAddComment,
) => {
  const result = comments
    .filter(c => c.pendingVersions.length || c.commentVersions.length)
    .map(c => {
      if (c.pendingVersions.length) {
        // This comment is currently being edited!
        // Note that the server strips all pendingComments for other users before sending to the client,
        // so if there is a pendingVersion it is for the current user.
        const pv = c.pendingVersions[c.pendingVersions.length - 1]
        return {
          ...pv,
          isEditing: true,
          existingComment: c.commentVersions.find(cv => cv.id === pv.id), // If an existingComment is not found, this is a new, unsubmitted comment.
        }
      }

      // This comment is not currently being edited.
      return {
        ...c.commentVersions[c.commentVersions.length - 1],
      }
    })

  const lastComment = result.length ? result[result.length - 1] : null
  const lastCommentIsByUser = lastComment.author.id === currentUser.id

  // If the last comment in the thread is not by this user (and they are permitted to comment at all),
  // we create the preliminary data for a new comment, not yet in the DB.
  if (userCanAddComment && !lastCommentIsByUser)
    result.push({
      id: uuid(),
      comment: '<p class="paragraph></p>',
      isEditing: true,
      author: currentUser,
    })

  return result
}

const ThreadedDiscussion = props => {
  const {
    id,
    created,
    updated,
    manuscriptId,
    threads,
    userCanAddComment,
    userCanEditOwnComment,
    userCanEditAnyComment,
    currentUser,
    users = [], // TODO we should instead receive the user objects already embedded in the threadedDiscussion when it arrives from the server
    value,
    ...SimpleWaxEditorProps
  } = props

  const [threadId] = useState(threads?.[0]?.id || uuid())
  const thread = threads?.find(t => t.id === threadId) || { comments: [] }

  const [comments, setComments] = useState(
    getExistingOrInitialComments(
      thread.comments,
      currentUser,
      userCanAddComment,
      users,
    ),
  )

  return (
    <>
      {comments &&
        comments.map((comment, index) => {
          const isLastComment = index >= comments.length - 1

          if (isLastComment && comment.isEditing && !comment.existingComment)
            return (
              <SimpleWaxEditorWrapper key={comment.id}>
                <SimpleWaxEditor
                  {...SimpleWaxEditorProps}
                  onChange={content => null} // TODO upsert
                  value={comment.comment}
                />
              </SimpleWaxEditorWrapper>
            )

          return (
            <ThreadedComment
              comment={comment}
              currentUser={currentUser}
              key={comment.id}
              simpleWaxEditorProps={SimpleWaxEditorProps}
              userCanEditAnyComment={userCanEditAnyComment}
              userCanEditOwnComment={userCanEditOwnComment}
            />
          )
        })}
    </>
  )
}

export default ThreadedDiscussion
