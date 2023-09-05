import React from 'react'
import styled from 'styled-components'
import { Wax } from 'wax-prosemirror-core'
import { sanitize } from 'isomorphic-dompurify'
import color from '../../../../theme/color'
import {
  convertTimestampToDateWithTimeString,
  convertTimestampToTimeString,
} from '../../../../shared/dateUtils'
import chatWaxEditorConfig from '../ChatWaxEditor/ChatWaxEditorConfig'
import ContentEditorLayout from '../../../component-cms-manager/src/editor/layout/ContentEditorLayout'
import Modal from '../../../component-modal/src/Modal'

const ModalContent = styled.div`
  background-color: ${color.gray100};
  border-radius: 4px;
  position: relative;
  text-align: center;

  .buttonRow {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .contentRow {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .waxmenu + div {
    height: 130px;
  }
`

const Message = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  margin: 0;
  margin-right: 45px;
  padding-top: ${props => (props.isEdit ? '20px' : '0')};
  text-align: left;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  text-align: left;
`

const MessageGroupContainer = styled.div`
  padding-left: 30px;
  padding-right: 30px;
`

const MessageGroupHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const MessageText = styled.span`
  display: inline-block;
  font-weight: 400;
  line-height: 22px;
  margin-bottom: 30px;
  max-height: 66px;
  padding-right: 39px;
`

const Username = styled.span`
  font-weight: 600;
  line-height: 18px;
`

const WaxEditorContainer = styled.div`
  font-weight: 400;
  line-height: 22px;
  margin-top: 6px;
  overflow-y: auto;
`

const Time = styled.span`
  font-size: 14px;
  line-height: 18px;
`

const ButtonRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-top: ${props => (props.isEdit ? '20px' : '0')};
`

const ShadowButton = styled.button`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`

const Button = styled(ShadowButton)`
  background-color: ${props =>
    props.disabled ? color.gray90 : color.brand1.base};
  border: none;
  border-radius: 4px;
  color: ${color.gray100};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 16px;
  font-weight: 500;
  height: 31px;
  width: 64px;

  &.secondaryButton {
    background: ${color.gray100};
    border: 1px solid #6c6c6c;
    color: #6c6c6c;
    margin-left: 6px;
  }
`

const EditDeleteMessageModal = ({
  close,
  onConfirm,
  message,
  title,
  confirmText,
  cancelText,
  isEdit,
  readonly,
}) => {
  const editorRef = React.useRef()
  const parser = new DOMParser()

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true)

  const handleSave = (updatedMessage = '') => {
    if (!updatedMessage) {
      // eslint-disable-next-line no-param-reassign
      updatedMessage = editorRef.current.getContent()
    }

    const editedMessageWithHTML = parser.parseFromString(
      updatedMessage,
      'text/html',
    )

    onConfirm(editedMessageWithHTML.body.innerHTML)
  }

  const onEnterPress = updatedMessage => {
    if (updatedMessage.trim() === message.content) {
      close()
      return
    }

    handleSave(updatedMessage)
  }

  const isToday = date => {
    return date.toLocaleDateString() === new Date().toLocaleDateString()
  }

  const handleChange = source => {
    const isContentChanged = source !== message.content

    const isEmptyParagraph = source === '<p class="paragraph"></p>'
    const shouldDisableButton = !isContentChanged || isEmptyParagraph

    setIsButtonDisabled(shouldDisableButton)
  }

  // eslint-disable-next-line consistent-return
  const renderEditDeleteModalComponent = () => {
    if (isEdit) {
      return (
        <WaxEditorContainer>
          <Wax
            config={chatWaxEditorConfig({ onEnterPress })}
            layout={ContentEditorLayout(readonly)}
            onChange={handleChange}
            ref={editorRef}
            value={message.content}
          />
        </WaxEditorContainer>
      )
    }

    return (
      <MessageText
        contentEditable={isEdit}
        dangerouslySetInnerHTML={{ __html: sanitize(message.content) }}
      />
    )
  }

  return (
    <Modal isOpen onClose={close} title={title}>
      <ModalContent isEdit={isEdit}>
        <MessageContainer>
          <div className="contentRow">
            <MessageGroupContainer>
              <MessageGroupHeader>
                <Username>{message.user.username}</Username>
                <Time>
                  {isToday(new Date(message.created))
                    ? convertTimestampToTimeString(new Date(message.created))
                    : convertTimestampToDateWithTimeString(
                        new Date(message.created),
                      )}
                </Time>
              </MessageGroupHeader>
              {renderEditDeleteModalComponent()}
            </MessageGroupContainer>
          </div>
          <div className="buttonRow">
            <Message isEdit={isEdit}>
              Are you sure you want to {isEdit ? 'edit' : 'delete'} this chat?
            </Message>
            <div />
            <ButtonRow isEdit={isEdit}>
              <Button
                disabled={isButtonDisabled && isEdit}
                onClick={() => {
                  confirmText === 'Update' ? handleSave() : onConfirm()
                }}
              >
                {confirmText}
              </Button>
              <Button
                className="secondaryButton"
                color="#FFFFFF"
                onClick={close}
              >
                {cancelText}
              </Button>
            </ButtonRow>
          </div>
        </MessageContainer>
      </ModalContent>
    </Modal>
  )
}

const defaultProps = {
  readonly: false,
}

EditDeleteMessageModal.defaultProps = defaultProps

export default EditDeleteMessageModal
