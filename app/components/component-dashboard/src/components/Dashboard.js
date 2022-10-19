import { Button } from '@pubsweet/ui'
import React from 'react'
import {
  Heading,
  HeadingWithAction,
  SectionContent,
  SectionHeader,
  Title,
} from '../../../shared'
import { Container } from '../style'
import EditorTable from './sections/EditorTable'
import OwnerTable from './sections/OwnerTableDraft'
import ReviewerTable from './sections/ReviewerTable'

const Dashboard = ({
  newSubmission,
  instanceName,
  shouldShowShortId,
  prettyRoleText,
  createNewTaskAlerts, // For testing only. Pass in null to disable.
  urlFrag,
}) => {
  return (
    <Container>
      <HeadingWithAction>
        <Heading>Dashboard</Heading>
        <Button onClick={newSubmission} primary>
          ＋ New submission
        </Button>
        {createNewTaskAlerts && (
          <Button onClick={createNewTaskAlerts}>New Alerts</Button>
        )}
      </HeadingWithAction>
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
      {!['ncrc'].includes(instanceName) && (
        <SectionContent>
          <SectionHeader>
            <Title>To Review</Title>
          </SectionHeader>
          <ReviewerTable urlFrag={urlFrag} />
        </SectionContent>
      )}

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
    </Container>
  )
}

export default Dashboard
