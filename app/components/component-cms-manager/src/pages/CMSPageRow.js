import React from 'react'
import {
  Cell,
  CellPageTitle,
  CMSPageListRow,
  CMSPagesLeftPane,
  CMSPagesRightPane,
  Status,
  Hrstyle,
} from '../style'
import { convertTimestampToDateWithoutTimeString } from '../../../../shared/dateUtils'

const CMSPageRow = ({ flaxPage, onManageClick }) => {
  return (
    <CMSPageListRow key={flaxPage.id}>
      <CMSPagesLeftPane>
        {/* <CheckboxInput type="checkbox" /> */}
        <CellPageTitle onClick={() => onManageClick(flaxPage)}>
          {flaxPage.title}
        </CellPageTitle>
        <Hrstyle />
        <Status> Published</Status>
      </CMSPagesLeftPane>
      <CMSPagesRightPane>
        <Cell>Username</Cell>
        <Cell>{convertTimestampToDateWithoutTimeString(flaxPage.created)}</Cell>
        <Cell>{convertTimestampToDateWithoutTimeString(flaxPage.created)}</Cell>
      </CMSPagesRightPane>
    </CMSPageListRow>
  )
}

export default CMSPageRow
