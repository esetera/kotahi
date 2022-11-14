export const URI_SEARCH_PARAM = 'search'
export const URI_PAGENUM_PARAM = 'pagenum'
export const URI_SORT_PARAM = 'sort'

/**
 * Extracts sortName and sortDirection from url query param of the form <sort_name>_<sort_direction>
 *
 * @param {URLSearchParams} params
 */
export const extractSortData = params => ({
  name: params.get(URI_SORT_PARAM)?.split('_')[0],
  direction: params.get(URI_SORT_PARAM)?.split('_')[1],
})
