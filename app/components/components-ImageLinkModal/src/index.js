import React from 'react'
import { DocumentHelpers } from 'wax-prosemirror-utilities'
import { LinkingsNotFound } from '../../components-notFound/src'
import Modal, { CloseButton, ModalBody, ModalContainer, ModalHeader, ModalFooter, RowContainers, Divider, ImageWrapper } from "./style"



export const  ImageLinkModal = ({ main, figId, isOpen, closeModal, imageArray}) => {

  const notFoundText = 'Image occurence not found!';

    const handleClose = () => {
        closeModal()
    }

    const handleCitation = (ref, index) => {
        const currentID = ref.data_id
        const {
          state: { tr, schema },
        } = main
    
        let attrs = {
          href: `${figId[index].refId}`,
          refId: `${figId[index].refId}`,
          index: `${ref.src}`,
          class: 'imageLinking',
        }
        
        let linkNode = schema.text(window.getSelection().toString(), [
          schema.marks.test.create(attrs),
        ])
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
                    <ModalHeader> {'ImageName Linking'} </ModalHeader>
                    <ModalBody>
                    {imageArray.length ? imageArray.map((elem, index) => 
                    <>
                       <RowContainers key={elem.id} >
                         <ImageWrapper onClick={() => handleCitation(elem,index)}>
                          <h4>Image {index + 1}</h4>
                          <img src={elem.src} />
                         </ImageWrapper>
                      </RowContainers>
                      {index !== imageArray.length - 1 && <Divider />}
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



