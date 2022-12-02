import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AdminSection } from './style'
import {
  SectionContent,
  SectionHeader,
  SectionRow,
  Title,
} from '../../../shared'
import { getMembersOfTeam } from '../../../../shared/manuscriptUtils'
import statuses from '../../../../../config/journal/review-status'
import KanbanCard from './reviewers/KanbanCard'

const Kanban = styled.div`
  margin: 15px 7.5px;
`

const Column = styled.div`
  display: inline-block;
  height: 300px;
  margin-inline: 7.5px;
  width: calc(${100 / (statuses.length - 1)}% - 15px);
`

const StatusLabel = styled.div`
  background-color: ${props => props.statusColor || '#ffffff'};
  border-radius: 12px;
  color: rgba(0, 0, 0, 0.6);
  display: inline-block;
  font-weight: bold;
  margin-block: 4px;
  padding: 4px 10px 4px 10px;
`

const CardsWrapper = styled.div`
  background-color: #f8f8f9;
  border-radius: 8px;
  height: 100%;
  margin-top: 8px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
`

const ReviewerStatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const VersionNumber = styled.div`
  color: rgba(0, 0, 0, 0.5);
`

const KanbanBoard = ({ version, versionNumber }) => {
  const reviewers = getMembersOfTeam(version, 'reviewer')

  return (
    <AdminSection>
      <SectionContent>
        <SectionHeader>
          <ReviewerStatusHeader>
            <Title>Reviewer Status</Title>
            <Title>
              <VersionNumber>Version {versionNumber}</VersionNumber>
            </Title>
          </ReviewerStatusHeader>
        </SectionHeader>
        <SectionRow style={{ padding: 0 }}>
          <Kanban>
            {statuses
              .filter(status => status.value !== 'rejected')
              .map(status => (
                <Column key={status.value}>
                  <StatusLabel statusColor={status.color}>
                    {status.label}
                  </StatusLabel>
                  <CardsWrapper>
                    {reviewers
                      .filter(reviewer => reviewer.status === status.value)
                      .map(reviewer => (
                        <KanbanCard
                          key={status.value}
                          onClickAction={() => {}}
                          reviewer={reviewer}
                        />
                      ))}
                  </CardsWrapper>
                </Column>
              ))}
          </Kanban>
        </SectionRow>
      </SectionContent>
    </AdminSection>
  )
}

KanbanBoard.propTypes = {
  versionNumber: PropTypes.number.isRequired,
}

export default KanbanBoard
