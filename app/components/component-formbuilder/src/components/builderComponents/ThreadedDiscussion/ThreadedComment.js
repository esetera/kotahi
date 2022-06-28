import React, { useState } from 'react'
import Moment from 'react-moment'
import { Button } from '@pubsweet/ui'
import Tooltip from '../../../../../component-reporting/src/Tooltip'
import {
  DateWrapper,
  CommentMetaWrapper,
  UserMetaWrapper,
  UserName,
  SimpleWaxEditorWrapper,
  CollapseOverlay,
  CommentWrapper,
  ActionWrapper,
  Collapse,
  ModalContainer,
  CancelButton,
  CommentContainer,
} from '../../style'
import { Icon } from '../../../../../shared'
import { UserAvatar } from '../../../../../component-avatar/src'
import Modal from '../../../../../component-modal/src'
import SimpleWaxEditor from '../../../../../wax-collab/src/SimpleWaxEditor'

const ThreadedComment = props => {
  const {
    comment,
    currentUser,
    simpleWaxEditorProps,
    userCanEditOwnComment,
    userCanEditAnyComment,
  } = props

  const { comment: value, author, createdAt, updatedAt } = comment

  const [openModal, setOpenModal] = useState(false)
  const [modalFieldValue, setModalFieldValue] = useState(value)
  const [counter, setCounter] = useState(1)
  const [collapse, setCollapse] = useState(true)

  const onButtonClick = () => {
    setCounter(counter + 1)
    setOpenModal(false)
  }

  return (
    <>
      <CommentContainer>
        <CommentWrapper key={comment.id}>
          <CommentMetaWrapper>
            <UserMetaWrapper>
              <UserAvatar user={author} />
              <UserName>{author.username}</UserName>
            </UserMetaWrapper>
          </CommentMetaWrapper>
          <ActionWrapper>
            <DateWrapper>
              <Moment format="YYYY-MM-DD">{createdAt}</Moment>
              <Tooltip
                content={
                  <>
                    Created at &nbsp;
                    <Moment format="YYYY-MM-DD HH:mm:ss">{createdAt}</Moment>
                    <br />
                    Updated at &nbsp;
                    <Moment format="YYYY-MM-DD HH:mm:ss">{updatedAt}</Moment>
                  </>
                }
              />
            </DateWrapper>
            {(userCanEditAnyComment ||
              (userCanEditOwnComment && author.id === currentUser.id)) && (
              <Icon
                onClick={event => {
                  setOpenModal(true)
                }}
              >
                edit
              </Icon>
            )}
            <Collapse
              onClick={event => {
                setCollapse(!collapse)
              }}
              value={collapse}
            >
              {collapse ? <Icon>chevron-down</Icon> : <Icon>chevron-up</Icon>}
            </Collapse>
          </ActionWrapper>
        </CommentWrapper>
        <SimpleWaxEditorWrapper collapse={collapse}>
          <SimpleWaxEditor
            {...simpleWaxEditorProps}
            key={counter}
            readonly
            value={modalFieldValue}
          />
          <CollapseOverlay collapse={collapse} />
        </SimpleWaxEditorWrapper>
        <Modal isOpen={openModal}>
          <ModalContainer>
            <SimpleWaxEditor
              {...simpleWaxEditorProps}
              onChange={data => setModalFieldValue(data)}
              value={modalFieldValue}
            />
            <Button
              onClick={event => {
                onButtonClick()
              }}
              primary
            >
              Edit
            </Button>
            &nbsp;
            <CancelButton onClick={() => setOpenModal(false)}>
              Cancel
            </CancelButton>
          </ModalContainer>
        </Modal>
      </CommentContainer>
    </>
  )
}

export default ThreadedComment
