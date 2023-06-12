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
import tick from './tick.svg'

export const RowContainer = ({ isSelected, index, onClick, title }) => {
  return (
    <RowDiv style={{ background: isSelected && 'azure' }}>
      <SubRow onClick={() => onClick(index)}>
        <ParagraphContainer>
          {title.doi && <Paragraph>DOI: {title.doi}</Paragraph>}
          {title.title && <Paragraph>Title: {title.title}</Paragraph>}
          {title.journalTitle && (
            <Paragraph>Author: {title.journalTitle}</Paragraph>
          )}
        </ParagraphContainer>
        {isSelected && (
          <ButtonContainer>
            <img alt="selected" src={tick} />
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
