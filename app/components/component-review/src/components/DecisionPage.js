import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation, gql, useApolloClient } from '@apollo/client'
import { set, debounce } from 'lodash'
import config from 'config'
import DecisionVersions from './DecisionVersions'
import { Spinner, CommsErrorBanner } from '../../../shared'
import { fragmentFields } from '../../../component-submit/src/userManuscriptFormQuery'

import {
  query,
  sendEmail,
  makeDecisionMutation,
  updateReviewMutation,
  publishManuscriptMutation,
} from './queries'

import {
  CREATE_MESSAGE,
  CREATE_TEAM_MUTATION,
  UPDATE_TEAM_MUTATION,
} from '../../../../queries'
import { validateDoi } from '../../../../shared/commsUtils'

const urlFrag = config.journal.metadata.toplevel_urlfragment

export const updateManuscriptMutation = gql`
  mutation($id: ID!, $input: String) {
    updateManuscript(id: $id, input: $input) {
      id
      ${fragmentFields}
    }
  }
`

const createFileMutation = gql`
  mutation($file: Upload!, $meta: FileMetaInput!) {
    createFile(file: $file, meta: $meta) {
      id
      created
      name
      updated
      name
      tags
      objectId
      storedObjects {
        key
        mimetype
        url
      }
    }
  }
`

const deleteFileMutation = gql`
  mutation($id: ID!) {
    deleteFile(id: $id)
  }
`

let debouncers = {}

const DecisionPage = ({ match }) => {
  // start of code from submit page to handle possible form changes
  const client = useApolloClient()

  useEffect(() => {
    return () => {
      debouncers = {}
    }
  }, [])

  const handleChange = (value, path, versionId) => {
    const manuscriptDelta = {} // Only the changed fields

    // Takes the $PATH (meta.title) and $VALUE (meta.title) -> { meta: { title: '$VALUE' } }
    // String to Object conversion happens here
    set(manuscriptDelta, path, value)

    debouncers[path] = debouncers[path] || debounce(updateManuscript, 3000)

    return debouncers[path](versionId, manuscriptDelta)
  }

  // end of code from submit page to handle possible form changes

  const { loading, error, data } = useQuery(query, {
    variables: {
      id: match.params.version,
    },
    fetchPolicy: 'cache-and-network',
  })

  const [update] = useMutation(updateManuscriptMutation)
  const [sendEmailMutation] = useMutation(sendEmail)
  const [sendChannelMessage] = useMutation(CREATE_MESSAGE)
  const [makeDecision] = useMutation(makeDecisionMutation)
  const [publishManuscript] = useMutation(publishManuscriptMutation)
  const [updateTeam] = useMutation(UPDATE_TEAM_MUTATION)
  const [createTeam] = useMutation(CREATE_TEAM_MUTATION)
  const [doUpdateReview] = useMutation(updateReviewMutation)
  const [createFile] = useMutation(createFileMutation)

  const [deleteFile] = useMutation(deleteFileMutation, {
    update(cache, { data: { deleteFile: fileToDelete } }) {
      const id = cache.identify({
        __typename: 'File',
        id: fileToDelete,
      })

      cache.evict({ id })
    },
  })

  const updateManuscript = (versionId, manuscriptDelta) =>
    update({
      variables: {
        id: versionId,
        input: JSON.stringify(manuscriptDelta),
      },
    })

  const updateReview = async (reviewId, reviewData, manuscriptId) => {
    doUpdateReview({
      variables: { id: reviewId || undefined, input: reviewData },
      update: (cache, { data: { updateReview: updatedReview } }) => {
        cache.modify({
          id: cache.identify({
            __typename: 'Manuscript',
            id: manuscriptId,
          }),
          fields: {
            reviews(existingReviewRefs = [], { readField }) {
              const newReviewRef = cache.writeFragment({
                data: updatedReview,
                fragment: gql`
                  fragment NewReview on Review {
                    id
                  }
                `,
              })

              if (
                existingReviewRefs.some(
                  ref => readField('id', ref) === updatedReview.id,
                )
              ) {
                return existingReviewRefs
              }

              return [...existingReviewRefs, newReviewRef]
            },
          },
        })
      },
    })
  }

  if (loading && !data) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const {
    manuscript,
    submissionForm,
    decisionForm: decisionFormOuter,
    reviewForm: reviewFormOuter,
    currentUser,
    users,
  } = data

  // TODO This is TEST DATA: remove once we're getting useful values from the DB.
  const threadedDiscussions = [
    {
      id: '7416150c-2b25-4839-a94c-e4e1a0e35aeb',
      created: 1655825019000,
      updated: 1655825019000,
      manuscriptId: '07a26ea9-872f-4c04-8d3f-8e0097aa58dd', // Your manuscriptId here!
      threads: [
        {
          id: '26af5cc0-4e1d-4361-bcc3-432030ec2356',
          created: 1655825019000,
          updated: 1655825019000,
          comments: [
            {
              id: 'd9693775-4203-442a-9620-f11adc889f6a',
              created: 1655825019000,
              updated: 1655825019000,
              commentVersions: [
                {
                  id: 'ffa8357a-a589-4469-9d84-bbbad1c793af',
                  created: 1655825019000,
                  updated: 1655825019000,
                  userId: '906f42a3-64da-4cb0-8f72-f6a51d3a3452', // Someone's user ID here
                  comment: '<p class="paragraph">Existing comment</p>',
                },
              ],
              pendingVersions: [],
            },
            {
              id: '3e85a7e6-b223-4994-90f6-9173c4a8a284',
              created: 1655825019000,
              updated: 1655825019000,
              commentVersions: [],
              pendingVersions: [
                {
                  id: 'a37d2394-8e1e-48dd-bba9-d16e2dd535c3',
                  created: 1655825019000,
                  updated: 1655825019000,
                  userId: '3c0beafa-4dbb-46c7-9ea8-dc6d6e8f4436', // Your user ID here
                  comment: '<p class="paragraph">Hello!</p>',
                },
              ],
            },
          ],
        },
      ],
      userCanAddComment: true,
      userCanEditOwnComment: true,
      userCanEditAnyComment: true,
    },
  ]

  const form = submissionForm?.structure ?? {
    name: '',
    children: [],
    description: '',
    haspopup: 'false',
  }

  const decisionForm = decisionFormOuter?.structure ?? {
    name: '',
    children: [],
    description: '',
    haspopup: 'false',
  }

  const reviewForm = reviewFormOuter?.structure ?? {
    name: '',
    children: [],
    description: '',
    haspopup: 'false',
  }

  const sendNotifyEmail = async emailData => {
    const response = await sendEmailMutation({
      variables: {
        input: JSON.stringify(emailData),
      },
    })

    return response
  }

  const sendChannelMessageCb = async messageData => {
    const response = await sendChannelMessage({
      variables: messageData,
    })

    return response
  }

  /** This will only send the modified field, not the entire review object */
  const updateReviewJsonData = (versionId, value, path) => {
    const reviewDelta = {} // Only the changed fields
    // E.g. if path is 'meta.title' and value is 'Foo' this gives { meta: { title: 'Foo' } }
    set(reviewDelta, path, value)

    const reviewPayload = {
      isDecision: true,
      jsonData: JSON.stringify(reviewDelta),
      manuscriptId: manuscript.id,
      userId: currentUser.id,
    }

    updateReview(versionId, reviewPayload, manuscript.id)
  }

  return (
    <DecisionVersions
      allUsers={users}
      canHideReviews={config.review.hide === 'true'}
      createFile={createFile}
      createTeam={createTeam}
      currentUser={currentUser}
      decisionForm={decisionForm}
      deleteFile={deleteFile}
      displayShortIdAsIdentifier={
        config['client-features'].displayShortIdAsIdentifier &&
        config['client-features'].displayShortIdAsIdentifier.toLowerCase() ===
          'true'
      }
      form={form}
      handleChange={handleChange}
      makeDecision={makeDecision}
      manuscript={manuscript}
      publishManuscript={publishManuscript}
      reviewers={data?.manuscript?.reviews}
      reviewForm={reviewForm}
      sendChannelMessageCb={sendChannelMessageCb}
      sendNotifyEmail={sendNotifyEmail}
      teamLabels={config.teams}
      threadedDiscussions={threadedDiscussions}
      updateManuscript={updateManuscript}
      updateReview={updateReview}
      updateReviewJsonData={updateReviewJsonData}
      updateTeam={updateTeam}
      urlFrag={urlFrag}
      validateDoi={validateDoi(client)}
    />
  )
}

DecisionPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      version: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default DecisionPage
