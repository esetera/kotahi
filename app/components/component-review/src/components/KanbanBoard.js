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

import reviewStatus from '../../../../../config/journal/review-status'

const statuses = reviewStatus

const Kanban = styled.div`
  margin-top: 15px;
  margin-left: 7.5px;
  margin-right: 7.5px;
  margin-bottom: 15px;
`

const Column = styled.div`
  width: calc(${100/statuses.length}% - 15px);
  height: 300px;
  margin-left: 7.5px;
  margin-right: 7.5px;
  display: inline-block;
`

const StatusLabel = styled.div`
  background-color: ${props => props.statusColor || '#ffffff'};
  font-weight: bold;
  color: rgba(0, 0, 0, 0.60);
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
  display: inline-block;
  border-radius: 12px;
`

const CardsWrapper = styled.div`
  background-color: #f8f8f9;
  height: 100%;
  width: 100%;
  margin-top: 8px;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 8px;
`

const ReviewerStatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
`
const VersionNumber = styled.div`
  font-weight: bold;
  color: rgba(0, 0, 0, 0.40);
`

const KanbanBoard = ({versionNumber}) => {
    return (
        <AdminSection>
        <SectionContent>
          <SectionHeader>
            <ReviewerStatusHeader>
              <Title>Reviewer Status</Title>
              <Title><VersionNumber>Version {versionNumber}</VersionNumber></Title>
            </ReviewerStatusHeader>
            {console.log(versionNumber)}
          </SectionHeader>
          <SectionRow style={{ padding: 0 }}>
            <Kanban>
              {statuses.map((status) => <Column><StatusLabel statusColor={status.color}>{status.label}</StatusLabel><CardsWrapper></CardsWrapper></Column>)}
            </Kanban>
          </SectionRow>
        </SectionContent>
      </AdminSection>
    )
}

KanbanBoard.propTypes = {
    versionNumber: PropTypes.number.isRequired
}

export default KanbanBoard