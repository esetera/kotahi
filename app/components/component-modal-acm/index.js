import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import { th, grid } from '@pubsweet/ui-toolkit'
import { Button } from '@pubsweet/ui'
import { ActionButton, Icon } from '../shared'

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
  border-color: grey;
  border-style: solid;
  border-bottom-width: 2px;
`

const Titles = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 600;
  font-family: ${th('fontHeading')};
`

const Headers = styled.div`
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
  font-size: ${th('fontSizeHeading5')};
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
  &:hover {
    background-color: #d3d3d3;
    cursor: pointer;
    svg {
      stroke: white;
    }
  }
`

const Buttons = styled.div`
  position: absolute;
  display: flex;
  align-content: center;
  justify-content: space-between;
  bottom: 0px;
  margin: 10px 0px;
  background-color: white;
  height: 12%;
  width: 100%;
  z-index: 10001;
`

const ButtonContainer = styled.div`
  display: flex;
  height: 100%;
`

const PrimaryButton = styled(ActionButton)`
  color: white;
  background-color: ${th('colorPrimary')};
  border-radius: 6px;
  margin: 0px 10px;
  &:hover {
    cursor: pointer;
  }
`

const SecondaryButton = styled(ActionButton)`
  color: white;
  background-color: grey;
  border-radius: 6px;
  margin: 0px 10px;
  &:hover {
    cursor: pointer;
  }
`

const CheckBoxButton = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 5px;
  &:hover {
    cursor: pointer;
  }
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

const Modal = ({ children, ...props }) => {
  return (
    <ReactModal style={styles} {...props}>
      {children}
    </ReactModal>
  )
}

export const ACMModal = ({
  isOpen, // bool used to open and close modal
  closeModal, // function to close your modal / set isOpen=false
  title = 'Main Title', // main title in black
  subtitle = '0000-0000-0000-0000', // optional subtitle in grey
  header = 'Header', // header in black
  subheader = 'Subheader', // optional header in grey
  primaryAction = null, // primary button action (green, rightmost)
  primaryContent = 'Primary',
  secondaryAction = null, // secondary button action (grey)
  secondaryContent = 'Secondary',
  box1 = false, // primary checkbox (leftmost)
  box2 = false, // secondary checkbox
  box1Action = null,
  box1Content = 'Primary Checkbox',
  box2Action = null,
  box2Content = 'Secondary Checkbox',
  children,
}) => {
  return (
    <Modal isOpen styles={styles}>
      <MainHeader>
        <Titles>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Titles>
        <CloseButton onClick={closeModal}>
          <Icon>x</Icon>
        </CloseButton>
      </MainHeader>

      <ModalContainer>
        <Headers>
          <Title>{header}</Title>
          <Subtitle>{subheader}</Subtitle>
        </Headers>
        {children}
      </ModalContainer>

      <Buttons>
        <ButtonContainer>
          <CheckBoxButton onClick={box1Action}>
            {(box1 && <Icon>check-square</Icon>) || <Icon>square</Icon>}
            {box1Content}
          </CheckBoxButton>
          <CheckBoxButton onClick={box2Action}>
            {(box2 && <Icon>check-square</Icon>) || <Icon>square</Icon>}
            {box2Content}
          </CheckBoxButton>
        </ButtonContainer>

        <ButtonContainer>
          <SecondaryButton onClick={secondaryAction}>
            {secondaryContent}
          </SecondaryButton>
          <PrimaryButton onClick={primaryAction}>
            {primaryContent}
          </PrimaryButton>
        </ButtonContainer>
      </Buttons>
    </Modal>
  )
}

export default ACMModal
