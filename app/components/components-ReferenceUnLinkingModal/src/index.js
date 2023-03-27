import React from 'react'
import { AllLinked, LinkingsNotFound } from '../../components-notFound/src'
import Modal, { CloseButton, ModalBody, ModalContainer, ModalHeader, ModalFooter, RowContainers, Divider, Paragraph } from "./style"



export const ReferenceUnLinkModal = ({ isOpen, closeModal, refArray, isLinked }) => {
    
    const notFoundText = 'Reference occurrence not found!'
    const linkedText = 'All References has been linked.'
    const handleClose = () => {
        closeModal()
    }

    return (
        <>
            <Modal isOpen={isOpen}>
                <ModalContainer>
                    <ModalHeader> {'Unlinked References'} </ModalHeader>
                    <ModalBody>
                    {refArray.length ? refArray.map((elem, index) => 
                    <>
                       <RowContainers key={elem.id}>
                         <Paragraph>{elem.text}</Paragraph>
                      </RowContainers>
                      {index !== refArray.length - 1 && <Divider />}
                    </>):
                    (
                        isLinked ? <AllLinked text={linkedText}/> : <LinkingsNotFound text={notFoundText} />
                    )}
                    </ModalBody>
                    <ModalFooter>
                        <CloseButton onClick={handleClose}>Close</CloseButton>
                    </ModalFooter>
                </ModalContainer>
            </Modal>
        </>
    )
}
