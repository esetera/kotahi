import buildSpecialColumnProps from './specialColumnProps'
import { DefaultField } from '../cell-components'
/**
 * An object of props used for filtering, sorting, and general display
 * @typedef {Object} DisplayProps
 * @param {object} uriQueryParams An object of key value URI Query parameters {'field': 'value'}
 * @param {string} columnToSortOn The current column we should be sorting on
 * @param {string} sortDirection The current direction of the column sort
 * @param {string} currentSearchQuery Search query - NOTE: disables sorting
 */

/**
 * buildColumnDefinition: Takes in a column key and information to build out a standardized object of properties
 * @param {string} columnName The column key
 * @param {object} fieldDefinitions Field definitions returned from the GQL GET_MANUSCRIPTS_AND_FORM query
 * @param {object} specialColumnProperties Special component definitions for columns
 * @param {DisplayProps} customDisplayProps Props for display
 */

const fieldCanBeSorted = field => {
  return ['AbstractEditor', 'TextField'].includes(field?.component)
}

const buildColumnDefinition = (
  columnName,
  fieldDefinitions,
  specialColumnProperties,
  customDisplayProps,
) => {
  const {
    currentSearchQuery,
    columnToSortOn,
    sortDirection,
    uriQueryParams,
  } = customDisplayProps

  const field = fieldDefinitions[columnName]
  const presetProps = specialColumnProperties[columnName] || {}

  // We disable sorting by column when showing search results, and just order by search ranking.
  // This could be changed in future to allow ordering within search results.
  const canSort =
    !currentSearchQuery && (presetProps.canSort || fieldCanBeSorted(field))

  const filterOptions = presetProps.filterOptions || field?.options

  const defaultProps = {
    name: columnName,
    title: field?.shortDescription ?? field?.title ?? '',
    defaultSortDirection: canSort ? 'ASC' : null,
    component: DefaultField,
    flex: '1 0.5 16em',
  }

  return {
    ...defaultProps,
    ...presetProps,
    canSort,
    filterOptions,
    filterValue:
      ((filterOptions || presetProps.canFilterByDateRange) &&
        uriQueryParams.get(columnName)) ||
      null,
    sortDirection:
      canSort && columnToSortOn === columnName ? sortDirection : null,
  }
}

/**
 * buildColumnDefinitions: Master function to build the Manuscripts table definition
 * @param {Array[String]} columnNames The columns we want to display as a part of the table
 * @param {object} fieldDefinitions The graphQL structure of the fields returned from GET_MANUSCRIPTS_AND_FORM
 * @param {ComponentValues} specialComponentValues values needed for specific components
 * @param {DisplayProps} customDisplayProps Props for display
 * @returns {object} the list of standardized column information
 */

const buildColumnDefinitions = (
  columnNames,
  fieldDefinitions,
  specialComponentValues,
  displayProps,
) => {
  const specialColumnProperties = buildSpecialColumnProps(
    specialComponentValues,
  )

  return columnNames.map(columnName => {
    return buildColumnDefinition(
      columnName,
      fieldDefinitions,
      specialColumnProperties,
      displayProps,
    )
  })
}

export default buildColumnDefinitions
