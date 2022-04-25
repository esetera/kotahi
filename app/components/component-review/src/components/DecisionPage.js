import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation, gql, useApolloClient } from '@apollo/client'
import { set, debounce } from 'lodash'
import config from 'config'
import { v4 as uuid } from 'uuid'
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

import { CREATE_MESSAGE } from '../../../../queries'

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
  mutation($file: Upload!, $meta: FileMetaInput) {
    createFile(file: $file, meta: $meta) {
      id
      created
      label
      filename
      fileType
      mimeType
      size
      url
    }
  }
`

const deleteFileMutation = gql`
  mutation($id: ID!) {
    deleteFile(id: $id)
  }
`

const teamFields = `
  id
  name
  role
  manuscript {
    id
  }
  members {
    id
    user {
      id
      username
    }
  }
`

const updateTeamMutation = gql`
  mutation($id: ID!, $input: TeamInput) {
    updateTeam(id: $id, input: $input) {
      ${teamFields}
    }
  }
`

const createTeamMutation = gql`
  mutation($input: TeamInput!) {
    createTeam(input: $input) {
      ${teamFields}
    }
  }
`

let debouncers = {}

const DecisionPage = ({ match }) => {
  // start of code from submit page to handle possible form changes
  const client = useApolloClient()

  const [confirming, setConfirming] = useState(false)

  const toggleConfirming = () => {
    setConfirming(confirm => !confirm)
  }

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
      purpose: 'submit',
      category: 'submission',
    },
    fetchPolicy: 'network-only', // TODO This prevents reviews sometimes having a null user. The whole graphql/caching in DecisionPage and DecisionVersion needs clean-up.
  })

  const decisionData = useQuery(query, {
    variables: {
      id: match.params.version,
      purpose: 'decision',
      category: 'decision',
    },
    fetchPolicy: 'network-only', // TODO This prevents reviews sometimes having a null user. The whole graphql/caching in DecisionPage and DecisionVersion needs clean-up.
  })

  const [update] = useMutation(updateManuscriptMutation)
  const [sendEmailMutation] = useMutation(sendEmail)
  const [sendChannelMessage] = useMutation(CREATE_MESSAGE)
  const [makeDecision] = useMutation(makeDecisionMutation)
  const [publishManuscript] = useMutation(publishManuscriptMutation)
  const [updateTeam] = useMutation(updateTeamMutation)
  const [createTeam] = useMutation(createTeamMutation)
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
    return doUpdateReview({
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

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const { manuscript, formForPurposeAndCategory, currentUser, users } = data

  const form = formForPurposeAndCategory?.structure ?? {
    name: '',
    children: [],
    description: '',
    haspopup: 'false',
  }

  const decisionForm = decisionData?.data?.formForPurposeAndCategory
    ?.structure ?? {
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

  const sendChannelMessageCb = async messageData =>
    sendChannelMessage(messageData)

  let currentReview
  let currentUserHasReview

  manuscript.reviews.forEach(review => {
    currentUserHasReview = review.user.id === currentUser.id
    currentReview = review
  })

  const onDecisionFormChange = (value, path) => {
    const reviewId = currentUserHasReview ? currentReview.id : uuid()

    const reviewDelta = {} // Only the changed fields

    // Takes the $PATH (meta.title) and $VALUE (meta.title) -> { meta: { title: '$VALUE' } }
    // String to Object conversion happens here
    set(reviewDelta, path, value)

    const reviewPayload = {
      jsonData: JSON.stringify(reviewDelta),
      manuscriptId: manuscript.id,
    }

    updateReview(reviewId, reviewPayload, manuscript.id)
  }

  return (
    <DecisionVersions
      allUsers={users}
      canHideReviews={config.review.hide === 'true'}
      client={client}
      confirming={confirming}
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
      onDecisionFormChange={onDecisionFormChange}
      publishManuscript={publishManuscript}
      reviewers={data?.manuscript?.reviews}
      sendChannelMessageCb={sendChannelMessageCb}
      sendNotifyEmail={sendNotifyEmail}
      teamLabels={config.teams}
      toggleConfirming={toggleConfirming}
      updateManuscript={updateManuscript}
      updateReview={updateReview}
      updateTeam={updateTeam}
      urlFrag={urlFrag}
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
