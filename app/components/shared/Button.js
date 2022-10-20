import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'

const StyledButton = styled.button`
  background-color: ${theme.colors.primary.green[100]};
  border: none;
  border-radius: 6px;
  box-shadow: none;
  color: ${theme.colors.neutral.white};
  cursor: pointer;
  padding: ${theme.spacing[1]}px ${theme.spacing[1]}px;

  &:hover {
    background-color: ${theme.colors.primary.green[110]};
    transition: 0.2s;
  }
`

// eslint-disable-next-line import/prefer-default-export
export const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}
