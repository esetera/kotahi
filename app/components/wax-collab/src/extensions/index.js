import {
  ExampleBlockDropDownToolGroupService,
  ExampleBlockDropDownToolGroup,
} from './ExampleExtension'

import {
  ReferenceValidationToolGroup,
  ReferenceValidationToolGroupService,
} from './ReferenceValidationExtension'

// It's also possible to redefine an existing Wax Service:

// import { ImageService } from './ImageServiceExtension'

// Extension components are React elements added to the Wax layout. They are not strictly necessary.

const FullExtensionToolComponents = []
const ProductionExtensionToolComponents = [] // ExternalMenuComponent]

// Extension layout elements are added into the Wax layout. This is required; this one just attaches the block dropdown to the right side of the menu.

const FullExtensionLayoutElements = []

const ProductionExtensionLayoutElements = [
  ExampleBlockDropDownToolGroup,
  ReferenceValidationToolGroup,
]

// Extension services need to be added to add the extension functionality. This is not required.

const ProductionExtensionServices = [
  new ExampleBlockDropDownToolGroupService(),
  new ReferenceValidationToolGroupService(),
  // new ImageService(),
]

const FullExtensionServices = [
  // new ImageService()
]

// These things get exported; they are imported by the config and layout of the editors.

export {
  ProductionExtensionToolComponents,
  ProductionExtensionLayoutElements,
  ProductionExtensionServices,
  FullExtensionServices,
  FullExtensionToolComponents,
  FullExtensionLayoutElements,
}
