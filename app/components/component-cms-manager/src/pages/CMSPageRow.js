import React from 'react'
import { Cell } from '../style'
import { Primary, UserInfo } from '../../../shared'
import { convertTimestampToDateString } from '../../../../shared/dateUtils'

const CMSPageRow = ({ flaxPage, onManageClick }) => {
  return (
    <>
      <Cell key={flaxPage.id}>
        <UserInfo>
          <Primary>{flaxPage.title}</Primary>
        </UserInfo>
      </Cell>
      <Cell>{convertTimestampToDateString(flaxPage.created)}</Cell>
      {/* <LastCell>
        <Action onClick={() => onManageClick(flaxPage)}>Manage</Action>
      </LastCell> */}
    </>
  )
}

export default CMSPageRow
