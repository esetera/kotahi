import React, { useState } from 'react'
import { Action } from '@pubsweet/ui'
import { UserAvatar } from '../../component-avatar/src'
import { Row, Cell, LastCell } from './style'
import { UserCombo, Primary, UserInfo } from '../../shared'
import { ConfirmationModal } from '../../component-modal/src/ConfirmationModal'
import { convertTimestampToDateString } from '../../../shared/dateUtils'

const User = ({ user, deleteUser }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

  return (
    <Row>
      <Cell>
        <UserCombo>
          <UserAvatar user={user} />
          <UserInfo>
            {/* <Primary>{user?.username}</Primary> */}
            <Primary>About us</Primary>
          </UserInfo>
        </UserCombo>
      </Cell>
      <Cell>{convertTimestampToDateString(user.created)}</Cell>
      <LastCell>
        <Action onClick={() => setIsConfirmingDelete(true)}>View</Action>
      </LastCell>
      <ConfirmationModal
        closeModal={() => setIsConfirmingDelete(false)}
        confirmationAction={() => deleteUser({ variables: { id: user.id } })}
        confirmationButtonText="Delete"
        isOpen={isConfirmingDelete}
        message={`Permanently delete user ${user.username}?`}
      />
    </Row>
  )
}

export default User
