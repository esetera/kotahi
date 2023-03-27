import ReactModal from "react-modal";
import { th, grid, darken } from '@pubsweet/ui-toolkit'
import styled from 'styled-components'
import React from 'react'
import { Button } from '@pubsweet/ui'

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
    overflow-y:scroll;
    `
export const ModalFooter = styled.div`
    height:5%;
    width:90%;
    padding-bottom:10px;
    margin: auto;
`
export const Paragraph = styled.p`
width:80%;
user-select: none;
`


export const RowContainers = styled.div`
display:flex;
align-items:center;
margin: 20px 0px;
text-align: start;
width:100%;
min-height:10%;
height:fit-content;
padding: ${grid(1)};
background-color:  ${th('colorBackground')};

& :hover{
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        border-radius: 10px;
    }
`
export const Divider = styled.hr`
border-top: 2px solid #bbb;
padding: 0 0;
`


export const Modal = ({ children, ...props }) => {
    return (
        <ReactModal style={styles} {...props}>
            {children}
        </ReactModal>
    )
}
export default Modal;