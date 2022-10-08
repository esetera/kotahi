import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  input {
    background: #f8f8f9;
    border-radius: 5px;
  }
`

// eslint-disable-next-line import/prefer-default-export
export const TextInput = props => {
  return <StyledInput type="text" {...props} />
}
