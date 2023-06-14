import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import NotFoundIcon from './error.png'

const ContainerNotFound = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;

  & img {
    width: 200px;
    height: 200px;
  }

  & p {
    text-align: center;
    font-family: ${th('fontReading')};
    font-size: ${th('fontSizeHeading3')};
    line-height: ${th('lineHeightHeading3')};
    height: 5%;
    width: 100%;
    padding: 1px;
  }
`

const LinkingsNotFound = ({ text }) => {
  return (
    <ContainerNotFound>
      <img alt="not found" src={NotFoundIcon} />
      <p>{text}</p>
    </ContainerNotFound>
  )
}

export default LinkingsNotFound
