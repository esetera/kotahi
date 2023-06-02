import React from 'react'
import styled, { css } from 'styled-components'
import Color from 'color'
import { th, grid } from '@pubsweet/ui-toolkit'

const LabelBadgeDiv = ({ color, children, ...rest }) => (
  <div {...rest}>{children}</div>
)

/** Displays the label as a badge colored according to props.color */
const LabelBadge = styled(LabelBadgeDiv)`
  border-radius: 8px;
  display: inline-block;
  font-size: ${th('fontSizeBaseSmall')};
  font-variant: all-small-caps;
  line-height: 1.1em;
  max-width: 100%;
  ${props =>
    props.color &&
    css`
      background-color: ${props.color};
      ${Color(props.color).isDark()
        ? css`
            color: ${th('colorTextReverse')};
          `
        : ''};
    `}
  overflow-wrap: normal;
  padding: ${grid(0.5)} ${grid(1)};
  text-overflow: clip;
`

export default LabelBadge
