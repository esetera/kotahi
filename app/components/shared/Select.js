/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import { ThemeContext } from 'styled-components'

const styles = th => ({
  menu: (provided, state) => ({
    ...provided,
    borderRadius: th.borderRadius,
    zIndex: 9999,
    width: 250,
  }),

  control: (provided, state) => ({
    ...provided,
    background: th.colors.neutral.grey[50],
    border: !state.selectProps.standalone
      ? state.isFocused
        ? `1px solid ${th.colors.neutral.grey[900]}`
        : `1px solid ${th.colors.neutral.grey[700]}`
      : 'none',
    boxShadow: !state.selectProps.standalone
      ? state.isFocused
        ? `0 0 0 1px ${th.colorPrimary}`
        : 'inset 0px 0px 4px rgba(0, 0, 0, 0.07)'
      : state.isFocused
      ? `0 0 0 1px ${th.colorPrimary}`
      : th.boxShadow.shades[100],

    borderRadius: th.borderRadius,
    '&:hover': {
      /* boxShadow: `0 0 0 1px ${th.colorPrimary}`, */
      boxShadow: th.boxShadow.shades[100],
    },
    fontSize: 14,
    minHeight: `calc(${th.gridUnit} * 5)`,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'

    return { ...provided, opacity, transition }
  },

  option: (provided, state) => ({
    ...provided,
    backgroundColor:
      state.isFocused || state.isSelected ? th.colorFurniture : 'white',
    color: th.colorText,
  }),
})

// eslint-disable-next-line import/prefer-default-export
export const Select = ({
  value,
  isMulti,
  options,
  customStyles,
  ...otherProps
}) => {
  const theme = useContext(ThemeContext)
  let selectedOption = value

  if (!isMulti && value) {
    selectedOption = options.find(option => option.value === value)
  }

  const myStyles = { ...styles(theme), ...(customStyles || {}) }

  return (
    <ReactSelect
      isMulti={isMulti}
      options={options}
      {...otherProps}
      menuPlacement="auto"
      styles={myStyles}
      value={selectedOption}
    />
  )
}

Select.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  isMulti: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
}

Select.defaultProps = {
  value: undefined,
  isMulti: false,
}
