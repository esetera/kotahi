import React from 'react'
import {
  Cell,
  CellPageTitle,
  CMSPageListRow,
  CMSPagesLeftPane,
  CMSPagesRightPane,
  Status,
} from '../style'
import { convertTimestampToDateWithoutTimeString } from '../../../../shared/dateUtils'

const CMSPageRow = ({ flaxPage, onManageClick }) => {
  return (
   
    <CMSPageListRow key={flaxPage.id}>
      <CMSPagesLeftPane>
        <CellPageTitle onClick={() => onManageClick(flaxPage)} >Homepage  <Status>  --Published</Status></CellPageTitle>
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
