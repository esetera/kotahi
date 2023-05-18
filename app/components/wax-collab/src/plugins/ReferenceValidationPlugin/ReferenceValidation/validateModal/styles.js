// import React from 'react'
// import ReactModal from 'react-modal'
import { th, grid, darken } from '@pubsweet/ui-toolkit'
import styled from 'styled-components'
import { Button } from '@pubsweet/ui'

export const Modalstyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    border: 'none',
    width: 'fit-content',
    height: '100%',
    margin: 'auto',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
}

export const ModalContainer = styled.div`
  background-color: ${th('colorBackground')};
  padding: ${grid(2)} ${grid(2)};
  z-index: 10000;
  width: ${grid(150)};
  overflow: hidden;

  flex-direction: column;
  justify-content: space-around;
  height: fit-content;
`
export const ModalHeader = styled.div`
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #3aae2a;
  height: 10%;
  width: 100%;
  padding-top: 10px;
  font-size: 25px;
`
export const ModalBody = styled.div`
  height: fit-content;
  min-height: 60%;
  width: 100%;
  text-align: left;
  padding: 30px 10px;
`
export const ModalFooter = styled.div`
  display: flex;
  height: 20%;
  width: 100%;
`

export const FooterButton = styled(Button)`
  background-color: ${th('colorFurniture')};
  width: 48%;
  height: 50px;
  margin: 5px;
  text-decoration: none;
  &:hover {
    background-color: ${darken('colorFurniture', 0.1)};
  }
  cursor: pointer;
`
export const SubRow = styled.div`
  display: flex;
  align-items: center;
  text-align: start;
  width: 100%;
  min-height: 10%;
  height: fit-content;
  padding: 0 20px;

  cursor: pointer;
`
export const ParagraphContainer = styled.div`
  min-width: 300px;
`
export const ButtonContainer = styled.div`
  width: calc(100% - 300px);
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
`

export const Paragraph = styled.p`
  width: 100%;
  margin: 10px 0px;
`

export const Divider = styled.hr`
  height: 1px;
  border: none;
`
export const RowDiv = styled.div`
  width: 100%;
`
export const LoaderText = styled.div`
  text-align: left;
`
