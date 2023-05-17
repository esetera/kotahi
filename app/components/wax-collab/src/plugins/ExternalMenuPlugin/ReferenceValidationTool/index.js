import React from 'react'
import styled from 'styled-components'
import ReferenceValidation from './ReferenceValidation'

const Wrapper = styled.div`
  display: flex;
  align-item: center !important;
  padding-left: 4px;
  padding-right: 4px;
  margin-top: 3px;
`

const ReferenceValidationTool = () => {
  return (
    <Wrapper>
      <ReferenceValidation />
    </Wrapper>
  )
}

export default ReferenceValidationTool
