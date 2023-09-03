import React from 'react'
import styled from 'styled-components'
import { th, grid } from '@pubsweet/ui-toolkit'

const Placeholder = styled.div`
  display: inline-block;
  height: 0;
  opacity: 0;
  position: relative;
  visibility: hidden;
  width: 0;

  *:hover > & {
    opacity: 100%;
    transition-delay: 0.8s;
    visibility: visible;
  }
`

const Tip = styled.div`
  /* Common styles for the Tip component */
  color: ${th('colorText')};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  position: absolute;
  right: -50px;
  top: 15px;
  width: max-content;
  z-index: 999;

  &.message-tooltip {
    right: -275px;
    top: -4px;
  }
`

const TipInner = styled.div`
  background-color: ${th('colorFurniture')};
  border: 1px solid ${th('colorBorder')};
  padding: ${grid(0.25)} ${grid(1)};
`

const Tooltip = ({ content, className }) => {
  return (
    <Placeholder>
      <Tip className={className}>
        <TipInner>{content}</TipInner>
      </Tip>
    </Placeholder>
  )
}

export default Tooltip
