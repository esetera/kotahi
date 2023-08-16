/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import lightenBy from '../../../../../shared/lightenBy'

const Root = styled.div`
  line-height: ${th('lineHeightHeading4')};
`

const ShortId = styled.div`
  color: ${lightenBy('colorText', 0.3)};
  display: inline-block;
  font-size: ${th('fontSizeBaseSmall')};
  margin-right: 1em;
  min-width: 3em;
`

export default ({ version, shouldShowShortId }) => {
  const title = JSON.parse(version.submission).$title || 'Untitled'

  return (
    <Root>
      {shouldShowShortId && <ShortId>{version.shortId}</ShortId>}
      {title}
    </Root>
  )
}
