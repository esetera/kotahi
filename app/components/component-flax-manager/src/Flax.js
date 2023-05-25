import React from 'react'
import { Action } from '@pubsweet/ui'
import { Row, Cell, LastCell } from './style'
import { Primary, UserInfo } from '../../shared'
import { convertTimestampToDateString } from '../../../shared/dateUtils'

const Flax = ({ flaxPage }) => {
  const showPage = () => {
    return 'Do something'
  }

  return (
    <Row>
      <Cell>
        <UserInfo>
          <Primary>{flaxPage.title || 'About us'}</Primary>
        </UserInfo>
      </Cell>
      <Cell>{convertTimestampToDateString(flaxPage.created)}</Cell>
      <LastCell>
        <Action onClick={() => showPage()}>Manage</Action>
      </LastCell>
    </Row>
  )
}

export default Flax
