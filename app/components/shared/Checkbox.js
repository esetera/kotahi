import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'

const StyledCheckbox = styled.input`
  accent-color: ${theme.colors.primary.green[100]};
  background: #f8f8f9;
  border: 1px solid ${theme.colors.neutral.grey[700]};
  border-radius: 5px;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.07);
  color: white;
  padding: 14px 9px;

  &:active,
  &:focus-visible {
    border: 1px solid ${theme.colors.neutral.grey[900]};
    outline: none;
  }
`

// eslint-disable-next-line import/prefer-default-export
export const Checkbox = props => {
  const { id, label, value, handleChange } = props

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={value}>
        <StyledCheckbox
          id={id}
          name={value}
          onChange={handleChange}
          type="checkbox"
        />
        {label}
      </label>
    </div>
  )
}
