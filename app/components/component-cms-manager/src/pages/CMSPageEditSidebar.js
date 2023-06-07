import React from 'react'
import styled from 'styled-components'

import { Heading2 } from '../style'
import { ChevronRight } from 'react-feather'
import { th, grid } from '@pubsweet/ui-toolkit'

const RightArrow = styled(ChevronRight)`
  height: ${grid(2)};
  stroke: ${th('colorPrimary')};
  stroke-width: 4px;
  width: ${grid(2)};
`

const CMSPageEditSidebar = ({ cmsPages, currentCMSPage, onItemClick }) => {
  return (
    <div style={{ height: '100%' }}>
      {cmsPages.map(cmsPage => (
        <div
          key={cmsPage.id}
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid #DEDEDE',
            marginLeft: '16px',
            marginRight: '16px',
          }}
        >
          <Heading2 onClick={() => onItemClick(cmsPage)}>
            {cmsPage.title}
          </Heading2>
          {cmsPage.id === currentCMSPage.id ? <RightArrow /> : null}
        </div>
      ))}
    </div>
  )
}

export default CMSPageEditSidebar
