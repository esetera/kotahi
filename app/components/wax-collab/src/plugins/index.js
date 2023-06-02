import {
  ExampleBlockDropDownToolGroupService,
  ExampleBlockDropDownToolGroup,
} from './ExamplePlugin/index'

import {
  AuthorCitationToolGroup,
  AuthorCitationToolGroupService,
} from './AuthorCitationPlugin'

import {
  ImageCitationToolGroup,
  ImageCitationToolGroupService,
} from './ImageCitationPlugin'

import {
  ImageUncitationToolGroup,
  ImageUncitationToolGroupService,
} from './ImageUncitationPlugin'

import {
  TableCitationToolGroup,
  TableCitationToolGroupService,
} from './TableCitationPlugin'

import {
  TableUncitationToolGroup,
  TableUncitationToolGroupService,
} from './TableUncitationPlugin'

import {
  ReferenceUncitationToolGroup,
  ReferenceUncitationToolGroupService,
} from './ReferenceUncitationPlugin'

import {
  ReferenceValidationToolGroup,
  ReferenceValidationToolGroupService,
} from './ReferenceValidationPlugin'

import {
  ReferenceStructuringToolGroup,
  ReferenceStructuringToolGroupService,
} from './ReferenceStructuringPlugin'

import {
  CleanupUtilsToolGroupService,
  CleanupUtilsToolGroup,
} from './CleanupUtilsPlugin'

import { ImageService } from './ImageServicePlugin'

// import { LinkTagService } from './LinkingTagPlugin'
// import { CustomTagService } from './CustomTagBlockPlugin'

// Plugin components are React elements added to the Wax layout. They are not strictly necessary.

const FullPluginToolComponents = []
const ProductionPluginToolComponents = [] // ExternalMenuComponent]

// Plugin layout elements are added into the Wax layout. This is required; this one just attaches the block dropdown to the right side of the menu.

const FullPluginLayoutElements = []

const ProductionPluginLayoutElements = [
  ExampleBlockDropDownToolGroup,
  AuthorCitationToolGroup,
  ReferenceUncitationToolGroup,
  ReferenceValidationToolGroup,
  ImageCitationToolGroup,
  ImageUncitationToolGroup,
  TableCitationToolGroup,
  TableUncitationToolGroup,
  CleanupUtilsToolGroup,
  ReferenceStructuringToolGroup,
]

// Plugin services need to be added to add the plugin functionality. This is not required.

const ProductionPluginServices = [
  // new LinkTagService(),
  // new CustomTagService(),
  new ExampleBlockDropDownToolGroupService(),
  new CleanupUtilsToolGroupService(),
  new AuthorCitationToolGroupService(),
  new ReferenceUncitationToolGroupService(),
  new ReferenceValidationToolGroupService(),
  new ImageCitationToolGroupService(),
  new ImageUncitationToolGroupService(),
  new TableCitationToolGroupService(),
  new TableUncitationToolGroupService(),
  new ReferenceStructuringToolGroupService(),
  new ImageService(),
]

const FullPluginServices = [new ImageService()]

// These things get exported; they are imported by the config and layout of the editors.

export {
  ProductionPluginToolComponents,
  ProductionPluginLayoutElements,
  ProductionPluginServices,
  FullPluginServices,
  FullPluginToolComponents,
  FullPluginLayoutElements,
}

// TODO: We need to
