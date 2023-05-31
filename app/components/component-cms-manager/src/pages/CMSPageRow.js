import React from 'react'
import {
  Cell,
  CMSPageListRow,
  CMSPagesLeftPane,
  CMSPagesRightPane,
} from '../style'
import { convertTimestampToDateWithoutTimeString } from '../../../../shared/dateUtils'

const CMSPageRow = ({ flaxPage, onManageClick }) => {
  return (
    <CMSPageListRow key={flaxPage.id}>
      <CMSPagesLeftPane>
        <Cell onClick={() => onManageClick(flaxPage)}>Page title</Cell>
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
