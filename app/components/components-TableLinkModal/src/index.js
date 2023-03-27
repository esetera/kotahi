import React from 'react'
import { DocumentHelpers } from 'wax-prosemirror-utilities'
import { LinkingsNotFound } from '../../components-notFound/src';
import Modal, { CloseButton, ModalBody, ModalContainer, ModalHeader, ModalFooter, RowContainers, Divider, Paragraph } from "./style"



export const TableLinkModal = ({ main, isOpen, closeModal, tableArray}) => {

  const notFoundText = 'Occurrence of Table Reference not found!';

    const handleClose = () => {
        closeModal()
    }

    const handleCitation = (ref, index) => {
        const currentID = ref.data_id
        const {
          state: { tr, schema },
        } = main
        let attrs = {
          href: `${currentID}`,
          refId: `${currentID}`,
          class: 'tableLinking',
        }
        let linkNode = schema.text(window.getSelection().toString(), [schema.marks.test.create(attrs)])
        main.dispatch(tr.replaceSelectionWith(linkNode, false))
        let allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc)
        allBlockNodes.forEach(singleNode => {
          if (singleNode.node.attrs.refId === currentID) {
            let newNode = singleNode.node.copy()
            let attrs = { ...newNode.attrs, linked: 'true' }
            const tr = main.state.tr.setNodeMarkup(
              singleNode.pos,
              undefined,
              attrs,
            )
            main.dispatch(tr)
          }
        })
        closeModal()
      }

    return (
        <>
            <Modal isOpen={isOpen}>
                <ModalContainer>
                    <ModalHeader> {'Table Linking'} </ModalHeader>
                    <ModalBody>
                    {tableArray?.length ? tableArray.map((elem, index) => 
                    <>
                       <RowContainers key={elem.id} onClick={() => handleCitation(elem,index)}>
                         <Paragraph>{elem.text}</Paragraph>
                      </RowContainers>
                      {index !== tableArray.length - 1 && <Divider />}
                    </>):
                    <LinkingsNotFound text={notFoundText}/>}
                    </ModalBody>
                    <ModalFooter>
                        <CloseButton onClick={handleClose}>Close</CloseButton>
                    </ModalFooter>
                </ModalContainer>
            </Modal>
        </>
    )
}
