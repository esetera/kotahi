import React, { useState } from 'react'
// import { useMutation } from '@apollo/client'
import { ref } from 'objection'
import {
  FooterButton,
  LoaderText,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
} from './styles'
// import UPDATE_VALIDATION from '../queries'
import { Modal, RowContainer } from './components'

const ValidateModal = ({
  isOpen,
  onClose,
  referenceText,
  onValidate,
  setReferenceVersion,
}) => {
  // TODO: This should send referenceData back to the parent if soemthing has changed!
  const [apiCall, setApiCall] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState()
  const [refData, setRefData] = useState([])

  // const [createReferenceValidation] = useMutation(UPDATE_VALIDATION)

  // const validateText = async () => {
  //   const response = await createReferenceValidation({
  //     variables: { reference: referenceText },
  //   })

  //   if (response.data.createReferenceValidation.succeeded) {
  //   }
  // }

  const handleClose = () => {
    onClose()
    onReferenceSelected(-1)
  }

  const onReferenceSelected = dataIndex => {
    setSelectedIndex(dataIndex)
    // TODO: this might be onValidate?
    setReferenceVersion(refData[dataIndex])
  }

  const ModalOpened = () => {
    if (referenceText.response !== 'undefined')
      setRefData(JSON.parse(referenceText.response).items)
    else setApiCall(true)
  }

  console.log('Refdata', refData)
  return (
    <Modal isOpen={isOpen} onAfterOpen={ModalOpened}>
      <ModalContainer>
        <ModalHeader>Reference Validation:</ModalHeader>
        <ModalBody> {referenceText.reference} </ModalBody>
        {refData.length > 0 &&
          refData.map((elem, index) => {
            return (
              <RowContainer
                index={index}
                isSelected={selectedIndex === index}
                key={`key_${index}`}
                onClick={onReferenceSelected}
                title={elem}
              />
            )
          })}
        {apiCall && <LoaderText>Loading...</LoaderText>}
        <ModalFooter>
          <FooterButton
            onClick={() => {
              console.log('Done clicked')
              // TODO: shouldn't we be doing a reference validation here?
            }}
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
