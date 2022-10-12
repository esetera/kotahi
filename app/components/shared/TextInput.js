import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'

const StyledInput = styled.input`
  background: #f8f8f9;
  border: 1px solid ${theme.colors.neutral.grey[700]};
  border-radius: 5px;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.07);
  padding: 14px 9px;
  width: 100%;

  &:active,
  &:focus-visible {
    border: 1px solid ${theme.colors.neutral.grey[900]};
    outline: none;
  }
`

// eslint-disable-next-line import/prefer-default-export
export const TextInput = props => {
  return <StyledInput type="text" {...props} />
}
