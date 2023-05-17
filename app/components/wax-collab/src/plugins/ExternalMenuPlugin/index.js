// import * as React from 'react'
// import { ComponentPlugin } from 'wax-prosemirror-core'
// const ExternalMenuToolBar = ComponentPlugin('externalMenuToolBar')
// import styled from 'styled-components'
// import { th } from '@pubsweet/ui-toolkit'
import ExternalToolGroupService from './ExternalToolGroupService'

// Two ways to do this. If you want to have it as a separate component in Wax, do this:
/*

const ExternalMenu = styled.div`
  display: flex;
  height: 36px;
  width: 36px;
  justify-content: end;
  user-select: none;
  background: ${th('colorBackgroundToolBar')};
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  background-color: magenta;
`

const ExternalMenuComponent = (
  <ExternalMenu>
    <ExternalMenuToolBar />
  </ExternalMenu>
)

const ExternalMenuToolGroup = {
  templateArea: 'externalMenuToolBar',
  toolGroups: ['ExternalToolGroup'],
}
*/
// Or, if you want to have it as part of the existing menu (probably smarter), do this:

const ExternalMenuToolGroup = {
  templateArea: 'topBar',
  toolGroups: ['ExternalToolGroup'],
}

export {
  // ExternalMenuComponent,
  ExternalMenuToolGroup,
  ExternalToolGroupService,
}
