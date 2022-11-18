/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */

import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { Chart } from 'react-google-charts'

const Root = styled.div`
  font-family: ${th('fontReviewer')};
  font-size: 0.9em;
  height: 100%;
  width: 100%;
  margin-bottom: 0.6em;
  margin-top: 0.3em;
  position: relative;

  .google-visualization-tooltip {
    pointer-events: none;
  }
`

const getUserFromTeam = (version, role) => {
  if (!version.teams) return []

  const teams = version.teams.filter(team => team.role === role)
  return teams.length ? teams[0].members : []
}

const chartOptions = {
  pieHole: 0.4,
  pieSliceText: 'none',
  legend: 'none',
  tooltip: {
    isHtml: true,
    ignoreBounds: true,
  },
  is3D: false,
}

const statusOptions = {
  invited: {
    text: 'Invited',
    color: '#0E6817',
  },
  accepted: {
    text: 'Accepted',
    color: '#FAECCA',
  },
  rejected: {
    text: 'Rejected',
    color: '#B6D2B9',
  },
  completed: {
    text: 'Completed',
    color: '#F8C64A',
  },
}

const CenterLabel = styled.div`
  font-size: ${th('fontSizeBase')};
  left: 50%;
  pointer-events: none;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
`

const ReviewStatusCounts = ({ manuscript }) => {
  const statusCounts = getUserFromTeam(manuscript, 'reviewer').reduce((a, b) => {
    // eslint-disable-next-line no-param-reassign
    a[b.status] = a[b.status] + 1 || 1
    return a
  }, {})

  // eslint-disable-next-line no-param-reassign
  let totalStatusCount = Object.values(statusCounts).reduce((a, b) => a + b, 0)

  if (totalStatusCount > 9) {
    totalStatusCount = '9+'
  }

  const statusTooltips = Object.keys(statusCounts).reduce((a, status) => {
    const count = statusCounts[status]
    const { text } = statusOptions[status]
    // eslint-disable-next-line no-param-reassign
    a[
      status
    ] = `<div style="padding: 5px 15px; font-size: ${th('fontSizeBase')}; color: black; white-space: nowrap;">${text}: ${count}</div>`
    return a
  }, {})

  const statusColors = Object.keys(statusCounts).map(
    status => statusOptions[status].color,
  )

  const header = [
    { type: 'string', id: 'Status' },
    { type: 'number', id: 'Count' },
    { type: 'string', role: 'tooltip', p: { html: true } },
  ]

  
  const data = [
    header,
    ...Object.keys(statusCounts).map(status => [
      statusOptions[status].text,
      statusCounts[status],
      statusTooltips[status],
    ]),
  ]

  const options = {
    ...chartOptions,
    colors: statusColors,
  }

  // console.log(manuscript)
  // console.log('rendering', data, options, Chart)

  return (
    <Root>
      <Chart
        chartType="PieChart"
        data={data}
        height={"100%"}
        options={options}
        width={"100%"}
      />
      <CenterLabel>{totalStatusCount}</CenterLabel>
    </Root>
  )
}

export default ReviewStatusCounts
