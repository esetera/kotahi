import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Action, Button, Icon } from '@pubsweet/ui'
// import Authorize from 'pubsweet-client/src/helpers/Authorize'

import queries from '../graphql/queries/'
import mutations from '../graphql/mutations/'
import {
  Container,
  Section,
  Heading,
  Content,
  HeadingWithAction,
  Placeholder,
} from '../style'
import EditorItem from './sections/EditorItem'
import OwnerItem from './sections/OwnerItem'
import ReviewerItem from './sections/ReviewerItem'
import {
  Spinner,
  SectionHeader,
  Title,
  SectionRow,
  SectionContent,
} from '../../../shared'

import hasRole from '../../../../shared/hasRole'

const updateReviewer = (proxy, { data: { reviewerResponse } }) => {
  const id = reviewerResponse.object.objectId
  const data = proxy.readQuery({
    query: queries.dashboard,
    variables: {
      id,
    },
  })

  const manuscriptIndex = data.manuscripts.findIndex(manu => manu.id === id)
  const teamIndex = data.manuscripts[manuscriptIndex].teams.findIndex(
    team => team.id === reviewerResponse.id,
  )

  data.manuscripts[manuscriptIndex].teams[teamIndex] = reviewerResponse
  proxy.writeQuery({ query: queries.dashboard, data })
}

const Dashboard = ({ history, ...props }) => {
  // const uploadManuscript = upload()
  // const [conversion] = useContext(XpubContext)

  const { loading, data, error } = useQuery(queries.dashboard)
  const [reviewerRespond] = useMutation(mutations.reviewerResponseMutation, {
    // variables: { currentUserId, action, teamId },
    update: updateReviewer,
  })
  const [deleteManuscript] = useMutation(mutations.deleteManuscriptMutation, {
    // variables: { id: manuscript.id },
    update: (proxy, { data: { deleteManuscript } }) => {
      const data = proxy.readQuery({ query: queries.dashboard })
      const manuscriptIndex = data.manuscripts.findIndex(
        manuscript => manuscript.id === deleteManuscript,
      )
      if (manuscriptIndex > -1) {
        data.manuscripts.splice(manuscriptIndex, 1)
        proxy.writeQuery({ query: queries.dashboard, data })
      }
    },
  })

  if (loading) return <Spinner />
  if (error) return error
  const dashboard = (data && data.manuscripts) || []
  const currentUser = data && data.currentUser

  const mySubmissions = dashboard.filter(submission =>
    hasRole(submission, 'author'),
  )

  const toReview = dashboard.filter(submission =>
    hasRole(submission, 'reviewer'),
  )

  const manuscriptsImEditorOf = dashboard.filter(submission =>
    hasRole(submission, ['seniorEditor', 'handlingEditor']),
  )

  return (
    <Container>
      <HeadingWithAction>
        <Heading>Dashboard</Heading>
        <Button onClick={() => history.push('/journal/newSubmission')} primary>
          ＋ New submission
        </Button>
      </HeadingWithAction>

      <SectionContent>
        <SectionHeader>
          <Title>My Submissions</Title>
        </SectionHeader>
        {dashboard.length > 0 ? (
          mySubmissions.map(submission => (
            <SectionRow key={`submission-${submission.id}`}>
              <OwnerItem
                deleteManuscript={() =>
                  // eslint-disable-next-line no-alert
                  window.confirm(
                    'Are you sure you want to delete this submission?',
                  ) && deleteManuscript({ variables: { id: submission.id } })
                }
                version={submission}
              />
            </SectionRow>
          ))
        ) : (
          <Placeholder>You have not submitted any manuscripts yet</Placeholder>
        )}
      </SectionContent>
      <SectionContent>
        <SectionHeader>
          <Title>To Review</Title>
        </SectionHeader>
        {toReview.length > 0 ? (
          toReview.map(review => (
            <SectionRow key={review.id}>
              <ReviewerItem
                currentUser={currentUser}
                key={review.id}
                reviewerRespond={reviewerRespond}
                version={review}
              />
            </SectionRow>
          ))
        ) : (
          <Placeholder>You have not been assigned any reviews yet</Placeholder>
        )}
      </SectionContent>

      <SectionContent>
        <SectionHeader>
          <Title>Manuscripts I'm editor of</Title>
        </SectionHeader>
        {manuscriptsImEditorOf.length > 0 ? (
          manuscriptsImEditorOf.map(manuscript => (
            <SectionRow key={`manuscript-${manuscript.id}`}>
              <EditorItem version={manuscript} />
            </SectionRow>
          ))
        ) : (
          <SectionRow>
            <Placeholder>
              You are not an editor of any manuscript yet
            </Placeholder>
          </SectionRow>
        )}
      </SectionContent>
    </Container>
  )
}
export default Dashboard
