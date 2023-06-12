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
  onClose,
  onValidateProp,
  index,
  refId,
  refBlock,
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

  const onValidate = () => {
    setApiCall(false)
    onReferenceSelected(-1)
    onValidateProp({ index }, refId, true)
    onClose()
  }

  const ModalOpened = () => {
    if (referenceText.response !== 'undefined')
      setRefData(JSON.parse(referenceText.response).items)
    else setApiCall(true)
  }

  return (
    <Modal isOpen={isOpen} onAfterOpen={ModalOpened}>
      <ModalContainer>
        <ModalHeader>Reference Validation</ModalHeader>
        <ModalBody>
          <div>{referenceText || null}</div>
          {refBlock?.length > 0 ? (
            refBlock?.map((elem, indexx) => {
              return (
                <RowContainer
                  index={indexx}
                  isSelected={selectedIndex === indexx}
                  key={indexx}
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
                  Reference Validation failed, Please try again after sometime
                  ...
                </LoaderText>
              )}
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <FooterButton
            disabled={selectedIndex === -1}
            onClick={() => onValidate()}
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
