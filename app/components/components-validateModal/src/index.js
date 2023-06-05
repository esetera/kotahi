import React, { useState } from 'react'
import {
  FooterButton,
  LoaderText,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
} from './styles'
import { Modal, RowContainer } from './components'

const ValidateModal = ({
  isOpen,
  referenceText,
  refBlock,
  onClose,
  onValidate,
}) => {
  const [apiCall, setApiCall] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [refData, setRefData] = useState([])

  const handleClose = () => {
    onClose()
    onReferenceSelected(-1)
    setApiCall(false)
  }

  const onReferenceSelected = dataIndex => {
    setSelectedIndex(dataIndex)
  }

  const thisOnValidate = () => {
    setApiCall(false)
    onReferenceSelected(-1)
    onValidate(referenceText, true)
  }

  const ModalOpened = () => {
    console.log(referenceText, refBlock)
    if (referenceText.response !== 'undefined')
      setRefData(JSON.parse(referenceText.response).items)
    else setApiCall(true)
  }

  return (
    <Modal isOpen={isOpen} onAfterOpen={ModalOpened}>
      <ModalContainer>
        <ModalHeader>Reference Validation</ModalHeader>
        <ModalBody>
          <div>{referenceText}</div>
          {refBlock?.length > 0 ? (
            refBlock?.map((elem, index) => {
              return (
                <RowContainer
                  index={index}
                  isSelected={selectedIndex === index}
                  onClick={onReferenceSelected}
                  title={elem}
                />
              )
            })
          ) : (
            <>
              {' '}
              {apiCall && (
                <LoaderText>
                  Reference Validation failed, Please try again after some time
                  ...
                </LoaderText>
              )}
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <FooterButton
            disabled={selectedIndex === -1}
            onClick={() => thisOnValidate()}
          >
            Done
          </FooterButton>
          <FooterButton onClick={handleClose}>Close</FooterButton>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  )
}

export default ValidateModal
