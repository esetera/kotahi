import ReactModal from 'react-modal'
import styled from 'styled-components'
import { th, darken } from '@pubsweet/ui-toolkit'
import React from 'react'
import { Button } from '@pubsweet/ui'

const styles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  content: {
    width: '40%',
    height: '100%',
    padding: '3px',
    float: 'right',
    position: 'initial',
    overflow: 'hidden',
  },
}

export const ModalContainer = styled.div`
  background-color: ${th('colorBackground')};
  height: 100vh;
  z-index: 10000;
  overflow: hidden;
`
export const CloseButton = styled(Button)`
  background-color: ${th('colorPrimary')};
  color: ${th('colorBackground')};
  width: 100%;
  height: 100%;
  text-decoration: none;
  &:hover {
    background-color: ${darken('colorPrimary', 0.1)};
    color: ${th('colorBackground')};
  }
  cursor: pointer;
`
export const ModalHeader = styled.h4`
  text-align: center;
  background-color: lightgray;
  color: ${th('colorPrimary')};
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeHeading3')};
  line-height: 1.25em;
  padding: 0.25em 0;
`

export const ModalBody = styled.div`
  height: 87vh;
  max-width: 85%;
  min-width: 100%;
  overflow-y: scroll;
  margin: 5px 0px;
  display: flex;
  flex-direction: column;
`

export const Rule = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeHeading6')};
  border-radius: 2px;
  margin: 0.25rem;
  background-color: #f1f1f1;
  padding: 0px 2px;

  .loader {
    width: 1em;
    height: 1em;
    border: 2px solid;
    border-color: ${th('colorPrimary')} transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const ModalFooter = styled.div`
  height: 3rem;
`

export const Paragraph = styled.p`
  font-size: 0.8rem;
  margin: 0 0 0 0.25rem;
  min-height: 6rem;
  padding: 0.25rem 0;
  width: calc(100% - 2rem);
`

export const Modal = ({ children, ...props }) => {
  return (
    <ReactModal style={styles} {...props}>
      {children}
    </ReactModal>
  )
}

export default Modal
