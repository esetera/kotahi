import React from 'react'
import CMSPageRow from './CMSPageRow'

import { Table, Header, CaretUp, CaretDown, Carets } from './../style'

import {
  extractSortData,
  URI_PAGENUM_PARAM,
  URI_SORT_PARAM,
  useQueryParams,
} from '../../../../shared/urlParamUtils'

const CMSPagesTable = ({ flaxPages, history, onClickTitle }) => {
  const SortHeader = ({ thisSortName, defaultSortDirection, children }) => {
    const changeSort = () => {
      let newSortDirection

      if (sortName !== thisSortName) {
        newSortDirection = defaultSortDirection || 'ASC'
      } else if (sortDirection === 'ASC') {
        newSortDirection = 'DESC'
      } else if (sortDirection === 'DESC') {
        newSortDirection = 'ASC'
      }

      applyQueryParams({
        [URI_SORT_PARAM]: `${thisSortName}_${newSortDirection}`,
        [URI_PAGENUM_PARAM]: 1,
      })
    }

    const UpDown = () => {
      if (thisSortName === sortName) {
        return (
          <Carets>
            <CaretUp active={sortDirection === 'ASC'} />
            <CaretDown active={sortDirection === 'DESC'} />
          </Carets>
        )
        // return sortDirection
      }

      return null
    }

    return (
      <th onClick={changeSort}>
        {children} {UpDown()}
      </th>
    )
  }

  const applyQueryParams = useQueryParams()

  const params = new URLSearchParams(history.location.search)
  const sortName = extractSortData(params).name || 'created'
  const sortDirection = extractSortData(params).direction || 'DESC'

  return (
    <Table>
      <Header>
        <tr>
          <SortHeader defaultSortDirection="ASC" thisSortName="username">
            Page Title
          </SortHeader>
          <SortHeader defaultSortDirection="DESC" thisSortName="created">
            Created
          </SortHeader>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th />
        </tr>
      </Header>
      <tbody>
        {flaxPages.map(flaxPage => (
          <CMSPageRow
            flaxPage={flaxPage}
            key={flaxPage.id}
            onManageClick={currentFlaxPage => onClickTitle(currentFlaxPage)}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default CMSPagesTable
