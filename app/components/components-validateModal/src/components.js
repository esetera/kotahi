import { Divider, Paragraph, SubRow, ParagraphContainer, ButtonContainer, RowDiv, Modalstyles } from "./styles";
import React from "react";
import tick from './tick.svg'
import ReactModal from "react-modal";

export const RowContainer = ({ ...props }) => {
    return (
        <RowDiv style={{ background: props.isSelected && 'azure' }}>
            <SubRow onClick={() => props.onClick(props.index)} >
                <ParagraphContainer>
                    {props.title.doi && <Paragraph>DOI: {props.title.doi}</Paragraph>}
                    {props.title.title &&  <Paragraph>Title: {props.title.title}</Paragraph>}
                    {props.title.journalTitle && <Paragraph>Author: {props.title.journalTitle}</Paragraph>}
                </ParagraphContainer>
                {props.isSelected && <ButtonContainer>
                    <img src={tick} />
                </ButtonContainer>}
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
export default Modal;