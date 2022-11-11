import { React, useState } from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import { th, grid, darken } from '@pubsweet/ui-toolkit'
import { Button } from '@pubsweet/ui'
import xIcon from './x.svg'

const styles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  content: {
    backgroundColor: '#ffffff',
    border: 'none',
    width: '1020px',
    height: '820px',
    margin: '0px',
    padding: '0px !important',
  },
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Roboto';
  font-weight: 600;
  font-size: 20px;
  line-height: 23px;
  align-items: center;
  color: #000000;
  z-index: 10000;
  padding: 1em;
  border-color: grey;
  border-style: solid;
  border-bottom-width: 2px;
  background: #ffffff;
`

const CloseButton = styled(Button)`
    background: #ffffff;
    margin-left: 1em;
    padding: ${grid(1)};
    text-decoration: none;
    width: 24px !important,
    height: 24px !important,
    &:hover {
      background-color: ${darken('colorFurniture', 0.1)};
    }
  
`

const ModalContainer = styled.div`
  background-color: ${th('colorBackground')};
  padding: ${grid(2.5)} ${grid(3)};
  z-index: 10000;
  overflow-y: scroll;
  border-radius: 0;
  margin: 0;
`

const Modal = ({ children, ...props }) => {
  return (
    <ReactModal style={styles} {...props}>
      {children}
    </ReactModal>
  )
}
const [isOpen1, setIsOpen] = useState(true)

export const ACMModal = ({
  isOpen,
  title = 'title',
  subtitle = 'subtitle',
  header = 'header',
  subheader = 'subheader',
  closeModal = setIsOpen('false'),
}) => {
  return (
    <Modal isOpen styles={styles}>
      <Header>
        <h1>{title}</h1>
        <h1 color="#808080">{subtitle}</h1>
        <CloseButton onClick={closeModal} primary>
          <img alt="X" src={xIcon} />
        </CloseButton>
      </Header>

      <ModalContainer>
        <h1>{header}</h1>
        <h2>{subheader}</h2>
      </ModalContainer>
    </Modal>
  )
}

export default ACMModal
