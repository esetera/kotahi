import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  FooterButton,
  LoaderText,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
} from './styles'
import { UPDATE_VALIDATION } from '../../../../../../../queries'
import { Modal, RowContainer } from './components'

const ValidateModal = ({ ...props }) => {
  const [apiCall, setApiCall] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState()
  const [refData, setRefData] = useState([])

  const [createReferenceValidation] = useMutation(UPDATE_VALIDATION)

  const validateText = async () => {
    const response = await createReferenceValidation({
      variables: { reference: props.referenceText },
    })

    if (response.data.createReferenceValidation.succeeded) {
    }
  }

  const handleClose = () => {
    props.onClose()
    onReferenceSelected(-1)
  }

  const onReferenceSelected = dataIndex => {
    setSelectedIndex(dataIndex)
  }

  const ModalOpened = () => {
    if (props.referenceText.response !== 'undefined')
      setRefData(JSON.parse(props.referenceText.response).items)
    else setApiCall(true)
  }

  return (
    <Modal isOpen={props.isOpen} onAfterOpen={ModalOpened}>
      <ModalContainer>
        <ModalHeader>Reference Validataion : </ModalHeader>
        <ModalBody> {props.referenceText.reference} </ModalBody>
        {refData.length > 0 &&
          refData.map((elem, index) => {
            return (
              <RowContainer
                index={index}
                isSelected={selectedIndex === index}
                onClick={onReferenceSelected}
                title={elem}
              />
            )
          })}
        {apiCall && (
          <LoaderText>Please try again after sometime ...</LoaderText>
        )}
        <ModalFooter>
          <FooterButton onClick={() => console.log('Done')}>Done</FooterButton>
          <FooterButton onClick={handleClose}>Close</FooterButton>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  )
}

export default ValidateModal
