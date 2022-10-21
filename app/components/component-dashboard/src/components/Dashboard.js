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
import EditorTable from './sections/EditorTableDraft'
import OwnerTable from './sections/OwnerTable'
import ReviewerTable from './sections/ReviewerTable'

const Dashboard = ({
  newSubmission,
  instanceName,
  shouldShowShortId,
  urlFrag,
}) => {
  return (
    <Container>
      <HeadingWithAction>
        <Heading>Dashboard</Heading>
        <Button onClick={newSubmission} primary>
          + New submission
        </Button>
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
