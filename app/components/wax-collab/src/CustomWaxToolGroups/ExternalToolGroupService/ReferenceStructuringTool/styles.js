import ReactModal from "react-modal";
import { th, grid, darken } from '@pubsweet/ui-toolkit'
import styled from 'styled-components'
import React from 'react'
import { Button } from '@pubsweet/ui'

const styles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        backgroundColor: '#303030',
        position: 'relative',
        top: '12%',
        border: 'none',
        width: '56%',
        height: 'fit-content',
        margin: '0 15%',
        padding: '0',
    },
}

export const ModalContainer = styled.div`
background-color: ${th('colorBackground')};
padding: ${grid(2)} ${grid(3)};
z-index: 10000;
width:100%;
overflow:hidden;
display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: fit-content;
    `
export const ModalHeader = styled.div`
    text-align: left;
    height:100%;
    width:100%;
    padding-top:10px;
    font-size:25px
    `
export const ModalBody = styled.div`
    height:450px;
    width:100%;
    `
export const ModalFooter = styled.div`
    height:20%;
    width:100%;
    `


export const FooterButton = styled(Button)`
background-color: ${th('colorFurniture')};
width: 100%;
height: 100%;
margin:5px;
padding:8px;
text-decoration: none;
&:hover {
    background-color: ${darken('colorFurniture', 0.1)};
}  
`
export const Modal = ({ children, ...props }) => {
    return (
        <ReactModal style={styles} {...props}>
            {children}
        </ReactModal>
    )
}
export default Modal;