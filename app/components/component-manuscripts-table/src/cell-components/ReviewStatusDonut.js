/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */

import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { Chart } from 'react-google-charts'
import { getMembersOfTeam } from '../../../../shared/manuscriptUtils'
import reviewStatuses from '../../../../../config/journal/review-status'

const Root = styled.div`
  font-family: ${th('fontReviewer')};
  font-size: 0.9em;
  height: 8em;
  position: relative;
  width: 8em;

  .google-visualization-tooltip {
    pointer-events: none;
  }
`

const chartOptions = {
  pieHole: 0.5,
  pieSliceText: 'none',
  legend: 'none',
  tooltip: {
    isHtml: true,
    ignoreBounds: true,
  },
  is3D: false,
  width: '100%',
  height: '100%',
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

const ReviewStatusDonut = ({ manuscript }) => {
  const statusOptions = reviewStatuses.reduce((obj, item) => {
    // eslint-disable-next-line no-param-reassign
    obj[item.value] = { text: item.label, color: item.color }
    return obj
  }, {})

  const statusCounts = getMembersOfTeam(manuscript, 'reviewer').reduce(
    (a, b) => {
      // eslint-disable-next-line no-param-reassign
      a[b.status] = a[b.status] + 1 || 1
      return a
    },
    {},
  )

  const totalStatusCount = Object.values(statusCounts).reduce(
    (a, b) => a + b,
    0,
  )

  const statusTooltips = Object.keys(statusCounts).reduce((a, status) => {
    const count = statusCounts[status]
    const { text } = statusOptions[status]
    // eslint-disable-next-line no-param-reassign
    a[status] = `<div style="padding: 5px 15px; font-size: ${th(
      'fontSizeBase',
    )}; color: black; white-space: nowrap;">${text}: ${count}</div>`
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

  return (
    <Root>
      <Chart chartType="PieChart" data={data} options={options} />
      {totalStatusCount > 0 && (
        <CenterLabel>
          {totalStatusCount > 9 ? '9+' : totalStatusCount}
        </CenterLabel>
      )}
    </Root>
  )
}

export default ReviewStatusDonut
