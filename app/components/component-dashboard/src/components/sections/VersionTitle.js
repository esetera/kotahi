/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { get } from 'lodash'
import lightenBy from '../../../../../shared/lightenBy'
import theme from '../../../../../theme'

const Root = styled.div`
  font-size: ${theme.typography.fonts.size[100]};
  font-weight: ${theme.typography.fonts.weight.medium};
  line-height: ${th('lineHeightHeading4')};
  text-decoration: underline;
  text-decoration-color: ${theme.colors.neutral.grey[900]};
  text-decoration-thickness: 1.2px;
  text-underline-offset: 3.4px;
`

const ShortId = styled.div`
  color: ${lightenBy('colorText', 0.3)};
  display: inline-block;
  font-size: ${th('fontSizeBaseSmall')};
  margin-right: 1em;
  min-width: 3em;
`

export default ({ version, shouldShowShortId, instanceName }) => {
  const title =
    instanceName === 'ncrc'
      ? JSON.parse(version.submission).articleDescription
      : get(version, 'meta.title') || 'Untitled'

  return (
    <Root>
      {shouldShowShortId && <ShortId>{version.shortId}</ShortId>}
      {title}
    </Root>
  )
}
