import React from 'react'
import ReactModal from 'react-modal'
import { th, grid, darken } from '@pubsweet/ui-toolkit'
import styled from 'styled-components'
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
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: fit-content;
`
export const ModalHeader = styled.div`
  text-align: left;
  height: 100%;
  width: 100%;
  padding-top: 10px;
  font-size: 25px;
`
export const ModalBody = styled.div`
  height: 450px;
  width: 100%;
`
export const ModalFooter = styled.div`
  height: 20%;
  width: 100%;
`

export const FooterButton = styled(Button)`
  background-color: ${th('colorFurniture')};
  width: 100%;
  height: 100%;
  margin: 5px;
  padding: 8px;
  text-decoration: none;
  &:hover {
    background-color: ${darken('colorFurniture', 0.1)};
  }
`

export const Wrapper = styled.div`
  height: 93%;
  overflow: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`

export const ContentWrapper = styled.div`
  padding-right: 10px;
`

export const SpanWrapper = styled.span`
  margin-right: 5px;
  // background: #ffe184;
`

export const FlexContainer = styled.div`
  display: flex;
`

export const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  // flex-wrap: wrap;
  float: left;
`

export const TagList = styled.button`
  height: 30px;
  width: 150px;
  background-color: rgb(63, 81, 181);
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  cursor: pointer;
  display: inline-block;
  font-family: 'Haas Grot Text R Web', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  margin: 5px;
  padding: 0;
  text-align: center;
  transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`

export const ButtonStyle = styled.button`
  background-color: #3aae2a;
  border: 1px solid #3aae2a;
  color: white;
  padding: 6px 24px;
  cursor: pointer;
  border-radius: 3px;
  margin: auto;
`

export const WrapperItem = styled.div`
  width: ${props => props.width};
`

export const Modal = ({ children, ...props }) => {
  return (
    <ReactModal style={styles} {...props}>
      {children}
    </ReactModal>
  )
}
