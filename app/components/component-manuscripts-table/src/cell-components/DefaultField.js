import React from 'react'
import styled, { css } from 'styled-components'
import { LabelBadge, PlainOrRichText } from '../../../shared'

const CellItem = styled.div`
  display: inline-block;
  margin: 0.1em;
  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
`

/** Display all values. If applyFilter is defined, filter by that value on click.
 * For string values, if a color is specified, display the value as a colored badge. */
const DefaultField = ({ values, applyFilter }) =>
  values.map(v => {
    const clickAction = applyFilter ? () => applyFilter(v.value) : null

    if (typeof v.displayValue !== 'string') return v.displayValue // So displayValue can be a React component
    return (
      <CellItem key={v.value} onClick={clickAction}>
        {v.color ? (
          <LabelBadge color={v.color}>
            <PlainOrRichText value={v.displayValue} />
          </LabelBadge>
        ) : (
          <PlainOrRichText value={v.displayValue} />
        )}
      </CellItem>
    )
  })

export default DefaultField
