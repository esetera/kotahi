import React from 'react'
import styled from 'styled-components'
import ReferenceValidation from './ReferenceValidation'

const Wrapper = styled.div`
  display: flex;
  align-item: center !important;
  height: initial !important;
  max-width: 150px;
  padding-left: 4px;
  padding-right: 4px;
  button {
    font-size: 12px;
  }
`

const ReferenceValidationTool = () => {
  return (
    <Wrapper>
      <ReferenceValidation />
    </Wrapper>
  )
}

export default ReferenceValidationTool
