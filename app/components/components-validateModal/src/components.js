import { Divider, Paragraph, SubRow, ParagraphContainer, ButtonContainer, RowDiv, Modalstyles } from "./styles";
import React from "react";
import tick from './tick.svg'
import ReactModal from "react-modal";

export const RowContainer = ({ ...props }) => {
    return (
        <RowDiv style={{ background: props.isSelected && 'azure' }}>
            <SubRow onClick={() => props.onClick(props.index)} >
                <ParagraphContainer>
                    <Paragraph>{props.title.title}</Paragraph>
                    <Paragraph>{props.title.DOI}</Paragraph>
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