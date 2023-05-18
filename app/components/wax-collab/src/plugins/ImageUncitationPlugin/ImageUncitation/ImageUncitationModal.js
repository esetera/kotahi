import React from 'react'
import { AllLinked, LinkingsNotFound } from './NotFound'
import {
  Modal,
  CloseButton,
  ModalBody,
  ModalContainer,
  ModalHeader,
  ModalFooter,
  RowContainers,
  Divider,
  ImageWrapper,
} from './style'

const ImageUnlinkModal = ({ isOpen, closeModal, imageArray, isLinked }) => {
  const notFoundText = 'Image occurrence not found!'
  const linkedText = 'All Image occurrences has been linked.'

  const handleClose = () => {
    closeModal()
  }

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalContainer>
          <ModalHeader> Unlinked Images </ModalHeader>
          <ModalBody>
            {imageArray.length ? (
              imageArray.map((elem, index) => (
                <>
                  <RowContainers key={elem.id}>
                    <ImageWrapper>
                      <h4>Image {index + 1}</h4>
                      <img src={elem.src} />
                    </ImageWrapper>
                  </RowContainers>
                  {index !== imageArray.length - 1 && <Divider />}
                </>
              ))
            ) : isLinked ? (
              <AllLinked text={linkedText} />
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

export default ImageUnlinkModal
