import React from 'react'
import styled from 'styled-components'
import NotFoundIcon from './icons/error.png'
import Linked from './icons/linked.jpg'

const ContainerNotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40%;
  flex-direction: column;
  gap: 10px;

  & img {
    width: 200px;
    height: 200px;
  }

  & p {
    font-family: system-ui;
    font-weight: 600;
    font-size: 20px;
  }
`

export const LinkingsNotFound = ({ text }) => {
  return (
    <ContainerNotFound>
      <img alt="Not Found" src={NotFoundIcon} />
      <p>{text}</p>
    </ContainerNotFound>
  )
}

export const AllLinked = ({ text }) => {
  return (
    <ContainerNotFound>
      <img alt="Linked" src={Linked} />
      <p>{text}</p>
    </ContainerNotFound>
  )
}
