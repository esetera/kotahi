import React from 'react'
import ReactModal from 'react-modal'
import {
  Divider,
  Paragraph,
  SubRow,
  ParagraphContainer,
  ButtonContainer,
  RowDiv,
  Modalstyles,
} from './styles'
import tick from '../tick.svg'

export const RowContainer = ({ title, isSelected, index, onClick }) => {
  return (
    <RowDiv style={{ background: isSelected && 'azure' }}>
      <SubRow onClick={() => onClick(index)}>
        <ParagraphContainer>
          <Paragraph>{title.title}</Paragraph>
          <Paragraph>{title.DOI}</Paragraph>
        </ParagraphContainer>
        {isSelected && (
          <ButtonContainer>
            <img alt="tick" src={tick} />
          </ButtonContainer>
        )}
      </SubRow>
      <Divider />
    </RowDiv>
  )
}

export const Modal = ({ children, ...props }) => {
  return (
    <ReactModal style={Modalstyles} {...props}>
      {children}
    </ReactModal>
  )
}

export default Modal
