import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import Report from './Report'
import { Spinner } from '../../shared'

const getReportData = gql`
  query reportData($startDate: DateTime, $endDate: DateTime) {
    summaryActivity(startDate: $startDate, endDate: $endDate) {
      avgPublishTimeDays
      avgReviewTimeDays
      unsubmittedCount
      submittedCount
      unassignedCount
      reviewInvitedCount
      reviewInviteAcceptedCount
      reviewedCount
      rejectedCount
      revisingCount
      acceptedCount
      publishedCount
      publishedTodayCount
      avgPublishedDailyCount
      avgRevisingDailyCount
      durationsData {
        date
        reviewDuration
        fullDuration
      }
    }
    manuscriptsActivity(startDate: $startDate, endDate: $endDate) {
      manuscriptNumber
      entryDate
      title
      correspondingAuthor {
        username
      }
      editors {
        username
      }
      reviewers {
        username
      }
      status
      publishedDate
    }
    handlingEditorsActivity(startDate: $startDate, endDate: $endDate) {
      name
      assignedCount
      givenToReviewersCount
      revisedCount
      rejectedCount
      acceptedCount
      publishedCount
    }
    managingEditorsActivity(startDate: $startDate, endDate: $endDate) {
      name
      assignedCount
      givenToReviewersCount
      revisedCount
      rejectedCount
      acceptedCount
      publishedCount
    }
    reviewersActivity(startDate: $startDate, endDate: $endDate) {
      name
      invitesCount
      declinedCount
      reviewsCompletedCount
      avgReviewDuration
      reccReviseCount
      reccAcceptCount
      reccRejectCount
    }
    authorsActivity(startDate: $startDate, endDate: $endDate) {
      name
      unsubmittedCount
      submittedCount
      rejectedCount
      revisionCount
      acceptedCount
      publishedCount
    }
  }
`

const removeTypeName = rows => {
  if (!rows) return []
  return rows.map(row => {
    const newRow = { ...row }
    // eslint-disable-next-line no-underscore-dangle
    delete newRow.__typename
    return newRow
  })
}

const defaultReportDuration = 31 * 24 * 60 * 60 * 1000 // 31 days

const ReportPage = () => {
  const [startDate, setStartDate] = useState(Date.now() - defaultReportDuration)
  const [endDate, setEndDate] = useState(Date.now())

  const { data, loading, error } = useQuery(getReportData, {
    variables: {
      startDate,
      endDate,
    },
  })

  if (loading) return <Spinner />
  if (error) return <div>{error}</div>

  return (
    <Report
      endDate={endDate}
      getAuthorsData={() => removeTypeName(data?.authorsActivity)}
      getHandlingEditorsData={() =>
        removeTypeName(data?.handlingEditorsActivity)
      }
      getManagingEditorsData={() =>
        removeTypeName(data?.managingEditorsActivity)
      }
      getManuscriptsData={() => removeTypeName(data?.manuscriptsActivity)}
      getReviewersData={() => removeTypeName(data?.reviewersActivity)}
      getSummaryData={() => data?.summaryActivity}
      setEndDate={setEndDate}
      setStartDate={setStartDate}
      startDate={startDate}
    />
  )
}

export default ReportPage
