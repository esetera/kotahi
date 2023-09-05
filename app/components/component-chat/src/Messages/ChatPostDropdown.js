import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import EditDeleteMessageModal from './EditDeleteMessageModal'
import { DELETE_MESSAGE, UPDATE_MESSAGE } from '../../../../queries'
import { Ellipsis } from './style'
import color from '../../../../theme/color'

const DropdownContainer = styled.div`
  background-color: ${color.gray100};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 0;
  top: -4px;
  width: 145px;
  z-index: 1000;
`

const DropdownItem = styled.div`
  color: ${color.black};
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  padding: 6px 14px 6px 14px;

  &:hover {
    background-color: ${color.gray97};
  }
`

const ChatPostDropdown = ({
  show,
  message,
  currentUser = {},
  onDropdownHide = () => {},
}) => {
  const { globalRoles = [], groupRoles = [] } = currentUser
  const [isOpen, setIsOpen] = useState(show)
  const [modalAction, setModalAction] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [deleteMessage] = useMutation(DELETE_MESSAGE)
  const [updateMessage] = useMutation(UPDATE_MESSAGE)

  const isAdmin = globalRoles.includes('admin')
  const isAuthor = message.user.username === currentUser.username
  const isGroupManager = groupRoles.includes('groupManager')
  const canDeletePost = isAuthor || (isAdmin && isGroupManager)
  const canEditPost = isAuthor

  const handleAction = action => {
    setModalAction(action)
    setShowModal(true)
    setIsOpen(false)
  }

  const handleEditConfirmation = async editedMessage => {
    try {
      await updateMessage({
        variables: {
          messageId: message.id,
          content: editedMessage,
        },
        // eslint-disable-next-line no-shadow
        update: (cache, { data: { updateMessage } }) => {
          cache.modify({
            id: cache.identify({
              __typename: 'Message',
              id: message.id,
            }),
            fields: {
              content: () => updateMessage.content,
            },
          })
        },
      })

      setShowModal(false)
    } catch (error) {
      console.error('Error updating message:', error)
    }
  }

  const handleDeleteConfirmation = async () => {
    try {
      await deleteMessage({
        variables: {
          messageId: message.id,
        },
        update: cache => {
          const cacheKey = cache.identify({
            id: message.id,
            __typename: 'Message',
          })

          cache.evict({ id: cacheKey })
        },
      })

      setShowModal(false)
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const hideDropdown = () => {
    setIsOpen(false)
    onDropdownHide()
  }

  const dropdownRef = useRef(null)

  useEffect(() => {
    setIsOpen(show)

    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        hideDropdown()
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [show])

  useEffect(() => {
    setIsEdit(modalAction === 'edit')
  }, [modalAction])

  return (
    <>
      {isOpen && (
        <DropdownContainer ref={dropdownRef}>
          <Ellipsis
            className="dropdown-ellipsis"
            onClick={() => hideDropdown()}
          />
          <div>
            {canEditPost && (
              <DropdownItem onClick={() => handleAction('edit')}>
                Edit
              </DropdownItem>
            )}
            {canDeletePost && (
              <DropdownItem onClick={() => handleAction('delete')}>
                Delete
              </DropdownItem>
            )}
          </div>
        </DropdownContainer>
      )}
      {showModal && (
        <EditDeleteMessageModal
          cancelText="No"
          close={() => setShowModal(false)}
          confirmText={isEdit ? 'Update' : 'Yes'}
          isEdit={isEdit}
          message={message}
          onConfirm={isEdit ? handleEditConfirmation : handleDeleteConfirmation}
          title={`${isEdit ? 'Edit' : 'Delete'} chat`}
        />
      )}
    </>
  )
}

export default ChatPostDropdown
