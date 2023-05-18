import React from 'react'
import { DocumentHelpers } from 'wax-prosemirror-core'
import { LinkingsNotFound } from './NotFound'
import {
  Modal,
  CloseButton,
  ModalBody,
  ModalContainer,
  ModalHeader,
  ModalFooter,
  RowContainers,
  Divider,
  Paragraph,
} from './style'

// eslint-disable-next-line import/prefer-default-export
export const AuthorLinkModal = ({ main, isOpen, closeModal, authorArray }) => {
  const notFoundText = 'Reference occurrence not found!'

  const handleClose = () => {
    closeModal()
  }

  const handleCitation = (ref, index) => {
    const currentID = ref.data_id

    const {
      state: { tr, schema },
    } = main

    const attrs = { href: `${currentID}`, class: 'authorLinking' }

    const linkNode = schema.text(window.getSelection().toString(), [
      schema.marks.test.create(attrs),
    ])

    main.dispatch(tr.replaceSelectionWith(linkNode, false))
    const allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc)
    allBlockNodes.forEach(singleNode => {
      if (singleNode.node.attrs.refId === currentID) {
        const newNode = singleNode.node.copy()
        const attrs = { ...newNode.attrs, linked: 'true' }
        const tr = main.state.tr.setNodeMarkup(singleNode.pos, undefined, attrs)
        main.dispatch(tr)
      }
    })
    closeModal()
  }

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalContainer>
          <ModalHeader> Author Linking </ModalHeader>
          <ModalBody>
            {authorArray.length > 0 ? (
              <>
                {authorArray.map((elem, index) => (
                  <>
                    <RowContainers
                      key={elem.id}
                      onClick={() => handleCitation(elem, index)}
                    >
                      <Paragraph>{elem.text}</Paragraph>
                    </RowContainers>
                    {index !== authorArray.length - 1 && <Divider />}
                  </>
                ))}
              </>
            ) : (
              <LinkingsNotFound text={notFoundText} />
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
