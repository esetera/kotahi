
import { th, grid, darken } from '@pubsweet/ui-toolkit'
import styled from 'styled-components'
import { Button } from '@pubsweet/ui'

export const Modalstyles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        border: 'none',
        width: '70%',
        height: '80vh',
        margin: 'auto',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',

    },
}

export const ModalContainer = styled.div`
background-color: ${th('colorBackground')};
padding: ${grid(3)} ${grid(3)};
z-index: 10000;
width:${grid(150)};
overflow:hidden;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    `
export const ModalHeader = styled.div`
    text-align: center;
    color: ${th('colorPrimaryCustom')};
    font-family: ${th('fontReading')};
    font-size: ${th('fontSizeHeading3')};
    line-height: ${th('lineHeightHeading3')};
    height:10%;
    width:100%;
    padding:10px;
    text-decoration: underline;
    `
export const ModalBody = styled.div`
    height: 80%;
    overflow: auto;
    /* min-height: 60%; */
    width: 100%;
    text-align: left;
    padding: 30px 10px;
    `
export const ModalFooter = styled.div`
    display:flex;
    height:10%;
    width:100%;
    `


export const FooterButton = styled(Button)`
    background-color: ${th('configColor')};
    color: white;
    width: 48%;
    height: 100%;
    margin:5px;
    text-decoration: none;
    &:disabled
    {
        background-color: ${th('configColor')};
        color: white;
    }
    &:hover: enabled {
        background-color: ${darken('configColor', 0.1)};
        color: white;
    }  
    &:hover: disabled {
        background-color: ${th('configColor')};
    }
    cursor:pointer;
`
export const SubRow = styled.div`
display:flex;
align-items:center;
text-align: start;
width:100%;
min-height:10%;
height:fit-content;
padding: 0 20px;

cursor:pointer;
`
export const ParagraphContainer = styled.div`
min-width:300px
`
export const ButtonContainer = styled.div`
    width: calc(100% - 300px);
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
`

export const Paragraph = styled.p`
width:100%;
margin:10px 0px;
`

export const Divider = styled.div`
border-top: 1px solid;
padding: 10px;
`
export const RowDiv = styled.div`
width:100%;
`
export const LoaderText = styled.div`
display: flex;
align-items: center;
height: 75%;
justify-content: center;
`
