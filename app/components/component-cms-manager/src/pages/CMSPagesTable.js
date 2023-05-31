import React from 'react'
import CMSPageRow from './CMSPageRow'

import {
  CaretUp,
  CaretDown,
  Carets,
  CMSPageTableStyled,
  CMSPageHeaderRow,
  Cell,
  Legend,
  CMSPagesLeftPane,
  CMSPagesRightPane,
} from '../style'

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
      <Cell onClick={changeSort}>
        {children} {UpDown()}
      </Cell>
    )
  }

  const applyQueryParams = useQueryParams()

  const params = new URLSearchParams(history.location.search)
  const sortName = extractSortData(params).name || 'created'
  const sortDirection = extractSortData(params).direction || 'DESC'

  return (
    <CMSPageTableStyled>
      <CMSPageHeaderRow>
        <CMSPagesLeftPane>
          <SortHeader defaultSortDirection="ASC" thisSortName="username">
            <Legend>Page title</Legend>
          </SortHeader>
        </CMSPagesLeftPane>
        <CMSPagesRightPane>
          <SortHeader defaultSortDirection="DESC" thisSortName="created">
            <Legend>Created by</Legend>
          </SortHeader>
          <SortHeader defaultSortDirection="DESC" thisSortName="created">
            <Legend>Last Updated</Legend>
          </SortHeader>
          <SortHeader defaultSortDirection="DESC" thisSortName="created">
            <Legend>Created on</Legend>
          </SortHeader>
        </CMSPagesRightPane>
      </CMSPageHeaderRow>
      {flaxPages.map(flaxPage => (
        <CMSPageRow
          flaxPage={flaxPage}
          key={flaxPage.id}
          onManageClick={currentFlaxPage => onClickTitle(currentFlaxPage)}
        />
      ))}
    </CMSPageTableStyled>
  )
}

export default CMSPagesTable
