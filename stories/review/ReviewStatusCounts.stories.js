import React from 'react'
import ReviewStatusCounts from '../../app/components/component-manuscripts-table/src/cell-components/ReviewStatusCounts'
import {
  manuscriptWithoutTeams,
  manuscriptWithSeveralReviewers,
  manuscriptWithTeams,
} from '../common/fixtures'

export default {
  component: ReviewStatusCounts,
  title: 'Review Status Counts',
}

const Template = args => <ReviewStatusCounts {...args} />

export const Default = Template.bind({})
Default.args = {
  manuscript: manuscriptWithTeams,
}

export const WithoutReviews = Template.bind({})
WithoutReviews.args = {
  manuscript: manuscriptWithoutTeams,
}

export const MultipleReviews = Template.bind({})
MultipleReviews.args = {
  manuscript: manuscriptWithSeveralReviewers,
}
