import { th, grid, darken } from '@pubsweet/ui-toolkit'
import ReactModal from 'react-modal'
import React from 'react'
import styled from 'styled-components'
import { Button } from '@pubsweet/ui'
import { SelectDropdown } from '@pubsweet/ui/dist/molecules'
import Select from 'react-select'


export const styles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    content: {
        backgroundColor: '#303030',
        border: 'none',
        width: 'fit-content',
        height: 'fit-content',
        margin: '0 auto',
        padding: '0',
    },
}

export const ModalContainer = styled.div`
    background-color: ${th('colorBackground')};
    padding: ${grid(2.5)} ${grid(3)};
    z-index: 10000;
    width:${grid(100)};
    height:${grid(90)};
    overflow:hidden;
    `
export const ModalHeader = styled.div`
    background-color: ${th('colorBackground')};
    height:5%;
    `
export const ModalBody = styled.div`
        background-color: #0000;
        height:90% !important;
        overflow-y:scroll;    
        scrollbar-width:none;
        `
export const ModalFooter = styled.div`
    text-align: right;
    margin-right: 80px;
    height:5%;
    `

export const MessageString = styled.p`
align-items: center;
display: flex;
justify-content: center;
margin-bottom: ${grid(2.5)};
width: 100%;
`
export const ModalButton = styled(Button)`
margin-left: 1em;
padding: ${grid(1)};
text-decoration: none;
&:hover {
    background-color: ${darken('#0000', 0.1)};
}  
`

export const Label = styled.label`
    text-align: right;
    width:35%;
    margin-right: 15px;
    `
export const TextField = styled.textarea`
    text-align:left;
    border-bottom: dashed 1px #000000;
    width:50%;
    `
export const InputField = styled.input`
    text-align:left;
    border-bottom: dashed 1px #000000;
    width:50%;
    `
export const RectTextField = styled.textarea`
    text-align:left;
    border: dashed 1px #000000;
    width:50%;
    height:70px;
    `

export const LabelContainer = styled.div`
    display:flex;
    align-items:center;
    width:100%;
    padding: ${grid(1)};
    `
export const FieldLabelContainer = styled.div`
    display:flex;
    align-items:flex-start !important;
    width:100%;
    padding: ${grid(1)};
    `
export const Form = styled.form`
    align-items: center;
    & > button {
      /* Make height of button consistent with the Input Box */
      padding: 10px ${th('gridUnit')};
    }
    `

const WrappedSelect = props => (
    <Select classNamePrefix="react-select" {...props} />
)

export const StyledSelect = styled(WrappedSelect)`
    font-family: 'Fira Sans';
    width: 100%;
    margin-bottom: 1rem;
    .react-select__control {
      border: 0;
      border-bottom: 1px solid #3f3f3f;
      border-radius: 0;
      box-shadow: none;
      outline: 0;
      width: 100%;
      &:hover {
        border-bottom: 1px solid ${th('colorPrimary')};
      }
    }
    .react-select__value-container {
      color: #3f3f3f;
      font-size: 14px;
      font-weight: 600;
      padding: 0;
      display: flex;
      justify-content: center;
    }
    .react-select__indicator-separator {
      display: none;
    }
  
    .react-select__menu-list {
      color: #3f3f3f;
      font-size: 14px;
      font-weight: 600;
      overflow-y: scroll;
    }
  `

export const RowContainer = ({ ...props }) => {
    return (
        <>
            {!props.IsTextArea ? (<LabelContainer>
                {getLabel(props.Title)}
                {getValueField(props)}
            </LabelContainer>) : (
                <FieldLabelContainer>
                    {getLabel(props.Title)}
                    <RectTextField />
                </FieldLabelContainer>
            )}
        </>
    )
}

const getLabel = (Title) => {
    return <Label>{Title}</Label>
}


export const DropDownComp = ({ ...props }) => {
    return (
        <SelectDropdown options={props.options} placeholder={props.placeholder} isClearable={props.isClearable}></SelectDropdown>
    )
}

const getValueField = (props) => {
    switch (props.Type) {
        case 'text':
        case 'number':
        default:
            return <InputField name={props.fieldName} type={props.Type}></InputField>
        case 'DropDown':
            return <DropDownComp options={props.options} placeholder={props.placeholder} isClearable={props.isClearable} />
        case 'button':
            return null;
    }
}

export const Modal = ({ children, ...props }) => {
    return (
        <ReactModal style={styles} {...props}>
            {children}
        </ReactModal>
    )
}
export default Modal;