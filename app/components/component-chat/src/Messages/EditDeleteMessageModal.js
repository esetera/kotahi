import React from 'react'
import styled from 'styled-components'
import { Wax } from 'wax-prosemirror-core'
import color from '../../../../theme/color'
import {
  convertTimestampToDateWithTimeString,
  convertTimestampToTimeString,
} from '../../../../shared/dateUtils'
import chatWaxEditorConfig from '../ChatWaxEditor/ChatWaxEditorConfig'
import ContentEditorLayout from '../../../component-cms-manager/src/editor/layout/ContentEditorLayout'

const ModalContainer = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  inset: 0;
  justify-content: center;
  position: fixed;
  z-index: 10000;
`

const ModalContent = styled.div`
  background-color: ${color.gray100};
  border-radius: 4px;
  min-height: ${props => (props.isEdit ? '350px' : '250px')};
  padding: 15px 15px 27px 15px;
  position: relative;
  text-align: center;
  width: ${props => (props.isEdit ? '50%' : '518px')};

  .contentRow {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .buttonRow {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .waxmenu + div {
    height: 130px;
  }
`

const Title = styled.h2`
  align-items: center;
  color: ${color.gray0};
  display: flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: space-between;
  line-height: 18px;
  margin: 0;
`

const Message = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  margin: 0;
  padding-top: ${props => (props.isEdit ? '20px' : '0')};
  text-align: left;
`

const DeleteChatText = styled.span`
  align-items: center;
  display: flex;
`

const CloseButton = styled.button`
  align-items: center;
  background: transparent;
  border: 4px;
  color: ${color.gray0};
  cursor: pointer;
  display: flex;
  font-size: 34px;
  justify-content: center;
  line-height: none;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  text-align: left;
`

const MessageGroupHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const MessageGroupContainer = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 25px;
`

const Username = styled.span`
  font-weight: 600;
  line-height: 18px;
`

const MessageText = styled.span`
  font-weight: 400;
  line-height: 22px;
  max-height: 66px;
  overflow-y: auto;
  padding-right: 39px;
  text-overflow: ellipsis;
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
        dangerouslySetInnerHTML={{ __html: message.content }}
      />
    )
  }

  return (
    <ModalContainer>
      <ModalContent isEdit={isEdit}>
        <MessageContainer>
          <div className="contentRow">
            <Title>
              <DeleteChatText>{title}</DeleteChatText>
              <CloseButton onClick={close}>&#215;</CloseButton>
            </Title>
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
    </ModalContainer>
  )
}

const defaultProps = {
  readonly: false,
}

EditDeleteMessageModal.defaultProps = defaultProps

export default EditDeleteMessageModal
