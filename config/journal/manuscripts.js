/*
Journals may want to display their manuscript tables with different columns
*/
const editorColumns = [
  'shortId',
  'overdueTooltip',
  'meta.title',
  'status',
  'statusCounts',
  'editorLinks',
]

const ownerColumns = [
  'shortId',
  'meta.title',
  'status',
  'created',
  'updated',
  'submitChevron',
]

const reviewerColumns = [
  'shortId',
  'meta.title',
  'reviewerBadge',
  'created',
  'updated',
  'reviewerLinks',
]

const URI_SEARCH_PARAM = 'search'

module.exports = {
  editorColumns,
  ownerColumns,
  reviewerColumns,
  URI_SEARCH_PARAM,
}