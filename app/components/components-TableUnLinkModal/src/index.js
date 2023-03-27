import React from 'react'
import { AllLinked, LinkingsNotFound } from '../../components-notFound/src'
import Modal, { CloseButton, ModalBody, ModalContainer, ModalHeader, ModalFooter, RowContainers, Divider, Paragraph } from "./style"



export const TableUnLinkModal = ({isOpen, closeModal, tableArray, isLinked}) => {
    const notFoundText = 'Occurrence of Table Reference not found!';
    const linked = 'All Table References has been Linked.';

    const handleClose = () => {
        closeModal()
    }

    return (
        <>
            <Modal isOpen={isOpen}>
                <ModalContainer>
                    <ModalHeader> {'Unlinked Tables'} </ModalHeader>
                    <ModalBody>
                    {tableArray.length ? tableArray.map((elem, index) => 
                    <>
                       <RowContainers key={elem.id}>
                        <Paragraph>{elem.text}</Paragraph>
                      </RowContainers>
                      {index !== tableArray.length - 1 && <Divider />}
                    </>):
                    (isLinked ? 
                        <AllLinked text={linked}/> : <LinkingsNotFound text={notFoundText}/>)}
                    </ModalBody>
                    <ModalFooter>
                        <CloseButton onClick={handleClose}>Close</CloseButton>
                    </ModalFooter>
                </ModalContainer>
            </Modal>
        </>
    )
}
