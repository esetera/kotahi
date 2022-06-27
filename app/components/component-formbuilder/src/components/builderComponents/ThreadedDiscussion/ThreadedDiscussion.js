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
          existingComment: c.commentVersions.length
            ? c.commentVersions[c.commentVersions.length - 1]
            : null, // If null, this is a new, unsubmitted comment.
        }
      }

      // This comment is not currently being edited.
      return {
        ...c.commentVersions[c.commentVersions.length - 1],
      }
    })

  const lastComment = result.length ? result[result.length - 1] : null
  const lastCommentIsByUser = lastComment?.author?.id === currentUser.id

  // If the last comment in the thread is not by this user (and they are permitted to comment at all),
  // we create the preliminary data for a new comment, not yet in the DB.
  if (userCanAddComment && !lastCommentIsByUser)
    result.push({
      id: uuid(),
      comment: '<p class="paragraph></p>',
      isEditing: true,
      author: currentUser,
      versionId: uuid(),
    })

  return result
}

const ThreadedDiscussion = ({
  currentUser,
  firstVersionManuscriptId,
  onChange,
  threadedDiscussion,
  updatePendingComment,
  value, // This is the threadedDiscussionId
  ...SimpleWaxEditorProps
}) => {
  const {
    created,
    updated,
    userCanAddComment,
    userCanEditOwnComment,
    userCanEditAnyComment,
  } = threadedDiscussion || { userCanAddComment: true } // TODO Figure out this permission properly
  console.log(threadedDiscussion)

  const [threadedDiscussionId] = useState(threadedDiscussion?.id || uuid())
  const [threadId] = useState(threadedDiscussion?.threads?.[0]?.id || uuid())
  const threadComments = threadedDiscussion?.threads?.[0] || []

  const [comments, setComments] = useState(
    getExistingOrInitialComments(
      threadComments,
      currentUser,
      userCanAddComment,
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
                  onChange={content => {
                    updatePendingComment({
                      manuscriptId: firstVersionManuscriptId,
                      threadedDiscussionId,
                      threadId,
                      commentId: comment.id,
                      pendingVersionId: comment.versionId,
                      comment: content,
                    })
                    if (!threadedDiscussion?.id) onChange(threadedDiscussionId) // TODO Why is this not saving form state?
                    // TODO update state using setComments()?
                  }}
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