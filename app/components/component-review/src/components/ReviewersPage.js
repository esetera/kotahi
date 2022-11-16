import React from 'react'
import { Formik } from 'formik'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Reviewers from './reviewers/Reviewers'
import { Spinner, CommsErrorBanner } from '../../../shared'
import { KanbanCard } from './reviewers/KanbanCard'

const teamFields = `
  id
  role
  name
  objectId
  objectType
  members {
    updated
    id
    user {
      id
      username
      profilePicture
      isOnline
      defaultIdentity {
        id
        identifier
      }
    }
    status
    isShared
  }
`

const fragmentFields = `
  id
  created
  files {
    id
    created
    tags
    storedObjects {
      key
      mimetype
      url
    }
    objectId
  }
  reviews {
    open
    created
    user {
      id
      username
    }
  }
  decision
  teams {
    ${teamFields}
  }
  status
`

const addReviewerMutation = gql`
  mutation($manuscriptId: ID!, $userId: ID!) {
    addReviewer(manuscriptId: $manuscriptId, userId: $userId) {
      ${teamFields}
    }
  }
`

const removeReviewerMutation = gql`
  mutation($manuscriptId: ID!, $userId: ID!) {
    removeReviewer(manuscriptId: $manuscriptId, userId: $userId) {
      ${teamFields}
    }
  }
`

const query = gql`
  query($id: ID!) {
    users {
      id
      username
      profilePicture
      isOnline
      admin
    }

    manuscript(id: $id) {
      ${fragmentFields}
    }
  }
`

const updateTeamMemberMutation = gql`
  mutation($id: ID!, $input: String) {
    updateTeamMember(id: $id, input: $input) {
      id
      user {
        id
        username
        profilePicture
        isOnline
      }
      status
      isShared
    }
  }
`

const ReviewersPage = () => {
  const { version } = useParams()

  const { data, error, loading, refetch } = useQuery(query, {
    variables: { id: version },
  })

  const [addReviewer] = useMutation(addReviewerMutation, {
    update: (cache, { data: { addReviewer: revisedReviewersObject } }) => {
      cache.modify({
        id: cache.identify({
          __typename: 'Manuscript',
          id: revisedReviewersObject.objectId,
        }),
        fields: {
          teams(existingTeamRefs = []) {
            const newTeamRef = cache.writeFragment({
              data: revisedReviewersObject,
              fragment: gql`
                fragment NewTeam on Team {
                  id
                  role
                  members {
                    id
                    user {
                      id
                    }
                  }
                }
              `,
            })

            return [...existingTeamRefs, newTeamRef]
          },
        },
      })
    },
  })

  const [removeReviewer] = useMutation(removeReviewerMutation)
  const [updateTeamMember] = useMutation(updateTeamMemberMutation)

  if (loading) return <Spinner />
  if (error) return <CommsErrorBanner error={error} />

  const { manuscript, users } = data

  const reviewersTeam =
    manuscript.teams.find(team => team.role === 'reviewer') || {}

  // eslint-disable-next-line no-console
  const placeHolderFunc = e => {
    // eslint-disable-next-line no-console, no-alert
    alert('Modal should pop up')
  }

  const reviewers = reviewersTeam.members || []
  return (
    <>
      <KanbanCard
        // eslint-disable-next-line no-console
        onClickAction={placeHolderFunc}
        reviewer={reviewers[0]}
      />
      <Formik
        displayName="reviewers"
        initialValues={{ user: undefined }}
        onSubmit={values =>
          addReviewer({
            variables: {
              userId: values.user.id,
              manuscriptId: manuscript.id,
              status: 'invited',
            },
          })
        }
      >
        {props => (
          <Reviewers
            {...props}
            manuscript={manuscript}
            refetchManuscriptData={refetch}
            removeReviewer={removeReviewer}
            reviewers={reviewers}
            reviewerUsers={users}
            updateTeamMember={updateTeamMember}
          />
        )}
      </Formik>
    </>
  )
}

export default ReviewersPage
