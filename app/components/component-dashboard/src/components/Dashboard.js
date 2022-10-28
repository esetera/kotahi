import { Button } from '@pubsweet/ui'
import React from 'react'
import {
  Heading,
  HeadingWithAction,
  SectionContent,
  SectionHeader,
  Title,
  HiddenTabs,
} from '../../../shared'
import { Container } from '../style'
import EditorTable from './sections/EditorTable'
import OwnerTable from './sections/OwnerTable'
import ReviewerTable from './sections/ReviewerTable'

const Dashboard = ({
  newSubmission,
  instanceName,
  shouldShowShortId,
  prettyRoleText,
  createNewTaskAlerts, // For testing only. Pass in null to disable.
  urlFrag,
}) => {
  const submissionSection = () => {
    return {
      content: (
        <>
          {!['ncrc'].includes(instanceName) && (
            <SectionContent>
              <SectionHeader>
                <Title>My Submissions</Title>
              </SectionHeader>
              <OwnerTable
                instanceName={instanceName}
                shouldShowShortId={shouldShowShortId}
                urlFrag={urlFrag}
              />
            </SectionContent>
          )}
        </>
      ),
      label: 'Submissions',
      key: 'submissions',
    }
  }

  const reviewSection = () => {
    return {
      content: (
        <>
          {!['ncrc'].includes(instanceName) && (
            <SectionContent>
              <SectionHeader>
                <Title>To Review</Title>
              </SectionHeader>
              <ReviewerTable urlFrag={urlFrag} />
            </SectionContent>
          )}
        </>
      ),
      label: 'Reviews',
      key: 'review',
    }
  }

  const editSection = () => {
    return {
      content: (
        <>
          <SectionContent>
            <SectionHeader>
              <Title>Manuscripts I&apos;m editor of</Title>
            </SectionHeader>
            <EditorTable
              instanceName={instanceName}
              shouldShowShortId={shouldShowShortId}
              urlFrag={urlFrag}
            />
          </SectionContent>
        </>
      ),
      label: 'Edits',
      key: 'edit',
    }
  }

  return (
    <Container>
      <HeadingWithAction>
        <Heading>Dashboard</Heading>
        <Button onClick={newSubmission} primary>
          + New submission
        </Button>
        {createNewTaskAlerts && (
          <Button onClick={createNewTaskAlerts}>New Alerts</Button>
        )}
      </HeadingWithAction>
      <HiddenTabs
        defaultActiveKey="submissions"
        sections={[submissionSection(), reviewSection(), editSection()]}
      />
    </Container>
  )
}

export default Dashboard
