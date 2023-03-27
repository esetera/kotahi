import ReactModal from "react-modal";
import { th, grid, darken } from '@pubsweet/ui-toolkit'
import styled from 'styled-components'
import React from 'react'
import { Button } from '@pubsweet/ui'
import tick from './tick.svg'

const styles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    content: {
        backgroundColor: '#303030',
        width: '40%',
        height: '100%',
        padding: '0',
        float: 'right',
        position: 'initial',
        userSelect: 'none',
    },
}
export const ModalContainer = styled.div`
    background-color: ${th('colorBackground')};
    height:100%;
    z-index: 10000;
    overflow:hidden;
    `
export const CloseButton = styled(Button)`
background-color: ${th('colorFurniture')};
width: 100%;
height: 100%;
text-decoration: none;
&:hover {
    background-color: ${darken('colorFurniture', 0.1)};
}  
cursor:pointer;
`
export const ModalHeader = styled.h4`
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #3AAE2A;
    font-weight: 600;
    font-size: 24px;
    margin-top: 10px;
    `

export const ModalBody = styled.div`
    text-align: right;
    height:90%;
    width:100%;
    padding-top:15px;
    overflow-y:scroll;
    `
export const ModalFooter = styled.div`
    height:5%;
    width:95%;
    padding-bottom:10px;
    margin: auto;
`
const Paragraph = styled.p`
min-width: 70%;
width:80%;
margin-left:10px;
margin-right:10px;
`
const ValidateButton = styled(Button)`
background-color: ${props => props.isDisabled ? "#cccccc" : "#3AAE2A"};
color: white;
width: 100%;
height: 40px;
text-decoration: none;
&:hover {
    background-color: ${darken('#CCC', 0.1)};
}  
cursor:pointer;
`
const RowContainers = styled.div`
display:flex;
align-items:center;
margin: 0px 0px;
text-align: start;
width:100%;
min-height:10%;
height:fit-content;
padding: ${grid(1)};
background-color:  ${th('colorBackground')};
`
const Divider = styled.hr`
border-top: 2px solid #bbb;
padding: 0 0;
`
export const LabelContainer = ({ ...props }) => {
    return (
        <>
            <RowContainers key={props.refrence.index}>
                <Paragraph>{props.refrence.reference}</Paragraph>
                {props.isValidated ? <img src={tick} /> :
                    <ValidateButton isDisabled={props.refrence.status === undefined} onClick={() => props.onClick(props.refrence)}>
                        {!props.isLoading ? 'validating...' : 'Validate'}
                    </ValidateButton>
                }
            </RowContainers>
            {props.isLast && <Divider />}
        </>
    )
}

export const Modal = ({ children, ...props }) => {
    return (
        <ReactModal style={styles} {...props}>
            {children}
        </ReactModal>
    )
}
export default Modal;