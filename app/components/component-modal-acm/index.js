import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import { th, grid } from '@pubsweet/ui-toolkit'
import { Button } from '@pubsweet/ui'
import { Icon, ActionButton } from '../shared'

const styles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  content: {
    overflow: 'hidden',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '4px',
    width: '60%',
    height: '80%',
    margin: '0px',
    padding: '0px',
    top: '10%',
    left: '20%',
    bottom: '10%',
    right: '20%',
  },
}

const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 22px;
  height: 12%;
  align-items: center;
  z-index: 10000;
  padding: ${grid(2.5)} ${grid(3)};
  border-color: #d3d3d3;
  border-style: solid;
  border-bottom-width: 1.5px;
`

const RowHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 600;
  font-family: ${th('fontHeading')};
`

const StackedHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  column-gap: 180px;
  font-family: ${th('fontHeading')};
  font-weight: 600;
`

const Title = styled.div`
  font-size: ${th('fontSizeHeading5')};
`

const Subtitle = styled.div`
  font-size: ${th('fontSizeHeading6')};
  color: grey;
`

const CloseButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fffff;
  min-width: unset;
  width: 30px;
  height: 30px;
  cursor: pointer;
  &:hover {
    background-color: #d3d3d3;
    svg {
      stroke: white;
    }
  }
`

const ButtonPanel = styled.div`
  position: absolute;
  display: flex;
  align-content: center;
  justify-content: space-between;
  bottom: 0px;
  margin: 10px 0px;
  background-color: white;
  height: 8%;
  width: 100%;
  z-index: 10001;
`

const ButtonContainer = styled.div`
  display: flex;
  height: 100%;
`

const PrimaryActionButton = styled(ActionButton)`
  color: white;
  background-color: ${th('colorPrimary')};
  border-radius: 6px;
  margin: 0px 10px;
  cursor: pointer;
`

const SecondaryActionButton = styled(ActionButton)`
  color: white;
  background-color: grey;
  border-radius: 6px;
  margin: 0px 10px;
  cursor: pointer;
`

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 5px;
  cursor: pointer;
`

const ModalContainer = styled.div`
  background-color: ${th('colorBackground')};
  padding: ${grid(2.5)} ${grid(3)};
  z-index: 10000;
  overflow-y: auto;
  border-radius: 0;
  margin: 0;
  width: 100%;
  height: 72%;
`

export const PrimaryButton = ({ onClick, children }) => {
  return <PrimaryActionButton onClick={onClick}>{children}</PrimaryActionButton>
}

export const SecondaryButton = ({ onClick, children }) => {
  return (
    <SecondaryActionButton onClick={onClick}>{children}</SecondaryActionButton>
  )
}

export const CheckBoxButton = ({ onClick, isClicked, children }) => {
  return (
    <CheckBoxContainer onClick={onClick}>
      {(isClicked && <Icon>check-square</Icon>) || <Icon>square</Icon>}
      {children}
    </CheckBoxContainer>
  )
}

export const StackedHeader = ({
  title,
  subtitle, // optional
}) => {
  return (
    <StackedHeaderContainer>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </StackedHeaderContainer>
  )
}

export const RowHeader = ({
  title,
  subtitle, // optional
}) => {
  return (
    <RowHeaderContainer>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </RowHeaderContainer>
  )
}

export const Modal = ({
  isOpen, // bool used to open and close modal
  onClose, // function to close your modal / set isOpen=false
  leftActions,
  rightActions,
  title, // main title in black
  subtitle, // optional subtitle in grey
  children,
}) => {
  return (
    <ReactModal isOpen={isOpen} style={styles}>
      <MainHeader>
        <RowHeader subtitle={subtitle} title={title} />
        <CloseButton alignSelf="flex-end" onClick={onClose}>
          <Icon>x</Icon>
        </CloseButton>
      </MainHeader>

      <ModalContainer>{children}</ModalContainer>

      <ButtonPanel>
        {leftActions && (
          <ButtonContainer style={{ alignSelf: 'flex-start' }}>
            {leftActions}
          </ButtonContainer>
        )}

        {rightActions && (
          <ButtonContainer style={{ alignSelf: 'flex-end' }}>
            {rightActions}
          </ButtonContainer>
        )}
      </ButtonPanel>
    </ReactModal>
  )
}

export default Modal
